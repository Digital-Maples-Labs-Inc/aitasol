/**
 * Google Analytics Configuration
 * 
 * To set up Google Analytics:
 * 1. Create a Google Analytics 4 (GA4) property
 * 2. Get your Measurement ID (format: G-XXXXXXXXXX)
 * 3. Add it to your .env file as NEXT_PUBLIC_GA_MEASUREMENT_ID or REACT_APP_GA_MEASUREMENT_ID
 * 4. The analytics service will automatically initialize on app load
 */

export const analyticsConfig = {
  // Google Analytics Measurement ID
  measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 
                  process.env.REACT_APP_GA_MEASUREMENT_ID || 
                  '',
  
  // Enable/disable analytics
  enabled: process.env.NODE_ENV === 'production',
  
  // Debug mode (logs events to console)
  debug: process.env.NODE_ENV === 'development',
};

/**
 * Google Analytics Reporting API Configuration
 * 
 * To get real-time visitor data, you need:
 * 1. Enable Google Analytics Reporting API in Google Cloud Console
 * 2. Create a service account
 * 3. Download the service account key JSON
 * 4. Add the path to your .env file as GA_SERVICE_ACCOUNT_KEY_PATH
 * 5. Grant the service account access to your GA4 property
 */
export const reportingApiConfig = {
  // Path to service account key JSON file
  serviceAccountKeyPath: process.env.GA_SERVICE_ACCOUNT_KEY_PATH || '',
  
  // Google Analytics Property ID (not Measurement ID)
  propertyId: process.env.GA_PROPERTY_ID || '',
  
  // Enable reporting API
  enabled: !!process.env.GA_SERVICE_ACCOUNT_KEY_PATH && !!process.env.GA_PROPERTY_ID,
};

