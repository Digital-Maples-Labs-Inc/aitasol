/**
 * Script to verify and create user document in Firestore
 * Run with: node scripts/verify-user-doc.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('../firebase-service-account.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

async function verifyUserDocument(userId, email, role = 'admin') {
  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      console.log(`❌ User document does not exist for ${userId}`);
      console.log(`Creating user document...`);
      
      await userRef.set({
        email: email,
        role: role,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      
      console.log(`✅ User document created successfully!`);
      console.log(`   User ID: ${userId}`);
      console.log(`   Email: ${email}`);
      console.log(`   Role: ${role}`);
    } else {
      const data = userDoc.data();
      console.log(`✅ User document exists:`);
      console.log(`   User ID: ${userId}`);
      console.log(`   Email: ${data.email || 'N/A'}`);
      console.log(`   Role: ${data.role || 'N/A'}`);
      
      if (data.role !== role) {
        console.log(`⚠️  Role mismatch! Updating role to '${role}'...`);
        await userRef.update({
          role: role,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log(`✅ Role updated successfully!`);
      }
    }
  } catch (error) {
    console.error('Error verifying user document:', error);
    throw error;
  }
}

// Get user ID from command line or use the one from the error
const userId = process.argv[2] || 'tPaDma0gEbdF507FwuoiLB6hFfq2';
const email = process.argv[3] || 'atmundure@gmail.com';
const role = process.argv[4] || 'admin';

console.log('Verifying user document...\n');
verifyUserDocument(userId, email, role)
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Error:', error);
    process.exit(1);
  });

