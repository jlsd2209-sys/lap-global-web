import { motion } from 'framer-motion';
import { Network, Shield } from 'lucide-react';
import { Particles } from '../Particles';
import neuralMap from '@/assets/neural-map.png';

export const MapSection = () => {
  // Array de servicios vacío según lo solicitado anteriormente
  const services = []; 
 
  return (
    // SEGUNDO CAMBIO: Eliminamos paddings excesivos que podrían interferir con la imagen
    <section className="relative overflow-hidden bg-navy-dark">
      {/* PRIMER CAMBIO: Contenedor de imagen con relación de aspecto forzada */}
      <div className="relative w-full aspect-video md:aspect-[21/9] lg:aspect-[21/9] overflow-hidden">
        <img 
          src="/Fondo Mapa PNG.png" // Ajusta el nombre si lo cambiaste
          alt="Fondo decorativo" 
          // Usamos 'object-contain' para asegurar que se vea TODA la imagen, 
          // y la centramos con 'object-center'.
          className="absolute inset-0 w-full h-full object-contain object-center z-0" 
        />
        {/* Un pequeño overlay para asegurar legibilidad si el fondo es muy claro */}
        <div className="absolute inset-0 bg-charcoal-dark/20 z-10" />
      </div>
      
      {/* TERCER CAMBIO: Ajustamos el z-index de los elementos superpuestos */}
      {/* Animated particles background - Detrás del contenido pero sobre la imagen */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <Particles count={30} colors={['#D4AF37', '#C9A961', '#00D4FF']} />
      </div>
      
      {/* Hexagonal pattern overlay - Muy sutil sobre la imagen */}
      <div className="absolute inset-0 opacity-5 z-15 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
              <polygon
                points="25,0 50,14.4 50,43.4 25,57.7 0,43.4 0,14.4"
                fill="none"
                stroke="hsl(var(--gold))"
                strokeWidth="0.5"
                opacity="0.3" 
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* Contenido principal - Con z-index alto y padding superior negativo para subirlo sobre la imagen */}
      <div className="container relative z-30 pt-12 pb-24 -mt-[10%] md:-mt-[15%]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6">

            <div className="space-y-2 pt-0">
              <span className="text-gold font-semibold tracking-widest uppercase text-sm">La Visión</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">
                <span className="gradient-text">Seguridad Jurídica</span>
                <br />
                <span className="text-cream-light">en la Era de la</span>
                <br />
                <span className="text-gold">Inteligencia Artificial</span>
              </h2>
            </div>
            
            <p className="text-cream-light/80 text-lg leading-relaxed max-w-lg bg-navy-dark/60 p-4 rounded-lg backdrop-blur-sm">
              Bienvenido a nuestro ecosistema de defensa penal de vanguardia, donde la trayectoria histórica de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva. Transformamos datos masivos en Inteligencia Accionable, mitigando el riesgo antes de su cristalización procesal.
            </p>
          </motion.div>

          {/* Right Content - Neural Map Image with Sparkles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
            style={{ perspective: '1000px' }}>

            <motion.div
              className="relative w-full max-w-lg mx-auto"
              animate={{ rotateY: [0, 8, 0, -8, 0], rotateX: [0, -2, 0, 2, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformStyle: 'preserve-3d' }}>

              <div className="relative overflow-hidden opacity-90 shadow-2xl rounded-lg" style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%)',
                maskComposite: 'intersect',
                WebkitMaskComposite: 'destination-in',
              }}>
                <img
                  src={neuralMap}
                  alt="Mapa de conexiones neuronales de Latinoamérica"
                  className="w-full h-auto relative z-10 scale-110 object-fill border-0 border-none rounded-xl"
                  style={{
                    filter: 'drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.8))'
                  }} 
                />
              </div>
              
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-gold rounded-full"
                    style={{
                      left: `${15 + Math.random() * 70}%`,
                      top: `${10 + Math.random() * 80}%`,
                      boxShadow: '0 0 6px 2px rgba(201, 169, 97, 0.8), 0 0 12px 4px rgba(0, 212, 255, 0.4)'
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.5, 0.5]
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                      ease: "easeInOut"
                    }} 
                  />
                ))}
              </div>
            </motion.div>

            {/* Floating labels */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex justify-center gap-6 mt-12 flex-wrap bg-navy-dark/50 p-3 rounded-full backdrop-blur-sm">

              <span className="flex items-center gap-2 text-gold-light text-sm font-medium">
                <Shield className="text-gold" size={16} />
                Cobertura Transfronteriza
              </span>
              <span className="flex items-center gap-2 text-gold-light text-sm font-medium">
                <Network className="text-gold" size={16} />
                Red de Inteligencia Legal
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Eliminada la línea decorativa inferior para una transición más limpia */}
    </section>
  );
};
