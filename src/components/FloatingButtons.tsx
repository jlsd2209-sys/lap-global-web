import { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/5491112345678?text=Hola,%20quiero%20información%20sobre%20LAP%20Global"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center text-white shadow-lg z-50 transition-transform hover:scale-110"
        style={{
          animation: 'whatsapp-pulse 2s ease-in-out infinite',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.5)',
        }}
      >
        <MessageCircle size={28} fill="white" />
      </a>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            aria-label="Volver arriba"
            className="fixed bottom-8 left-8 w-12 h-12 bg-gradient-to-br from-gold to-gold-bright rounded-full flex items-center justify-center text-navy-dark shadow-lg z-50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/40"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
