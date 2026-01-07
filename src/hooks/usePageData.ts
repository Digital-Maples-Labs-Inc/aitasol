/**
 * Hook to fetch and sync page data from Firebase with real-time updates
 */

import { useState, useEffect } from 'react';
import { subscribeToPageBySlug, updatePageSectionContent, updatePageSectionImage, updatePageSection } from '@/services/pageService';
import { Page, PageSection } from '@/types';

export function usePageData(slug: string) {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeToPageBySlug(slug, (fetchedPage) => {
      setPage(fetchedPage);
      setLoading(false);
      setError(null);
    });

    return () => unsubscribe();
  }, [slug]);

  const updateSectionContent = async (sectionId: string, content: string) => {
    if (!page?.id) {
      throw new Error('Page not loaded');
    }
    await updatePageSectionContent(page.id, sectionId, content);
  };

  const updateSectionImage = async (sectionId: string, imageUrl: string, imageAlt?: string) => {
    if (!page?.id) {
      throw new Error('Page not loaded');
    }
    await updatePageSectionImage(page.id, sectionId, imageUrl, imageAlt);
  };

  const updateSection = async (sectionId: string, section: Partial<PageSection>) => {
    if (!page?.id) {
      throw new Error('Page not loaded');
    }
    await updatePageSection(page.id, sectionId, section);
  };

  const getSection = (sectionId: string): PageSection | undefined => {
    return page?.sections.find((s) => s.id === sectionId);
  };

  return {
    page,
    loading,
    error,
    updateSectionContent,
    updateSectionImage,
    updateSection,
    getSection,
  };
}

