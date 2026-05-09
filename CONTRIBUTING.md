# Contributing to FlutterBridge

Thank you for your interest in contributing to FlutterBridge! 🎉

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request:

1. Check if the issue already exists in [GitHub Issues](https://github.com/vaishnavkm/flutterbridge/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Your environment (OS, Node version, Flutter version)

### Submitting Changes

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/flutterbridge.git
   cd flutterbridge
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
   
   Use prefixes:
   - `feature/` for new features
   - `fix/` for bug fixes
   - `docs/` for documentation
   - `refactor/` for code improvements

3. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Keep changes focused and minimal
   - Test your changes thoroughly

4. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```
   
   Use conventional commit format:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `refactor:` for code refactoring
   - `test:` for tests
   - `chore:` for maintenance

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Ensure all checks pass

## Development Setup

### Prerequisites

- Node.js >= 18
- pnpm (recommended) or npm
- Flutter >= 3.0
- Git

### Local Development

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/flutterbridge.git
cd flutterbridge/cli

# Install dependencies
pnpm install

# Test locally in a Flutter project
cd /path/to/your/flutter/project
node /path/to/flutterbridge/cli/index.js
```

## Code Guidelines

- **Minimal code**: Write only what's necessary
- **Clear naming**: Use descriptive variable and function names
- **Error handling**: Provide actionable error messages
- **Comments**: Only when code intent isn't obvious
- **Consistency**: Match existing code style

## Testing

Before submitting:

1. Test with a real Flutter project
2. Test all CLI flags (`--device`, `--qr-only`, `--json`)
3. Test error scenarios (no Flutter, no devices, wrong directory)
4. Verify QR code generation works

## Questions?

Feel free to:
- Open a [GitHub Discussion](https://github.com/vaishnavkm/flutterbridge/discussions)
- Comment on existing issues
- Reach out to the maintainers

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Keep discussions professional

---

Thank you for contributing to FlutterBridge! 🚀
