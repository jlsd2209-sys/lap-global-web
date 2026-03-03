import { motion } from 'framer-motion';
import { Network, Shield } from 'lucide-react';
import { Particles } from '../Particles';
import neuralMap from '@/assets/neural-map.png';

export const MapSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-navy-dark min-h-[600px] flex items-center">
      
      {/* CAPA DE FONDO PRINCIPAL */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/do Mapa PNG.png")',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* MEJORA DE UNIÓN SUPERIOR: Degradado que desvanece el borde de la imagen hacia el navy-dark */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-navy-dark via-navy-dark/40 to-transparent z-10" />

        {/* MEJORA DE UNIÓN INFERIOR: Degradado que desvanece la imagen hacia el navy-dark abajo */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-transparent z-10" />

        {/* OVERLAY DE COLOR: Ajustamos la opacidad general para que los negros de la imagen se mezclen con el fondo */}
        <div className="absolute inset-0 bg-navy-dark/10 z-0" />
      </div>
      
      {/* Partículas y Patrón Hexagonal */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
        <Particles count={30} colors={['#D4AF37', '#C9A961', '#00D4FF']} />
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="container relative z-30 mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Bloque de Texto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <span className="text-gold font-semibold tracking-widest uppercase text-sm block">La Visión</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">
                <span className="text-white drop-shadow-md">Seguridad Jurídica</span>
                <br />
                <span className="text-cream-light/90">en la Era de la</span>
                <br />
                <span className="text-gold">Inteligencia Artificial</span>
              </h2>
            </div>
            
            <p className="text-white/90 text-lg leading-relaxed max-w-lg font-medium drop-shadow-sm">
              Bienvenido a nuestro ecosistema de defensa penal de vanguardia, donde la trayectoria histórica de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva.
            </p>
          </motion.div>

          {/* Mapa Neural */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md">
              <img
                src={neuralMap}
                alt="Mapa Neural"
                className="w-full h-auto z-10 relative drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
              />
              
              {/* Etiquetas Flotantes */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-end">
                <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-tighter bg-navy-dark/40 backdrop-blur-md px-3 py-1 rounded-full border border-gold/30">
                  <Shield size={14} className="text-gold" /> Cobertura Transfronteriza
                </span>
                <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-tighter bg-navy-dark/40 backdrop-blur-md px-3 py-1 rounded-full border border-gold/30">
                  <Network size={14} className="text-gold" /> Red de Inteligencia Legal
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
