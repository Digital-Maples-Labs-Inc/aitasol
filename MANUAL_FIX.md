# Manual Fixes Required

## Issue 1: NPM Permission Error

Your npm cache has root-owned files. Run this in your terminal:

```bash
sudo chown -R 501:20 "/Users/takawiramundure/.npm"
```

Enter your password when prompted.

## Issue 2: Install Missing Packages

After fixing npm permissions, install the missing packages:

```bash
npm install expo-constants expo-linking --legacy-peer-deps
```

## Issue 3: Environment Variables Not Loading

Your `.env` file exists but the variables aren't being loaded. 

### Check your .env file:

```bash
cat .env
```

It should contain:

```
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyCdX3vU1OcZuCR7dnC8iO0RKfbkkv85eh8
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=aitasol.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=aitasol
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=aitasol.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=354974090060
EXPO_PUBLIC_FIREBASE_APP_ID=1:354974090060:web:310820541a6dba422c85e9
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=G-EJ210D5KMM
```

### If the file is empty or incorrect, recreate it:

```bash
cat > .env << 'EOF'
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyCdX3vU1OcZuCR7dnC8iO0RKfbkkv85eh8
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=aitasol.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=aitasol
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=aitasol.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=354974090060
EXPO_PUBLIC_FIREBASE_APP_ID=1:354974090060:web:310820541a6dba422c85e9
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=G-EJ210D5KMM
EOF
```

## Issue 4: Restart Development Server

After fixing the above:

```bash
# Stop all Expo processes
pkill -f "expo"

# Clear all caches
rm -rf .expo node_modules/.cache .metro web-build

# Start fresh
npm start -- --clear
```

Then press `w` to open in web browser.

## Summary of Steps

1. Fix npm permissions (requires sudo password)
2. Install missing packages
3. Verify/recreate .env file
4. Restart development server
5. Test in browser

## Expected Result

After these fixes:
- No more "invalid-api-key" error
- No more "Can't resolve expo-constants/expo-linking" errors
- Web app should load successfully

