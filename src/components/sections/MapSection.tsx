import { motion } from 'framer-motion';
import { Globe, Scale, Network, Shield, FileText } from 'lucide-react';
import { Particles } from '../Particles';
import neuralMap from '@/assets/neural-map.png';
import bgCircles from '@/assets/bg-circles.png';
export const MapSection = () => {
  const services = [
  { icon: Globe, label: 'Monitor de Riesgo', sublabel: '(Arg-Ven)' },
  { icon: Scale, label: 'Análisis Penal', sublabel: '(Arg-Ven)' },
  { icon: FileText, label: 'Auditoría Documental', sublabel: '' }];


  return (
    <section className="relative py-24 overflow-hidden pb-[20px] pt-[40px]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={bgCircles} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal-dark/40" />
      </div>
      
      {/* Animated particles background */}
      <Particles count={50} colors={['#D4AF37', '#C9A961', '#00D4FF']} />
      
      {/* Hexagonal pattern overlay */}
      <div className="absolute inset-0 opacity-10 pb-[80px]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
              <polygon
                points="25,0 50,14.4 50,43.4 25,57.7 0,43.4 0,14.4"
                fill="none"
                stroke="hsl(var(--gold))"
                strokeWidth="0.5"
                opacity="0.3" />

            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      <div className="container relative z-10 pt-0 pb-0">
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
            
            <p className="text-cream-light/80 text-lg leading-relaxed max-w-lg">Bienvenido a nuestro ecosistema de defensa penal de vanguardia, donde la trayectoria histórica de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva. Transformamos datos masivos en Inteligencia Accionable, mitigando el riesgo antes de su cristalización procesal.

            </p>

            {/* Service modules */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4">

              {services.map((service, index) => (
                <motion.div
                  key={service.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gold/30 bg-navy-dark/50 text-cream-light text-sm">
                  <service.icon className="w-4 h-4 text-gold" />
                  <span>{service.label} {service.sublabel}</span>
                </motion.div>
              )








              )}
            </motion.div>
          </motion.div>

          {/* Right Content - Neural Map Image with Sparkles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
            style={{ perspective: '1000px' }}>

            {/* Neural Map Image with 3D effect */}
            <motion.div
              className="relative w-full max-w-lg mx-auto"
              animate={{ rotateY: [0, 8, 0, -8, 0], rotateX: [0, -2, 0, 2, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformStyle: 'preserve-3d' }}>

              <div className="relative overflow-hidden opacity-80 shadow-inner rounded-lg" style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%)',
                maskComposite: 'intersect',
                WebkitMaskComposite: 'destination-in',
                marginTop: '-2rem'
              }}>
                <img
                  src={neuralMap}
                  alt="Mapa de conexiones neuronales de Latinoamérica"
                  className="w-full h-auto relative z-10 scale-110 object-fill border-0 border-none opacity-100 shadow-none rounded-xl"
                  style={{
                    filter: 'drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.6))'
                  }} />

              </div>
              
              {/* Animated sparkles overlay */}
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) =>
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
                  }} />

                )}
              </div>
            </motion.div>

            {/* Floating labels */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex justify-center gap-6 mt-6 flex-wrap">

              <span className="flex items-center gap-2 text-gold-light text-sm">
                <Shield className="text-gold" size={16} />
                Cobertura Transfronteriza
              </span>
              <span className="flex items-center gap-2 text-gold-light text-sm">
                <Network className="text-gold" size={16} />
                Red de Inteligencia Legal
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </section>);

};