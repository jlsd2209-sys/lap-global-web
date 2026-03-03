import { motion } from 'framer-motion';
import { Network, Shield } from 'lucide-react';
import { Particles } from '../Particles';
import neuralMap from '@/assets/neural-map.png';

export const MapSection = () => {
  // ==========================================
  // PANEL DE CONTROL: ¡JUEGA CON ESTOS VALORES!
  // ==========================================
  
  const configMapa = {
    // Menos es más ARRIBA, más es más ABAJO
    desdeArriba: '20px', 
    // Más es más a la IZQUIERDA, menos es más a la DERECHA
    desdeDerecha: '20px', 
    // Ancho del mapa flotante (ej: 400px, 600px...)
    escala: '580px', 
  };

  const configParrafo = {
    desdeArriba: '140px',   // Para bajarlo a la franja blanca
    desdeIzquierda: '50px', // Para separarlo del borde
    anchoMax: '450px',    // Qué tan ancho quieres el bloque de texto
  };

  const configBotones = {
    desdeAbajo: '100px',   // Para bajarlos a la zona azul oscuro
    desdeDerecha: '60px',  // Para alinearlos a la derecha
  };

  // ==========================================

  return (
    <section className="relative w-full overflow-hidden bg-navy-dark min-h-[700px] flex items-center">
      
      {/* 1. MAPA FLOTANTE NEURAL (Capas z-10: Se mueve con configMapa) */}
      <motion.div
        className="absolute z-10 pointer-events-none"
        style={{ 
          top: configMapa.desdeArriba,
          right: configMapa.desdeDerecha
        }}
      >
        <img
          src={neuralMap}
          alt="Mapa Neural"
          style={{ width: configMapa.escala }}
          className="h-auto opacity-70 drop-shadow-2xl" 
        />
      </motion.div>
      
      {/* 2. CAPA DE FONDO CON MÁSCARA (Capa z-20: Encima del mapa para taparlo) */}
      <div 
        className="absolute inset-0 z-20"
        style={{
          // Usamos una imagen de fondo limpia, sin las franjas blancas
          backgroundImage: 'url("/neural-background.png")', 
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          // MÁSCARA CSS: Crea los recortes precisos para que el mapa pase "detrás" de lo blanco
          maskImage: 'linear-gradient(to right, transparent 0%, transparent 10%, black 10%, black 90%, transparent 90%, transparent 100%)',
          maskSize: '100% 100%',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 10%, black 10%, black 90%, transparent 90%, transparent 100%)',
          WebkitMaskSize: '100% 100%',
        }}
      />
      
      {/* Partículas y Patrón Hexagonal (Capa z-30: Encima de lo blanco) */}
      <div className="absolute inset-0 z-30 pointer-events-none opacity-40">
        <Particles count={30} colors={['#D4AF37', '#C9A961', '#00D4FF']} />
      </div>

      {/* Hexagonal pattern overlay */}
      <div className="absolute inset-0 opacity-10 z-30 pointer-events-none">
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

      {/* CONTENIDO PRINCIPAL (Capa z-40: Encima de todo para no tapar texto) */}
      <div className="container relative z-40 mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Bloque de Texto (Izquierda) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
            style={{ 
              marginTop: configParrafo.desdeArriba,
              marginLeft: configParrafo.desdeIzquierda 
            }} 
          >
            <div className="space-y-2">
              <span className="text-gold font-semibold tracking-widest uppercase text-sm block">La Visión</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">
                {/* Texto blanco sobre fondo oscuro para legibilidad */}
                <span className="text-white">Seguridad Jurídica</span>
                <br />
                <span className="text-gold">Inteligencia Artificial</span>
              </h2>
            </div>
            
            <p className="text-navy-dark font-extrabold text-lg leading-relaxed max-w-md drop-shadow-sm"
              style={{ maxWidth: configParrafo.anchoMax }}
            >
              Bienvenido a nuestro ecosistema de defensa penal de vanguardia, donde la trayectoria histórica de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva.
            </p>
          </motion.div>

          {/* Bloque de Botones (Derecha - Alineado abajo) */}
          <div className="relative flex justify-center lg:justify-end">
            <div 
              className="flex flex-col sm:flex-row gap-4 mt-8"
              style={{ 
                marginTop: configBotones.desdeArriba,
                marginRight: configBotones.derecha 
              }}
            >
              {/* Botones blancos con texto oscuro sobre fondo blanco para legibilidad */}
              <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest bg-navy-dark px-4 py-2 rounded-full border border-gold/40">
                <Shield size={14} className="text-gold" /> Cobertura Transfronteriza
              </span>
              <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest bg-navy-dark px-4 py-2 rounded-full border border-gold/40">
                <Network size={14} className="text-gold" /> Red de Inteligencia Legal
              </span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
