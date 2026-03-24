import { motion } from 'framer-motion';
import { MessageCircle, Mail, MapPin } from 'lucide-react';
import { Particles } from '@/components/Particles';

export const CTASection = () => {
  return (
    <section id="contacto" className="relative py-14 bg-gradient-to-br from-navy-dark to-charcoal overflow-hidden pt-[40px] pb-[40px]">
      {/* Particles background */}
      <Particles count={25} />

      <div className="container relative z-10 pt-0 pb-0">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-serif font-bold mb-6 gradient-text-gold whitespace-nowrap">

            Eficiencia Algorítmica con Criterio Jurídico
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-cream-light/90 mb-6 leading-relaxed">Infraestructura de gestión automatizada a través de la inteligencia artificial

          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-8">

            <a
              href="https://wa.me/5491126770449?text=Hola,%20quiero%20una%20consulta%20sobre%20servicios%20de%20IA%20legal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-gold to-gold-bright text-navy-dark font-bold text-lg rounded-full transition-all hover:shadow-2xl hover:shadow-gold/50 hover:scale-105"
              style={{
                animation: 'pulse-glow 1.5s ease-in-out infinite'
              }}>

              <MessageCircle size={24} />
              Contactar Ahora
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-8 text-gold-light">

            <div className="flex items-center gap-2">
              <Mail className="text-gold" size={20} />
              <span>unidaddeia@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-gold" size={20} />
              <span>Caracas, Venezuela</span>
            </div>
             <div className="flex items-center gap-2">
              <MapPin className="text-gold" size={20} />
              <span>Buenos Aires, Argentina</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

};
