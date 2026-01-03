# Create Initial Firestore Data

## Quick Setup Guide

### Step 1: Go to Firestore Console
https://console.firebase.google.com/project/aitasol/firestore

### Step 2: Create Pages Collection

Click "Start collection" and create:

**Collection ID**: `pages`

#### Document 1: `home`
Click "Add document" with ID `home`, then add these fields:

| Field | Type | Value |
|-------|------|-------|
| `slug` | string | `home` |
| `title` | string | `Home` |
| `published` | boolean | `true` |
| `sections` | array | See below |
| `seoTitle` | string | `Aitasol Education Consultancy - Expert Educational Guidance` |
| `seoDescription` | string | `Professional education consultancy services to help students achieve their academic goals.` |
| `createdAt` | timestamp | Click "timestamp" → "server timestamp" |
| `updatedAt` | timestamp | Click "timestamp" → "server timestamp" |

**For the `sections` array**, click "Add field" → Type: `array`, then add these items:

**Item 1:**
- Type: `map`
- Fields:
  - `id`: string → `hero-heading`
  - `type`: string → `heading`
  - `content`: string → `Welcome to Aitasol Education Consultancy`
  - `editable`: boolean → `true`

**Item 2:**
- Type: `map`
- Fields:
  - `id`: string → `hero-text`
  - `type`: string → `paragraph`
  - `content`: string → `We help students achieve their educational goals with expert guidance and support.`
  - `editable`: boolean → `true`

**Item 3:**
- Type: `map`
- Fields:
  - `id`: string → `hero-image`
  - `type`: string → `image`
  - `content`: string → (leave empty)
  - `editable`: boolean → `true`
  - `metadata`: map → 
    - `imageUrl`: string → `/assets/images/hero-placeholder.jpg`
    - `imageAlt`: string → `Education consultancy`

**Item 4:**
- Type: `map`
- Fields:
  - `id`: string → `cta-section`
  - `type`: string → `cta`
  - `content`: string → (leave empty)
  - `editable`: boolean → `true`
  - `metadata`: map →
    - `ctaText`: string → `Get Started`
    - `ctaLink`: string → `/contact`

#### Document 2: `about`
Create another document with ID `about`:

| Field | Type | Value |
|-------|------|-------|
| `slug` | string | `about` |
| `title` | string | `About Us` |
| `published` | boolean | `true` |
| `sections` | array | See below |
| `createdAt` | timestamp | server timestamp |
| `updatedAt` | timestamp | server timestamp |

**Sections array for about page:**

**Item 1:**
- `id`: `about-heading`
- `type`: `heading`
- `content`: `About Aitasol`
- `editable`: `true`

**Item 2:**
- `id`: `about-text`
- `type`: `paragraph`
- `content`: `We are dedicated to helping students navigate their educational journey with expert guidance and personalized support.`
- `editable`: `true`

### Step 3: Create Admin User

1. **Go to Authentication**: https://console.firebase.google.com/project/aitasol/authentication/users
2. Click "Add user"
3. Enter email and password (remember these!)
4. Click "Add user"
5. **Copy the User UID** (you'll need this)

6. **Go back to Firestore**
7. Create collection: `users`
8. Add document with the **UID as the document ID**
9. Add fields:
   - `email`: string → (your email)
   - `role`: string → `admin`
   - `createdAt`: timestamp → server timestamp
   - `updatedAt`: timestamp → server timestamp

### Step 4: Add Placeholder Images

Create placeholder images in `public/assets/images/`:

```bash
# You can use any image files, or create simple placeholders
# For now, the app will work without images (they'll just show broken image icons)
```

### Step 5: Test!

1. Start dev server: `npm start`
2. Press `w` for web
3. You should see the home page!
4. Go to `/login` and sign in with your admin credentials
5. You should be able to edit content inline!

## Troubleshooting

- **"Page not found"**: Make sure you created the `home` page with slug `home`
- **Can't login**: Check that you created the user document in Firestore with the correct UID
- **No content showing**: Verify the sections array is properly formatted

