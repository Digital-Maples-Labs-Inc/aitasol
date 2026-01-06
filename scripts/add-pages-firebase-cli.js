/**
 * Add Missing Pages to Firestore using Firebase CLI authentication
 * This script uses Firebase CLI's authentication token
 */

const admin = require('firebase-admin');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Get Firebase CLI access token
function getFirebaseToken() {
  try {
    // Try to get token from Firebase CLI
    const token = execSync('firebase login:ci --no-localhost', { encoding: 'utf8' }).trim();
    if (token) {
      return token;
    }
  } catch (error) {
    // If that fails, try to read from Firebase CLI config
    const configPath = path.join(os.homedir(), '.config', 'configstore', 'firebase-tools.json');
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      if (config.tokens && config.tokens.refresh_token) {
        return config.tokens.refresh_token;
      }
    }
  }
  return null;
}

// Initialize Firebase Admin with project ID
let app;
try {
  app = admin.initializeApp({
    projectId: 'aitasol',
  });
} catch (error) {
  app = admin.app();
}

const db = admin.firestore();

// All pages with their structure
const pages = [
  {
    slug: 'study-in-canada',
    title: 'Study in Canada',
    seoTitle: 'Study in Canada - AitaSol Education Consultancy',
    seoDescription: 'Everything you need to know about studying in Canada. Programs, institutions, requirements, and the application process.',
    published: true,
    sections: [
      {
        id: 'service-hero',
        type: 'heading',
        content: 'Study in Canada',
        editable: true,
      },
      {
        id: 'service-intro',
        type: 'paragraph',
        content: 'Canada offers world-class education with diverse programs and institutions. Learn about the opportunities available for international students.',
        editable: true,
      },
      {
        id: 'service-content',
        type: 'paragraph',
        content: 'Our team provides expert guidance on selecting the right program, understanding admission requirements, and navigating the application process.',
        editable: true,
      },
    ],
  },
  {
    slug: 'immigration-study-permits',
    title: 'Immigration & Study Permits',
    seoTitle: 'Immigration & Study Permits - AitaSol Education Consultancy',
    seoDescription: 'Expert assistance with study permit applications and immigration pathways to Canada.',
    published: true,
    sections: [
      {
        id: 'service-hero',
        type: 'heading',
        content: 'Immigration & Study Permits',
        editable: true,
      },
      {
        id: 'service-intro',
        type: 'paragraph',
        content: 'Navigating the study permit application process can be complex. We provide expert assistance to help you succeed.',
        editable: true,
      },
      {
        id: 'service-content',
        type: 'paragraph',
        content: 'Our services include document preparation, application review, and guidance on immigration pathways to Canada.',
        editable: true,
      },
    ],
  },
  {
    slug: 'admissions-support',
    title: 'Admissions Support',
    seoTitle: 'Admissions Support - AitaSol Education Consultancy',
    seoDescription: 'Professional admissions support for Canadian universities and colleges. Application assistance and document preparation.',
    published: true,
    sections: [
      {
        id: 'service-hero',
        type: 'heading',
        content: 'Admissions Support',
        editable: true,
      },
      {
        id: 'service-intro',
        type: 'paragraph',
        content: 'Get professional assistance with your university and college applications in Canada.',
        editable: true,
      },
      {
        id: 'service-content',
        type: 'paragraph',
        content: 'We help with application preparation, document review, university selection, and ensuring all requirements are met.',
        editable: true,
      },
    ],
  },
  {
    slug: 'career-counseling',
    title: 'Career Counseling',
    seoTitle: 'Career Counseling - AitaSol Education Consultancy',
    seoDescription: 'Career guidance and professional development services for students and professionals in Canada.',
    published: true,
    sections: [
      {
        id: 'service-hero',
        type: 'heading',
        content: 'Career Counseling',
        editable: true,
      },
      {
        id: 'service-intro',
        type: 'paragraph',
        content: 'Plan your career path with expert guidance and professional development support.',
        editable: true,
      },
      {
        id: 'service-content',
        type: 'paragraph',
        content: 'We provide career guidance, job market insights, resume assistance, and professional development services to help you succeed in Canada.',
        editable: true,
      },
    ],
  },
  {
    slug: 'testimonials',
    title: 'Testimonials',
    seoTitle: 'Student Testimonials - AitaSol Education Consultancy',
    seoDescription: 'Read success stories and testimonials from students who have used AitaSol services.',
    published: true,
    sections: [
      {
        id: 'testimonials-hero',
        type: 'heading',
        content: 'Success Stories & Testimonials',
        editable: true,
      },
      {
        id: 'testimonials-intro',
        type: 'paragraph',
        content: 'Read about the experiences of students who have successfully achieved their Canadian education dreams with our help.',
        editable: true,
      },
    ],
  },
  {
    slug: 'blog',
    title: 'Blog',
    seoTitle: 'Blog - AitaSol Education Consultancy',
    seoDescription: 'Latest articles about studying in Canada, immigration, student life, and career opportunities.',
    published: true,
    sections: [
      {
        id: 'blog-hero',
        type: 'heading',
        content: 'Blog',
        editable: true,
      },
      {
        id: 'blog-intro',
        type: 'paragraph',
        content: 'Stay informed with our latest articles about studying in Canada, immigration, and student life.',
        editable: true,
      },
    ],
  },
];

async function addMissingPages() {
  console.log('🚀 Adding missing pages to Firestore...\n');

  try {
    const pagesRef = db.collection('pages');
    let addedCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;

    // Process pages one by one to avoid batch size limits
    for (const page of pages) {
      try {
        // Check if page exists by slug
        const slugQuery = await pagesRef.where('slug', '==', page.slug).limit(1).get();
        
        if (!slugQuery.empty) {
          // Page exists, check if it needs updating
          const existingDoc = slugQuery.docs[0];
          const existingData = existingDoc.data();
          
          // Update if missing sections or important fields
          const needsUpdate = !existingData.sections || existingData.sections.length === 0 ||
                             !existingData.seoTitle || !existingData.seoDescription;
          
          if (needsUpdate) {
            const pageRef = pagesRef.doc(existingDoc.id);
            await pageRef.update({
              ...page,
              updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            });
            console.log(`🔄 Updated page: ${page.slug} (${page.title})`);
            updatedCount++;
          } else {
            console.log(`⏭️  Page ${page.slug} already exists with content, skipping...`);
            skippedCount++;
          }
        } else {
          // Page doesn't exist, create it
          const pageRef = pagesRef.doc(page.slug); // Use slug as document ID
          const pageData = {
            ...page,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          };
          
          await pageRef.set(pageData);
          console.log(`✅ Added page: ${page.slug} (${page.title})`);
          addedCount++;
        }
      } catch (error) {
        console.error(`❌ Error processing page ${page.slug}:`, error.message);
      }
    }
    
    console.log('\n✨ Pages update complete!');
    console.log(`📄 Added: ${addedCount}`);
    console.log(`🔄 Updated: ${updatedCount}`);
    console.log(`⏭️  Skipped: ${skippedCount}`);
    console.log(`📊 Total processed: ${pages.length}`);
    
  } catch (error) {
    console.error('❌ Error adding pages:', error);
    if (error.code === 'permission-denied') {
      console.error('\n💡 Permission denied. Make sure you have write access to Firestore.');
    } else if (error.code === 'unauthenticated') {
      console.error('\n💡 Authentication error. Try running: firebase login');
    }
    throw error;
  }
}

// Run the script
addMissingPages()
  .then(() => {
    console.log('\n✅ All missing pages have been added to Firestore!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Failed to add pages:', error.message);
    process.exit(1);
  });

