/**
 * Initialize Pages Collection in Firestore
 * Creates all pages from the sitemap in Firebase
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

// All pages from the sitemap
const pages = [
  {
    slug: 'home',
    title: 'Home',
    seoTitle: 'AitaSol Education Consultancy - Study in Canada',
    seoDescription: 'Expert guidance for studying in Canada. We help students with admissions, study permits, and immigration services.',
    published: true,
  },
  {
    slug: 'about',
    title: 'About AitaSol',
    seoTitle: 'About Us - AitaSol Education Consultancy',
    seoDescription: 'Learn about AitaSol Education Consultancy, our mission, team, and commitment to helping students achieve their Canadian education dreams.',
    published: true,
  },
  {
    slug: 'services',
    title: 'Our Services',
    seoTitle: 'Services - AitaSol Education Consultancy',
    seoDescription: 'Comprehensive services for studying in Canada including admissions support, study permits, immigration services, and career counseling.',
    published: true,
  },
  {
    slug: 'study-in-canada',
    title: 'Study in Canada',
    seoTitle: 'Study in Canada - AitaSol Education Consultancy',
    seoDescription: 'Everything you need to know about studying in Canada. Programs, institutions, requirements, and the application process.',
    published: true,
  },
  {
    slug: 'immigration-study-permits',
    title: 'Immigration & Study Permits',
    seoTitle: 'Immigration & Study Permits - AitaSol Education Consultancy',
    seoDescription: 'Expert assistance with study permit applications and immigration pathways to Canada.',
    published: true,
  },
  {
    slug: 'admissions-support',
    title: 'Admissions Support',
    seoTitle: 'Admissions Support - AitaSol Education Consultancy',
    seoDescription: 'Professional admissions support for Canadian universities and colleges. Application assistance and document preparation.',
    published: true,
  },
  {
    slug: 'career-counseling',
    title: 'Career Counseling',
    seoTitle: 'Career Counseling - AitaSol Education Consultancy',
    seoDescription: 'Career guidance and professional development services for students and professionals in Canada.',
    published: true,
  },
  {
    slug: 'testimonials',
    title: 'Testimonials',
    seoTitle: 'Student Testimonials - AitaSol Education Consultancy',
    seoDescription: 'Read success stories and testimonials from students who have used AitaSol services.',
    published: true,
  },
  {
    slug: 'blog',
    title: 'Blog',
    seoTitle: 'Blog - AitaSol Education Consultancy',
    seoDescription: 'Latest articles about studying in Canada, immigration, student life, and career opportunities.',
    published: true,
  },
  {
    slug: 'contact',
    title: 'Contact Us',
    seoTitle: 'Contact Us - AitaSol Education Consultancy',
    seoDescription: 'Get in touch with AitaSol Education Consultancy. We are here to help you with your Canadian education journey.',
    published: true,
  },
];

async function initPages() {
  console.log('🚀 Initializing pages collection...\n');

  try {
    const batch = db.batch();
    const pagesRef = db.collection('pages');
    
    for (const page of pages) {
      const pageRef = pagesRef.doc();
      const pageData = {
        ...page,
        sections: [],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      
      batch.set(pageRef, pageData);
      console.log(`✅ Prepared page: ${page.slug} (${page.title})`);
    }

    await batch.commit();
    console.log('\n✨ Successfully initialized all pages!');
    console.log(`📄 Total pages created: ${pages.length}`);
    
    // Also create pages by slug for easier lookup
    console.log('\n🔄 Creating pages by slug...');
    const slugBatch = db.batch();
    
    for (const page of pages) {
      const slugRef = pagesRef.doc(page.slug);
      const existingDoc = await slugRef.get();
      
      if (!existingDoc.exists) {
        const pageData = {
          ...page,
          sections: [],
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        };
        slugBatch.set(slugRef, pageData);
        console.log(`✅ Created page by slug: ${page.slug}`);
      } else {
        console.log(`⏭️  Page ${page.slug} already exists, skipping...`);
      }
    }
    
    await slugBatch.commit();
    console.log('\n✨ All pages initialized successfully!');
    
  } catch (error) {
    console.error('❌ Error initializing pages:', error);
    throw error;
  }
}

// Run the initialization
initPages()
  .then(() => {
    console.log('\n✅ Pages initialization complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Pages initialization failed:', error);
    process.exit(1);
  });

