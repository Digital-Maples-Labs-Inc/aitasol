/**
 * Update home page with new AitahSolutions content
 * Run with: node scripts/update-home-page.js
 * 
 * Requires: serviceAccountKey.json in project root
 */

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Load service account key
const serviceAccountPath = path.join(__dirname, '..', 'serviceAccountKey.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ serviceAccountKey.json not found!');
  console.log('Please download it from:');
  console.log('https://console.firebase.google.com/project/aitasol/settings/serviceaccounts/adminsdk');
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

// Initialize Firebase Admin
let app;
try {
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  app = admin.app();
}

const db = admin.firestore();

async function updateHomePage() {
  try {
    console.log('🔄 Updating home page with new AitahSolutions content...\n');

    // New home page structure with AitahSolutions content
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
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Update the home page (preserve createdAt if it exists)
    const homeRef = db.collection('pages').doc('home');
    const homeDoc = await homeRef.get();
    
    if (homeDoc.exists) {
      const existingData = homeDoc.data();
      homePage.createdAt = existingData.createdAt; // Preserve original creation date
    } else {
      homePage.createdAt = admin.firestore.FieldValue.serverTimestamp();
    }

    await homeRef.set(homePage, { merge: false });
    console.log('✅ Home page updated successfully!');
    console.log('\n📋 Updated sections:');
    homePage.sections.forEach((section, index) => {
      console.log(`   ${index + 1}. ${section.id} (${section.type})`);
    });
    console.log('\n✨ Done! The home page now has the new AitahSolutions content.');
  } catch (error) {
    console.error('❌ Error updating home page:', error);
    process.exit(1);
  }
}

updateHomePage().then(() => {
  process.exit(0);
});

