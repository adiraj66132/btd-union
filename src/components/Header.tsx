import { Moon, Menu, X } from 'lucide-react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeSwitch from './ThemeSwitch';

const SECTIONS = ['home', 'profiles', 'about'] as const;
type Section = typeof SECTIONS[number];

const Header = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
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
        className={`nav-link relative px-3 py-2 rounded-md transition-colors ${
          activeSection === section
            ? 'text-foreground font-medium'
            : 'text-foreground/60 hover:text-foreground'
        }`}
      >
        {section.charAt(0).toUpperCase() + section.slice(1)}
        {activeSection === section && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full" />
        )}
      </button>
    );
  }, [activeSection, scrollToSection]);

  // Memoize mobile navigation buttons
  const MobileNavigationButton = useMemo(() => {
    return ({ section }: { section: Section }) => (
      <button
        onClick={() => scrollToSection(section)}
        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
          activeSection === section
            ? 'bg-accent text-foreground'
            : 'text-foreground/60 hover:bg-accent/50 hover:text-foreground'
        }`}
      >
        {section.charAt(0).toUpperCase() + section.slice(1)}
      </button>
    );
  }, [activeSection, scrollToSection]);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('home')} 
            className="flex items-center space-x-2 group"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              BTD
            </span>
            <span className="text-lg font-medium text-foreground/90 group-hover:text-foreground transition-colors">
              Brotherhood
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {SECTIONS.map((section) => (
              <NavigationButton key={section} section={section} />
            ))}
            <ThemeSwitch />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground/80" />
            ) : (
              <Menu className="w-6 h-6 text-foreground/80" />
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
              className="md:hidden mt-4"
            >
              <div className="flex flex-col space-y-2 py-2">
                {SECTIONS.map((section) => (
                  <MobileNavigationButton key={section} section={section} />
                ))}
                <div className="w-full px-4 py-3">
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
