# Site Map & Navigation Structure

## Overview

This document outlines the complete site structure and navigation hierarchy for the AitaSol Education Consultancy website.

## Main Navigation Structure

### 1. Homepage
- **Path**: `/`
- **Description**: Main landing page with hero section, features, testimonials, highlights, pricing, and FAQ
- **Components**: HomeScreen with all marketing sections

### 2. About AitaSol
- **Path**: `/about`
- **Description**: Company story, team information, and credentials
- **Content Sections**:
  - Company story and mission
  - Team members and profiles
  - Credentials and certifications
  - Why choose AitaSol

### 3. Services Overview
- **Path**: `/services`
- **Description**: Main services page with overview of all services offered
- **Sub-pages**:
  - **Study in Canada** (`/services/study-in-canada`)
    - Information about studying in Canada
    - Programs and institutions
    - Requirements and process
  - **Immigration & Study Permits** (`/services/immigration-study-permits`)
    - Study permit application process
    - Immigration pathways
    - Documentation requirements
  - **Admissions Support** (`/services/admissions-support`)
    - Application assistance
    - Document preparation
    - University selection guidance
  - **Career Counseling** (`/services/career-counseling`)
    - Career guidance services
    - Job market insights
    - Professional development

### 4. Success Stories / Testimonials
- **Path**: `/testimonials`
- **Description**: Student success stories and testimonials
- **Content**: Real testimonials from students who have used AitaSol services

### 5. Blog
- **Path**: `/blog`
- **Description**: Blog listing page with all published articles
- **Content**: Blog posts about:
  - Educational benefits of studying in Canada
  - Immigration pathways
  - Student life in Canada
  - Career opportunities
  - Industry insights
  - Success stories
  - Study tips and guides
- **Sub-pages**:
  - **Blog Detail** (`/blog/:slug`)
    - Individual blog post pages
    - Full article content
    - Related posts

### 6. Contact Us
- **Path**: `/contact`
- **Description**: Contact form and company contact information
- **Content**:
  - Contact form
  - Office address
  - Phone numbers
  - Email addresses
  - Office hours

## Additional Pages

### Admin Pages
- **Login**: `/dmlabs`
- **Dashboard**: `/admin/dashboard`
- **Pages Management**: `/admin/pages`
- **Blogs Management**: `/admin/blogs`
- **Theme Management**: `/admin/theme`

## Navigation Implementation

### Desktop Navigation
- Horizontal menu bar with dropdown for Services
- Logo links to homepage
- Sign in/Sign up buttons in top right
- Color mode toggle

### Mobile Navigation
- Hamburger menu with all navigation items
- Services sub-items indented in mobile menu
- Sign in/Sign up buttons at bottom of drawer

## Page Structure Requirements

### All Public Pages Should Include:
1. **HeaderNavigation** - Global navigation component
2. **Page Content** - Specific to each page
3. **Footer** - Global footer component

### Page Components:
- `AboutScreen.tsx` - About AitaSol page ✅
- `ServicesScreen.tsx` - Services overview page ✅
- `ServiceDetailScreen.tsx` - Individual service pages (reusable) ✅
- `TestimonialsScreen.tsx` - Testimonials page ✅
- `BlogListScreen.tsx` - Blog listing page (existing, needs Material-UI update)
- `BlogDetailScreen.tsx` - Individual blog post pages (existing)
- `ContactScreen.tsx` - Contact page with form ✅

## Routing Structure

```
/                           → HomeScreen
/about                      → AboutScreen
/services                   → ServicesScreen
/services/study-in-canada   → ServiceDetailScreen (service: "study-in-canada")
/services/immigration-study-permits → ServiceDetailScreen (service: "immigration-study-permits")
/services/admissions-support → ServiceDetailScreen (service: "admissions-support")
/services/career-counseling → ServiceDetailScreen (service: "career-counseling")
/testimonials               → TestimonialsScreen
/blog                       → BlogListScreen (existing)
/blog/:slug                 → BlogDetailScreen (existing)
/contact                    → ContactScreen
/dmlabs                     → LoginScreen (existing)
/admin/dashboard            → AdminDashboardScreen (existing)
/admin/pages                → AdminPagesScreen (existing)
/admin/blogs                → AdminBlogsScreen (existing)
/admin/theme                → AdminThemeScreen (existing)
```

## Content Management

All pages should be editable through the admin dashboard:
- Pages stored in Firestore `pages` collection
- Each page has a `slug` field for routing
- Pages can have multiple sections (heading, paragraph, image, CTA)
- All content is editable inline by authorized users

## Next Steps

1. ✅ Create page components for:
   - AboutScreen
   - ServicesScreen
   - ServiceDetailScreen (reusable component)
   - TestimonialsScreen
   - ContactScreen

2. ✅ Update routing in App.tsx and app/ directory

3. Update BlogListScreen to use Material-UI components (currently uses React Native Layout)

4. Create Firestore documents for each page with appropriate slugs

5. Add page content through admin dashboard or initial data scripts

