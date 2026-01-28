import { Menu, X } from 'lucide-react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeSwitch from './ThemeSwitch';

const SECTIONS = ['home', 'profiles', 'about'] as const;
type Section = typeof SECTIONS[number];

const Header = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    setScrolled(window.scrollY > 20);
    let newSection: Section = activeSection;

    // Use requestAnimationFrame for smooth performance
    requestAnimationFrame(() => {
      for (const section of SECTIONS) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            newSection = section;
            break;
          }
        }
      }

      if (newSection !== activeSection) {
        setActiveSection(newSection);
      }
    });
  }, [activeSection]);

  useEffect(() => {
    // Throttle scroll events
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    return () => window.removeEventListener('scroll', scrollListener);
  }, [handleScroll]);

  const scrollToSection = useCallback((sectionId: Section) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  }, []);

  // Memoize navigation buttons to prevent unnecessary re-renders
  const NavigationButton = useMemo(() => {
    return ({ section }: { section: Section }) => (
      <button
        onClick={() => scrollToSection(section)}
        className={`relative px-4 py-2 rounded-full transition-all duration-300 ${activeSection === section
          ? 'text-white liquid-glass shadow-[0_0_20px_rgba(255,255,255,0.2)]'
          : 'text-muted-foreground hover:text-white hover:bg-white/5'
          }`}
      >
        <span className="relative z-10 capitalize">{section}</span>
        {activeSection === section && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-white/10 rounded-full backdrop-blur-md"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </button>
    );
  }, [activeSection, scrollToSection]);

  // Memoize mobile navigation buttons
  const MobileNavigationButton = useMemo(() => {
    return ({ section }: { section: Section }) => (
      <button
        onClick={() => scrollToSection(section)}
        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeSection === section
          ? 'liquid-glass text-white'
          : 'text-muted-foreground hover:bg-white/5 hover:text-white'
          }`}
      >
        {section.charAt(0).toUpperCase() + section.slice(1)}
      </button>
    );
  }, [activeSection, scrollToSection]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled
        ? 'bg-background/70 backdrop-blur-xl border-white/5 py-4'
        : 'bg-transparent border-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-2 group"
          >
            <span className="text-2xl font-bold bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent group-hover:text-glow transition-all duration-300">
              BTD
            </span>
            <span className="text-lg font-light text-muted-foreground group-hover:text-white transition-colors">
              Union
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 bg-black/20 backdrop-blur-lg p-1 rounded-full border border-white/5">
            {SECTIONS.map((section) => (
              <NavigationButton key={section} section={section} />
            ))}
            <div className="pl-2 border-l border-white/10 ml-2">
              <ThemeSwitch />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden"
            >
              <div className="flex flex-col p-2">
                {SECTIONS.map((section) => (
                  <MobileNavigationButton key={section} section={section} />
                ))}
                <div className="px-4 py-3 border-t border-white/5">
                  <ThemeSwitch />
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
