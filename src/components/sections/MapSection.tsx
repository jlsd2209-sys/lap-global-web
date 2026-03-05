import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';
import { Particles } from '@/components/Particles';

export const MapSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const esMovil = windowWidth < 768;

  // ============================================================
  // 🖥️ PANEL ESCRITORIO: AJUSTES ORIGINALES
  // ============================================================
  const escritorio = {
    altura: '600px',
    titulo: { arriba: '22%', izquierda: '14%' },
    mapa: { arriba: '2%', derecha: '13%', tamaño: '445px', opacidad: isHovered ? '0.90' : '0.70' },
    texto: { arriba: '73%', izquierda: '14%', anchoMax: '450px' },
    boton: { abajo: '4%', derecha: '15%', size: '10px' }
  };

  // ============================================================
  // 📱 PANEL MÓVIL: TUS ÚLTIMOS AJUSTES (Iluminación activada)
  // ============================================================
  const movil = {
    altura: '600px',
    titulo: { arriba: '20%', izquierda: '5%', size: '1.8rem', sizeItalic: '1.1rem' },
    mapa:   { arriba: '9%', derecha: '4%', tamaño: '310px', opacidad: isHovered ? '0.85' : '0.55' },
    texto:  { arriba: '72.4%', izquierda: '5%', ancho: '55%', size: '0.8rem' },
    boton:  { abajo: '30%', izquierda: '5%', size: '9px' }
  };

  const p = esMovil ? movil : escritorio;

  return (
    <section 
      className="relative w-full overflow-hidden bg-navy-dark" 
      style={{ height: p.altura }}
    >
      {/* 1. FONDO */}
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/Fondo Mapa PNG.png")',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* 2. PARTÍCULAS */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Particles count={esMovil ? 20 : 50} />
      </div>

      {/* 3. MAPA CON EL EFECTO ESPECTACULAR QUE ENVIASTE */}
      <motion.div
        className="absolute z-20 pointer-events-none"
        style={{ 
          top: p.mapa.arriba, 
          right: p.mapa.derecha 
        }}
        animate={{
          filter: isHovered 
            ? [
                "drop-shadow(0 0 20px rgba(100, 210, 255, 0.8))", 
                "drop-shadow(0 0 60px rgba(140, 230, 255, 1))",
                "drop-shadow(0 0 20px rgba(100, 210, 255, 0.8))"
              ]
            : [
                "drop-shadow(0 0 10px rgba(100, 210, 255, 0.4))",
                "drop-shadow(0 0 40px rgba(140, 230, 255, 0.75))",
                "drop-shadow(0 0 10px rgba(100, 210, 255, 0.4))"
              ],
          scale: isHovered ? 1.05 : 1, 
        }}
        transition={{
          duration: isHovered ? 0.4 : 2.7,
          ease: "easeInOut",
          repeat: isHovered ? 0 : Infinity, 
        }}
      >
        <img
          src="/Mapa con escudo.png"
          alt="Mapa con escudo"
          style={{ 
            width: p.mapa.tamaño, 
            opacity: p.mapa.opacidad,
            transition: 'opacity 0.4s ease'
          }}
          className="h-auto"
        />
      </motion.div>
      
      {/* 4. CONTENIDO */}
      <div className="relative z-30 h-full w-full">
        
        {/* TÍTULO */}
        <div className="absolute" style={{ top: p.titulo.arriba, left: p.titulo.izquierda }}>
          <span className="text-gold font-semibold tracking-widest uppercase text-sm block mb-2">La Visión</span>
          <h2 className="font-serif font-bold leading-tight">
            <span className="text-white text-3xl md:text-4xl lg:text-5xl block" style={{ fontSize: esMovil ? p.titulo.size : '' }}>Seguridad Jurídica</span>
            <span className="text-white/80 text-xl md:text-2xl italic block my-1" style={{ fontSize: esMovil ? p.titulo.sizeItalic : '' }}>en la Era de la</span>
            <span className="text-gold text-3xl md:text-4xl lg:text-5xl block" style={{ fontSize: esMovil ? p.titulo.size : '' }}>Inteligencia Artificial</span>
          </h2>
        </div>

        {/* PARRAFO */}
        <motion.p
          className="absolute text-navy-dark font-extrabold text-lg leading-relaxed"
          style={{ 
            top: p.texto.arriba,
            left: p.texto.izquierda,
            maxWidth: esMovil ? p.texto.ancho : escritorio.texto.anchoMax,
            fontSize: esMovil ? p.texto.size : '' 
          }} 
        >
          Bienvenido a nuestro ecosistema de defensa legal de vanguardia, donde la trayectoria histórica de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva.
        </motion.p>

        {/* BOTÓN CON DISPARADOR (Hover) */}
        <div 
          className="absolute" 
          style={{ 
            bottom: p.boton.abajo, 
            right: esMovil ? 'auto' : escritorio.boton.derecha,
            left: esMovil ? p.boton.izquierda : 'auto'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(10, 25, 47, 0.9)' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-white font-bold uppercase bg-navy-dark/60 px-6 py-3 rounded-full border border-gold/40 shadow-[0_0_15px_rgba(212,175,55,0.2)] backdrop-blur-sm transition-all whitespace-nowrap"
            style={{ fontSize: p.boton.size }}
          >
            <Network size={16} className={`transition-colors ${isHovered ? 'text-cyan-400' : 'text-gold'}`} />
            <span className={isHovered ? 'text-cyan-50' : 'text-white'}>Red de Inteligencia Legal</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
