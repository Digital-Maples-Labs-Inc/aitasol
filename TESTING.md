# Local Testing Guide

## Quick Start

### 1. Start Development Server

```bash
npm start
```

Then press `w` to open in web browser, or visit the URL shown in the terminal.

### 2. Test the Application

#### A. Public Pages
- **Home Page**: Should load content from Firestore
- **Blog List**: Should show published blog posts
- **Blog Detail**: Click on a blog to see full content

#### B. Authentication
- **Login**: Go to `/login` and sign in with admin credentials
- **Protected Routes**: Try accessing `/admin/dashboard` without login (should redirect)

#### C. Admin Features (after login)
- **Dashboard**: View admin dashboard
- **Manage Pages**: Edit page content
- **Manage Blogs**: Create, edit, publish blogs
- **Inline Editing**: Click on editable text/images to edit

### 3. Test Build Locally

```bash
# This is what Netlify will run
npm run build
```

**Note**: Currently there's a Babel configuration issue with the build. The dev server works fine, but the production build needs fixing.

## Common Issues

### Build Error: Babel Plugin Issue
If you see `.plugins is not a valid Plugin property`:
- This is a known issue with Expo 51 + webpack-config compatibility
- Dev server works fine
- We're working on a fix

### Firebase Connection Issues
- Check `.env` file exists and has correct values
- Verify Firebase project is set up correctly
- Check browser console for Firebase errors

### Port Already in Use
```bash
# Kill existing Expo processes
pkill -f "expo start"
# Or use a different port
npm start -- --port 8082
```

## Next Steps After Local Testing

1. ✅ Verify dev server works
2. ⚠️ Fix build command (Babel issue)
3. ✅ Test Firebase connection
4. ✅ Test authentication
5. ✅ Test content editing (if you have Firestore data)

## Testing Checklist

- [ ] Dev server starts without errors
- [ ] Home page loads
- [ ] Firebase connection works (check console)
- [ ] Login page accessible
- [ ] Can sign in (if user exists in Firestore)
- [ ] Admin dashboard accessible after login
- [ ] Can view pages/blogs (if data exists)
- [ ] Build command works (currently has issues)

