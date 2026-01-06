/**
 * Add Missing Pages to Firestore using Firebase REST API
 * This script uses Firebase REST API to add pages directly
 */

const https = require('https');
const { execSync } = require('child_process');

const PROJECT_ID = 'aitasol';
const COLLECTION = 'pages';

// Get Firebase access token
function getAccessToken() {
  try {
    // Try to get token using Firebase CLI
    const result = execSync('firebase login:ci --no-localhost 2>&1', { encoding: 'utf8' });
    // If it prompts, we need interactive login
    if (result.includes('token')) {
      return result.trim();
    }
  } catch (error) {
    // Ignore
  }
  
  // Try using gcloud
  try {
    const token = execSync('gcloud auth print-access-token', { encoding: 'utf8' }).trim();
    if (token) return token;
  } catch (error) {
    // Ignore
  }
  
  return null;
}

// Pages to add
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

// Make HTTP request to Firestore REST API
function makeRequest(method, path, data = null, accessToken) {
  return new Promise((resolve, reject) => {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${path}`;
    const urlObj = new URL(url);
    
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname + (urlObj.search || ''),
      method: method,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body || '{}'));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Convert page data to Firestore document format
function pageToFirestoreDoc(page) {
  const now = new Date().toISOString();
  return {
    fields: {
      slug: { stringValue: page.slug },
      title: { stringValue: page.title },
      seoTitle: { stringValue: page.seoTitle },
      seoDescription: { stringValue: page.seoDescription },
      published: { booleanValue: page.published },
      sections: {
        arrayValue: {
          values: page.sections.map(section => ({
            mapValue: {
              fields: {
                id: { stringValue: section.id },
                type: { stringValue: section.type },
                content: { stringValue: section.content },
                editable: { booleanValue: section.editable },
              },
            },
          })),
        },
      },
      createdAt: { timestampValue: now },
      updatedAt: { timestampValue: now },
    },
  };
}

async function addPages() {
  console.log('🚀 Adding missing pages to Firestore via REST API...\n');

  const accessToken = getAccessToken();
  if (!accessToken) {
    console.error('❌ Could not get access token. Please run:');
    console.error('   firebase login');
    console.error('   or');
    console.error('   gcloud auth application-default login');
    process.exit(1);
  }

  let addedCount = 0;
  let errorCount = 0;

  for (const page of pages) {
    try {
      const path = `${COLLECTION}/${page.slug}`;
      const doc = pageToFirestoreDoc(page);
      
      await makeRequest('PATCH', path, doc, accessToken);
      console.log(`✅ Added page: ${page.slug} (${page.title})`);
      addedCount++;
    } catch (error) {
      if (error.message.includes('404') || error.message.includes('not found')) {
        // Document doesn't exist, try creating it
        try {
          const path = `${COLLECTION}/${page.slug}`;
          const doc = pageToFirestoreDoc(page);
          await makeRequest('POST', path, doc, accessToken);
          console.log(`✅ Created page: ${page.slug} (${page.title})`);
          addedCount++;
        } catch (createError) {
          console.error(`❌ Error creating page ${page.slug}:`, createError.message);
          errorCount++;
        }
      } else if (error.message.includes('409') || error.message.includes('already exists')) {
        console.log(`⏭️  Page ${page.slug} already exists, skipping...`);
      } else {
        console.error(`❌ Error adding page ${page.slug}:`, error.message);
        errorCount++;
      }
    }
  }

  console.log('\n✨ Pages update complete!');
  console.log(`📄 Added: ${addedCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📊 Total processed: ${pages.length}`);
}

addPages()
  .then(() => {
    console.log('\n✅ All missing pages have been added to Firestore!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Failed:', error.message);
    process.exit(1);
  });

