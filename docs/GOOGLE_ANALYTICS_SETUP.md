# Google Analytics Setup Guide

This guide will help you set up Google Analytics for your website.

## Step 1: Create Google Analytics Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Admin" (gear icon) in the bottom left
4. In the "Property" column, click "Create Property"
5. Fill in your property details:
   - Property name: Your website name
   - Reporting time zone: Your timezone
   - Currency: Your currency
6. Click "Next" and complete the business information
7. Click "Create"

## Step 2: Get Your Measurement ID

1. In your new property, go to "Admin" > "Data Streams"
2. Click on your web stream (or create one if needed)
3. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)
4. Add it to your `.env` file:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   Or for Create React App:
   ```env
   REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

## Step 3: Verify Installation

1. Start your development server
2. Open your website in a browser
3. Go to Google Analytics > Reports > Realtime
4. You should see your visit appear within a few seconds

## Step 4: Set Up Reporting API (Optional - for Real-time Visitor Data)

To get real-time visitor data in your admin dashboard:

### 4.1 Enable Google Analytics Reporting API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Go to "APIs & Services" > "Library"
4. Search for "Google Analytics Reporting API"
5. Click "Enable"

### 4.2 Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in:
   - Service account name: `analytics-service`
   - Service account ID: (auto-generated)
   - Description: "Service account for Google Analytics Reporting API"
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

### 4.3 Create and Download Key

1. Click on your newly created service account
2. Go to "Keys" tab
3. Click "Add Key" > "Create new key"
4. Select "JSON" format
5. Click "Create" - the key file will download automatically
6. Save this file securely (DO NOT commit to git)

### 4.4 Grant Access to GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Go to "Admin" > "Property Access Management"
3. Click the "+" button
4. Click "Add users"
5. Enter your service account email (found in the JSON key file: `client_email`)
6. Select role: "Viewer" (minimum required)
7. Click "Add"

### 4.5 Get Property ID

1. In Google Analytics, go to "Admin"
2. In the "Property" column, click "Property Settings"
3. Copy the **Property ID** (numeric, e.g., `123456789`)
4. Add to your `.env` file:
   ```env
   GA_PROPERTY_ID=123456789
   GA_SERVICE_ACCOUNT_KEY_PATH=/path/to/your-service-account-key.json
   ```

### 4.6 Install Required Package

```bash
npm install @google-analytics/data --legacy-peer-deps
```

## Step 5: Update Analytics Service

Once you have the Reporting API set up, update `src/services/analyticsService.ts` to use the actual API:

```typescript
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { reportingApiConfig } from '@/config/analytics.config';

// Initialize the client
const analyticsDataClient = reportingApiConfig.enabled
  ? new BetaAnalyticsDataClient({
      keyFilename: reportingApiConfig.serviceAccountKeyPath,
    })
  : null;

export const getLastVisitorTime = async (): Promise<Date | null> => {
  if (!analyticsDataClient || !reportingApiConfig.propertyId) {
    return null;
  }

  try {
    const [response] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${reportingApiConfig.propertyId}`,
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'activeUsers' }],
    });

    // Get the most recent event time
    // This is a simplified example - you may need to adjust based on your needs
    if (response.rows && response.rows.length > 0) {
      // Return current time as last visitor (simplified)
      return new Date();
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching last visitor time:', error);
    return null;
  }
};
```

## Testing

1. **Test Basic Tracking:**
   - Visit your website
   - Check Google Analytics Realtime reports
   - Verify page views are being tracked

2. **Test Reporting API:**
   - Check admin dashboard
   - Verify "Last Visitor" card shows data (if API is configured)
   - Check browser console for any errors

## Troubleshooting

### Analytics not tracking
- Verify Measurement ID is correct
- Check browser console for errors
- Ensure `NODE_ENV=production` for production tracking
- Verify Google Analytics script is loading (check Network tab)

### Reporting API errors
- Verify service account has access to GA4 property
- Check that Property ID is correct (not Measurement ID)
- Ensure service account key file path is correct
- Verify Google Analytics Reporting API is enabled

### Last Visitor not showing
- Check that Reporting API is properly configured
- Verify service account permissions
- Check browser console for API errors
- Ensure Property ID matches your GA4 property

## Security Notes

- **Never commit** your service account key JSON file to git
- Add `*.json` (service account keys) to `.gitignore`
- Use environment variables for all sensitive data
- Rotate service account keys periodically

