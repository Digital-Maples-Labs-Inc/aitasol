# Setup Checklist

## ✅ Completed Steps

- [x] Firebase CLI connected
- [x] Firestore rules deployed
- [x] Local assets configured
- [x] Babel config fixed
- [x] Environment variables set

## 📋 Next Steps to Complete

### 1. Initialize Firestore Data (Required)

Follow the detailed guide: `scripts/create-initial-data.md`

**Quick summary:**
1. Go to [Firestore Console](https://console.firebase.google.com/project/aitasol/firestore)
2. Create `pages` collection with `home` document
3. Create admin user in Authentication
4. Create `users` collection with admin user document

**Time needed:** ~10 minutes

### 2. Test the Application

```bash
# Start dev server
npm start

# Press 'w' for web
# Or visit the URL shown
```

**What to test:**
- [ ] Home page loads
- [ ] Can see content from Firestore
- [ ] Login page accessible
- [ ] Can sign in with admin credentials
- [ ] Admin dashboard accessible
- [ ] Can edit content inline

### 3. Add Images (Optional)

Place images in `public/assets/images/`:
- Hero images
- Logo
- Any content images

### 4. Deploy to Netlify (When Ready)

1. Push to GitHub (already done)
2. Netlify will auto-deploy
3. Verify environment variables are set in Netlify
4. Test live site

## 🚨 Common Issues

### "Page not found"
- **Solution**: Create the `home` page in Firestore with slug `home`

### "Cannot login"
- **Solution**: Verify user document exists in Firestore with correct UID and role

### "Blank screen"
- **Solution**: Check browser console for errors, verify `.env` file exists

### "Firebase connection error"
- **Solution**: Verify all environment variables are set correctly

## 📚 Resources

- Firestore Console: https://console.firebase.google.com/project/aitasol/firestore
- Authentication: https://console.firebase.google.com/project/aitasol/authentication
- Setup Guide: `scripts/create-initial-data.md`
- Firebase Setup: `FIREBASE_SETUP.md`

