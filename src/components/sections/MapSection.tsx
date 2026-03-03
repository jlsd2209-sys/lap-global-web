import { motion } from 'framer-motion';
import { Network, Shield } from 'lucide-react';
import { Particles } from '../Particles';
import neuralMap from '@/assets/neural-map.png';

export const MapSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-navy-dark min-h-[650px] flex items-center">
      
      {/* FONDO PRINCIPAL */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/Fondo Mapa PNG.png")',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Degradados para suavizar uniones */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-navy-dark via-transparent to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-navy-dark via-transparent to-transparent z-10" />
      </div>
      
      {/* Partículas */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-30">
        <Particles count={25} colors={['#D4AF37', '#00D4FF']} />
      </div>

      <div className="container relative z-20 mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-start pt-12">
          
          {/* LADO IZQUIERDO: Títulos y Párrafo en zona blanca */}
          <div className="space-y-24"> {/* Espaciado grande para empujar el párrafo a la zona blanca */}
            
            {/* Título (Se mantiene arriba en zona oscura/azul) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <span className="text-gold font-semibold tracking-widest uppercase text-sm block">La Visión</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">
                <span className="text-white drop-shadow-md">Seguridad Jurídica</span>
                <br />
                <span className="text-cream-light/90">en la Era de la</span>
                <br />
                <span className="text-gold">Inteligencia Artificial</span>
              </h2>
            </motion.div>

            {/* Párrafo: AJUSTADO A LA ZONA BLANCA (Amarillo en tu dibujo) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-navy-dark font-bold text-lg leading-relaxed max-w-md ml-4 lg:ml-8"
              style={{ marginTop: '10rem' }} // Empuja el texto hacia la franja blanca inferior
            >
              Bienvenido a nuestro ecosistema de defensa penal de vanguardia, donde la trayectoria histórica de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva.
            </motion.p>
          </div>

          {/* LADO DERECHO: Mapa y Badges */}
          <div className="relative flex flex-col items-center lg:items-end h-full">
            
            {/* Mapa Neural: Movido abajo y a la izquierda (Rojo en tu dibujo) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative mt-20 lg:mr-20" // Ajuste manual de posición
            >
              <img
                src={neuralMap}
                alt="Mapa Neural"
                className="w-full max-w-[380px] h-auto drop-shadow-[0_0_50px_rgba(212,175,55,0.2)]"
              />
            </motion.div>

            {/* Badges: Ajustados al fondo a la derecha (Rojo abajo en tu dibujo) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row gap-4 mt-auto pt-32 lg:pr-10"
            >
              <span className="flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest bg-charcoal-dark/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gold/40">
                <Shield size={14} className="text-gold" /> Cobertura Transfronteriza
              </span>
              <span className="flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest bg-charcoal-dark/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gold/40">
                <Network size={14} className="text-gold" /> Red de Inteligencia Legal
              </span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
