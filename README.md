# 🚀 FlutterBridge

> Bridge your Flutter code to your phone instantly. Scan. Connect. Build.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![Flutter](https://img.shields.io/badge/flutter-%3E%3D3.0.0-blue)
![Status](https://img.shields.io/badge/status-in%20development-orange)

---

## 📱 What is FlutterBridge?

FlutterBridge is an open-source developer tool that brings an **Expo-like wireless development experience** to Flutter.

No USB cables. No complex ADB setup. Just scan a QR code and start building.

It enables:
- 📡 Wireless connection between your laptop and phone
- 📷 QR code-based device pairing
- ⚡ Hot reload over WiFi
- 🧠 Simple CLI interface — works with any Flutter project

---

## ✨ Features

| Feature | Status |
|---|---|
| QR Code generation in terminal | ✅ Done |
| Flutter VM URL detection | 🔄 In Progress |
| Hot reload over WiFi | 🔄 In Progress |
| Companion Android app | 📅 Planned |
| iOS support | 📅 Planned |
| Plugin support | 📅 Planned |

---

## 🏗️ Architecture

FlutterBridge consists of two parts:

```
flutterbridge/
│
├── cli/          # Node.js CLI tool
│   └── index.js  # Entry point
│
├── app/          # Flutter companion app (coming soon)
│
├── docs/         # Documentation
│
├── README.md
├── LICENSE
└── CONTRIBUTING.md
```

### How it works

```
[ Your Flutter Project ]
        │
        ▼
[ FlutterBridge CLI ] ──── starts flutter run ──── extracts VM URL
        │
        ▼
[ QR Code in Terminal ]
        │
        ▼ (scan)
[ FlutterBridge App on Phone ] ──── connects ──── shows your app
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) >= 18
- [Flutter](https://flutter.dev/docs/get-started/install) >= 3.0
- A physical Android device
- Both PC and phone on the **same WiFi network**

### Installation

```bash
git clone https://github.com/vaishnavkm/flutterbridge.git
cd flutterbridge/cli
pnpm install
```

### Run FlutterBridge

Navigate to your Flutter project and run:

```bash
node /path/to/flutterbridge/cli/index.js
```

You will see a QR code appear in your terminal.

### Connect Your Device

1. Open the **FlutterBridge** app on your phone
2. Scan the QR code
3. Your app will launch instantly 🎉

---

## 🔄 Hot Reload

Make changes in your Flutter code and save. FlutterBridge automatically reflects the updates on your connected device — no USB required.

---

## 🛣️ Roadmap (Detailed, ordered)

### Phase 1 — Solid CLI foundation (do this first)
1. **Reliable VM service URL detection**
        - Parse `flutter run --machine` JSON events (not stdout text).
        - Handle multi-device output; choose default or prompt.
        - Retry until `vmServiceUri` appears; time out with clear error.
2. **Error handling and guardrails**
        - Detect missing Flutter, not-a-Flutter-project, no devices, or offline device.
        - Provide actionable fixes (commands or links).
3. **CLI flags and UX**
        - `--device <id>` to force device selection.
        - `--qr-only` to print QR without extra logs.
        - `--json` for machine-readable output (future automation).
4. **Packaging and distribution**
        - Publish `flutterbridge` CLI package.
        - Support `npx flutterbridge` and `npm i -g flutterbridge`.

### Phase 2 — Companion app MVP
1. **QR scanner screen**
        - Use camera permissions + scanner UI.
        - Validate and display the scanned URL.
2. **VM service connection**
        - Connect via WebSocket to `vmServiceUri`.
        - Basic status UI: connected/disconnected + error messages.
3. **App display and hot reload**
        - Wire Flutter tool protocol to trigger hot reload.
        - Show reload status and errors.

### Phase 3 — Networking + security
1. **Same-LAN reliability**
        - Detect local IP and verify device reachability.
        - Offer troubleshooting hints if the phone cannot connect.
2. **Optional secure pairing**
        - Embed a short token in the QR.
        - Validate token on connect; reject mismatches.

### Phase 4 — Developer experience + docs
1. **Clean, informative logs**
        - Status UI in CLI (device, VM URL, QR state).
2. **Documentation and troubleshooting**
        - How to run, common failures, firewall notes.
        - Add quickstart + demo gif.
3. **CI + tests**
        - Unit tests for VM URL parsing and device selection.
        - Linting and release workflow.

### Phase 5 — Platform expansion
1. **iOS support**
        - Device discovery, pairing, and connection parity.
2. **Plugin support / advanced integrations**
        - Evaluate compatibility issues and document limits.

---

## ⚠️ Limitations

- Requires both devices on the **same WiFi network**
- Currently **debug mode only**
- Limited plugin support in early versions
- Android only (iOS coming later)

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes
   ```bash
   git commit -m "feat: add your feature"
   ```
4. Push to your branch
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 💡 Inspiration

Inspired by the seamless developer experience of [Expo](https://expo.dev) for React Native. Flutter deserves the same.

---

## 🌟 Support

If you find this project useful:
- ⭐ Star the repo
- 🍴 Fork it
- 🧑‍💻 Contribute
- 📢 Share it with fellow Flutter devs

---

## 👨‍💻 Author

**Vaishnav K M**  
Built with ❤️ for the Flutter community.

---

> 🚀 *FlutterBridge aims to become the standard development experience for Flutter — making app testing as simple as scanning a QR code.*