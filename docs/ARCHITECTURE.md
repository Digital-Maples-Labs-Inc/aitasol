# Architecture Documentation

## Overview

This is a full-stack education consultancy website built with React Native Web, enabling a modern CMS-like experience with inline editing capabilities.

## Architecture Decisions

### Frontend Framework
- **React Native with Expo**: Enables code sharing between web and mobile
- **React Native Web**: Renders React Native components as web components
- **TypeScript**: Type safety throughout the codebase
- **NativeWind**: Tailwind CSS for React Native styling

### Backend Services
- **Firebase Authentication**: User authentication and authorization
- **Firestore**: NoSQL database for pages, blogs, and user data
- **Firebase Storage**: Image and media file storage

### Hosting
- **Netlify**: Static site hosting with CDN
- **Build Process**: Expo exports web build to static files

## Key Features

### 1. Inline Content Editing
- Editable components (`EditableText`, `EditableImage`) detect user role
- Visual indicators (edit icons) show editable areas
- Modal-based editing interface
- Real-time updates to Firestore

### 2. Role-Based Access Control
- **Admin**: Full access, user management
- **Editor**: Content editing only
- Protected routes using `useRequireAuth` hook
- Firestore security rules enforce permissions

### 3. Content Management
- Pages: Dynamic sections (heading, paragraph, image, CTA)
- Blogs: Rich text content with publish/unpublish workflow
- Media: Image upload with compression

### 4. Public Website
- Firestore-driven content (no hardcoded text)
- SEO-friendly structure
- Responsive design

## File Structure

```
src/
├── components/          # Reusable UI components
│   ├── EditableText.tsx    # Inline text editor
│   ├── EditableImage.tsx   # Inline image editor
│   ├── Layout.tsx          # Page layout wrapper
│   └── RichTextEditor.tsx  # Blog content editor
│
├── contexts/           # React contexts
│   └── AuthContext.tsx     # Authentication state
│
├── hooks/              # Custom React hooks
│   └── useRequireAuth.ts   # Route protection
│
├── screens/           # Screen components
│   ├── HomeScreen.tsx
│   ├── BlogListScreen.tsx
│   ├── BlogDetailScreen.tsx
│   ├── LoginScreen.tsx
│   ├── AdminDashboardScreen.tsx
│   ├── AdminPagesScreen.tsx
│   └── AdminBlogsScreen.tsx
│
├── services/          # Firebase services
│   ├── firebase.ts         # Firebase initialization
│   ├── authService.ts      # Authentication operations
│   ├── pageService.ts      # Page CRUD operations
│   ├── blogService.ts      # Blog CRUD operations
│   └── storageService.ts   # Image upload/management
│
├── types/             # TypeScript definitions
│   └── index.ts
│
└── utils/             # Utility functions
    └── slugify.ts
```

## Data Flow

### Content Editing Flow
1. User (admin/editor) clicks editable element
2. Component detects role and shows edit indicator
3. Modal opens with current content
4. User edits content
5. `onSave` callback updates Firestore
6. Component re-fetches data to show updates

### Authentication Flow
1. User signs in via `LoginScreen`
2. `authService.signIn` authenticates with Firebase
3. User document fetched from Firestore
4. `AuthContext` updates with user data
5. Protected routes check authentication
6. UI updates based on user role

### Blog Publishing Flow
1. Editor creates blog in admin dashboard
2. Blog saved as "draft" status
3. Editor can preview draft
4. Editor publishes blog (status → "published")
5. Published blogs appear in public blog list
6. Only published blogs visible to public

## Security

### Firestore Rules
- Pages: Public read, authenticated write (editors+)
- Blogs: Public read (published only), authenticated write
- Users: Read own, admin write only

### Storage Rules
- Images: Public read, authenticated write (editors+)
- File size limit: 10MB
- Content type validation: images only

### Client-Side Protection
- Route guards using `useRequireAuth`
- Role checks in components
- API calls validate user permissions

## Performance Optimizations

1. **Static Generation**: Expo exports static HTML/CSS/JS
2. **Image Compression**: Client-side compression before upload
3. **Lazy Loading**: Components load on demand
4. **CDN Delivery**: Netlify CDN serves static assets
5. **Firestore Indexing**: Queries optimized with indexes

## Scalability Considerations

### Current Limitations
- Single Firestore database (consider sharding for very large datasets)
- Client-side image compression (consider server-side for better performance)
- No caching layer (consider adding Redis/CDN caching)

### Future Enhancements
- Server-side rendering (SSR) for better SEO
- Image CDN integration
- Content versioning/history
- Multi-language support
- Advanced search functionality

## Development Workflow

1. **Local Development**
   ```bash
   npm start
   npm run web
   ```

2. **Type Checking**
   ```bash
   npm run type-check
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Deploy**
   - Push to Git
   - Netlify auto-deploys
   - Or manually deploy `web-build` folder

## Testing Strategy

### Manual Testing Checklist
- [ ] User authentication (sign in/out)
- [ ] Role-based access (admin vs editor)
- [ ] Inline text editing
- [ ] Image upload and replacement
- [ ] Blog creation and publishing
- [ ] Page content updates
- [ ] Public page rendering
- [ ] Mobile responsiveness

### Future: Automated Testing
- Unit tests for services
- Component tests for editable components
- Integration tests for auth flow
- E2E tests for content editing

## Known Limitations

1. **Rich Text Editor**: Currently basic - consider integrating react-quill or draft-js
2. **Image Picker**: Web-only implementation - mobile needs expo-image-picker
3. **Routing**: Using React Navigation - consider migrating to Expo Router fully
4. **Error Handling**: Basic error handling - add comprehensive error boundaries
5. **Loading States**: Some screens lack loading indicators

## Migration Notes

### From React Navigation to Expo Router
The codebase includes both:
- `App.tsx` with React Navigation (current)
- `app/` directory with Expo Router (alternative)

Choose one approach:
- **React Navigation**: More control, manual route setup
- **Expo Router**: File-based routing, easier navigation

## Support & Maintenance

### Regular Tasks
- Monitor Firebase usage and costs
- Review and update security rules
- Backup Firestore data regularly
- Update dependencies monthly
- Review and optimize images

### Monitoring
- Firebase Console: Usage, errors, performance
- Netlify Analytics: Traffic, build times
- Browser Console: Client-side errors

