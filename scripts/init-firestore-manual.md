# Manual Firestore Initialization Guide

Since we're using local assets instead of Firebase Storage, here's how to set up Firestore manually:

## Step 1: Set up Firestore Rules

The rules are already in `firestore.rules`. Deploy them:

```bash
firebase deploy --only firestore:rules
```

## Step 2: Create Initial Pages in Firestore Console

Go to [Firebase Console](https://console.firebase.google.com/project/aitasol/firestore) and create:

### Collection: `pages`

#### Document: `home`
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
        "imageUrl": "/assets/placeholder-hero.jpg",
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
  "seoTitle": "Aitasol Education Consultancy - Expert Educational Guidance",
  "seoDescription": "Professional education consultancy services",
  "createdAt": [Firestore Timestamp - use server timestamp],
  "updatedAt": [Firestore Timestamp - use server timestamp]
}
```

#### Document: `about`
```json
{
  "slug": "about",
  "title": "About Us",
  "published": true,
  "sections": [
    {
      "id": "about-heading",
      "type": "heading",
      "content": "About Aitasol",
      "editable": true
    },
    {
      "id": "about-text",
      "type": "paragraph",
      "content": "We are dedicated to helping students navigate their educational journey.",
      "editable": true
    }
  ],
  "createdAt": [Firestore Timestamp],
  "updatedAt": [Firestore Timestamp]
}
```

## Step 3: Create Admin User

1. Go to [Authentication](https://console.firebase.google.com/project/aitasol/authentication/users)
2. Add a user with email/password
3. Note the User UID

4. Go to Firestore and create collection `users`
5. Add document with the UID as document ID:
```json
{
  "email": "admin@example.com",
  "role": "admin",
  "createdAt": [Firestore Timestamp],
  "updatedAt": [Firestore Timestamp]
}
```

## Step 4: Add Images to Assets Folder

Place images in `assets/` folder:
- `assets/placeholder-hero.jpg`
- `assets/logo.png`
- Any other images you want to use

Reference them in Firestore as `/assets/filename.jpg`

## Step 5: Test

1. Start dev server: `npm start`
2. Go to `/login`
3. Sign in with admin credentials
4. You should see the home page with editable content!

