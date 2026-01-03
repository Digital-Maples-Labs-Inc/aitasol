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
      "id": "company-name",
      "type": "heading",
      "content": "AitahSolutions Educational Consultancy",
      "editable": true
    },
    {
      "id": "year-founded",
      "type": "paragraph",
      "content": "Year Founded: 2019",
      "editable": true
    },
    {
      "id": "main-heading",
      "type": "heading",
      "content": "Clear Guidance for Global Education Decisions",
      "editable": true
    },
    {
      "id": "main-description",
      "type": "paragraph",
      "content": "AitahSolutions Educational Consultancy supports students in making informed, ethical, and realistic decisions about studying abroad. Since 2019, we have guided students through program selection, applications, documentation, funding awareness, and pre-departure preparation with clarity and integrity.",
      "editable": true
    },
    {
      "id": "philosophy-text",
      "type": "paragraph",
      "content": "We understand that international education is a major financial and life decision. Our role is not to sell opportunities, but to help students evaluate them critically — based on academic readiness, financial sustainability, and long-term career alignment.",
      "editable": true
    },
    {
      "id": "partnership-text",
      "type": "paragraph",
      "content": "We work with established education platforms and professional partners while remaining independent in our advice. Admissions decisions, visas, and funding outcomes are never guaranteed; informed decision-making is.",
      "editable": true
    },
    {
      "id": "what-we-do-heading",
      "type": "heading",
      "content": "What We Do",
      "editable": true
    },
    {
      "id": "services-list",
      "type": "paragraph",
      "content": "• Match students with suitable programs and institutions\n• Support accurate and compliant application processes\n• Guide admissions documentation preparation\n• Provide scholarship and funding information\n• Offer career counselling and pathway planning\n• Coordinate pre-arrival and settlement support",
      "editable": true
    },
    {
      "id": "tagline",
      "type": "paragraph",
      "content": "📌 Ethical guidance. Transparent processes. Student-centered outcomes.",
      "editable": true
    },
    {
      "id": "cta-section",
      "type": "cta",
      "content": "",
      "editable": true,
      "metadata": {
        "ctaText": "👉 Book a Consultation",
        "ctaLink": "/contact"
      }
    }
  ],
  "seoTitle": "AitahSolutions Educational Consultancy - Clear Guidance for Global Education Decisions",
  "seoDescription": "AitahSolutions Educational Consultancy supports students in making informed, ethical, and realistic decisions about studying abroad. Since 2019, we have guided students through program selection, applications, documentation, funding awareness, and pre-departure preparation.",
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

