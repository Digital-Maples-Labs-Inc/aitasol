/**
 * Initialize Firestore data using Service Account
 * 
 * SETUP:
 * 1. Go to: https://console.firebase.google.com/project/aitasol/settings/serviceaccounts/adminsdk
 * 2. Click "Generate new private key"
 * 3. Save the file as: serviceAccountKey.json (in project root)
 * 4. Run: node scripts/init-firestore-with-service-account.js
 */

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Check if service account key exists
const serviceAccountPath = path.join(__dirname, '..', 'serviceAccountKey.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ serviceAccountKey.json not found!');
  console.error('\n📋 To get your service account key:');
  console.error('1. Go to: https://console.firebase.google.com/project/aitasol/settings/serviceaccounts/adminsdk');
  console.error('2. Click "Generate new private key"');
  console.error('3. Save the file as: serviceAccountKey.json in the project root');
  console.error('4. Run this script again\n');
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'aitasol',
});

const db = admin.firestore();

async function initFirestore() {
  try {
    console.log('🚀 Initializing Firestore collections...\n');

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
            imageUrl: '/assets/images/hero-placeholder.jpg',
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
          content: 'We are dedicated to helping students navigate their educational journey with expert guidance and personalized support.',
          editable: true,
        },
      ],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection('pages').doc('about').set(aboutPage);
    console.log('✅ Created about page');

    // Create services page
    const servicesPage = {
      slug: 'services',
      title: 'Our Services',
      published: true,
      sections: [
        {
          id: 'services-heading',
          type: 'heading',
          content: 'Our Services',
          editable: true,
        },
        {
          id: 'services-text',
          type: 'paragraph',
          content: 'We offer comprehensive educational consultancy services to help you achieve your academic goals.',
          editable: true,
        },
      ],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection('pages').doc('services').set(servicesPage);
    console.log('✅ Created services page');

    // Create contact page
    const contactPage = {
      slug: 'contact',
      title: 'Contact Us',
      published: true,
      sections: [
        {
          id: 'contact-heading',
          type: 'heading',
          content: 'Get in Touch',
          editable: true,
        },
        {
          id: 'contact-text',
          type: 'paragraph',
          content: 'We would love to hear from you. Reach out to us for any questions or inquiries.',
          editable: true,
        },
      ],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection('pages').doc('contact').set(contactPage);
    console.log('✅ Created contact page');

    console.log('\n✅ Firestore initialization complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Create an admin user in Firebase Authentication:');
    console.log('   https://console.firebase.google.com/project/aitasol/authentication/users');
    console.log('2. After creating the user, note the User UID');
    console.log('3. Run: node scripts/create-admin-user.js <USER_UID> <EMAIL>');
    console.log('4. Start the app: npm start');
    console.log('5. Login and start editing content!');
  } catch (error) {
    console.error('❌ Error initializing Firestore:', error.message);
    console.error(error);
    process.exit(1);
  }
}

initFirestore().then(() => {
  console.log('\n✨ Done!');
  process.exit(0);
});

