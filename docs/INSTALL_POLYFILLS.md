# Install Node Polyfills for Browser

The webpack build needs Node.js polyfills for the browser to resolve the `crypto` module error.

## Run this command in your terminal:

```bash
npm install crypto-browserify stream-browserify buffer --legacy-peer-deps
```

## Then restart the dev server:

```bash
pkill -f "expo"
npm start -- --clear
```

Press `w` to open in browser.

## What this fixes:

The error `Can't resolve 'crypto'` happens because `expo-modules-core` tries to use Node's `crypto` module, which doesn't exist in browsers. The polyfills provide browser-compatible versions.

## If npm still has permission issues:

Run this first:
```bash
sudo chown -R $(whoami) "/Users/takawiramundure/.npm"
```

Then run the install command again.

