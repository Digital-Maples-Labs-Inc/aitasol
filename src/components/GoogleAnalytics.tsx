/**
 * Google Analytics Component
 * Initializes Google Analytics on app load
 */

import * as React from 'react';
import { initGA, trackPageView } from '@/services/analyticsService';
import { analyticsConfig } from '@/config/analytics.config';

export default function GoogleAnalytics() {
  React.useEffect(() => {
    if (analyticsConfig.enabled && analyticsConfig.measurementId) {
      initGA();
      
      // Track initial page view
      if (typeof window !== 'undefined') {
        trackPageView(window.location.pathname);
      }
    }
  }, []);

  // Track page views on route changes
  React.useEffect(() => {
    if (!analyticsConfig.enabled || !analyticsConfig.measurementId) return;

    const handleLocationChange = () => {
      if (typeof window !== 'undefined') {
        trackPageView(window.location.pathname);
      }
    };

    // Listen for popstate (browser back/forward)
    window.addEventListener('popstate', handleLocationChange);
    
    // Track current page
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return null; // This component doesn't render anything
}

