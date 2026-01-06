import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '@/mui-theme/AppTheme';
import HeaderNavigation from '@/components/HeaderNavigation';
import Hero from './home/components/Hero';
import LogoCollection from './home/components/LogoCollection';
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
      <Hero />
      <div>
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
