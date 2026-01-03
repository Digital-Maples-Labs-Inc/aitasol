# MVP Next Steps - Action Plan

## ✅ Completed
- [x] Authentication system working
- [x] Admin dashboard accessible
- [x] Login page functional
- [x] Routing configured (`/dmlabs` for login)

## 🎯 Priority 1: Initialize Content (CRITICAL - Do This First!)

### Step 1: Create Home Page in Firestore

**Why:** The public website needs content to display. Without this, visitors see "Page not found".

**How:**
1. Go to [Firestore Console](https://console.firebase.google.com/project/aitasol/firestore)
2. Click "Start collection" → Collection ID: `pages`
3. Click "Add document" → Document ID: `home`
4. Add fields (see detailed guide in `scripts/create-initial-data.md`)

**Quick Fields:**
- `slug`: `home`
- `title`: `Home`
- `published`: `true`
- `sections`: Array with at least:
  - Heading: "Welcome to Aitasol Education Consultancy"
  - Paragraph: "We help students achieve their educational goals..."
  - CTA button: "Get Started"

**Detailed Instructions:** See `scripts/create-initial-data.md` for complete field structure.

### Step 2: Verify Your Admin User

**Check:**
1. Go to [Firebase Authentication](https://console.firebase.google.com/project/aitasol/authentication/users)
2. Verify your user exists
3. Go to Firestore → `users` collection
4. Verify your user document has `role: "admin"`

**If missing:** Create a user document with your UID as document ID and `role: "admin"`

## 🎯 Priority 2: Test Core Features

### Step 3: Test Inline Editing

1. Go to home page (`/`)
2. You should see edit icons (✏️) on text and images (if logged in as admin)
3. Click on editable content
4. Edit and save
5. Verify changes appear immediately

### Step 4: Test Page Management

1. Go to Admin Dashboard → "Manage Pages"
2. Click "Edit" on the home page
3. Test adding/removing sections
4. Test editing content inline

## 🎯 Priority 3: Add Essential Pages

### Step 5: Create Additional Pages

Create these pages in Firestore (same structure as home):

1. **About Page** (`about`)
   - Heading: "About Aitasol"
   - Paragraph: About your consultancy
   - Image (optional)

2. **Services Page** (`services`)
   - Heading: "Our Services"
   - List of services
   - CTA buttons

3. **Contact Page** (`contact`)
   - Heading: "Contact Us"
   - Contact information
   - Form (can be added later)

**How:** Use the same structure as home page. See `scripts/create-initial-data.md` for examples.

## 🎯 Priority 4: Blog Management

### Step 6: Test Blog Creation

1. Go to Admin Dashboard → "Manage Blogs"
2. Click "+ New Blog"
3. Create a test blog post
4. Publish it
5. View it on the public blog page (`/blog`)

### Step 7: Create Blog Listing Page

The blog listing page should automatically show published blogs. Test:
- Blog appears in list
- Can click to view detail
- Can edit/publish/unpublish from admin

## 🎯 Priority 5: User Management (Admin Only)

### Step 8: Create Editor Users

1. Go to Admin Dashboard → "Manage Users" (if implemented)
2. Or manually:
   - Create user in Firebase Authentication
   - Create user document in Firestore with `role: "editor"`
3. Test that editors can edit content but can't manage users

## 📋 MVP Completion Checklist

- [ ] Home page content created in Firestore
- [ ] Home page displays correctly on public site
- [ ] Inline editing works on home page
- [ ] Can edit pages from admin dashboard
- [ ] About page created and accessible
- [ ] Services page created and accessible
- [ ] Contact page created and accessible
- [ ] Can create blog posts
- [ ] Can publish/unpublish blogs
- [ ] Blog listing page shows published blogs
- [ ] Blog detail pages work
- [ ] Editor users can be created (admin only)

## 🚀 After MVP: Enhancements

1. **Rich Text Editor** - For blog content (currently basic)
2. **Image Upload** - Currently using local assets, can enhance
3. **Contact Form** - Netlify Functions integration
4. **SEO Metadata** - Edit meta titles/descriptions per page
5. **Analytics** - Google Analytics integration
6. **Multi-language** - If needed

## 📚 Reference Documents

- **Firestore Setup**: `scripts/create-initial-data.md`
- **Firebase Setup**: `FIREBASE_SETUP.md`
- **Architecture**: `ARCHITECTURE.md`
- **Testing**: `TESTING.md`

## 🆘 Quick Troubleshooting

**"Page not found" on home:**
- Check Firestore has `pages` collection with `home` document
- Verify `slug` field is exactly `home`

**Can't see edit icons:**
- Verify you're logged in
- Check user role is `admin` in Firestore

**Changes not saving:**
- Check browser console for errors
- Verify Firestore security rules are deployed

---

**Start with Priority 1** - Create the home page content in Firestore. This is the foundation for everything else!

