# Setup Guide

This guide will help you set up the Aitasol Education Consultancy website from scratch.

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable the following services:

### Authentication
- Go to Authentication > Sign-in method
- Enable "Email/Password" provider

### Firestore Database
- Go to Firestore Database
- Create database in production mode
- Copy the security rules from `firestore.rules` file

### Storage
- Go to Storage
- Get started (use default rules)
- Copy the security rules from `storage.rules` file

### Get Firebase Config
- Go to Project Settings > General
- Scroll to "Your apps" section
- Click the web icon (`</>`) to add a web app
- Copy the Firebase configuration object

## Step 3: Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Replace the values with your Firebase configuration.

## Step 4: Initialize Firestore Data

You need to create initial data in Firestore:

### Create Home Page

1. Go to Firestore Database
2. Create a collection named `pages`
3. Add a document with ID `home` (or any ID, but slug must be "home"):
   ```json
   {
     "slug": "home",
     "title": "Home",
     "published": true,
     "sections": [
       {
         "id": "hero-heading",
         "type": "heading",
         "content": "Welcome to Aitasol Education Consultancy",
         "editable": true
       },
       {
         "id": "hero-text",
         "type": "paragraph",
         "content": "We help students achieve their educational goals with expert guidance and support.",
         "editable": true
       },
       {
         "id": "hero-image",
         "type": "image",
         "content": "",
         "editable": true,
         "metadata": {
           "imageUrl": "https://via.placeholder.com/1200x600",
           "imageAlt": "Education consultancy"
         }
       },
       {
         "id": "cta-section",
         "type": "cta",
         "content": "",
         "editable": true,
         "metadata": {
           "ctaText": "Get Started",
           "ctaLink": "/contact"
         }
       }
     ],
     "createdAt": [Firestore Timestamp],
     "updatedAt": [Firestore Timestamp]
   }
   ```

### Create First Admin User

1. Go to Authentication
2. Add a user manually with email and password, OR
3. Use the sign-up function in the app, then:
   - Go to Firestore Database
   - Create a collection named `users`
   - Add a document with the user's UID (from Authentication)
   - Set the data:
     ```json
     {
       "email": "admin@example.com",
       "role": "admin",
       "createdAt": [Firestore Timestamp],
       "updatedAt": [Firestore Timestamp]
     }
     ```

## Step 5: Run Development Server

```bash
npm start
```

Then press `w` to open in web browser, or visit `http://localhost:8081` (or the port shown).

## Step 6: Test the Application

1. Visit the home page - you should see the content from Firestore
2. Log in with your admin credentials
3. Try editing content inline (click on text/images)
4. Create a blog post from the admin dashboard
5. Test publishing/unpublishing blogs

## Step 7: Build for Production

```bash
npm run build
```

This creates a `web-build` directory with static files ready for Netlify.

## Step 8: Deploy to Netlify

1. Push your code to GitHub/GitLab
2. Go to [Netlify](https://www.netlify.com/)
3. Click "New site from Git"
4. Connect your repository
5. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `web-build`
6. Add environment variables in Site settings > Environment variables
7. Deploy!

## Troubleshooting

### Firebase Connection Issues
- Check that all environment variables are set correctly
- Verify Firebase project settings
- Check browser console for errors

### Authentication Not Working
- Ensure Email/Password provider is enabled in Firebase
- Check Firestore security rules allow user creation
- Verify user document exists in `users` collection

### Images Not Uploading
- Check Storage security rules
- Verify Storage is enabled in Firebase
- Check browser console for errors

### Build Errors
- Run `npm install` again
- Clear `.expo` and `node_modules` directories
- Check TypeScript errors: `npm run type-check`

## Next Steps

- Customize the design and branding
- Add more page templates
- Implement contact forms
- Add SEO metadata
- Set up analytics

