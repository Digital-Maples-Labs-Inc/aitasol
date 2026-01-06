/**
 * Analytics Service
 * Handles Google Analytics integration and analytics data
 */

// Extend Window interface for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Google Analytics Measurement ID
// This should be set in your environment variables
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.REACT_APP_GA_MEASUREMENT_ID || '';

/**
 * Initialize Google Analytics
 */
export const initGA = () => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) {
    console.warn('Google Analytics: Measurement ID not configured');
    return;
  }

  // Load gtag script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });
};

/**
 * Track page view
 */
export const trackPageView = (path: string) => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  if (window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }
};

/**
 * Track custom event
 */
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Get real-time visitor data from Google Analytics
 * Note: This requires Google Analytics Reporting API
 * For now, we'll use a mock/placeholder implementation
 */
export const getLastVisitorTime = async (): Promise<Date | null> => {
  // TODO: Implement Google Analytics Reporting API integration
  // This requires:
  // 1. Google Analytics Reporting API enabled
  // 2. Service account with proper permissions
  // 3. OAuth2 authentication
  
  // For now, return null or mock data
  // In production, you would call the GA Reporting API here
  return null;
};

/**
 * Get visitor statistics
 */
export const getVisitorStats = async () => {
  // TODO: Implement Google Analytics Reporting API integration
  // This would fetch:
  // - Active users (real-time)
  // - Page views
  // - Sessions
  // - User demographics
  
  return {
    activeUsers: 0,
    pageViews: 0,
    sessions: 0,
    lastVisitorTime: null as Date | null,
  };
};

