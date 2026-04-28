#!/usr/bin/env node

const qrcode = require('qrcode-terminal');
const chalk = require('chalk');
const { spawn } = require('child_process');
const os = require('os');

console.log(chalk.cyan.bold('\n🚀 FlutterBridge CLI'));
console.log(chalk.gray('Starting Flutter...\n'));

const flutter = spawn('flutter', ['run', '--machine'], { stdio: ['ignore', 'pipe', 'pipe'] });

flutter.stdout.on('data', (data) => {
  const line = data.toString();

  // Flutter prints VM service URL in this format
  if (line.includes('vmServiceUri')) {
    try {
      const json = JSON.parse(line);
      const url = json.params?.vmServiceUri;

      if (url) {
        console.log(chalk.yellow('\n📡 Scan this QR with FlutterBridge app:\n'));
        qrcode.generate(url, { small: true });
        console.log(chalk.green(`\n✅ VM URL: ${url}`));
      }
    } catch (_) {}
  }
});

flutter.stderr.on('data', (data) => {
  process.stdout.write(chalk.gray(data.toString()));
});