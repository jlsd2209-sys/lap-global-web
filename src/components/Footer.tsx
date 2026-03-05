import { useState } from 'react';
import { Linkedin, Twitter, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import logoShield from '@/assets/logo-shield.png';

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: MessageCircle, href: 'https://wa.me/5491112345678', label: 'WhatsApp' }
];

const navLinks = [
  { label: 'Inicio', href: '#home' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' }
];

const contactInfo = [
  { icon: Mail, text: 'contacto@lapglobal.ai', href: 'mailto:contacto@lapglobal.ai' },
  { icon: Phone, text: '+54 9 11 1234-5678', href: 'tel:+5491112345678' },
  { icon: MapPin, text: 'Buenos Aires, Argentina', href: null },
  { icon: MapPin, text: 'Caracas, Venezuela', href: null }
];

export const Footer = () => {
  const [isTitleHovered, setIsTitleHovered] = useState(false);
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null);
  const [hoveredContactIndex, setHoveredContactIndex] = useState<number | null>(null);
  const [hoveredSocialIndex, setHoveredSocialIndex] = useState<number | null>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-charcoal-dark py-8 border-t border-gold/20 pt-[15px] pb-[15px]">
      <div className="container pb-0 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          
          {/* Logo & Description */}
          <div className="flex flex-col items-start">
            
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              onMouseEnter={() => setIsTitleHovered(true)}
              onMouseLeave={() => setIsTitleHovered(false)}
              className="flex items-center gap-3 font-serif text-xl font-bold mb-4 transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <img src={logoShield} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className={`whitespace-nowrap transition-all duration-300 ${
                isTitleHovered ? 'gradient-text-gold' : 'text-white'
              }`}>
                Unidad de Asuntos Transnacionales & IA
              </span>
            </a>
            <p className="text-cream-light/80 leading-relaxed mb-6">
              Innovación legal con inteligencia artificial para Sudamérica. 
              Transformando la práctica del derecho con tecnología de vanguardia.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  onMouseEnter={() => setHoveredSocialIndex(index)}
                  onMouseLeave={() => setHoveredSocialIndex(null)}
                  className={`w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center transition-all ${
                    hoveredSocialIndex === index 
                      ? 'bg-gold text-navy-dark -translate-y-1' 
                      : 'bg-gold/10 text-gold'
                  }`}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation - COLUMNA CENTRADA */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-serif text-white mb-6">Navegación</h3>
            <ul className="flex flex-col gap-3 items-center">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    onMouseEnter={() => setHoveredNavIndex(index)}
                    onMouseLeave={() => setHoveredNavIndex(null)}
                    className={`transition-all inline-block ${
                      hoveredNavIndex === index 
                        ? 'gradient-text-gold translate-x-1' 
                        : 'text-cream-light/80'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-start md:items-end">
            <h3 className="text-lg font-serif text-white mb-6">Contacto</h3>
            <ul className="flex flex-col gap-4 items-start md:items-end">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-3 text-cream-light/80">
                  <info.icon className="text-gold mt-0.5 flex-shrink-0" size={18} />
                  {info.href ? (
                    <a 
                      href={info.href}
                      onMouseEnter={() => setHoveredContactIndex(index)}
                      onMouseLeave={() => setHoveredContactIndex(null)}
                      className={`transition-colors text-left md:text-right ${
                        hoveredContactIndex === index ? 'gradient-text-gold' : ''
                      }`}
                    >
                      {info.text}
                    </a>
                  ) : (
                    <span className="text-left md:text-right">{info.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-gold/10">
          <p className="text-cream-light/60 text-sm">
            © 2026 Unidad de Asuntos Transnacionales & IA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
