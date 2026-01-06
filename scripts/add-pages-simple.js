/**
 * Add Missing Pages to Firestore
 * Uses Firebase Admin SDK with application default credentials
 * Run: GOOGLE_APPLICATION_CREDENTIALS or use firebase login first
 */

const admin = require('firebase-admin');

// Initialize with project ID only - will use application default credentials
let app;
try {
  app = admin.initializeApp({
    projectId: 'aitasol',
  });
  console.log('✅ Firebase Admin initialized');
} catch (error) {
  if (error.code === 'app/duplicate-app') {
    app = admin.app();
    console.log('✅ Using existing Firebase Admin app');
  } else {
    console.error('❌ Failed to initialize Firebase Admin:', error.message);
    console.error('\n💡 Try one of these:');
    console.error('   1. Set GOOGLE_APPLICATION_CREDENTIALS environment variable');
    console.error('   2. Run: gcloud auth application-default login');
    console.error('   3. Use Firebase service account JSON file');
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
  let errorCount = 0;

  for (const page of pages) {
    try {
      const pagesRef = db.collection('pages');
      
      // Check if page exists
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
          console.log(`⏭️  Skipped: ${page.slug} (already exists)`);
          skippedCount++;
        }
      } else {
        // Create new page using slug as document ID
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
      errorCount++;
    }
  }

  console.log('\n✨ Complete!');
  console.log(`📄 Added: ${addedCount}`);
  console.log(`🔄 Updated: ${updatedCount}`);
  console.log(`⏭️  Skipped: ${skippedCount}`);
  console.log(`❌ Errors: ${errorCount}`);
}

// Set up application default credentials using Firebase CLI token
async function setupAuth() {
  const { execSync } = require('child_process');
  const fs = require('fs');
  const path = require('path');
  const os = require('os');

  // Try to use Firebase CLI's token
  try {
    // Check if we can use the Firebase project
    execSync('firebase projects:list', { stdio: 'ignore' });
    console.log('✅ Firebase CLI is authenticated');
    return true;
  } catch (error) {
    console.log('⚠️  Firebase CLI authentication check failed');
    return false;
  }
}

// Main execution
(async () => {
  try {
    await setupAuth();
    await addPages();
    console.log('\n✅ All pages processed!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Failed:', error.message);
    if (error.code === 'permission-denied') {
      console.error('\n💡 Permission denied. Make sure you have write access to Firestore.');
    }
    process.exit(1);
  }
})();

