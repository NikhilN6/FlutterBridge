#!/usr/bin/env node

const qrcode = require('qrcode-terminal');
const chalk = require('chalk');
const { spawn } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const VM_URL_TIMEOUT_MS = 60000;
const SERVICE_URI_KEYS = [
  'vmServiceUri',
  'observatoryUri',
  'debugServiceUri',
  'debuggerUri',
  'debugWsUri',
  'wsUri',
];

function parseArgs(argv) {
  let deviceId = null;
  let qrOnly = false;
  let jsonOutput = false;
  const passthrough = [];

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === '--device' || arg === '-d') {
      const next = argv[i + 1];
      if (!next || next.startsWith('-')) {
        throw new Error('Missing value for --device.');
      }
      deviceId = next;
      i += 1;
      continue;
    }

    if (arg.startsWith('--device=')) {
      const value = arg.split('=').slice(1).join('=');
      if (!value) {
        throw new Error('Missing value for --device.');
      }
      deviceId = value;
      continue;
    }

    if (arg === '--qr-only') {
      qrOnly = true;
      continue;
    }

    if (arg === '--json') {
      jsonOutput = true;
      continue;
    }

    passthrough.push(arg);
  }

  return { deviceId, qrOnly, jsonOutput, passthrough };
}

function parseMachineLine(line) {
  const trimmed = line.trim();
  if (!trimmed) {
    return null;
  }

  if (!(trimmed.startsWith('{') || trimmed.startsWith('['))) {
    return null;
  }

  try {
    return JSON.parse(trimmed);
  } catch (_) {
    return null;
  }
}

function isValidUri(value) {
  return typeof value === 'string' && /^(ws|http)s?:\/\//.test(value);
}

function findUriByKeys(obj, keys) {
  if (!obj || typeof obj !== 'object') {
    return null;
  }

  for (const key of keys) {
    if (isValidUri(obj[key])) {
      return obj[key];
    }
  }

  return null;
}

function findAnyUri(obj) {
  if (!obj || typeof obj !== 'object') {
    return null;
  }

  for (const [key, value] of Object.entries(obj)) {
    if (/uri/i.test(key) && isValidUri(value)) {
      return value;
    }
  }

  return null;
}

function extractVmServiceUri(event) {
  if (!event || typeof event !== 'object') {
    return null;
  }

  const params = event.params || event;
  let uri = findUriByKeys(params, SERVICE_URI_KEYS);
  if (uri) {
    return uri;
  }

  const debuggingOptions = params.debuggingOptions || params.debugOptions;
  uri = findUriByKeys(debuggingOptions, SERVICE_URI_KEYS);
  if (uri) {
    return uri;
  }

  return findAnyUri(params);
}

function assertFlutterProject(cwd) {
  const pubspecPath = path.join(cwd, 'pubspec.yaml');
  if (!fs.existsSync(pubspecPath)) {
    throw new Error('No pubspec.yaml file found. Run this command from the root of your Flutter project.');
  }
}

function runFlutterDevices() {
  return new Promise((resolve, reject) => {
    const child = spawn('flutter', ['devices', '--machine'], { stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('error', (err) => {
      reject(err);
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(stderr || `flutter devices exited with code ${code}`));
        return;
      }

      try {
        const devices = JSON.parse(stdout.trim());
        if (!Array.isArray(devices)) {
          reject(new Error('Unexpected output from flutter devices.'));
          return;
        }
        resolve(devices);
      } catch (err) {
        reject(err);
      }
    });
  });
}

function formatDevice(device) {
  const platform = device.platform || device.platformType || 'unknown';
  return `${device.name} (${platform}) - id: ${device.id}`;
}

async function promptForDevice(devices) {
  if (!process.stdin.isTTY) {
    throw new Error('Multiple devices detected. Use --device <id> to select one.');
  }

  console.log(chalk.yellow('\nAvailable devices:'));
  devices.forEach((device, index) => {
    console.log(`  ${index + 1}) ${formatDevice(device)}`);
  });

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const answer = await new Promise((resolve) => {
    rl.question(chalk.cyan('\nSelect a device by number or id: '), resolve);
  });

  rl.close();

  const trimmed = answer.trim();
  if (!trimmed) {
    throw new Error('No device selected.');
  }

  const asIndex = Number(trimmed);
  if (Number.isInteger(asIndex) && asIndex >= 1 && asIndex <= devices.length) {
    return devices[asIndex - 1].id;
  }

  const match = devices.find((device) => device.id === trimmed);
  if (match) {
    return match.id;
  }

  throw new Error(`Unknown device selection: ${trimmed}`);
}

async function resolveDeviceId(deviceIdArg, options = {}) {
  if (deviceIdArg) {
    return deviceIdArg;
  }

  let devices = [];
  try {
    devices = await runFlutterDevices();
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('Flutter was not found on your PATH. Install Flutter and try again.');
    }
    throw err;
  }
  const supported = devices.filter((device) => device.isSupported !== false);

  if (supported.length === 0) {
    throw new Error('No devices found. Connect a device or start an emulator.');
  }

  if (supported.length === 1) {
    if (!options.quiet) {
      console.log(chalk.gray(`Using device: ${formatDevice(supported[0])}`));
    }
    return supported[0].id;
  }

  if (options.jsonOutput) {
    throw new Error('Multiple devices detected. Use --device <id> with --json.');
  }

  return promptForDevice(supported);
}

function handleFlutterError(err) {
  if (err.code === 'ENOENT') {
    console.error(chalk.red('Flutter was not found on your PATH. Install Flutter and try again.'));
  } else {
    console.error(chalk.red(`Failed to start Flutter: ${err.message}`));
  }

  process.exitCode = 1;
}

async function main() {
  let options = null;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (err) {
    console.error(chalk.red(err.message));
    process.exitCode = 1;
    return;
  }

  const {
    deviceId: deviceIdArg,
    passthrough,
    qrOnly,
    jsonOutput,
  } = options;

  if (qrOnly && jsonOutput) {
    console.error(chalk.red('Use either --qr-only or --json, not both.'));
    process.exitCode = 1;
    return;
  }

  const quiet = qrOnly || jsonOutput;

  if (!quiet) {
    console.log(chalk.cyan.bold('\n🚀 FlutterBridge CLI'));
  }

  try {
    assertFlutterProject(process.cwd());
  } catch (err) {
    console.error(chalk.red(err.message));
    process.exitCode = 1;
    return;
  }

  let deviceId = null;
  try {
    deviceId = await resolveDeviceId(deviceIdArg, { quiet, jsonOutput });
  } catch (err) {
    console.error(chalk.red(`Device selection failed: ${err.message}`));
    process.exitCode = 1;
    return;
  }

  if (!quiet) {
    console.log(chalk.gray('Starting Flutter...\n'));
  }

  const flutterArgs = ['run', '--machine'];
  if (deviceId) {
    flutterArgs.push('-d', deviceId);
  }
  if (passthrough.length > 0) {
    flutterArgs.push(...passthrough);
  }

  const flutter = spawn('flutter', flutterArgs, { stdio: ['ignore', 'pipe', 'pipe'] });
  let stdoutBuffer = '';
  let stderrBuffer = '';
  let vmServiceUrl = null;

  const vmTimeout = setTimeout(() => {
    if (!vmServiceUrl) {
      console.error(chalk.red(`Timed out after ${VM_URL_TIMEOUT_MS / 1000}s waiting for VM service URL.`));
      flutter.kill('SIGINT');
      process.exitCode = 1;
    }
  }, VM_URL_TIMEOUT_MS);

  flutter.on('error', handleFlutterError);

  const handleMachineChunk = (buffer, data) => {
    let nextBuffer = buffer + data.toString();
    const lines = nextBuffer.split(/\r?\n/);
    nextBuffer = lines.pop();

    for (const line of lines) {
      const json = parseMachineLine(line);
      if (!json) {
        continue;
      }

      const events = Array.isArray(json) ? json : [json];
      for (const event of events) {
        const url = extractVmServiceUri(event);
        if (url && !vmServiceUrl) {
          vmServiceUrl = url;
          clearTimeout(vmTimeout);
          if (jsonOutput) {
            console.log(JSON.stringify({ vmServiceUri: url, deviceId }));
          } else {
            if (!qrOnly) {
              console.log(chalk.yellow('\nScan this QR with FlutterBridge app:\n'));
            }
            qrcode.generate(url, { small: true });
            if (!qrOnly) {
              console.log(chalk.green(`\nVM URL: ${url}`));
            }
          }
        }
      }
    }

    return nextBuffer;
  };

  flutter.stdout.on('data', (data) => {
    stdoutBuffer = handleMachineChunk(stdoutBuffer, data);
  });

  flutter.stderr.on('data', (data) => {
    stderrBuffer = handleMachineChunk(stderrBuffer, data);
    if (!quiet) {
      process.stdout.write(chalk.gray(data.toString()));
    }
  });

  flutter.on('close', (code) => {
    clearTimeout(vmTimeout);
    if (code && code !== 0) {
      process.exitCode = code;
    }
  });
}

main().catch((err) => {
  console.error(chalk.red(`Unexpected error: ${err.message}`));
  process.exitCode = 1;
});