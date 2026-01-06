/**
 * Initialize Sample Blog Posts in Firestore
 * Creates sample blog posts from the existing hardcoded data
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
let serviceAccountPath;

for (const possiblePath of possiblePaths) {
  if (fs.existsSync(possiblePath)) {
    try {
      serviceAccount = require(possiblePath);
      serviceAccountPath = possiblePath;
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

// Sample blog posts relevant to education consultancy and studying in Canada
const blogPosts = [
  {
    title: 'Why Study in Canada: Top 10 Benefits for International Students',
    slug: 'why-study-in-canada-top-10-benefits',
    content: 'Canada has become one of the most popular destinations for international students, and for good reason. From world-class education to post-graduation work opportunities, discover the top 10 benefits of studying in Canada. Learn about the quality of education, multicultural environment, safety, and the pathway to permanent residency that makes Canada an ideal choice for your educational journey.',
    excerpt: 'Discover why Canada is one of the top destinations for international students. From world-class education to post-graduation opportunities, learn about the benefits that make Canada an ideal choice.',
    author: 'admin',
    authorName: 'AitaSol Team',
    status: 'published',
    featuredImage: 'https://picsum.photos/800/450?random=1',
    tags: ['Study in Canada'],
  },
  {
    title: 'Complete Guide to Study Permit Application Process',
    slug: 'complete-guide-study-permit-application',
    content: 'Navigating the study permit application process can be overwhelming. This comprehensive guide walks you through every step, from gathering required documents to submitting your application. Learn about eligibility requirements, processing times, and common mistakes to avoid. Get expert tips to increase your chances of approval and start your Canadian education journey with confidence.',
    excerpt: 'A step-by-step guide to applying for a Canadian study permit. Learn about requirements, documents needed, and tips for a successful application.',
    author: 'admin',
    authorName: 'AitaSol Team',
    status: 'published',
    featuredImage: 'https://picsum.photos/800/450?random=2',
    tags: ['Immigration'],
  },
  {
    title: 'Top Universities in Canada for International Students',
    slug: 'top-universities-canada-international-students',
    content: 'Canada is home to some of the world\'s best universities. Explore our curated list of top Canadian universities, their programs, admission requirements, and what makes each institution unique. Whether you\'re interested in engineering, business, arts, or sciences, find the perfect university that matches your academic goals and career aspirations.',
    excerpt: 'Discover the best universities in Canada for international students. Learn about top-ranked institutions, their programs, and admission requirements.',
    author: 'admin',
    authorName: 'AitaSol Team',
    status: 'published',
    featuredImage: 'https://picsum.photos/800/450?random=3',
    tags: ['Admissions'],
  },
  {
    title: 'Student Life in Canada: What to Expect',
    slug: 'student-life-canada-what-to-expect',
    content: 'Moving to a new country for studies is both exciting and challenging. Learn what to expect from student life in Canada, including accommodation options, cost of living, part-time work opportunities, and cultural adaptation. Get practical tips on making friends, managing finances, and making the most of your Canadian education experience.',
    excerpt: 'Get insights into student life in Canada. Learn about accommodation, cost of living, work opportunities, and tips for adapting to Canadian culture.',
    author: 'admin',
    authorName: 'AitaSol Team',
    status: 'published',
    featuredImage: 'https://picsum.photos/800/450?random=4',
    tags: ['Student Life'],
  },
  {
    title: 'Post-Graduation Work Permit: Your Path to Canadian Experience',
    slug: 'post-graduation-work-permit-path-canadian-experience',
    content: 'The Post-Graduation Work Permit (PGWP) is one of the most valuable benefits of studying in Canada. Learn how to qualify, apply, and maximize your work permit duration. Discover how Canadian work experience can lead to permanent residency and build a successful career in Canada after graduation.',
    excerpt: 'Learn about the Post-Graduation Work Permit program and how it can help you gain Canadian work experience and potentially lead to permanent residency.',
    author: 'admin',
    authorName: 'AitaSol Team',
    status: 'published',
    featuredImage: 'https://picsum.photos/800/450?random=5',
    tags: ['Immigration', 'Career'],
  },
  {
    title: 'Scholarships and Financial Aid for International Students in Canada',
    slug: 'scholarships-financial-aid-international-students',
    content: 'Studying in Canada is an investment in your future, but it doesn\'t have to break the bank. Discover various scholarship opportunities, financial aid programs, and funding options available for international students. Learn how to apply, eligibility criteria, and tips for securing financial support for your Canadian education.',
    excerpt: 'Explore scholarship and financial aid opportunities for international students in Canada. Learn how to fund your education and reduce costs.',
    author: 'admin',
    authorName: 'AitaSol Team',
    status: 'published',
    featuredImage: 'https://picsum.photos/800/450?random=6',
    tags: ['Admissions'],
  },
  {
    title: 'IELTS vs TOEFL: Which English Test Should You Take for Canada?',
    slug: 'ielts-vs-toefl-which-english-test-canada',
    content: 'Most Canadian universities require proof of English proficiency. Compare IELTS and TOEFL tests to determine which one is right for you. Learn about test formats, scoring, acceptance rates, and preparation strategies. Get expert advice on choosing the test that best matches your strengths and university requirements.',
    excerpt: 'Compare IELTS and TOEFL tests for Canadian university applications. Learn which test is right for you and how to prepare effectively.',
    author: 'admin',
    authorName: 'AitaSol Team',
    status: 'published',
    featuredImage: 'https://picsum.photos/800/450?random=7',
    tags: ['Admissions'],
  },
  {
    title: 'From Student to Permanent Resident: Immigration Pathways',
    slug: 'student-to-permanent-resident-immigration-pathways',
    content: 'Many international students choose to stay in Canada after graduation. Explore the various immigration pathways available, including Express Entry, Provincial Nominee Programs, and the Canadian Experience Class. Learn about eligibility requirements, application processes, and how your Canadian education and work experience can fast-track your path to permanent residency.',
    excerpt: 'Discover how to transition from international student to permanent resident in Canada. Learn about Express Entry, PNP, and other immigration pathways.',
    author: 'admin',
    authorName: 'AitaSol Team',
    status: 'published',
    featuredImage: 'https://picsum.photos/800/450?random=8',
    tags: ['Immigration'],
  },
  {
    title: 'Best Cities in Canada for International Students',
    slug: 'best-cities-canada-international-students',
    content: 'Choosing the right city is as important as choosing the right university. Explore Canada\'s best cities for international students, including Toronto, Vancouver, Montreal, and Calgary. Compare factors like cost of living, job opportunities, cultural diversity, and quality of life to find the perfect city for your studies and future career.',
    excerpt: 'Compare the best cities in Canada for international students. Learn about cost of living, job opportunities, and quality of life in major Canadian cities.',
    author: 'admin',
    authorName: 'AitaSol Team',
    status: 'published',
    featuredImage: 'https://picsum.photos/800/450?random=9',
    tags: ['Study in Canada'],
  },
  {
    title: 'Success Story: How Sarah Achieved Her Canadian Education Dream',
    slug: 'success-story-sarah-canadian-education-dream',
    content: 'Read Sarah\'s inspiring journey from applying to Canadian universities to securing her study permit and thriving as an international student. Learn about the challenges she faced, how AitaSol helped her navigate the process, and her tips for future students. Discover how determination and the right guidance can make your Canadian education dream a reality.',
    excerpt: 'Read an inspiring success story of a student who achieved her dream of studying in Canada with AitaSol\'s guidance and support.',
    author: 'admin',
    authorName: 'AitaSol Team',
    status: 'published',
    featuredImage: 'https://picsum.photos/800/450?random=10',
    tags: ['Success Stories'],
  },
];

async function initBlogPosts() {
  console.log('🚀 Initializing blog posts collection...\n');

  try {
    const batch = db.batch();
    const blogsRef = db.collection('blogs');
    
    for (const post of blogPosts) {
      // Check if blog post already exists
      const slugQuery = await blogsRef.where('slug', '==', post.slug).get();
      
      if (!slugQuery.empty) {
        console.log(`⏭️  Blog post "${post.title}" already exists, skipping...`);
        continue;
      }

      const blogRef = blogsRef.doc();
      const blogData = {
        ...post,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        publishedAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      
      batch.set(blogRef, blogData);
      console.log(`✅ Prepared blog post: ${post.title}`);
    }

    await batch.commit();
    console.log('\n✨ Successfully initialized blog posts!');
    console.log(`📝 Total blog posts created: ${blogPosts.length}`);
    
  } catch (error) {
    console.error('❌ Error initializing blog posts:', error);
    throw error;
  }
}

// Run the initialization
initBlogPosts()
  .then(() => {
    console.log('\n✅ Blog posts initialization complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Blog posts initialization failed:', error);
    process.exit(1);
  });

