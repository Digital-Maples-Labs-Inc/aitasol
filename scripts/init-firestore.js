/**
 * Script to initialize Firestore collections
 * Run with: node scripts/init-firestore.js
 * 
 * This creates initial data structure in Firestore
 */

const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json'); // You'll need to download this from Firebase Console

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function initFirestore() {
  try {
    console.log('Initializing Firestore collections...');

    // Create initial home page
    const homePage = {
      slug: 'home',
      title: 'Home',
      published: true,
      sections: [
        {
          id: 'hero-heading',
          type: 'heading',
          content: 'Welcome to Aitasol Education Consultancy',
          editable: true,
        },
        {
          id: 'hero-text',
          type: 'paragraph',
          content: 'We help students achieve their educational goals with expert guidance and support.',
          editable: true,
        },
        {
          id: 'hero-image',
          type: 'image',
          content: '',
          editable: true,
          metadata: {
            imageUrl: '/assets/placeholder-hero.jpg',
            imageAlt: 'Education consultancy',
          },
        },
        {
          id: 'cta-section',
          type: 'cta',
          content: '',
          editable: true,
          metadata: {
            ctaText: 'Get Started',
            ctaLink: '/contact',
          },
        },
      ],
      seoTitle: 'Aitasol Education Consultancy - Expert Educational Guidance',
      seoDescription: 'Professional education consultancy services to help students achieve their academic goals.',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection('pages').doc('home').set(homePage);
    console.log('✅ Created home page');

    // Create about page
    const aboutPage = {
      slug: 'about',
      title: 'About Us',
      published: true,
      sections: [
        {
          id: 'about-heading',
          type: 'heading',
          content: 'About Aitasol',
          editable: true,
        },
        {
          id: 'about-text',
          type: 'paragraph',
          content: 'We are dedicated to helping students navigate their educational journey.',
          editable: true,
        },
      ],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection('pages').doc('about').set(aboutPage);
    console.log('✅ Created about page');

    console.log('\n✅ Firestore initialization complete!');
    console.log('\nNext steps:');
    console.log('1. Create an admin user in Authentication');
    console.log('2. Create a user document in Firestore with role: "admin"');
    console.log('3. Sign in and start editing content!');
  } catch (error) {
    console.error('Error initializing Firestore:', error);
    process.exit(1);
  }
}

initFirestore().then(() => {
  process.exit(0);
});

