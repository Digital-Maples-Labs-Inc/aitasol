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

    // Create initial home page with AitahSolutions content
    const homePage = {
      slug: 'home',
      title: 'Home',
      published: true,
      sections: [
        {
          id: 'company-name',
          type: 'heading',
          content: 'AitahSolutions Educational Consultancy',
          editable: true,
        },
        {
          id: 'year-founded',
          type: 'paragraph',
          content: 'Year Founded: 2019',
          editable: true,
        },
        {
          id: 'main-heading',
          type: 'heading',
          content: 'Clear Guidance for Global Education Decisions',
          editable: true,
        },
        {
          id: 'main-description',
          type: 'paragraph',
          content: 'AitahSolutions Educational Consultancy supports students in making informed, ethical, and realistic decisions about studying abroad. Since 2019, we have guided students through program selection, applications, documentation, funding awareness, and pre-departure preparation with clarity and integrity.',
          editable: true,
        },
        {
          id: 'philosophy-text',
          type: 'paragraph',
          content: 'We understand that international education is a major financial and life decision. Our role is not to sell opportunities, but to help students evaluate them critically — based on academic readiness, financial sustainability, and long-term career alignment.',
          editable: true,
        },
        {
          id: 'partnership-text',
          type: 'paragraph',
          content: 'We work with established education platforms and professional partners while remaining independent in our advice. Admissions decisions, visas, and funding outcomes are never guaranteed; informed decision-making is.',
          editable: true,
        },
        {
          id: 'what-we-do-heading',
          type: 'heading',
          content: 'What We Do',
          editable: true,
        },
        {
          id: 'services-list',
          type: 'paragraph',
          content: '• Match students with suitable programs and institutions\n• Support accurate and compliant application processes\n• Guide admissions documentation preparation\n• Provide scholarship and funding information\n• Offer career counselling and pathway planning\n• Coordinate pre-arrival and settlement support',
          editable: true,
        },
        {
          id: 'tagline',
          type: 'paragraph',
          content: '📌 Ethical guidance. Transparent processes. Student-centered outcomes.',
          editable: true,
        },
        {
          id: 'cta-section',
          type: 'cta',
          content: '',
          editable: true,
          metadata: {
            ctaText: '👉 Book a Consultation',
            ctaLink: '/contact',
          },
        },
      ],
      seoTitle: 'AitahSolutions Educational Consultancy - Clear Guidance for Global Education Decisions',
      seoDescription: 'AitahSolutions Educational Consultancy supports students in making informed, ethical, and realistic decisions about studying abroad. Since 2019, we have guided students through program selection, applications, documentation, funding awareness, and pre-departure preparation.',
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

