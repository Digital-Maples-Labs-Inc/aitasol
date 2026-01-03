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
| `seoTitle` | string | `AitahSolutions Educational Consultancy - Clear Guidance for Global Education Decisions` |
| `seoDescription` | string | `AitahSolutions Educational Consultancy supports students in making informed, ethical, and realistic decisions about studying abroad. Since 2019, we have guided students through program selection, applications, documentation, funding awareness, and pre-departure preparation.` |
| `createdAt` | timestamp | Click "timestamp" → "server timestamp" |
| `updatedAt` | timestamp | Click "timestamp" → "server timestamp" |

**For the `sections` array**, click "Add field" → Type: `array`, then add these items:

**Item 1:**
- Type: `map`
- Fields:
  - `id`: string → `company-name`
  - `type`: string → `heading`
  - `content`: string → `AitahSolutions Educational Consultancy`
  - `editable`: boolean → `true`

**Item 2:**
- Type: `map`
- Fields:
  - `id`: string → `year-founded`
  - `type`: string → `paragraph`
  - `content`: string → `Year Founded: 2019`
  - `editable`: boolean → `true`

**Item 3:**
- Type: `map`
- Fields:
  - `id`: string → `main-heading`
  - `type`: string → `heading`
  - `content`: string → `Clear Guidance for Global Education Decisions`
  - `editable`: boolean → `true`

**Item 4:**
- Type: `map`
- Fields:
  - `id`: string → `main-description`
  - `type`: string → `paragraph`
  - `content`: string → `AitahSolutions Educational Consultancy supports students in making informed, ethical, and realistic decisions about studying abroad. Since 2019, we have guided students through program selection, applications, documentation, funding awareness, and pre-departure preparation with clarity and integrity.`
  - `editable`: boolean → `true`

**Item 5:**
- Type: `map`
- Fields:
  - `id`: string → `philosophy-text`
  - `type`: string → `paragraph`
  - `content`: string → `We understand that international education is a major financial and life decision. Our role is not to sell opportunities, but to help students evaluate them critically — based on academic readiness, financial sustainability, and long-term career alignment.`
  - `editable`: boolean → `true`

**Item 6:**
- Type: `map`
- Fields:
  - `id`: string → `partnership-text`
  - `type`: string → `paragraph`
  - `content`: string → `We work with established education platforms and professional partners while remaining independent in our advice. Admissions decisions, visas, and funding outcomes are never guaranteed; informed decision-making is.`
  - `editable`: boolean → `true`

**Item 7:**
- Type: `map`
- Fields:
  - `id`: string → `what-we-do-heading`
  - `type`: string → `heading`
  - `content`: string → `What We Do`
  - `editable`: boolean → `true`

**Item 8:**
- Type: `map`
- Fields:
  - `id`: string → `services-list`
  - `type`: string → `paragraph`
  - `content`: string → `• Match students with suitable programs and institutions\n• Support accurate and compliant application processes\n• Guide admissions documentation preparation\n• Provide scholarship and funding information\n• Offer career counselling and pathway planning\n• Coordinate pre-arrival and settlement support`
  - `editable`: boolean → `true`

**Item 9:**
- Type: `map`
- Fields:
  - `id`: string → `tagline`
  - `type`: string → `paragraph`
  - `content`: string → `📌 Ethical guidance. Transparent processes. Student-centered outcomes.`
  - `editable`: boolean → `true`

**Item 10:**
- Type: `map`
- Fields:
  - `id`: string → `cta-section`
  - `type`: string → `cta`
  - `content`: string → (leave empty)
  - `editable`: boolean → `true`
  - `metadata`: map →
    - `ctaText`: string → `👉 Book a Consultation`
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

