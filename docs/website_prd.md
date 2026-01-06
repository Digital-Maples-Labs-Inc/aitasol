# Product Requirements Document (PRD)

## 1. Product Overview

### Product Name

Education Consultancy Web Platform

### Purpose

Build a modern, content editable education consultancy website using React Native Web with a full front end and backend, allowing non technical editors to manage all website content including blogs, pages, images, and text directly from an admin interface. The platform will use Firebase as the backend and database, and Netlify for static hosting and serverless functions.

### Target Users

Primary users are prospective students and parents browsing consultancy services. Secondary users are internal staff acting as editors and administrators managing website content.

### Business Goals

Increase credibility and lead generation for the consultancy, reduce developer dependency for content updates, enable fast publishing of blogs and service updates, and provide a scalable foundation for future features such as forms, bookings, and CRM integrations.

---

## 2. Technical Stack

### Frontend

React Native using Expo
React Native Web for web compatibility
TypeScript
Tailwind or NativeWind for styling

### Backend

Firebase Authentication
Firebase Firestore
Firebase Storage for images and media

### Hosting and Deployment

Netlify for static hosting
Netlify Functions for server side logic if required
Expo build for web or React Native Web build output

---

## 3. Core Features

### Public Website

**Main Pages:**
- Homepage (`/`) - Landing page with hero, features, testimonials, highlights, pricing, and FAQ
- About AitaSol (`/about`) - Company story, team, credentials
- Services Overview (`/services`) - Main services page
  - Study in Canada (`/services/study-in-canada`)
  - Immigration & Study Permits (`/services/immigration-study-permits`)
  - Admissions Support (`/services/admissions-support`)
  - Career Counseling (`/services/career-counseling`)
- Success Stories / Testimonials (`/testimonials`)
- Why Choose Canada? (`/blog`) - Blog listing and blog detail pages
- Contact Us (`/contact`)

All text and images on public pages must be editable from the admin dashboard

**See `docs/SITEMAP.md` for complete site structure and navigation details.**

### Admin Dashboard

Secure login via Firebase Authentication
Role based access, Admin and Editor
Visual editor for pages with click to edit functionality
Rich text editor for blogs and long form content
Image upload and replacement
Create, edit, publish, unpublish blogs
Draft and preview mode

### Inline Editing

Editors can click clearly marked editable areas directly on the page
Editable elements include headings, paragraphs, buttons, and images
Inline editor opens modal or side panel for editing
Changes saved to Firebase in real time

---

## 4. User Roles

### Admin

Full access to content, users, and settings
Can create and delete editors
Can publish or unpublish any content

### Editor

Can edit text, images, and blogs
Cannot manage users or system settings

---

## 5. Functional Requirements

Content Management
CRUD operations for pages and blogs
Versioned content storage
Auto save drafts

Authentication
Email and password authentication
Protected admin routes

Media Management
Upload images to Firebase Storage
Auto generate URLs
Image compression before upload

---

## 6. Non Functional Requirements

Performance
Fast load times using static builds
Optimized images

Security
Firebase security rules
Role based access enforcement

Scalability
Content structure designed to support future services

Accessibility
WCAG compliant contrast and font sizes
Keyboard navigation

---

## 7. Database Structure (Firestore)

pages
id
slug
title
sections
type
content
editable
updatedAt

blogs
id
title
slug
content
author
status
publishedAt

users
uid
role
email

media
id
url
type
uploadedAt

---

## 8. Deployment Strategy

Use Expo or React Native Web build command to generate web assets
Netlify build command npm run build
Publish directory set to web build output
Use Netlify environment variables for Firebase config
Optional Netlify Functions for contact forms or protected operations

---

## 9. Success Metrics

Editors can update content without developer help
Page updates reflected live within seconds
Blog publishing workflow under 5 minutes
Stable uptime via Netlify CDN

---

