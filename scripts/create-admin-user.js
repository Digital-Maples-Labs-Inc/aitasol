/**
 * Create admin user document in Firestore
 * Usage: node scripts/create-admin-user.js <USER_UID> <EMAIL>
 * 
 * Example: node scripts/create-admin-user.js abc123xyz admin@example.com
 * 
 * Requires: serviceAccountKey.json in project root
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
  console.error('3. Save the file as: serviceAccountKey.json in the project root\n');
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'aitasol',
});

const db = admin.firestore();

async function createAdminUser(uid, email) {
  try {
    if (!uid || !email) {
      console.error('❌ Usage: node scripts/create-admin-user.js <USER_UID> <EMAIL>');
      console.error('   Example: node scripts/create-admin-user.js abc123xyz admin@example.com');
      process.exit(1);
    }

    console.log('🚀 Creating admin user document...\n');

    const userData = {
      email: email,
      role: 'admin',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection('users').doc(uid).set(userData);
    console.log(`✅ Created admin user document for: ${email}`);
    console.log(`   UID: ${uid}`);
    console.log(`   Role: admin`);
    console.log('\n✨ You can now login with this user!');
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  }
}

const uid = process.argv[2];
const email = process.argv[3];

createAdminUser(uid, email).then(() => {
  process.exit(0);
});

