# Publishing Guide

This guide is for maintainers who want to publish FlutterBridge CLI to npm.

## Prerequisites

1. npm account (create at https://www.npmjs.com/signup)
2. npm CLI installed (`npm --version`)
3. Logged in to npm (`npm login`)

## Pre-publish Checklist

- [ ] All tests pass
- [ ] Version number updated in `package.json`
- [ ] CHANGELOG updated (if exists)
- [ ] README is up to date
- [ ] No sensitive data in code
- [ ] `index.js` has proper shebang (`#!/usr/bin/env node`)

## Publishing Steps

### 1. Navigate to CLI directory

```bash
cd cli
```

### 2. Test the package locally

```bash
# Install dependencies
pnpm install

# Test in a Flutter project
cd /path/to/test/flutter/project
node /path/to/flutterbridge/cli/index.js
```

### 3. Verify package contents

```bash
npm pack --dry-run
```

This shows what files will be included in the package.

### 4. Publish to npm

```bash
# For first release or major updates
npm publish

# For beta/alpha releases
npm publish --tag beta
```

### 5. Verify publication

```bash
# Check on npm
npm view flutterbridge

# Test installation
npx flutterbridge@latest --help
```

## Version Management

Follow semantic versioning (semver):

- **Patch** (0.1.0 → 0.1.1): Bug fixes
- **Minor** (0.1.0 → 0.2.0): New features, backward compatible
- **Major** (0.1.0 → 1.0.0): Breaking changes

Update version:

```bash
npm version patch   # 0.1.0 → 0.1.1
npm version minor   # 0.1.0 → 0.2.0
npm version major   # 0.1.0 → 1.0.0
```

## Unpublishing (Emergency Only)

```bash
# Unpublish specific version (within 72 hours)
npm unpublish flutterbridge@0.1.0

# Deprecate instead (recommended)
npm deprecate flutterbridge@0.1.0 "Use version 0.1.1 instead"
```

## Troubleshooting

### "Package name already exists"
The name `flutterbridge` might be taken. Try:
- `@yourusername/flutterbridge` (scoped package)
- Alternative names: `flutter-bridge-cli`, `flutterbridge-dev`

### "Permission denied"
Ensure you're logged in: `npm login`

### "Version already published"
Update version in `package.json` before publishing.

## Post-publish

1. Create a git tag:
   ```bash
   git tag v0.1.0
   git push origin v0.1.0
   ```

2. Create GitHub release with changelog

3. Announce on social media / Flutter community

## Resources

- npm documentation: https://docs.npmjs.com/
- Semantic versioning: https://semver.org/
- npm package best practices: https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry
