import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';
import { Particles } from '@/components/Particles';

export const MapSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detector de pantalla para ajustar el panel de control
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ============================================================
  // PANEL DE CONTROL: TUS AJUSTES EXACTOS (Ahora con adaptabilidad)
  // ============================================================
  const ajusteSeccion = { altura: isMobile ? '850px' : '600px' };
  
  const ajusteTitulo = { 
    desdeArriba: isMobile ? '8%' : '22%', 
    desdeIzquierda: isMobile ? '5%' : '14%' 
  };

  const ajusteMapa = {
    desdeArriba: isMobile ? '25%' : '2%',
    desdeDerecha: isMobile ? '5%' : '13%',    
    tamaño: isMobile ? '90%' : '445px',       
    opacidad: isHovered ? '0.90' : '0.70',
  };

  const ajusteTexto = { 
    desdeArriba: isMobile ? '65%' : '73%', 
    desdeIzquierda: isMobile ? '5%' : '14%', 
    anchoMax: isMobile ? '90%' : '450px' 
  };

  const ajusteBotones = { 
    desdeAbajo: isMobile ? '2%' : '4%', 
    desdeDerecha: isMobile ? '5%' : '15%' 
  };

  return (
    <section 
      className="relative w-full overflow-hidden bg-navy-dark transition-all duration-500" 
      style={{ height: ajusteSeccion.altura }}
    >
      
      {/* 1. FONDO */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/Fondo Mapa PNG.png")',
          backgroundSize: isMobile ? 'cover' : '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* 2. PARTÍCULAS */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Particles count={50} />
      </div>

      {/* 3. MAPA CON AURA REACTIVA */}
      <motion.div
        className="absolute z-20 pointer-events-none flex justify-center"
        style={{ 
          top: ajusteMapa.desdeArriba,
          right: ajusteMapa.desdeDerecha,
          width: isMobile ? '90%' : 'auto'
        }}
        animate={{
          filter: isHovered 
            ? ["drop-shadow(0 0 20px rgba(100, 210, 255, 0.8))", "drop-shadow(0 0 60px rgba(140, 230, 255, 1))", "drop-shadow(0 0 20px rgba(100, 210, 255, 0.8))"]
            : ["drop-shadow(0 0 10px rgba(100, 210, 255, 0.4))", "drop-shadow(0 0 40px rgba(140, 230, 255, 0.75))", "drop-shadow(0 0 10px rgba(100, 210, 255, 0.4))"],
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: isHovered ? 0.4 : 2.7, ease: "easeInOut", repeat: isHovered ? 0 : Infinity }}
      >
        <img
          src="/Mapa con escudo.png"
          alt="Mapa con escudo"
          style={{ 
            width: ajusteMapa.tamaño,
            opacity: ajusteMapa.opacidad,
            transition: 'opacity 0.4s ease'
          }}
          className="h-auto"
        />
      </motion.div>
      
      {/* 4. CONTENIDO */}
      <div className="relative z-30 h-full w-full">
        <div className="absolute" style={{ top: ajusteTitulo.desdeArriba, left: ajusteTitulo.desdeIzquierda }}>
          {/* "La Visión" ahora con el degradado blanco-oro solicitado */}
          <span className="gradient-text-gold font-semibold tracking-widest uppercase text-sm block mb-2">
            La Visión
          </span>
          <h2 className="font-serif font-bold leading-tight">
            <span className="text-white text-3xl md:text-4xl lg:text-5xl block">Seguridad Jurídica</span>
            <span className="text-white/80 text-xl md:text-2xl italic block my-1">en la Era de la</span>
            <span className="gradient-text-gold text-3xl md:text-4xl lg:text-5xl block">Inteligencia Artificial</span>
          </h2>
        </div>

        <motion.p
          /* Regresamos a text-navy-dark para contraste sobre el fondo blanco de la imagen */
          className="absolute text-navy-dark font-extrabold text-lg leading-relaxed md:text-xl"
          style={{ 
            top: ajusteTexto.desdeArriba,
            left: ajusteTexto.desdeIzquierda,
            maxWidth: ajusteTexto.anchoMax
          }} 
        >
          Bienvenido a nuestro ecosistema de defensa legal de vanguardia, donde la trayectoria histórica de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva.
        </motion.p>

        {/* 5. BOTÓN */}
        <div 
          className="absolute" 
          style={{ bottom: ajusteBotones.desdeAbajo, right: ajusteBotones.desdeDerecha }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(10, 25, 47, 0.9)' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-white text-[10px] font-bold uppercase bg-navy-dark/60 px-6 py-3 rounded-full border border-gold/40 shadow-[0_0_15px_rgba(212,175,55,0.2)] backdrop-blur-sm transition-all"
          >
            <Network size={16} className={`transition-colors ${isHovered ? 'text-cyan-400' : 'text-gold'}`} />
            <span className={isHovered ? 'text-cyan-50' : 'text-white'}>Red de Inteligencia Legal</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
