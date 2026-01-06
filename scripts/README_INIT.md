# Firebase Initialization Scripts

This directory contains scripts to initialize Firebase collections with default data.

## Prerequisites

1. Firebase Admin SDK service account key
   - Download from Firebase Console > Project Settings > Service Accounts
   - Save as `firebase-service-account.json` in the root directory
   - Or set `FIREBASE_SERVICE_ACCOUNT_PATH` environment variable

2. Install dependencies:
   ```bash
   npm install
   ```

## Scripts

### 1. Initialize Pages (`init-pages.js`)

Creates all pages from the sitemap in the Firebase `pages` collection.

**Usage:**
```bash
node scripts/init-pages.js
```

**What it does:**
- Creates pages for: home, about, services, study-in-canada, immigration-study-permits, admissions-support, career-counseling, testimonials, blog, contact
- Each page includes slug, title, SEO metadata, and published status
- Pages are created with empty sections array (to be filled via admin dashboard)

### 2. Initialize Blog Posts (`init-blog-posts.js`)

Creates sample blog posts in the Firebase `blogs` collection.

**Usage:**
```bash
node scripts/init-blog-posts.js
```

**What it does:**
- Creates 10 sample blog posts with various categories (Engineering, Product, Design, Company)
- Each post includes title, slug, content, excerpt, author, tags, and featured image
- All posts are set to `published` status
- Skips posts that already exist (based on slug)

## Running All Scripts

To initialize everything:

```bash
# Initialize pages
node scripts/init-pages.js

# Initialize blog posts
node scripts/init-blog-posts.js
```

## Notes

- Scripts are idempotent - safe to run multiple times
- Existing documents are skipped (won't overwrite)
- All timestamps are set using Firebase server timestamps
- Blog posts will automatically sync to the frontend via real-time listeners

## Troubleshooting

**Error: "Error loading service account"**
- Make sure `firebase-service-account.json` exists in the root directory
- Or set `FIREBASE_SERVICE_ACCOUNT_PATH` environment variable

**Error: "Permission denied"**
- Check that your service account has Firestore write permissions
- Verify the service account key is valid

**Error: "Collection not found"**
- Firestore collections are created automatically on first write
- No need to create collections manually

