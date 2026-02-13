import { useState, useEffect, useCallback, memo } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeSwitch from './ThemeSwitch';

const SECTIONS = ['home', 'profiles', 'about'] as const;
type Section = typeof SECTIONS[number];

const NavigationButton = memo(({ section, activeSection, onClick }: { section: Section; activeSection: Section; onClick: () => void }) => (
  <button
    onClick={onClick}
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
        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
      />
    )}
  </button>
));

NavigationButton.displayName = 'NavigationButton';

const MobileNavigationButton = memo(({ section, activeSection, onClick }: { section: Section; activeSection: Section; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeSection === section
      ? 'liquid-glass text-white'
      : 'text-muted-foreground hover:bg-white/5 hover:text-white'
      }`}
  >
    {section.charAt(0).toUpperCase() + section.slice(1)}
  </button>
));

MobileNavigationButton.displayName = 'MobileNavigationButton';

const Header = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionElements = SECTIONS
      .map((section) => document.getElementById(section))
      .filter((element): element is HTMLElement => Boolean(element));

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]?.target.id) {
          setActiveSection(visibleEntries[0].target.id as Section);
        }
      },
      {
        root: null,
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.2, 0.4, 0.6, 0.8],
      }
    );

    for (const element of sectionElements) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((sectionId: Section) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  }, []);

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

          <nav className="hidden md:flex items-center space-x-2 bg-black/20 backdrop-blur-lg p-1 rounded-full border border-white/5">
            {SECTIONS.map((section) => (
              <NavigationButton key={section} section={section} activeSection={activeSection} onClick={() => scrollToSection(section)} />
            ))}
            <div className="pl-2 border-l border-white/10 ml-2">
              <ThemeSwitch />
            </div>
          </nav>

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
                  <MobileNavigationButton key={section} section={section} activeSection={activeSection} onClick={() => scrollToSection(section)} />
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
