# How to Add Missing Pages to Firestore

Since you only see 4 pages (about, contact, home, services) in your Firestore console, here's how to add the remaining 6 pages.

## Missing Pages

You need to add these pages:
1. **study-in-canada** - Study in Canada service page
2. **immigration-study-permits** - Immigration & Study Permits service page
3. **admissions-support** - Admissions Support service page
4. **career-counseling** - Career Counseling service page
5. **testimonials** - Testimonials page
6. **blog** - Blog page

## Method 1: Using Firebase Console (Recommended)

### For each missing page:

1. In Firebase Console, go to **Firestore Database** > **pages** collection
2. Click **"Add document"**
3. Use the **slug** as the **Document ID** (e.g., `study-in-canada`)
4. Add the following fields:

#### Field Structure:

| Field Name | Type | Value |
|------------|------|-------|
| `slug` | string | (same as document ID) |
| `title` | string | (see values below) |
| `seoTitle` | string | (see values below) |
| `seoDescription` | string | (see values below) |
| `published` | boolean | `true` |
| `sections` | array | (see structure below) |
| `createdAt` | timestamp | (current time) |
| `updatedAt` | timestamp | (current time) |

### Page Details:

#### 1. study-in-canada
- **Document ID**: `study-in-canada`
- **slug**: `study-in-canada`
- **title**: `Study in Canada`
- **seoTitle**: `Study in Canada - AitaSol Education Consultancy`
- **seoDescription**: `Everything you need to know about studying in Canada. Programs, institutions, requirements, and the application process.`
- **published**: `true`
- **sections**: Array with these items:
  ```json
  [
    {
      "id": "service-hero",
      "type": "heading",
      "content": "Study in Canada",
      "editable": true
    },
    {
      "id": "service-intro",
      "type": "paragraph",
      "content": "Canada offers world-class education with diverse programs and institutions. Learn about the opportunities available for international students.",
      "editable": true
    },
    {
      "id": "service-content",
      "type": "paragraph",
      "content": "Our team provides expert guidance on selecting the right program, understanding admission requirements, and navigating the application process.",
      "editable": true
    }
  ]
  ```

#### 2. immigration-study-permits
- **Document ID**: `immigration-study-permits`
- **slug**: `immigration-study-permits`
- **title**: `Immigration & Study Permits`
- **seoTitle**: `Immigration & Study Permits - AitaSol Education Consultancy`
- **seoDescription**: `Expert assistance with study permit applications and immigration pathways to Canada.`
- **published**: `true`
- **sections**: Array with these items:
  ```json
  [
    {
      "id": "service-hero",
      "type": "heading",
      "content": "Immigration & Study Permits",
      "editable": true
    },
    {
      "id": "service-intro",
      "type": "paragraph",
      "content": "Navigating the study permit application process can be complex. We provide expert assistance to help you succeed.",
      "editable": true
    },
    {
      "id": "service-content",
      "type": "paragraph",
      "content": "Our services include document preparation, application review, and guidance on immigration pathways to Canada.",
      "editable": true
    }
  ]
  ```

#### 3. admissions-support
- **Document ID**: `admissions-support`
- **slug**: `admissions-support`
- **title**: `Admissions Support`
- **seoTitle**: `Admissions Support - AitaSol Education Consultancy`
- **seoDescription**: `Professional admissions support for Canadian universities and colleges. Application assistance and document preparation.`
- **published**: `true`
- **sections**: Array with these items:
  ```json
  [
    {
      "id": "service-hero",
      "type": "heading",
      "content": "Admissions Support",
      "editable": true
    },
    {
      "id": "service-intro",
      "type": "paragraph",
      "content": "Get professional assistance with your university and college applications in Canada.",
      "editable": true
    },
    {
      "id": "service-content",
      "type": "paragraph",
      "content": "We help with application preparation, document review, university selection, and ensuring all requirements are met.",
      "editable": true
    }
  ]
  ```

#### 4. career-counseling
- **Document ID**: `career-counseling`
- **slug**: `career-counseling`
- **title**: `Career Counseling`
- **seoTitle**: `Career Counseling - AitaSol Education Consultancy`
- **seoDescription**: `Career guidance and professional development services for students and professionals in Canada.`
- **published**: `true`
- **sections**: Array with these items:
  ```json
  [
    {
      "id": "service-hero",
      "type": "heading",
      "content": "Career Counseling",
      "editable": true
    },
    {
      "id": "service-intro",
      "type": "paragraph",
      "content": "Plan your career path with expert guidance and professional development support.",
      "editable": true
    },
    {
      "id": "service-content",
      "type": "paragraph",
      "content": "We provide career guidance, job market insights, resume assistance, and professional development services to help you succeed in Canada.",
      "editable": true
    }
  ]
  ```

#### 5. testimonials
- **Document ID**: `testimonials`
- **slug**: `testimonials`
- **title**: `Testimonials`
- **seoTitle**: `Student Testimonials - AitaSol Education Consultancy`
- **seoDescription**: `Read success stories and testimonials from students who have used AitaSol services.`
- **published**: `true`
- **sections**: Array with these items:
  ```json
  [
    {
      "id": "testimonials-hero",
      "type": "heading",
      "content": "Success Stories & Testimonials",
      "editable": true
    },
    {
      "id": "testimonials-intro",
      "type": "paragraph",
      "content": "Read about the experiences of students who have successfully achieved their Canadian education dreams with our help.",
      "editable": true
    }
  ]
  ```

#### 6. blog
- **Document ID**: `blog`
- **slug**: `blog`
- **title**: `Blog`
- **seoTitle**: `Blog - AitaSol Education Consultancy`
- **seoDescription**: `Latest articles about studying in Canada, immigration, student life, and career opportunities.`
- **published**: `true`
- **sections**: Array with these items:
  ```json
  [
    {
      "id": "blog-hero",
      "type": "heading",
      "content": "Blog",
      "editable": true
    },
    {
      "id": "blog-intro",
      "type": "paragraph",
      "content": "Stay informed with our latest articles about studying in Canada, immigration, and student life.",
      "editable": true
    }
  ]
  ```

## Method 2: Using Script (If you have service account)

If you have a Firebase service account JSON file:

1. Place `firebase-service-account.json` in the root directory
2. Run: `node scripts/add-missing-pages.js`

## Quick Reference

All page data is also available in `scripts/pages-data.json` for reference.

## After Adding Pages

Once all pages are added, you should have 10 total pages:
- ✅ home
- ✅ about
- ✅ services
- ✅ contact
- ➕ study-in-canada
- ➕ immigration-study-permits
- ➕ admissions-support
- ➕ career-counseling
- ➕ testimonials
- ➕ blog

