import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { useEffect } from 'react';
import { CookieConsent } from './CookieConsent';

export function Layout() {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progression Bar - Enhanced with glow and integration */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent)] to-orange-400 origin-left z-[100] shadow-[0_0_10px_var(--accent)]"
        style={{ scaleX }}
      />
      
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {/* Use cloneElement-like pattern via Outlets in React Router, 
              but since Outlet doesn't naturally accept keys for AnimatePresence, 
              we wrap an inner container with a key */}
          <div key={location.pathname} className="min-h-screen">
            <Outlet />
          </div>
        </AnimatePresence>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
