# Troubleshooting Guide

## Common Issues and Solutions

### Firestore Permission Errors

#### Error: "Missing or insufficient permissions" when saving themes

**Possible Causes:**
1. User document doesn't exist in Firestore `users` collection
2. User's role is not set to 'admin'
3. Firestore rules not deployed

**Solutions:**

1. **Verify User Document Exists:**
   - Go to [Firestore Console](https://console.firebase.google.com/project/aitasol/firestore)
   - Check `users` collection
   - Find document with your User UID (from Authentication)
   - Verify it has `role: "admin"` field

2. **Create/Update User Document:**
   ```bash
   # Get your User UID from Firebase Authentication console
   # Then run:
   node scripts/create-admin-user.js <YOUR_UID> <YOUR_EMAIL>
   ```

3. **Deploy Firestore Rules:**
   ```bash
   firebase deploy --only firestore:rules --project aitasol
   ```

4. **Check Browser Console:**
   - Open browser DevTools (F12)
   - Check Console tab for detailed error messages
   - Look for authentication or permission errors

### Navigation Issues

#### Error: "Cannot read properties of undefined (reading 'isReady')"

**Solution:** This happens when using `expo-router`'s `useRouter` in a React Navigation app. All navigation has been updated to use `window.location.href` for web.

### Theme Not Loading

#### Theme colors not applying

**Solutions:**
1. Initialize default theme:
   ```bash
   node scripts/init-theme.js
   ```

2. Check if theme exists in Firestore:
   - Go to Firestore Console
   - Check `themes` collection
   - Verify one theme has `isActive: true`

3. Refresh browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### Authentication Issues

#### Can't login or user role not recognized

**Solutions:**
1. Verify user exists in Authentication:
   - [Firebase Authentication](https://console.firebase.google.com/project/aitasol/authentication/users)

2. Verify user document in Firestore:
   - Document ID must match User UID exactly
   - Must have `role: "admin"` or `role: "editor"` field

3. Check Firestore rules are deployed

### Build Errors

#### Babel or Webpack errors

**Solutions:**
1. Clear cache:
   ```bash
   rm -rf .expo node_modules/.cache .metro web-build
   npm start -- --clear
   ```

2. Reinstall dependencies:
   ```bash
   rm -rf node_modules package-lock.json
   npm install --legacy-peer-deps
   ```

## Getting Help

1. Check browser console for detailed errors
2. Check Firebase Console for Firestore/Auth issues
3. Verify all environment variables are set
4. Review relevant documentation in `/docs` folder

