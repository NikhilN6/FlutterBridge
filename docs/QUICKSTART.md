# Quick Start Guide

Get FlutterBridge running in under 2 minutes.

## Prerequisites

- ✅ Node.js 18 or higher
- ✅ Flutter 3.0 or higher
- ✅ Android device or emulator
- ✅ PC and phone on same WiFi network

## Installation

Choose your preferred package manager:

### npm
```bash
npm install -g flutterbridge
```

### pnpm (faster)
```bash
pnpm add -g flutterbridge
```

### bun (fastest)
```bash
bun add -g flutterbridge
```

### No installation (one-time use)
```bash
npx flutterbridge        # npm
pnpm dlx flutterbridge   # pnpm
bunx flutterbridge       # bun
```

## Usage

1. **Navigate to your Flutter project:**
   ```bash
   cd my-flutter-app
   ```

2. **Run FlutterBridge:**
   ```bash
   flutterbridge
   ```

3. **Scan the QR code** with the FlutterBridge companion app

4. **Start coding!** Changes will hot reload automatically

## Common Commands

```bash
# Use specific device
flutterbridge --device <device-id>
flutterbridge -d <device-id>

# Show only QR code (minimal output)
flutterbridge --qr-only

# JSON output (for automation)
flutterbridge --json

# Pass Flutter flags
flutterbridge -- --release
flutterbridge -- --flavor production
```

## Troubleshooting

### "Flutter was not found"
Install Flutter: https://flutter.dev/docs/get-started/install

### "No pubspec.yaml file found"
Run from your Flutter project root directory.

### "No devices found"
```bash
# Check connected devices
flutter devices

# Connect a device or start emulator
flutter emulators --launch <emulator-id>
```

### "Found offline/unauthorized devices"
1. Enable USB debugging on your device
2. Run `adb devices` and authorize
3. Reconnect device

### Connection fails
- Ensure both devices on same WiFi
- Disable VPN
- Check firewall settings

## What's Next?

- ⭐ Star the repo: https://github.com/vaishnavkm/flutterbridge
- 📖 Read full docs: https://github.com/vaishnavkm/flutterbridge#readme
- 🐛 Report issues: https://github.com/vaishnavkm/flutterbridge/issues
- 🤝 Contribute: See CONTRIBUTING.md

## Need Help?

- GitHub Issues: https://github.com/vaishnavkm/flutterbridge/issues
- Documentation: https://github.com/vaishnavkm/flutterbridge/docs

---

**Happy coding!** 🚀
