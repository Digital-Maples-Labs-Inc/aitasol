/**
 * Add Missing Pages using Firebase Admin SDK with token-based auth
 * This will prompt for Firebase CLI login if needed
 */

const admin = require('firebase-admin');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function getFirebaseToken() {
  console.log('🔐 Getting Firebase access token...\n');
  
  try {
    // Try to get token from Firebase CLI
    console.log('Attempting to get token from Firebase CLI...');
    const token = execSync('firebase login:ci --no-localhost', { 
      encoding: 'utf8',
      stdio: 'pipe'
    }).trim();
    
    if (token && token.length > 20) {
      console.log('✅ Got token from Firebase CLI');
      return token;
    }
  } catch (error) {
    console.log('⚠️  Could not get token automatically');
  }
  
  // Manual token input
  console.log('\n📝 Please provide a Firebase access token:');
  console.log('   1. Go to: https://console.firebase.google.com/project/aitasol/settings/serviceaccounts/adminsdk');
  console.log('   2. Click "Generate new private key"');
  console.log('   3. Save the JSON file');
  console.log('   4. Or run: firebase login:ci');
  console.log('\n');
  
  const answer = await question('Do you have a service account JSON file? (y/n): ');
  
  if (answer.toLowerCase() === 'y') {
    const filePath = await question('Enter the path to the JSON file: ');
    try {
      const serviceAccount = require(filePath);
      return serviceAccount;
    } catch (error) {
      console.error('❌ Could not load service account file:', error.message);
      process.exit(1);
    }
  } else {
    console.log('\n💡 Alternative: You can add pages manually using the Firebase Console.');
    console.log('   See: scripts/ADD_PAGES_MANUAL.md for instructions');
    rl.close();
    process.exit(0);
  }
}

const pages = [
  {
    slug: 'study-in-canada',
    title: 'Study in Canada',
    seoTitle: 'Study in Canada - AitaSol Education Consultancy',
    seoDescription: 'Everything you need to know about studying in Canada. Programs, institutions, requirements, and the application process.',
    published: true,
    sections: [
      { id: 'service-hero', type: 'heading', content: 'Study in Canada', editable: true },
      { id: 'service-intro', type: 'paragraph', content: 'Canada offers world-class education with diverse programs and institutions. Learn about the opportunities available for international students.', editable: true },
      { id: 'service-content', type: 'paragraph', content: 'Our team provides expert guidance on selecting the right program, understanding admission requirements, and navigating the application process.', editable: true },
    ],
  },
  {
    slug: 'immigration-study-permits',
    title: 'Immigration & Study Permits',
    seoTitle: 'Immigration & Study Permits - AitaSol Education Consultancy',
    seoDescription: 'Expert assistance with study permit applications and immigration pathways to Canada.',
    published: true,
    sections: [
      { id: 'service-hero', type: 'heading', content: 'Immigration & Study Permits', editable: true },
      { id: 'service-intro', type: 'paragraph', content: 'Navigating the study permit application process can be complex. We provide expert assistance to help you succeed.', editable: true },
      { id: 'service-content', type: 'paragraph', content: 'Our services include document preparation, application review, and guidance on immigration pathways to Canada.', editable: true },
    ],
  },
  {
    slug: 'admissions-support',
    title: 'Admissions Support',
    seoTitle: 'Admissions Support - AitaSol Education Consultancy',
    seoDescription: 'Professional admissions support for Canadian universities and colleges. Application assistance and document preparation.',
    published: true,
    sections: [
      { id: 'service-hero', type: 'heading', content: 'Admissions Support', editable: true },
      { id: 'service-intro', type: 'paragraph', content: 'Get professional assistance with your university and college applications in Canada.', editable: true },
      { id: 'service-content', type: 'paragraph', content: 'We help with application preparation, document review, university selection, and ensuring all requirements are met.', editable: true },
    ],
  },
  {
    slug: 'career-counseling',
    title: 'Career Counseling',
    seoTitle: 'Career Counseling - AitaSol Education Consultancy',
    seoDescription: 'Career guidance and professional development services for students and professionals in Canada.',
    published: true,
    sections: [
      { id: 'service-hero', type: 'heading', content: 'Career Counseling', editable: true },
      { id: 'service-intro', type: 'paragraph', content: 'Plan your career path with expert guidance and professional development support.', editable: true },
      { id: 'service-content', type: 'paragraph', content: 'We provide career guidance, job market insights, resume assistance, and professional development services to help you succeed in Canada.', editable: true },
    ],
  },
  {
    slug: 'testimonials',
    title: 'Testimonials',
    seoTitle: 'Student Testimonials - AitaSol Education Consultancy',
    seoDescription: 'Read success stories and testimonials from students who have used AitaSol services.',
    published: true,
    sections: [
      { id: 'testimonials-hero', type: 'heading', content: 'Success Stories & Testimonials', editable: true },
      { id: 'testimonials-intro', type: 'paragraph', content: 'Read about the experiences of students who have successfully achieved their Canadian education dreams with our help.', editable: true },
    ],
  },
  {
    slug: 'blog',
    title: 'Blog',
    seoTitle: 'Blog - AitaSol Education Consultancy',
    seoDescription: 'Latest articles about studying in Canada, immigration, student life, and career opportunities.',
    published: true,
    sections: [
      { id: 'blog-hero', type: 'heading', content: 'Blog', editable: true },
      { id: 'blog-intro', type: 'paragraph', content: 'Stay informed with our latest articles about studying in Canada, immigration, and student life.', editable: true },
    ],
  },
];

async function addPages(serviceAccount) {
  let app;
  try {
    if (typeof serviceAccount === 'string') {
      // Token string - can't use directly with Admin SDK
      console.error('❌ Token-based auth not supported. Please use service account JSON.');
      process.exit(1);
    } else {
      // Service account object
      app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: 'aitasol',
      });
    }
  } catch (error) {
    if (error.code === 'app/duplicate-app') {
      app = admin.app();
    } else {
      throw error;
    }
  }

  const db = admin.firestore();
  console.log('\n🚀 Adding pages to Firestore...\n');

  let addedCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  for (const page of pages) {
    try {
      const pagesRef = db.collection('pages');
      const slugQuery = await pagesRef.where('slug', '==', page.slug).limit(1).get();
      
      if (!slugQuery.empty) {
        const existingDoc = slugQuery.docs[0];
        const existingData = existingDoc.data();
        const needsUpdate = !existingData.sections || existingData.sections.length === 0;
        
        if (needsUpdate) {
          await existingDoc.ref.update({
            ...page,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
          console.log(`🔄 Updated: ${page.slug}`);
          updatedCount++;
        } else {
          console.log(`⏭️  Skipped: ${page.slug}`);
          skippedCount++;
        }
      } else {
        const pageRef = pagesRef.doc(page.slug);
        await pageRef.set({
          ...page,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log(`✅ Added: ${page.slug} (${page.title})`);
        addedCount++;
      }
    } catch (error) {
      console.error(`❌ Error with ${page.slug}:`, error.message);
    }
  }

  console.log('\n✨ Complete!');
  console.log(`📄 Added: ${addedCount}`);
  console.log(`🔄 Updated: ${updatedCount}`);
  console.log(`⏭️  Skipped: ${skippedCount}`);
  
  rl.close();
}

(async () => {
  try {
    const credentials = await getFirebaseToken();
    await addPages(credentials);
    console.log('\n✅ All pages processed!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Failed:', error.message);
    rl.close();
    process.exit(1);
  }
})();

