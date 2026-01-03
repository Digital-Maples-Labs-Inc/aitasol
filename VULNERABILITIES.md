# Security Vulnerabilities Report

## Summary
- **Total**: 18 vulnerabilities
- **High**: 4
- **Moderate**: 11
- **Low**: 3

## Detailed Breakdown

### 1. **semver** (High Severity)
- **Issue**: Regular Expression Denial of Service (ReDoS)
- **Affected**: `semver@7.0.0 - 7.5.1`
- **Location**: `expo-pwa` → `@expo/image-utils` → `semver`
- **Impact**: Can cause denial of service through regex attacks
- **Fix**: `npm audit fix --force` (⚠️ **BREAKING CHANGE** - will downgrade `@expo/webpack-config` to v18.0.0)

### 2. **send** (High Severity)
- **Issue**: Template injection leading to XSS (Cross-Site Scripting)
- **Affected**: `send < 0.19.0`
- **Location**: `@expo/cli` → `send`
- **Impact**: Potential XSS attacks in development server
- **Fix**: `npm audit fix --force` (⚠️ **BREAKING CHANGE** - will upgrade `expo` to v54.0.30)

### 3. **undici** (Moderate Severity)
- **Issue**: 
  - Insufficiently Random Values
  - Denial of Service via bad certificate data
- **Affected**: `undici@6.0.0 - 6.21.1`
- **Location**: Multiple Firebase packages (`@firebase/auth`, `@firebase/firestore`, `@firebase/storage`, `@firebase/functions`)
- **Impact**: Security and DoS vulnerabilities in HTTP client
- **Fix**: `npm audit fix` (should update automatically)

### 4. **webpack-dev-server** (Moderate Severity)
- **Issue**: Source code may be stolen when accessing malicious websites
- **Affected**: `webpack-dev-server <= 5.2.0`
- **Location**: `@expo/webpack-config` → `webpack-dev-server`
- **Impact**: Only affects development, not production
- **Fix**: `npm audit fix --force` (⚠️ **BREAKING CHANGE** - will downgrade `@expo/webpack-config` to v18.0.0)

## Recommendations

### Safe Fixes (No Breaking Changes)
```bash
npm audit fix
```
This will fix the `undici` vulnerabilities in Firebase packages.

### Breaking Changes (Requires Testing)
```bash
npm audit fix --force
```
⚠️ **WARNING**: This will:
- Downgrade `@expo/webpack-config` from v19.0.1 to v18.0.0
- Upgrade `expo` to v54.0.30 (major version jump from v51)
- May break your current setup

### Recommended Approach

1. **First, fix the safe ones:**
   ```bash
   npm audit fix
   ```

2. **For production deployment:**
   - The `webpack-dev-server` vulnerability only affects development
   - The `send` vulnerability is in the CLI tool, not your app
   - These are **development-only** risks

3. **For the high-severity issues:**
   - Wait for Expo to release compatible updates
   - Or test the breaking changes in a separate branch first

## Risk Assessment

### Low Risk (Development Only)
- `webpack-dev-server` - Only affects local development
- `send` - Only affects Expo CLI, not your deployed app

### Medium Risk
- `undici` - Used by Firebase, but mostly in server-side operations
- Can be fixed with `npm audit fix`

### Higher Risk
- `semver` ReDoS - Could affect build times, but unlikely in practice
- Should be fixed when Expo releases compatible updates

## Current Status

✅ **Safe to deploy**: The vulnerabilities in `webpack-dev-server` and `send` don't affect production builds
⚠️ **Monitor**: Keep an eye on Expo updates for fixes to `semver` and `webpack-dev-server`
✅ **Fixable now**: Run `npm audit fix` to update `undici` in Firebase packages

