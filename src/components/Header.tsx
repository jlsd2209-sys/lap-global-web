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
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-navy-dark/95 backdrop-blur-md shadow-lg' : 'bg-navy-dark/80 backdrop-blur-sm'}`}>
      <nav className="container flex justify-between items-center h-24">
        
        {/* Logo y Nombre con Efecto Hover Blanco -> Dorado */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')} 
          className="flex items-center gap-4 group cursor-pointer"
        >
          <div className="relative w-16 h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <img 
              alt="LAP Global & IA Logo" 
              className="w-full h-full object-contain drop-shadow-2xl" 
              src={logoShield} 
            />
          </div>
          <span className="hidden lg:block font-serif text-xl xl:text-2xl font-bold text-white transition-all duration-300 group-hover:gradient-text-gold">
            Unidad de Asuntos Transnacionales & IA
          </span>
        </a>

        {/* Desktop Navigation con Efectos de Texto Degradado */}
        <ul className="hidden md:flex gap-10">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <li key={item.href}>
                <a 
                  href={item.href} 
                  onClick={(e) => handleNavClick(e, item.href)} 
                  className={`relative font-medium py-2 text-lg transition-all duration-300 inline-block cursor-pointer
                    ${isActive ? 'gradient-text-gold font-bold scale-105' : 'text-white hover:gradient-text-gold hover:scale-105'}`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold to-gold-bright transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`} />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ type: 'tween', duration: 0.3 }} 
              className="fixed top-0 right-0 w-4/5 h-full bg-navy-dark/98 backdrop-blur-lg p-8 pt-24 md:hidden z-40 shadow-2xl"
            >
              <button className="absolute top-6 right-6 text-white" onClick={() => setIsMenuOpen(false)}>
                <X size={32} />
              </button>
              
              <ul className="flex flex-col gap-8">
                {navItems.map((item, index) => (
                  <motion.li 
                    key={item.href} 
                    initial={{ opacity: 0, x: 50 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: index * 0.1 }}
                  >
                    <a 
                      href={item.href} 
                      onClick={(e) => handleNavClick(e, item.href)} 
                      className={`text-2xl font-medium transition-all duration-300 ${
                        activeSection === item.href.substring(1) ? 'gradient-text-gold' : 'text-white'
                      }`}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
