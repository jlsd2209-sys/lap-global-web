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
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = navItems.map((item) => item.href.substring(1));
      for (const sectionId of sections.reverse()) {
        const element = document.getElementById(sectionId);
        if (element && element.getBoundingClientRect().top <= 100) {
          setActiveSection(sectionId);
          break;
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
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-navy-dark/95 backdrop-blur-md shadow-lg' : 'bg-navy-dark/80 backdrop-blur-sm'}`}>
      <nav className="container flex justify-between items-center h-24">
        
        {/* LOGO Y NOMBRE CON EFECTO CORREGIDO */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')} 
          className="flex items-center gap-4 group cursor-pointer"
        >
          <div className="relative w-16 h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <img src={logoShield} alt="Logo" className="w-full h-full object-contain drop-shadow-2xl" />
          </div>
          
          <span 
            className="hidden lg:block font-serif text-xl xl:text-2xl font-bold text-white transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-gold group-hover:to-gold-bright group-hover:bg-clip-text group-hover:text-transparent"
            style={{ 
              display: 'inline-block',
              WebkitBackgroundClip: 'text' // Necesario para compatibilidad
            }}
          >
            Unidad de Asuntos Transnacionales & IA
          </span>
        </a>

        {/* NAVEGACIÓN DESKTOP */}
        <ul className="hidden md:flex gap-10">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <li key={item.href}>
                <a 
                  href={item.href} 
                  onClick={(e) => handleNavClick(e, item.href)} 
                  className={`relative font-medium py-2 text-lg transition-all duration-300 inline-block
                    ${isActive 
                      ? 'bg-gradient-to-r from-gold to-gold-bright bg-clip-text text-transparent font-bold' 
                      : 'text-white hover:bg-gradient-to-r hover:from-gold hover:to-gold-bright hover:bg-clip-text hover:text-transparent'}`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold to-gold-bright transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`} />
                </a>
              </li>
            );
          })}
        </ul>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </nav>
    </header>
  );
};
