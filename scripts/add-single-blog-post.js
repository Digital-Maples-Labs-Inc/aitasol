/**
 * Add a Single Blog Post to Firestore
 */

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Initialize Firebase Admin - check multiple possible filenames
const possiblePaths = [
  process.env.FIREBASE_SERVICE_ACCOUNT_PATH,
  path.join(__dirname, '../firebase-service-account.json'),
  path.join(__dirname, '../serviceAccountKey.json'),
].filter(Boolean);

let serviceAccount;

for (const possiblePath of possiblePaths) {
  if (fs.existsSync(possiblePath)) {
    try {
      serviceAccount = require(possiblePath);
      console.log(`✅ Loaded service account from ${path.basename(possiblePath)}\n`);
      break;
    } catch (error) {
      // Continue to next path
    }
  }
}

if (!serviceAccount) {
  console.error('❌ Error loading service account');
  console.error('Please set FIREBASE_SERVICE_ACCOUNT_PATH or place firebase-service-account.json in the root directory');
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// New blog post
const newBlogPost = {
  title: 'How to Choose the Right Program: A Step-by-Step Guide for International Students',
  slug: 'how-to-choose-right-program-step-by-step-guide',
  content: 'Choosing the right program is one of the most important decisions you\'ll make as an international student. This comprehensive guide walks you through the process step by step. Learn how to assess your interests and career goals, research programs and universities, understand admission requirements, and make an informed decision that aligns with your future aspirations. We\'ll cover factors like program reputation, career outcomes, location, cost, and support services available to international students. Get expert tips on comparing programs, talking to current students, and visiting campuses virtually. Make the right choice for your Canadian education journey with confidence.',
  excerpt: 'Learn how to choose the perfect program for your Canadian education. This step-by-step guide covers everything from assessing your goals to comparing programs and making an informed decision.',
  author: 'admin',
  authorName: 'AitaSol Team',
  status: 'published',
  featuredImage: 'https://picsum.photos/800/450?random=11',
  tags: ['Admissions', 'Study in Canada'],
};

async function addBlogPost() {
  console.log('🚀 Adding new blog post to Firestore...\n');

  try {
    const blogsRef = db.collection('blogs');
    
    // Check if blog post already exists
    const slugQuery = await blogsRef.where('slug', '==', newBlogPost.slug).get();
    
    if (!slugQuery.empty) {
      console.log(`⏭️  Blog post "${newBlogPost.title}" already exists, skipping...`);
      process.exit(0);
    }

    // Create new blog post
    const blogRef = blogsRef.doc();
    const blogData = {
      ...newBlogPost,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      publishedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    
    await blogRef.set(blogData);
    console.log(`✅ Successfully added blog post: ${newBlogPost.title}`);
    console.log(`📝 Slug: ${newBlogPost.slug}`);
    console.log(`🏷️  Tags: ${newBlogPost.tags.join(', ')}`);
    console.log(`📊 Status: ${newBlogPost.status}`);
    
  } catch (error) {
    console.error('❌ Error adding blog post:', error);
    throw error;
  }
}

// Run the script
addBlogPost()
  .then(() => {
    console.log('\n✅ Blog post added successfully!');
    console.log('🔄 The post will automatically appear on your website via real-time sync.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Failed to add blog post:', error);
    process.exit(1);
  });

