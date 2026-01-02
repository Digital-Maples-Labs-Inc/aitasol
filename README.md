# Aitasol Education Consultancy Website

A modern, content-editable education consultancy website built with React Native Web, Expo, Firebase, and Netlify.

## Features

- **Public Website**: Home, About, Services, Blog, and Contact pages
- **Inline Content Editing**: Click-to-edit functionality for all text and images
- **Blog Management**: Create, edit, publish, and manage blog posts
- **Role-Based Access**: Admin and Editor roles with different permissions
- **Firebase Backend**: Authentication, Firestore database, and Storage
- **Netlify Deployment**: Optimized for static hosting

## Tech Stack

- **Frontend**: React Native with Expo, React Native Web
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Hosting**: Netlify

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project with Authentication, Firestore, and Storage enabled

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aitasol
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Set up Firebase:
   - Enable Authentication (Email/Password)
   - Create Firestore database
   - Enable Storage
   - Set up Firestore security rules (see `firestore.rules` below)
   - Set up Storage security rules (see `storage.rules` below)

5. Run the development server:
```bash
npm start
```

6. Open in browser:
```bash
npm run web
```

## Firebase Security Rules

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Pages - public read, authenticated write
    match /pages/{pageId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'editor'];
    }
    
    // Blogs - public read published, authenticated write
    match /blogs/{blogId} {
      allow read: if resource.data.status == 'published' || 
        (request.auth != null && 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'editor']);
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'editor'];
    }
    
    // Users - read own, admin write
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && 
        firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.role in ['admin', 'editor'];
    }
  }
}
```

## Project Structure

```
aitasol/
├── src/
│   ├── components/       # Reusable components
│   │   ├── EditableText.tsx
│   │   └── EditableImage.tsx
│   ├── contexts/         # React contexts
│   │   └── AuthContext.tsx
│   ├── hooks/            # Custom hooks
│   │   └── useRequireAuth.ts
│   ├── screens/          # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── BlogListScreen.tsx
│   │   ├── BlogDetailScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── AdminDashboardScreen.tsx
│   │   ├── AdminPagesScreen.tsx
│   │   └── AdminBlogsScreen.tsx
│   ├── services/         # Firebase services
│   │   ├── firebase.ts
│   │   ├── authService.ts
│   │   ├── pageService.ts
│   │   ├── blogService.ts
│   │   └── storageService.ts
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   └── utils/            # Utility functions
│       └── slugify.ts
├── App.tsx               # Main app entry
├── package.json
├── tsconfig.json
├── app.json
├── babel.config.js
├── tailwind.config.js
└── netlify.toml          # Netlify configuration
```

## Building for Production

### Web Build

```bash
npm run build
```

This generates static files in the `web-build` directory.

### Netlify Deployment

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `web-build`
4. Add environment variables in Netlify dashboard
5. Deploy!

## User Roles

### Admin
- Full access to all content
- Can create and manage users
- Can publish/unpublish any content
- Can delete pages and blogs

### Editor
- Can edit text, images, and blogs
- Can create and edit content
- Cannot manage users or system settings

## Creating Initial Content

After setting up Firebase, you'll need to create initial pages in Firestore:

1. Create a `pages` collection
2. Add a document with slug `home`:
   - title: "Home"
   - slug: "home"
   - sections: [array of section objects]
   - published: true

3. Create an admin user:
   - Sign up through the app (first user should be manually set as admin in Firestore)
   - Or create user document in Firestore with role: "admin"

## Future Enhancements

- Contact forms using Netlify Functions
- SEO metadata editor
- Multi-language support
- Analytics integration
- Rich text editor for blog content
- Image gallery management
- Page templates

## License

[Your License Here]

