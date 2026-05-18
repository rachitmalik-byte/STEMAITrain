/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import Lenis from 'lenis';
import { Layout } from './components/Layout';
import { AnimatedBackground } from './components/AnimatedBackground';


// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Experts = lazy(() => import('./pages/Experts'));
const Resources = lazy(() => import('./pages/Resources'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const Contact = lazy(() => import('./pages/Contact'));
const Pricing = lazy(() => import('./pages/Pricing'));
const ResearchServices = lazy(() => import('./pages/ResearchServices'));

// Loading fallback component
const PageLoader = () => (
  <div className="fixed inset-0 min-h-screen flex flex-col items-center justify-center bg-[var(--bg-primary)] z-[9999]">
    <div className="relative">
      <div className="w-16 h-16 border-2 border-[var(--accent)]/20 rounded-full"></div>
      <div className="absolute inset-0 w-16 h-16 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
    </div>
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-6 text-sm font-bold tracking-[0.3em] uppercase text-[var(--accent)]"
    >
      Verifying Intelligence
    </motion.p>
  </div>
);

export default function App() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <AnimatedBackground />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="experts" element={<Experts />} />
            <Route path="resources" element={<Resources />} />
            <Route path="resources/casestudy" element={<CaseStudies />} />
            <Route path="contact" element={<Contact />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="research-services" element={<ResearchServices />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

