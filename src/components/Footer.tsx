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
  const [isLogoHovered, setIsLogoHovered] = useState(false);

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
    <footer className="bg-charcoal-dark py-12 border-t border-gold/20">
      <div className="container mx-auto px-4">
        {/* Ajuste de Grid para alineación exacta como en la foto */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          
          {/* Logo y Descripción */}
          <div className="md:col-span-5 flex flex-col items-start">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-3 group mb-4"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <div className="w-10 h-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <img src={logoShield} alt="Logo" className="w-full h-full object-contain" />
              </div>
              {/* TAMAÑO REDUCIDO: text-lg para que sea más elegante */}
              <span className={`font-serif text-lg font-bold transition-all duration-300 ${
                isLogoHovered ? 'gradient-text-gold' : 'text-white'
              }`}>
                Unidad de Asuntos Transnacionales & IA
              </span>
            </a>
            <p className="text-cream-light/70 text-sm leading-relaxed mb-6 max-w-sm">
              Innovación legal con inteligencia artificial para Sudamérica. 
              Transformando la práctica del derecho con tecnología de vanguardia.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center text-gold/80 hover:bg-gold hover:text-navy-dark transition-all"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navegación - Alineada a la izquierda con efecto de color */}
          <div className="md:col-span-3">
            <h3 className="text-base font-serif text-white mb-6 font-bold uppercase tracking-wider">Navegación</h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-cream-light/70 hover:gradient-text-gold transition-all duration-300 text-sm inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto - Con efecto de color en Email y Teléfono */}
          <div className="md:col-span-4">
            <h3 className="text-base font-serif text-white mb-6 font-bold uppercase tracking-wider">Contacto</h3>
            <ul className="flex flex-col gap-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-3 text-cream-light/70 text-sm group">
                  <info.icon className="text-gold mt-0.5 flex-shrink-0" size={16} />
                  {info.href ? (
                    <a 
                      href={info.href} 
                      className="hover:gradient-text-gold transition-all duration-300"
                    >
                      {info.text}
                    </a>
                  ) : (
                    <span>{info.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-gold/10">
          <p className="text-cream-light/40 text-xs">
            © 2026 Unidad de Asuntos Transnacionales & IA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
