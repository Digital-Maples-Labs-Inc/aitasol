/**
 * Initialize Page Sections in Firestore
 * Creates editable sections for all pages so content can be edited inline
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

// Page sections configuration
const pageSections = {
  'home': [
    { id: 'hero-title', type: 'heading', content: 'Our latest products', editable: true },
    { id: 'hero-subtitle', type: 'paragraph', content: 'Explore our cutting-edge dashboard, delivering high-quality solutions tailored to your needs. Elevate your experience with top-tier features and services.', editable: true },
    { id: 'hero-image', type: 'image', content: '', editable: true, metadata: { imageUrl: '', imageAlt: 'Hero image' } },
    { id: 'logo-title', type: 'paragraph', content: 'Trusted by the best companies', editable: true },
    { id: 'features-title', type: 'heading', content: 'Product features', editable: true },
    { id: 'features-subtitle', type: 'paragraph', content: 'Provide a brief overview of the key features of the product. For example, you could list the number of features, their types or benefits, and add-ons.', editable: true },
    { id: 'testimonials-title', type: 'heading', content: 'Testimonials', editable: true },
    { id: 'testimonials-subtitle', type: 'paragraph', content: 'See what our customers love about our products. Discover how we excel in efficiency, durability, and satisfaction. Join us for quality, innovation, and reliable support.', editable: true },
    { id: 'highlights-title', type: 'heading', content: 'Highlights', editable: true },
    { id: 'highlights-subtitle', type: 'paragraph', content: 'Explore why our product stands out: adaptability, durability, user-friendly design, and innovation. Enjoy reliable customer support and precision in every detail.', editable: true },
    { id: 'pricing-title', type: 'heading', content: 'Pricing', editable: true },
    { id: 'pricing-subtitle', type: 'paragraph', content: 'Quickly build an effective pricing table for your potential customers with this layout. It\'s built with default Material UI components with little customization.', editable: true },
    { id: 'faq-title', type: 'heading', content: 'Frequently asked questions', editable: true },
  ],
  'about': [
    { id: 'about-hero', type: 'heading', content: 'About AitaSol', editable: true },
    { id: 'about-intro', type: 'paragraph', content: 'Your trusted partner in global education decisions', editable: true },
    { id: 'company-story-title', type: 'heading', content: 'Our Story', editable: true },
    { id: 'company-story-text-1', type: 'paragraph', content: 'AitaSol was founded with a mission to provide clear guidance for global education decisions. We understand that choosing the right educational path is one of the most important decisions you\'ll make, and we\'re here to help you navigate this journey with confidence.', editable: true },
    { id: 'company-story-text-2', type: 'paragraph', content: 'Our team of experienced education consultants has helped thousands of students achieve their dreams of studying abroad, particularly in Canada. We combine personalized guidance with comprehensive support to ensure your success.', editable: true },
    { id: 'company-story-image', type: 'image', content: '', editable: true, metadata: { imageUrl: '', imageAlt: 'Company story image' } },
    { id: 'team-title', type: 'heading', content: 'Our Team', editable: true },
    { id: 'credentials-title', type: 'heading', content: 'Our Credentials', editable: true },
  ],
  'services': [
    { id: 'services-hero', type: 'heading', content: 'Our Services', editable: true },
    { id: 'services-intro', type: 'paragraph', content: 'Comprehensive support for your educational journey to Canada', editable: true },
    { id: 'services-overview-title', type: 'heading', content: 'Comprehensive Education Consultancy Services', editable: true },
    { id: 'services-overview-text-1', type: 'paragraph', content: 'At AitaSol, we offer a full range of services designed to support you at every step of your journey to studying in Canada. From initial consultations to post-arrival support, our team is dedicated to your success.', editable: true },
    { id: 'services-overview-text-2', type: 'paragraph', content: 'Whether you\'re looking to pursue undergraduate studies, graduate programs, or professional certifications, we have the expertise and resources to guide you through the entire process.', editable: true },
  ],
  'contact': [
    { id: 'contact-title', type: 'heading', content: 'CONTACT US', editable: true },
    { id: 'contact-heading', type: 'heading', content: 'Let\'s talk about your problem.', editable: true },
    { id: 'location-title', type: 'heading', content: 'Our Location', editable: true },
    { id: 'location-text', type: 'paragraph', content: '401 Broadway, 24th Floor, Orchard Cloud View, London', editable: true },
    { id: 'email-title', type: 'heading', content: 'How Can We Help?', editable: true },
    { id: 'email-1', type: 'paragraph', content: 'info@aitasol.com', editable: true },
    { id: 'email-2', type: 'paragraph', content: 'contact@aitasol.com', editable: true },
    { id: 'form-title', type: 'heading', content: 'Send us a Message', editable: true },
  ],
  'study-in-canada': [
    { id: 'service-hero', type: 'heading', content: 'Study in Canada', editable: true },
    { id: 'service-intro', type: 'paragraph', content: 'Canada offers world-class education with diverse programs and institutions. Learn about the opportunities available for international students.', editable: true },
    { id: 'service-content-title', type: 'heading', content: 'What We Offer', editable: true },
    { id: 'service-content', type: 'paragraph', content: 'Our comprehensive service includes personalized guidance tailored to your specific needs and goals. We work closely with you to ensure a smooth and successful experience.', editable: true },
    { id: 'service-content-2', type: 'paragraph', content: 'With years of experience and a proven track record, we provide expert support at every step of your journey. Our team is committed to your success and will go above and beyond to help you achieve your educational and career objectives.', editable: true },
    { id: 'service-image', type: 'image', content: '', editable: true, metadata: { imageUrl: '', imageAlt: 'Service image' } },
    { id: 'service-features-title', type: 'heading', content: 'What\'s Included', editable: true },
    { id: 'service-cta-title', type: 'heading', content: 'Ready to Get Started?', editable: true },
    { id: 'service-cta-text', type: 'paragraph', content: 'Contact us today to learn more about how we can help you achieve your educational goals.', editable: true },
  ],
  'immigration-study-permits': [
    { id: 'service-hero', type: 'heading', content: 'Immigration & Study Permits', editable: true },
    { id: 'service-intro', type: 'paragraph', content: 'Navigating the study permit application process can be complex. We provide expert assistance to help you succeed.', editable: true },
    { id: 'service-content-title', type: 'heading', content: 'What We Offer', editable: true },
    { id: 'service-content', type: 'paragraph', content: 'Our services include document preparation, application review, and guidance on immigration pathways to Canada.', editable: true },
    { id: 'service-content-2', type: 'paragraph', content: 'With years of experience and a proven track record, we provide expert support at every step of your journey.', editable: true },
    { id: 'service-image', type: 'image', content: '', editable: true, metadata: { imageUrl: '', imageAlt: 'Service image' } },
    { id: 'service-features-title', type: 'heading', content: 'What\'s Included', editable: true },
    { id: 'service-cta-title', type: 'heading', content: 'Ready to Get Started?', editable: true },
    { id: 'service-cta-text', type: 'paragraph', content: 'Contact us today to learn more about how we can help you achieve your educational goals.', editable: true },
  ],
  'admissions-support': [
    { id: 'service-hero', type: 'heading', content: 'Admissions Support', editable: true },
    { id: 'service-intro', type: 'paragraph', content: 'Get professional assistance with your university and college applications in Canada.', editable: true },
    { id: 'service-content-title', type: 'heading', content: 'What We Offer', editable: true },
    { id: 'service-content', type: 'paragraph', content: 'We help with application preparation, document review, university selection, and ensuring all requirements are met.', editable: true },
    { id: 'service-content-2', type: 'paragraph', content: 'With years of experience and a proven track record, we provide expert support at every step of your journey.', editable: true },
    { id: 'service-image', type: 'image', content: '', editable: true, metadata: { imageUrl: '', imageAlt: 'Service image' } },
    { id: 'service-features-title', type: 'heading', content: 'What\'s Included', editable: true },
    { id: 'service-cta-title', type: 'heading', content: 'Ready to Get Started?', editable: true },
    { id: 'service-cta-text', type: 'paragraph', content: 'Contact us today to learn more about how we can help you achieve your educational goals.', editable: true },
  ],
  'career-counseling': [
    { id: 'service-hero', type: 'heading', content: 'Career Counseling', editable: true },
    { id: 'service-intro', type: 'paragraph', content: 'Plan your career path with expert guidance and professional development support.', editable: true },
    { id: 'service-content-title', type: 'heading', content: 'What We Offer', editable: true },
    { id: 'service-content', type: 'paragraph', content: 'We provide career guidance, job market insights, resume assistance, and professional development services to help you succeed in Canada.', editable: true },
    { id: 'service-content-2', type: 'paragraph', content: 'With years of experience and a proven track record, we provide expert support at every step of your journey.', editable: true },
    { id: 'service-image', type: 'image', content: '', editable: true, metadata: { imageUrl: '', imageAlt: 'Service image' } },
    { id: 'service-features-title', type: 'heading', content: 'What\'s Included', editable: true },
    { id: 'service-cta-title', type: 'heading', content: 'Ready to Get Started?', editable: true },
    { id: 'service-cta-text', type: 'paragraph', content: 'Contact us today to learn more about how we can help you achieve your educational goals.', editable: true },
  ],
  'testimonials': [
    { id: 'testimonials-hero', type: 'heading', content: 'Success Stories & Testimonials', editable: true },
    { id: 'testimonials-intro', type: 'paragraph', content: 'Hear from students who have achieved their dreams with AitaSol', editable: true },
    { id: 'success-title', type: 'heading', content: 'Ready to Write Your Success Story?', editable: true },
    { id: 'success-text', type: 'paragraph', content: 'Join hundreds of successful students who have achieved their educational dreams with AitaSol. Let us help you start your journey today.', editable: true },
  ],
  'blog': [
    { id: 'blog-hero', type: 'heading', content: 'Blog', editable: true },
    { id: 'blog-intro', type: 'paragraph', content: 'Stay informed with our latest articles about studying in Canada, immigration, and student life.', editable: true },
  ],
};

async function initPageSections() {
  console.log('🚀 Initializing page sections for inline editing...\n');

  try {
    const pagesRef = db.collection('pages');
    let updatedCount = 0;
    let createdCount = 0;

    for (const [slug, sections] of Object.entries(pageSections)) {
      // Find page by slug
      const slugQuery = await pagesRef.where('slug', '==', slug).limit(1).get();
      
      if (slugQuery.empty) {
        console.log(`⏭️  Page ${slug} not found, skipping...`);
        continue;
      }

      const pageDoc = slugQuery.docs[0];
      const pageData = pageDoc.data();
      const existingSections = pageData.sections || [];
      
      // Merge sections - update existing, add new
      const mergedSections = [...existingSections];
      
      for (const newSection of sections) {
        const existingIndex = mergedSections.findIndex((s) => s.id === newSection.id);
        
        if (existingIndex >= 0) {
          // Update existing section if it doesn't have content
          if (!mergedSections[existingIndex].content || mergedSections[existingIndex].content.trim() === '') {
            mergedSections[existingIndex] = {
              ...mergedSections[existingIndex],
              ...newSection,
            };
            console.log(`🔄 Updated section ${newSection.id} in page ${slug}`);
          }
        } else {
          // Add new section
          mergedSections.push(newSection);
          console.log(`✅ Added section ${newSection.id} to page ${slug}`);
          createdCount++;
        }
      }

      // Update page with merged sections
      await pageDoc.ref.update({
        sections: mergedSections,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      
      updatedCount++;
      console.log(`✅ Updated page: ${slug} with ${sections.length} sections\n`);
    }

    console.log('\n✨ Page sections initialization complete!');
    console.log(`📄 Pages updated: ${updatedCount}`);
    console.log(`📝 Sections created: ${createdCount}`);
    
  } catch (error) {
    console.error('❌ Error initializing page sections:', error);
    throw error;
  }
}

// Run the initialization
initPageSections()
  .then(() => {
    console.log('\n✅ All page sections are now ready for inline editing!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Failed to initialize page sections:', error);
    process.exit(1);
  });

