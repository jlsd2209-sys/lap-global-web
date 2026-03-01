import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoShield from '@/assets/logo-shield.png';
const navItems = [{
  href: '#home',
  label: 'Inicio'
}, {
  href: '#servicios',
  label: 'Servicios'
}, {
  href: '#nosotros',
  label: 'Nosotros'
}, {
  href: '#contacto',
  label: 'Contacto'
}];
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.substring(1));
      for (const sectionId of sections.reverse()) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };
  return <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-navy-dark/95 backdrop-blur-md shadow-lg' : 'bg-navy-dark/80 backdrop-blur-sm'}`}>
      <nav className="container flex justify-between items-center h-20 rounded-2xl border-gold-bright border-0 border-none">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-3 font-serif text-xl font-bold text-white hover:text-gold transition-colors">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <img alt="LAP Global & IA Logo" className="w-12 h-12 object-contain drop-shadow-lg" src={logoShield} />
          </div>
          <span>LAP Global Unidad de IA & Asuntos Transnacionales</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8">
          {navItems.map((item) => <li key={item.href}>
              <a href={item.href} onClick={(e) => handleNavClick(e, item.href)} className={`relative font-medium py-2 transition-colors ${activeSection === item.href.substring(1) ? 'text-gold' : 'text-cream-light hover:text-gold'}`}>
                {item.label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold to-gold-bright transition-all duration-300 ${activeSection === item.href.substring(1) ? 'w-full' : 'w-0'}`} />
              </a>
            </li>)}
        </ul>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white text-2xl p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && <motion.div initial={{
          x: '100%'
        }} animate={{
          x: 0
        }} exit={{
          x: '100%'
        }} transition={{
          type: 'tween',
          duration: 0.3
        }} className="fixed top-0 right-0 w-4/5 h-full bg-navy-dark/98 backdrop-blur-lg p-8 pt-24 md:hidden z-40">
              <button className="absolute top-6 right-6 text-white text-2xl" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                <X size={32} />
              </button>
              
              <ul className="flex flex-col gap-8">
                {navItems.map((item, index) => <motion.li key={item.href} initial={{
              opacity: 0,
              x: 50
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: index * 0.1
            }}>
                    <a href={item.href} onClick={(e) => handleNavClick(e, item.href)} className={`text-2xl font-medium transition-colors ${activeSection === item.href.substring(1) ? 'text-gold' : 'text-cream-light hover:text-gold'}`}>
                      {item.label}
                    </a>
                  </motion.li>)}
              </ul>
            </motion.div>}
        </AnimatePresence>
      </nav>
    </header>;
};