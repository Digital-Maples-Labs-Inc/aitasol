/**
 * Check current Firestore structure
 * Run with: node scripts/check-firestore-structure.js
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

async function checkStructure() {
  try {
    console.log('🔍 Checking Firestore structure...\n');

    // Check pages collection
    const pagesRef = db.collection('pages');
    const pagesSnapshot = await pagesRef.get();

    console.log(`📄 Pages Collection: ${pagesSnapshot.size} document(s)\n`);

    if (pagesSnapshot.empty) {
      console.log('   No pages found.\n');
    } else {
      pagesSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`   Document ID: ${doc.id}`);
        console.log(`   - Slug: ${data.slug || 'N/A'}`);
        console.log(`   - Title: ${data.title || 'N/A'}`);
        console.log(`   - Published: ${data.published ? 'Yes' : 'No'}`);
        console.log(`   - Sections: ${data.sections?.length || 0} section(s)`);
        
        if (data.sections && data.sections.length > 0) {
          console.log(`   - Section IDs:`);
          data.sections.forEach((section, index) => {
            console.log(`     ${index + 1}. ${section.id} (${section.type})`);
          });
        }
        console.log('');
      });
    }

    // Check users collection
    const usersRef = db.collection('users');
    const usersSnapshot = await usersRef.get();

    console.log(`👥 Users Collection: ${usersSnapshot.size} document(s)\n`);

    if (usersSnapshot.empty) {
      console.log('   No users found.\n');
    } else {
      usersSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`   Document ID: ${doc.id}`);
        console.log(`   - Email: ${data.email || 'N/A'}`);
        console.log(`   - Role: ${data.role || 'N/A'}`);
        console.log('');
      });
    }

    // Check blogs collection
    const blogsRef = db.collection('blogs');
    const blogsSnapshot = await blogsRef.get();

    console.log(`📝 Blogs Collection: ${blogsSnapshot.size} document(s)\n`);

    if (blogsSnapshot.empty) {
      console.log('   No blogs found.\n');
    } else {
      blogsSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`   Document ID: ${doc.id}`);
        console.log(`   - Title: ${data.title || 'N/A'}`);
        console.log(`   - Slug: ${data.slug || 'N/A'}`);
        console.log(`   - Status: ${data.status || 'N/A'}`);
        console.log('');
      });
    }

    // Get detailed home page structure
    const homeDoc = await pagesRef.doc('home').get();
    if (homeDoc.exists) {
      console.log('🏠 Home Page Detailed Structure:\n');
      const homeData = homeDoc.data();
      console.log(JSON.stringify(homeData, null, 2));
    }

    console.log('\n✅ Structure check complete!');
  } catch (error) {
    console.error('❌ Error checking structure:', error);
    process.exit(1);
  }
}

checkStructure().then(() => {
  process.exit(0);
});

