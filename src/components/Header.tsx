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
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  // Estado para controlar el hover de los enlaces de forma nativa
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

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
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <div className="relative w-16 h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <img 
              alt="LAP Global & IA Logo" 
              className="w-full h-full object-contain drop-shadow-2xl" 
              src={logoShield} 
            />
          </div>
          <span 
            className={`hidden lg:block font-serif text-xl xl:text-2xl font-bold transition-all duration-300 ${
              isLogoHovered ? 'gradient-text-gold' : 'text-white'
            }`}
          >
            Unidad de Asuntos Transnacionales & IA
          </span>
        </a>

        {/* Desktop Navigation con Efectos de Texto Degradado */}
        <ul className="hidden md:flex gap-10">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            // Lógica pura para aplicar gradient-text-gold idéntico al CTA
            const isHovered = hoveredLink === item.href;
            const applyGold = isActive || isHovered;

            return (
              <li key={item.href}>
                <a 
                  href={item.href} 
                  onClick={(e) => handleNavClick(e, item.href)} 
                  onMouseEnter={() => setHoveredLink(item.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative font-medium py-2 text-lg transition-all duration-300 inline-block cursor-pointer
                    ${applyGold ? 'gradient-text-gold' : 'text-white'}
                    ${isActive ? 'font-bold scale-105' : 'hover:scale-105'}`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold to-gold-bright transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`} />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white p-2 relative z-[60]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        {/* Mobile Navigation - NUEVO ESTILO FLOTANTE */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Overlay oscuro para tapar el resto de la pantalla y cerrar al tocar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] md:hidden"
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Panel flotante ajustado (Estilo Asistente) */}
              <motion.div 
                initial={{ opacity: 0, y: -20, scale: 0.95 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                exit={{ opacity: 0, y: -20, scale: 0.95 }} 
                transition={{ duration: 0.2 }} 
                className="absolute top-[85px] right-4 w-48 bg-[#0a1526]/95 backdrop-blur-xl border border-[#c5a059]/40 rounded-2xl p-5 md:hidden z-[50] shadow-[0_8px_30px_rgba(0,0,0,0.6)] shadow-cyan/10"
              >
                <ul className="flex flex-col gap-5">
                  {navItems.map((item, index) => (
                    <motion.li 
                      key={item.href} 
                      initial={{ opacity: 0, x: 20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      transition={{ delay: index * 0.05 }}
                    >
                      <a 
                        href={item.href} 
                        onClick={(e) => handleNavClick(e, item.href)} 
                        className={`text-[17px] font-serif transition-all duration-300 block w-full text-left ${
                          activeSection === item.href.substring(1) ? 'gradient-text-gold font-bold' : 'text-cream-light/90 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
