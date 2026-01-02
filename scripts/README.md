# Firestore Initialization Scripts

## Quick Start (Recommended)

### Step 1: Get Service Account Key

1. Go to: https://console.firebase.google.com/project/aitasol/settings/serviceaccounts/adminsdk
2. Click **"Generate new private key"**
3. Save the downloaded JSON file as `serviceAccountKey.json` in the project root
4. **Important**: This file is in `.gitignore` and won't be committed

### Step 2: Initialize Firestore Data

```bash
node scripts/init-firestore-with-service-account.js
```

This will create:
- ✅ Home page
- ✅ About page
- ✅ Services page
- ✅ Contact page

### Step 3: Create Admin User

1. **Create user in Authentication:**
   - Go to: https://console.firebase.google.com/project/aitasol/authentication/users
   - Click "Add user"
   - Enter email and password
   - **Copy the User UID**

2. **Create user document in Firestore:**
   ```bash
   node scripts/create-admin-user.js <USER_UID> <EMAIL>
   ```
   
   Example:
   ```bash
   node scripts/create-admin-user.js abc123xyz admin@example.com
   ```

### Step 4: Test!

```bash
npm start
# Press 'w' for web
# Go to /login and sign in
```

## Available Scripts

### `init-firestore-with-service-account.js`
- **Requires**: `serviceAccountKey.json`
- **Creates**: Initial pages (home, about, services, contact)
- **Usage**: `node scripts/init-firestore-with-service-account.js`

### `create-admin-user.js`
- **Requires**: `serviceAccountKey.json` and User UID from Authentication
- **Creates**: Admin user document in Firestore
- **Usage**: `node scripts/create-admin-user.js <UID> <EMAIL>`

## Alternative: Manual Setup

If you prefer to set up Firestore manually through the console, see:
- `create-initial-data.md` - Step-by-step manual guide

## Security Note

⚠️ **Never commit `serviceAccountKey.json` to Git!**
- It's already in `.gitignore`
- Keep it secure and private
- Regenerate if accidentally exposed

