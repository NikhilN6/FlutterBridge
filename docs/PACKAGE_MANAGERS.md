# Package Manager Compatibility

FlutterBridge CLI is compatible with all major Node.js package managers.

## Supported Package Managers

### npm (Node Package Manager)
✅ **Fully Supported**

```bash
# Global installation
npm install -g flutterbridge

# One-time use
npx flutterbridge

# Local installation (in project)
npm install flutterbridge
```

### pnpm (Performant npm)
✅ **Fully Supported**

```bash
# Global installation
pnpm add -g flutterbridge

# One-time use
pnpm dlx flutterbridge

# Local installation (in project)
pnpm add flutterbridge
```

### bun (Fast all-in-one JavaScript runtime)
✅ **Fully Supported**

```bash
# Global installation
bun add -g flutterbridge

# One-time use
bunx flutterbridge

# Local installation (in project)
bun add flutterbridge
```

### yarn (Classic & Berry)
✅ **Supported**

```bash
# Global installation (Yarn Classic)
yarn global add flutterbridge

# Global installation (Yarn Berry/v2+)
yarn global add flutterbridge

# One-time use (Yarn Berry/v2+)
yarn dlx flutterbridge

# Local installation
yarn add flutterbridge
```

## How It Works

FlutterBridge uses standard Node.js package conventions:

1. **Shebang**: `#!/usr/bin/env node` in `index.js`
2. **Bin field**: Properly configured in `package.json`
3. **Standard dependencies**: Uses only npm-compatible packages

This ensures compatibility across all package managers that follow npm registry standards.

## Testing Compatibility

After publishing, you can verify compatibility:

```bash
# Test with npm
npx flutterbridge@latest --help

# Test with pnpm
pnpm dlx flutterbridge@latest --help

# Test with bun
bunx flutterbridge@latest --help

# Test with yarn
yarn dlx flutterbridge@latest --help
```

## Package Manager Features

| Feature | npm | pnpm | bun | yarn |
|---------|-----|------|-----|------|
| Global install | ✅ | ✅ | ✅ | ✅ |
| One-time use | ✅ (npx) | ✅ (dlx) | ✅ (bunx) | ✅ (dlx) |
| Local install | ✅ | ✅ | ✅ | ✅ |
| Speed | Medium | Fast | Fastest | Fast |
| Disk usage | High | Low | Medium | Medium |

## Recommended Setup

For development:
```bash
# Use pnpm for faster installs and less disk usage
pnpm add -g flutterbridge
```

For quick testing:
```bash
# Use npx/bunx for one-time execution
npx flutterbridge
# or
bunx flutterbridge  # Faster
```

For CI/CD:
```bash
# Use npm for maximum compatibility
npm install -g flutterbridge
```

## Troubleshooting

### "command not found: flutterbridge"

After global installation, if the command is not found:

**npm:**
```bash
# Check npm global bin path
npm config get prefix
# Add to PATH: export PATH="$PATH:$(npm config get prefix)/bin"
```

**pnpm:**
```bash
# Check pnpm global bin path
pnpm bin -g
# Add to PATH: export PATH="$PATH:$(pnpm bin -g)"
```

**bun:**
```bash
# Check bun global bin path
bun pm bin -g
# Add to PATH: export PATH="$PATH:$(bun pm bin -g)"
```

### Permission errors (Linux/macOS)

```bash
# Option 1: Use package manager's one-time execution
npx flutterbridge
pnpm dlx flutterbridge
bunx flutterbridge

# Option 2: Fix npm permissions
# https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally
```

## Notes

- The `packageManager` field in `package.json` is optional and doesn't restrict usage
- All package managers install from the same npm registry
- Binary execution works identically across all package managers
- Dependencies are resolved the same way (chalk, qrcode-terminal)

## Support

If you encounter issues with a specific package manager, please [open an issue](https://github.com/vaishnavkm/flutterbridge/issues) with:
- Package manager name and version
- Operating system
- Error message
- Steps to reproduce
