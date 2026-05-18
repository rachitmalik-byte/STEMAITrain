import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { LayoutGrid, ChevronDown, Video, FileText, Star, HandHeart, Wrench, Megaphone, Inbox, Search, Code, UserCheck, GraduationCap, BookOpen, HelpCircle, Shield, Users, FileSearch } from 'lucide-react';
import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

export function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const mobileLinks = [
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/experts', label: 'Expert Network' },
    { path: '/research-services', label: 'Research Services' },
    { path: '/pricing', label: 'Pricing' },
  ];

  const resourceLinks = [
    { icon: Shield, title: 'Data quality', desc: 'Rigorous validation for frontier AI models', tab: 'Data quality' },
    { icon: Users, title: 'Domain Experts', desc: 'Verified professionals across Medicine, Law, and more', tab: 'Domain Experts' },
    { icon: Search, title: 'Audience Finder', desc: 'Pinpoint exactly the demographic your project requires', tab: 'Audience Finder' },
    { icon: GraduationCap, title: 'Academic research', desc: 'Trusted by top universities for behavioral studies', tab: 'Academic research' },
    { icon: FileSearch, title: 'Managed Services', desc: 'Expert program managers handle data collection', tab: 'Managed Services' },
    { icon: BookOpen, title: 'Guides & Tutorials', desc: 'Step-by-step guides for creating and managing projects', tab: 'Guides & Tutorials' },
    { icon: FileText, title: 'Articles', desc: 'Expand your knowledge with insightful reads', tab: 'Articles' },
    { icon: HelpCircle, title: 'FAQ & Help', desc: 'Answers to common questions about platform mechanics', tab: 'FAQ & Help' },
    { icon: Star, title: 'Case studies', desc: 'Our showcase of customer success stories', path: '/resources/casestudy' }
  ];

  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 400, damping: 40 });
  const rotateTransform = useTransform(smoothScrollY, [0, 1500], [0, 360]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setResourcesOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out flex justify-center',
        scrolled ? 'pt-4 px-4' : 'pt-0 px-0'
      )}
    >
      <div 
        className={clsx(
          'transition-all duration-500 ease-out flex items-center justify-between relative overflow-visible',
          scrolled 
            ? 'w-full max-w-5xl bg-[var(--bg-primary)]/80 backdrop-blur-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.05)] shadow-sm rounded-full py-2.5 px-6 md:px-8' 
            : 'w-full max-w-7xl bg-transparent border-transparent py-6 px-6 md:px-8 rounded-none'
        )}
      >
        <Link 
          to="/" 
          className="z-50 hover:opacity-80 transition-opacity"
        >
          <motion.div 
            whileHover={{ scale: 1.05, translateY: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{ rotate: rotateTransform }}
            className="flex items-center h-14 relative group transition-all duration-300"
          >
            <img 
              src="https://previews.jumpshare.com/thumb/4ea2c443a4623ad282087187a00fc426fa967632df72c8ac9a7d22a8f7c157e2d36d986f3d088fbf7b1bc4d22e4ba5c372edcadcbb68033e0628ce4c668843ed96e0715d19b9104e6cfa51af11ecdf0c" 
              alt="STEM AI TRAINERS" 
              className="h-full w-auto object-contain z-10 scale-[1.15] mix-blend-multiply dark:mix-blend-lighten" 
            />
          </motion.div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 relative">
          {mobileLinks.slice(0, 4).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={clsx(
                'text-[12px] font-semibold transition-colors relative px-2 py-1',
                location.pathname === link.path ? 'text-primary' : 'text-secondary hover:text-primary'
              )}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Resources Mega Menu */}
          <div 
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <Link
              to="/resources"
              className={clsx(
                'text-[12px] font-semibold transition-colors relative px-2 py-1 flex items-center gap-1',
                location.pathname === '/resources' || resourcesOpen ? 'text-primary' : 'text-secondary hover:text-primary'
              )}
            >
              Resources
              <ChevronDown className={clsx("w-3 h-3 transition-transform duration-300", resourcesOpen ? "rotate-180" : "")} />
            </Link>
            
            <AnimatePresence>
              {resourcesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full -left-48 mt-4 w-[800px] p-6 bg-white dark:bg-[#111] rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.05)] z-50 grid grid-cols-3 gap-6"
                >
                  {resourceLinks.map((item, idx) => {
                    const linkDest = item.path || `/resources?tab=${encodeURIComponent(item.tab || '')}`;
                    return (
                    <Link
                      key={idx}
                      to={linkDest}
                      className="group flex flex-col gap-2 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300 group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-semibold text-primary">{item.title}</h4>
                      </div>
                      <p className="text-xs text-secondary leading-relaxed pl-[3.25rem]">{item.desc}</p>
                    </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/pricing"
            className={clsx(
              'text-[12px] font-semibold transition-colors relative px-2 py-1',
              location.pathname === '/pricing' ? 'text-primary' : 'text-secondary hover:text-primary'
            )}
          >
            Pricing
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link to="/contact" className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-5 py-2.5 rounded-full text-[13px] font-bold tracking-wide hover:opacity-90 transition-opacity shadow-sm">
            Contact
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex md:hidden items-center gap-3 z-50">
          <ThemeToggle />
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-primary p-2 -mr-2"
            aria-label="Toggle navigation menu" // Add this exact line
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[80px] left-4 right-4 bg-primary border bg-[var(--bg-primary)] border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.05)] rounded-3xl p-6 flex flex-col gap-4 shadow-2xl md:hidden overflow-hidden max-h-[80vh] overflow-y-auto"
          >
            {[...mobileLinks.slice(0, 4), { path: '/resources', label: 'Resources' }, ...mobileLinks.slice(4)].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  'text-lg font-medium py-3 border-b border-subtle flex items-center justify-between',
                  location.pathname === link.path ? 'text-primary' : 'text-secondary'
                )}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
