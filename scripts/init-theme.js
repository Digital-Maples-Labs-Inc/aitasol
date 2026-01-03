/**
 * Initialize default theme in Firestore
 * Run with: node scripts/init-theme.js
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

// Default theme colors
const defaultThemeColors = {
  primary: '#0099FF',
  primaryLight: '#80CCFF',
  primaryDark: '#0066CC',
  background: '#FFFFFF',
  backgroundSecondary: '#F5F5F5',
  backgroundTertiary: '#E5E7EB',
  textPrimary: '#1A1A1A',
  textSecondary: '#666666',
  textTertiary: '#999999',
  accent1: '#88E5D0',
  accent2: '#F5A5A5',
  accent3: '#FFB366',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  shadow: '#000000',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
};

async function initTheme() {
  try {
    console.log('🎨 Initializing default theme...\n');

    // Check if active theme already exists
    const themesRef = db.collection('themes');
    const activeQuery = await themesRef.where('isActive', '==', true).get();

    if (!activeQuery.empty) {
      console.log('✅ Active theme already exists');
      activeQuery.forEach((doc) => {
        console.log(`   Theme: ${doc.data().name} (ID: ${doc.id})`);
      });
      return;
    }

    // Create default theme
    const themeData = {
      name: 'Default Theme',
      colors: defaultThemeColors,
      isActive: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection('themes').doc('default').set(themeData);
    console.log('✅ Created default theme');
    console.log('\n📋 Theme colors initialized:');
    console.log(`   Primary: ${defaultThemeColors.primary}`);
    console.log(`   Background: ${defaultThemeColors.background}`);
    console.log(`   Text Primary: ${defaultThemeColors.textPrimary}`);
    console.log('\n✨ Theme is now active and ready to use!');
  } catch (error) {
    console.error('❌ Error initializing theme:', error);
    process.exit(1);
  }
}

initTheme().then(() => {
  process.exit(0);
});

