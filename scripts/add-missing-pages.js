/**
 * Add Missing Pages to Firestore
 * Adds pages that are missing from the pages collection with proper structure
 */

const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || 
  path.join(__dirname, '../firebase-service-account.json');

let serviceAccount;
try {
  serviceAccount = require(serviceAccountPath);
} catch (error) {
  console.error('❌ Error loading service account:', error.message);
  console.error('Please set FIREBASE_SERVICE_ACCOUNT_PATH or place firebase-service-account.json in the root directory');
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// All pages with their structure and default sections
const pages = [
  {
    slug: 'home',
    title: 'Home',
    seoTitle: 'AitaSol Education Consultancy - Study in Canada',
    seoDescription: 'Expert guidance for studying in Canada. We help students with admissions, study permits, and immigration services.',
    published: true,
    sections: [
      {
        id: 'hero',
        type: 'heading',
        content: 'Welcome to AitaSol Education Consultancy',
        editable: true,
      },
      {
        id: 'hero-subtitle',
        type: 'paragraph',
        content: 'Your trusted partner for studying in Canada',
        editable: true,
      },
    ],
  },
  {
    slug: 'about',
    title: 'About AitaSol',
    seoTitle: 'About Us - AitaSol Education Consultancy',
    seoDescription: 'Learn about AitaSol Education Consultancy, our mission, team, and commitment to helping students achieve their Canadian education dreams.',
    published: true,
    sections: [
      {
        id: 'about-hero',
        type: 'heading',
        content: 'About AitaSol',
        editable: true,
      },
      {
        id: 'about-intro',
        type: 'paragraph',
        content: 'AitaSol Education Consultancy is dedicated to helping students achieve their dreams of studying in Canada.',
        editable: true,
      },
    ],
  },
  {
    slug: 'services',
    title: 'Our Services',
    seoTitle: 'Services - AitaSol Education Consultancy',
    seoDescription: 'Comprehensive services for studying in Canada including admissions support, study permits, immigration services, and career counseling.',
    published: true,
    sections: [
      {
        id: 'services-hero',
        type: 'heading',
        content: 'Our Services',
        editable: true,
      },
      {
        id: 'services-intro',
        type: 'paragraph',
        content: 'We offer comprehensive services to help you achieve your educational goals in Canada.',
        editable: true,
      },
    ],
  },
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
  {
    slug: 'contact',
    title: 'Contact Us',
    seoTitle: 'Contact Us - AitaSol Education Consultancy',
    seoDescription: 'Get in touch with AitaSol Education Consultancy. We are here to help you with your Canadian education journey.',
    published: true,
    sections: [
      {
        id: 'contact-hero',
        type: 'heading',
        content: 'Contact Us',
        editable: true,
      },
      {
        id: 'contact-intro',
        type: 'paragraph',
        content: 'Have questions? We are here to help. Reach out to us through any of the following methods.',
        editable: true,
      },
    ],
  },
];

async function addMissingPages() {
  console.log('🚀 Checking and adding missing pages...\n');

  try {
    const pagesRef = db.collection('pages');
    const batch = db.batch();
    let addedCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;

    for (const page of pages) {
      // Check if page exists by slug
      const slugQuery = await pagesRef.where('slug', '==', page.slug).limit(1).get();
      
      if (!slugQuery.empty) {
        // Page exists, check if it needs updating
        const existingDoc = slugQuery.docs[0];
        const existingData = existingDoc.data();
        
        // Update if missing sections or other fields
        const needsUpdate = !existingData.sections || existingData.sections.length === 0;
        
        if (needsUpdate) {
          const pageRef = pagesRef.doc(existingDoc.id);
          batch.update(pageRef, {
            ...page,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
          console.log(`🔄 Updating page: ${page.slug} (${page.title})`);
          updatedCount++;
        } else {
          console.log(`⏭️  Page ${page.slug} already exists with content, skipping...`);
          skippedCount++;
        }
      } else {
        // Page doesn't exist, create it
        const pageRef = pagesRef.doc(page.slug); // Use slug as document ID for easier lookup
        const pageData = {
          ...page,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        };
        
        batch.set(pageRef, pageData);
        console.log(`✅ Adding page: ${page.slug} (${page.title})`);
        addedCount++;
      }
    }

    await batch.commit();
    
    console.log('\n✨ Pages update complete!');
    console.log(`📄 Added: ${addedCount}`);
    console.log(`🔄 Updated: ${updatedCount}`);
    console.log(`⏭️  Skipped: ${skippedCount}`);
    console.log(`📊 Total pages: ${pages.length}`);
    
  } catch (error) {
    console.error('❌ Error adding pages:', error);
    throw error;
  }
}

// Run the script
addMissingPages()
  .then(() => {
    console.log('\n✅ All pages are now in Firestore!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Failed to add pages:', error);
    process.exit(1);
  });

