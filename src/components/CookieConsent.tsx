import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleNecessary = () => {
    localStorage.setItem('cookie-consent', 'necessary');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0, transition: { duration: 0.3 } }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md bg-[var(--bg-primary)] border border-subtle p-6 rounded-2xl shadow-2xl z-50 flex flex-col gap-4"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="bg-[var(--accent)]/10 p-2 rounded-full">
                <ShieldCheck className="w-6 h-6 text-[var(--accent)]" />
              </div>
              <h3 className="font-semibold text-primary">Your Privacy</h3>
            </div>
            <button 
              onClick={handleNecessary} 
              className="text-secondary hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-secondary leading-relaxed">
            We use strictly necessary cookies to make our site work. We'd also like to set optional cookies to help us improve it. You can choose to accept all or just necessary cookies.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button 
              onClick={handleAccept}
              className="flex-1 bg-[var(--text-primary)] text-[var(--bg-primary)] px-4 py-2.5 rounded-full text-sm font-bold tracking-wide hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Accept All
            </button>
            <button 
              onClick={handleNecessary}
              className="flex-1 border border-subtle text-primary px-4 py-2.5 rounded-full text-sm font-semibold hover:border-[var(--text-primary)] transition-colors whitespace-nowrap"
            >
              Necessary Only
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
