# Quick Start: Add Missing Pages to Firebase

## Option 1: Automatic (Recommended)

1. **Get Service Account Key:**
   - Go to: https://console.firebase.google.com/project/aitasol/settings/serviceaccounts/adminsdk
   - Click **"Generate new private key"**
   - Save the downloaded JSON file as `firebase-service-account.json` in the project root

2. **Run the script:**
   ```bash
   node scripts/add-pages-final.js
   ```

That's it! The script will add all 6 missing pages automatically.

## Option 2: Manual (If you prefer)

See `scripts/ADD_PAGES_MANUAL.md` for step-by-step instructions to add pages via Firebase Console.

## Missing Pages

The script will add these 6 pages:
- ✅ study-in-canada
- ✅ immigration-study-permits  
- ✅ admissions-support
- ✅ career-counseling
- ✅ testimonials
- ✅ blog

## After Running

You should have all 10 pages in Firestore:
- home
- about
- services
- contact
- study-in-canada
- immigration-study-permits
- admissions-support
- career-counseling
- testimonials
- blog

