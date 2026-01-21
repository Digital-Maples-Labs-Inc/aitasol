import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '@/mui-theme/AppTheme';
import HeaderNavigation from '@/components/HeaderNavigation';
import HeroSlider from './home/components/HeroSlider';
// import HeroSliderTest from './home/components/HeroSliderTest';
import LogoCollection from './home/components/LogoCollection';
import HomeIntro from './home/components/HomeIntro';
import WhatWeDo from './home/components/WhatWeDo';
import AboutUsHome from './home/components/AboutUsHome';
import Highlights from './home/components/Highlights';
import Pricing from './home/components/Pricing';
import Features from './home/components/Features';
import ProcessFlow from './home/components/ProcessFlow';
import Testimonials from './home/components/Testimonials';
import FAQ from './home/components/FAQ';
import Footer from '@/components/Footer';
import { usePageData } from '@/hooks/usePageData';

export default function MarketingPage(props: { disableCustomTheme?: boolean }) {
  const { page, loading } = usePageData('home');

  const isVisible = (id: string) => {
    // If loading, you might want to show skeleton or keep rendered. 
    // Defaulting to true so content is visible by default (SEO/Fail-safe)
    if (loading && !page) return true;

    const section = page?.sections.find(s => s.id === id);
    return section?.metadata?.active ?? true;
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <HeaderNavigation />
      {isVisible('section-visibility-hero-slider') && <HeroSlider />}
      <div>
        {isVisible('section-visibility-home-intro') && (
          <>
            <HomeIntro />
            <Divider />
          </>
        )}

        {isVisible('section-visibility-what-we-do') && (
          <>
            <WhatWeDo />
            <Divider />
          </>
        )}

        {isVisible('section-visibility-process-flow') && (
          <>
            <ProcessFlow />
            <Divider />
          </>
        )}

        {isVisible('section-visibility-about-us-home') && (
          <>
            <AboutUsHome />
            <Divider />
          </>
        )}

        {isVisible('section-visibility-logo-collection') && (
          <LogoCollection />
        )}

        {isVisible('section-visibility-features') && (
          <>
            <div id="features">
              <Features />
            </div>
            <Divider />
          </>
        )}

        {isVisible('section-visibility-testimonials') && (
          <>
            <div id="testimonials">
              <Testimonials />
            </div>
            <Divider />
          </>
        )}

        {isVisible('section-visibility-highlights') && (
          <>
            <div id="highlights">
              <Highlights />
            </div>
            <Divider />
          </>
        )}

        {isVisible('section-visibility-pricing') && (
          <>
            <div id="pricing">
              <Pricing />
            </div>
            <Divider />
          </>
        )}

        {isVisible('section-visibility-faq') && (
          <>
            <div id="faq">
              <FAQ />
            </div>
            <Divider />
          </>
        )}

        <Footer />
      </div>
    </AppTheme>
  );
}
