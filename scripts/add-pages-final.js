/**
 * Add Missing Pages to Firestore - Final Version
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to: https://console.firebase.google.com/project/aitasol/settings/serviceaccounts/adminsdk
 * 2. Click "Generate new private key"
 * 3. Save the file as "firebase-service-account.json" in the project root
 * 4. Run: node scripts/add-pages-final.js
 */

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Try to load service account (check multiple possible filenames)
const possiblePaths = [
  path.join(__dirname, '..', 'firebase-service-account.json'),
  path.join(__dirname, '..', 'serviceAccountKey.json'),
];

let serviceAccount;
let serviceAccountPath;

for (const possiblePath of possiblePaths) {
  if (fs.existsSync(possiblePath)) {
    try {
      serviceAccount = require(possiblePath);
      serviceAccountPath = possiblePath;
      console.log(`✅ Loaded service account from ${path.basename(possiblePath)}\n`);
      break;
    } catch (error) {
      console.error(`❌ Error loading service account from ${possiblePath}:`, error.message);
    }
  }
}

if (!serviceAccount) {
  console.error('❌ Service account file not found!');
  console.error('\n📝 To add pages automatically:');
  console.error('   1. Go to: https://console.firebase.google.com/project/aitasol/settings/serviceaccounts/adminsdk');
  console.error('   2. Click "Generate new private key"');
  console.error('   3. Save as: firebase-service-account.json in the project root');
  console.error('   4. Run this script again\n');
  console.error('💡 OR add pages manually using Firebase Console');
  console.error('   See: scripts/ADD_PAGES_MANUAL.md\n');
  process.exit(1);
}

// Initialize Firebase Admin
let app;
try {
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'aitasol',
  });
} catch (error) {
  if (error.code === 'app/duplicate-app') {
    app = admin.app();
  } else {
    console.error('❌ Failed to initialize Firebase:', error.message);
    process.exit(1);
  }
}

const db = admin.firestore();

const pages = [
  {
    slug: 'study-in-canada',
    title: 'Study in Canada',
    seoTitle: 'Study in Canada - AitaSol Education Consultancy',
    seoDescription: 'Everything you need to know about studying in Canada. Programs, institutions, requirements, and the application process.',
    published: true,
    sections: [
      { id: 'service-hero', type: 'heading', content: 'Study in Canada', editable: true },
      { id: 'service-intro', type: 'paragraph', content: 'Canada offers world-class education with diverse programs and institutions. Learn about the opportunities available for international students.', editable: true },
      { id: 'service-content', type: 'paragraph', content: 'Our team provides expert guidance on selecting the right program, understanding admission requirements, and navigating the application process.', editable: true },
    ],
  },
  {
    slug: 'immigration-study-permits',
    title: 'Immigration & Study Permits',
    seoTitle: 'Immigration & Study Permits - AitaSol Education Consultancy',
    seoDescription: 'Expert assistance with study permit applications and immigration pathways to Canada.',
    published: true,
    sections: [
      { id: 'service-hero', type: 'heading', content: 'Immigration & Study Permits', editable: true },
      { id: 'service-intro', type: 'paragraph', content: 'Navigating the study permit application process can be complex. We provide expert assistance to help you succeed.', editable: true },
      { id: 'service-content', type: 'paragraph', content: 'Our services include document preparation, application review, and guidance on immigration pathways to Canada.', editable: true },
    ],
  },
  {
    slug: 'admissions-support',
    title: 'Admissions Support',
    seoTitle: 'Admissions Support - AitaSol Education Consultancy',
    seoDescription: 'Professional admissions support for Canadian universities and colleges. Application assistance and document preparation.',
    published: true,
    sections: [
      { id: 'service-hero', type: 'heading', content: 'Admissions Support', editable: true },
      { id: 'service-intro', type: 'paragraph', content: 'Get professional assistance with your university and college applications in Canada.', editable: true },
      { id: 'service-content', type: 'paragraph', content: 'We help with application preparation, document review, university selection, and ensuring all requirements are met.', editable: true },
    ],
  },
  {
    slug: 'career-counseling',
    title: 'Career Counseling',
    seoTitle: 'Career Counseling - AitaSol Education Consultancy',
    seoDescription: 'Career guidance and professional development services for students and professionals in Canada.',
    published: true,
    sections: [
      { id: 'service-hero', type: 'heading', content: 'Career Counseling', editable: true },
      { id: 'service-intro', type: 'paragraph', content: 'Plan your career path with expert guidance and professional development support.', editable: true },
      { id: 'service-content', type: 'paragraph', content: 'We provide career guidance, job market insights, resume assistance, and professional development services to help you succeed in Canada.', editable: true },
    ],
  },
  {
    slug: 'testimonials',
    title: 'Testimonials',
    seoTitle: 'Student Testimonials - AitaSol Education Consultancy',
    seoDescription: 'Read success stories and testimonials from students who have used AitaSol services.',
    published: true,
    sections: [
      { id: 'testimonials-hero', type: 'heading', content: 'Success Stories & Testimonials', editable: true },
      { id: 'testimonials-intro', type: 'paragraph', content: 'Read about the experiences of students who have successfully achieved their Canadian education dreams with our help.', editable: true },
    ],
  },
  {
    slug: 'blog',
    title: 'Blog',
    seoTitle: 'Blog - AitaSol Education Consultancy',
    seoDescription: 'Latest articles about studying in Canada, immigration, student life, and career opportunities.',
    published: true,
    sections: [
      { id: 'blog-hero', type: 'heading', content: 'Blog', editable: true },
      { id: 'blog-intro', type: 'paragraph', content: 'Stay informed with our latest articles about studying in Canada, immigration, and student life.', editable: true },
    ],
  },
];

async function addPages() {
  console.log('🚀 Adding missing pages to Firestore...\n');

  let addedCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  for (const page of pages) {
    try {
      const pagesRef = db.collection('pages');
      const slugQuery = await pagesRef.where('slug', '==', page.slug).limit(1).get();
      
      if (!slugQuery.empty) {
        const existingDoc = slugQuery.docs[0];
        const existingData = existingDoc.data();
        const needsUpdate = !existingData.sections || existingData.sections.length === 0;
        
        if (needsUpdate) {
          await existingDoc.ref.update({
            ...page,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
          console.log(`🔄 Updated: ${page.slug}`);
          updatedCount++;
        } else {
          console.log(`⏭️  Skipped: ${page.slug} (already exists with content)`);
          skippedCount++;
        }
      } else {
        const pageRef = pagesRef.doc(page.slug);
        await pageRef.set({
          ...page,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log(`✅ Added: ${page.slug} (${page.title})`);
        addedCount++;
      }
    } catch (error) {
      console.error(`❌ Error with ${page.slug}:`, error.message);
    }
  }

  console.log('\n✨ Complete!');
  console.log(`📄 Added: ${addedCount}`);
  console.log(`🔄 Updated: ${updatedCount}`);
  console.log(`⏭️  Skipped: ${skippedCount}`);
  console.log(`📊 Total: ${pages.length}`);
}

addPages()
  .then(() => {
    console.log('\n✅ All missing pages have been added to Firestore!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Failed:', error.message);
    process.exit(1);
  });

