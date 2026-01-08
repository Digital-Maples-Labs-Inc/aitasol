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
import Testimonials from './home/components/Testimonials';
import FAQ from './home/components/FAQ';
import Footer from '@/components/Footer';

export default function MarketingPage(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <HeaderNavigation />
      <HeroSlider />
      <div>
        <HomeIntro />
        <Divider />
        <WhatWeDo />
        <Divider />
        <AboutUsHome />
        <Divider />
        <LogoCollection />
        <div id="features">
          <Features />
        </div>
        <Divider />
        <div id="testimonials">
          <Testimonials />
        </div>
        <Divider />
        <div id="highlights">
          <Highlights />
        </div>
        <Divider />
        <div id="pricing">
          <Pricing />
        </div>
        <Divider />
        <div id="faq">
          <FAQ />
        </div>
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
