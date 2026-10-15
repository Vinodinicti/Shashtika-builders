import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import NavigationDrawer from './components/NavigationDrawer';
import HeroSection from './components/HeroSection';
import MarqueeBanner from './components/MarqueeBanner';
import LocationMasterplansSection from './components/LocationMasterplansSection';
import ConstructionSection from './components/ConstructionSection';
import WhyChooseSection from './components/WhyChooseSection';
import ReviewsSection from './components/ReviewsSection';
import QuickEnquirySection from './components/QuickEnquirySection';
import Footer from './components/Footer';
import FloatingActionStack from './components/FloatingActionStack';
import PlotsPage from './pages/PlotsPage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('plot')) return 'plots';
    if (hash.includes('about')) return 'about';
    if (hash.includes('gallery')) return 'gallery';
    if (hash.includes('contact')) return 'contact';
    if (hash.includes('admin')) return 'admin';
    return 'home';
  });
  const [homeNavCount, setHomeNavCount] = useState(0);

  // Listen to hash changes for smooth client-side routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('plot')) {
        setCurrentRoute('plots');
        window.scrollTo(0, 0);
      } else if (hash.includes('about')) {
        setCurrentRoute('about');
        window.scrollTo(0, 0);
      } else if (hash.includes('gallery')) {
        setCurrentRoute('gallery');
        window.scrollTo(0, 0);
      } else if (hash.includes('contact')) {
        setCurrentRoute('contact');
        window.scrollTo(0, 0);
      } else if (hash.includes('admin')) {
        setCurrentRoute('admin');
        window.scrollTo(0, 0);
      } else {
        setCurrentRoute('home');
        setHomeNavCount((prev) => prev + 1);
        if (hash === '' || hash === '#' || hash === '#home') {
          window.scrollTo(0, 0);
        } else {
          const targetId = hash.replace('#', '');
          const el = document.getElementById(targetId);
          if (el) {
            setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
          } else {
            window.scrollTo(0, 0);
          }
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F3EA] text-espresso-900 font-body selection:bg-gold-primary selection:text-cream">
      {/* 3-Second High Quality 3D Logo Cube Loading Screen */}
      <LoadingScreen onLoaded={() => setLoaded(true)} />

      {/* Header */}
      <Header onOpenNav={() => setNavOpen(true)} />

      {/* Fullscreen Hamburger Menu Drawer */}
      <NavigationDrawer
        isOpen={navOpen}
        onClose={() => setNavOpen(false)}
        currentRoute={currentRoute}
      />

      {/* Route-based Render: Plots Page vs About Page vs Gallery Page vs Contact Page vs Admin Page vs Home Page */}
      {currentRoute === 'plots' ? (
        <main>
          <ErrorBoundary>
            <PlotsPage />
          </ErrorBoundary>
        </main>
      ) : currentRoute === 'about' ? (
        <main>
          <AboutPage />
        </main>
      ) : currentRoute === 'gallery' ? (
        <main>
          <GalleryPage />
        </main>
      ) : currentRoute === 'contact' ? (
        <main>
          <ContactPage />
        </main>
      ) : currentRoute === 'admin' ? (
        <main>
          <ErrorBoundary>
            <AdminPage />
          </ErrorBoundary>
        </main>
      ) : (
        /* Main Home Content Area */
        <main className="creamy-smoky-sandal-canvas">
          {/* 100% Viewport Screen Fit Hero Section */}
          <HeroSection isLoaded={loaded} homeNavCount={homeNavCount} />

          {/* Unified Non-Hero Sections */}
          <div className="relative">
            {/* Infinite Architectural Marquee Ticker Banner */}
            <MarqueeBanner />

            {/* 4 Regional Location Master Plans & Popup Inspector */}
            <LocationMasterplansSection />

            {/* Current Construction Details (Continuous Track) */}
            <ConstructionSection />

            {/* Why Choose SHASHTIKA Section */}
            <WhyChooseSection />

            {/* Real Customer Reviews & Testimonials Slider */}
            <ReviewsSection />

            {/* Simple Quick Enquiry Form */}
            <QuickEnquirySection />
          </div>
        </main>
      )}

      {/* Footer (Excluded on Admin Portal) */}
      {currentRoute !== 'admin' && <Footer />}

      {/* Floating Action Stack (Excluded on Admin Portal) */}
      {currentRoute !== 'admin' && <FloatingActionStack />}
    </div>
  );
}
