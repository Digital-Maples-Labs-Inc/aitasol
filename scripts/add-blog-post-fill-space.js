/**
 * Add a Blog Post to Fill the MainContent Layout Space
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

// New blog post to fill the layout space
const newBlogPost = {
  title: 'Understanding Canadian Education System: Colleges vs Universities',
  slug: 'understanding-canadian-education-system-colleges-vs-universities',
  content: 'The Canadian education system offers both colleges and universities, each with distinct advantages. Understanding the differences is crucial for making the right choice for your educational goals. Colleges typically focus on practical, career-oriented programs with shorter durations, while universities offer academic degrees and research opportunities. Learn about the different types of institutions, program structures, admission requirements, and career outcomes. Discover which path aligns best with your goals - whether you\'re seeking quick entry into the workforce or pursuing advanced academic research. This comprehensive guide will help you navigate the Canadian education landscape and make an informed decision about your educational journey.',
  excerpt: 'Learn the key differences between Canadian colleges and universities. Understand program structures, admission requirements, and which path is right for your career goals.',
  author: 'admin',
  authorName: 'AitaSol Team',
  status: 'published',
  featuredImage: 'https://picsum.photos/800/450?random=12',
  tags: ['Study in Canada', 'Admissions'],
};

async function addBlogPost() {
  console.log('🚀 Adding new blog post to fill MainContent layout space...\n');

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
    console.log(`\n🎨 This post will help fill the MainContent component layout!`);
    
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
    console.log('📱 Refresh your blog page to see the updated layout.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Failed to add blog post:', error);
    process.exit(1);
  });

