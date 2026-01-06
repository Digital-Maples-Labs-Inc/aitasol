# Inline Editing Implementation Guide

## Overview
All pages now support inline editing with real-time Firebase sync. Editors and admins can click on text and images to edit them directly on the page.

## Implementation Status

### ✅ Completed Components

1. **Editable Components (Material-UI)**
   - `src/components/EditableTextMUI.tsx` - Editable text component
   - `src/components/EditableImageMUI.tsx` - Editable image component

2. **Firebase Integration**
   - `src/hooks/usePageData.ts` - Hook for fetching page data with real-time sync
   - `src/services/pageService.ts` - Updated with real-time subscription and update methods

3. **Pages Updated**
   - ✅ **Contact Page** (`src/screens/contact/components/ContactContent.tsx`)
     - Contact title, heading, location, emails, form title
   - ✅ **About Page** (`src/screens/about/components/AboutHero.tsx`)
     - Hero title and subtitle
   - ✅ **Services Page** (`src/screens/services/components/ServicesHero.tsx`)
     - Hero title and subtitle
   - ✅ **Testimonials Page** (`src/screens/testimonials/components/TestimonialsHero.tsx`)
     - Hero title and subtitle
   - ✅ **Service Detail Pages** (`src/screens/service-detail/components/`)
     - ServiceHero: Title and description
     - ServiceContent: Content title, paragraphs, and image
   - ✅ **Home Page** (`src/screens/home/components/Hero.tsx`)
     - Hero title, subtitle, and image

### 🔄 In Progress / Needs Update

1. **Home Page Components**
   - `src/screens/home/components/Features.tsx` - Feature titles, descriptions
   - `src/screens/home/components/Testimonials.tsx` - Testimonial content
   - `src/screens/home/components/Highlights.tsx` - Highlight content
   - `src/screens/home/components/Pricing.tsx` - Pricing content
   - `src/screens/home/components/FAQ.tsx` - FAQ questions and answers
   - `src/screens/home/components/LogoCollection.tsx` - Logo images

2. **About Page Components**
   - `src/screens/about/components/CompanyStory.tsx`
   - `src/screens/about/components/TeamSection.tsx`
   - `src/screens/about/components/CredentialsSection.tsx`

3. **Services Page Components**
   - `src/screens/services/components/ServicesOverview.tsx`
   - `src/screens/services/components/ServiceCards.tsx`

4. **Service Detail Components**
   - `src/screens/service-detail/components/ServiceFeatures.tsx`
   - `src/screens/service-detail/components/ServiceCTA.tsx`

5. **Testimonials Page Components**
   - `src/screens/testimonials/components/TestimonialsGrid.tsx`
   - `src/screens/testimonials/components/SuccessStories.tsx`

## How to Add Inline Editing to a Component

### Step 1: Import Required Components
```tsx
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { EditableImageMUI } from '@/components/EditableImageMUI';
import { usePageData } from '@/hooks/usePageData';
import CircularProgress from '@mui/material/CircularProgress';
```

### Step 2: Use the Hook
```tsx
export default function MyComponent() {
  const { page, loading, getSection, updateSectionContent, updateSectionImage } = usePageData('page-slug');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Get sections with defaults
  const titleSection = getSection('section-id') || { 
    id: 'section-id', 
    content: 'Default text', 
    type: 'heading' as const 
  };
```

### Step 3: Replace Typography with EditableTextMUI
```tsx
// Before
<Typography variant="h1">{title}</Typography>

// After
<EditableTextMUI
  value={titleSection.content}
  onSave={(value) => updateSectionContent(titleSection.id, value)}
  variant="h1"
  sx={{ /* your styles */ }}
/>
```

### Step 4: Replace Images with EditableImageMUI
```tsx
// Before
<Box component="img" src={imageUrl} alt="Image" />

// After
<EditableImageMUI
  src={imageSection.metadata?.imageUrl || imageSection.content || '/placeholder.jpg'}
  alt={imageSection.metadata?.imageAlt || 'Image'}
  onSave={(url) => updateSectionImage(imageSection.id, url, imageSection.metadata?.imageAlt)}
  sx={{ /* your styles */ }}
/>
```

## Firebase Structure

Pages are stored in Firestore with the following structure:
```typescript
{
  id: string;
  slug: string;
  title: string;
  sections: PageSection[];
  seoTitle: string;
  seoDescription: string;
  published: boolean;
  updatedAt: Date;
  createdAt: Date;
}

interface PageSection {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'button';
  content: string;
  editable: boolean;
  metadata?: {
    imageUrl?: string;
    imageAlt?: string;
  };
  updatedAt?: string;
}
```

## Initializing Page Sections

Run the initialization script to add editable sections to all pages:
```bash
node scripts/init-page-sections.js
```

This script:
- Adds editable sections to all pages in the sitemap
- Merges with existing sections (won't overwrite existing content)
- Creates default content for new sections

## Real-Time Sync

All changes are automatically synced to Firebase in real-time:
- When an editor saves text or image changes, they're immediately saved to Firestore
- Other users viewing the page will see updates automatically via `onSnapshot`
- No page refresh needed

## Permissions

Only users with `admin` or `editor` roles can edit content:
- Regular users see the content normally
- Editors and admins see edit indicators (✏️ for text, 📷 for images)
- Clicking on editable content opens an edit dialog

## Next Steps

1. Update remaining home page components (Features, Testimonials, Highlights, Pricing, FAQ)
2. Update about page components (CompanyStory, TeamSection, CredentialsSection)
3. Update services page components (ServicesOverview, ServiceCards)
4. Update service detail components (ServiceFeatures, ServiceCTA)
5. Update testimonials page components (TestimonialsGrid, SuccessStories)
6. Add more sections to the initialization script as needed
7. Test inline editing across all pages
8. Add image upload to Firebase Storage (currently using data URLs)

