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
  // 🖥️ PANEL DE CONTROL: ESCRITORIO (RESTAURADO)
  // ============================================================
  const escritorio = {
    altura: '600px',
    titulo: { arriba: '22%', izquierda: '14%', size: '3.2rem', sizeItalic: '1.6rem' },
    mapa:   { arriba: '2%', derecha: '13%', tamaño: '445px', opacidad: isHovered ? '0.90' : '0.70' },
    texto:  { arriba: '73%', izquierda: '14%', ancho: '450px', size: '1.1rem', color: '#0A192F' },
    boton:  { abajo: '4%', derecha: '15%', size: '10px' }
  };

  // ============================================================
  // 📱 PANEL DE CONTROL: MÓVIL (TUS AJUSTES EXACTOS)
  // ============================================================
  const movil = {
    altura: '600px',
    titulo: { arriba: '20%', izquierda: '5%', size: '1.8rem', sizeItalic: '1.1rem' },
    mapa:   { arriba: '9%', derecha: '6%', tamaño: '280px', opacidad: '0.50' },
    texto:  { arriba: '72.4%', izquierda: '5%', ancho: '62%', size: '0.8rem', color: '#0A192F' },
    boton:  { abajo: '30%', derecha: '0%', size: '9px' }
  };

  // Helper para no repetir código, pero manteniendo independencia total
  const d = esMovil ? movil : escritorio;

  return (
    <section 
      className="relative w-full overflow-hidden bg-navy-dark" 
      style={{ height: d.altura }}
    >
      {/* 1. FONDO */}
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/Fondo Mapa PNG.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* 2. PARTÍCULAS */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Particles count={esMovil ? 15 : 40} />
      </div>

      {/* 3. MAPA CON AURA */}
      <motion.div
        className="absolute z-20 pointer-events-none"
        style={{ 
          top: d.mapa.arriba, 
          right: d.mapa.derecha 
        }}
        animate={{
          filter: isHovered 
            ? ["drop-shadow(0 0 20px rgba(100, 210, 255, 0.8))", "drop-shadow(0 0 60px rgba(140, 230, 255, 1))", "drop-shadow(0 0 20px rgba(100, 210, 255, 0.8))"]
            : ["drop-shadow(0 0 10px rgba(100, 210, 255, 0.4))", "drop-shadow(0 0 40px rgba(140, 230, 255, 0.75))", "drop-shadow(0 0 10px rgba(100, 210, 255, 0.4))"],
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 2.7, ease: "easeInOut", repeat: Infinity }}
      >
        <img
          src="/Mapa con escudo.png"
          alt="Mapa con escudo"
          style={{ 
            width: d.mapa.tamaño, 
            opacity: d.mapa.opacidad,
            transition: 'opacity 0.4s ease'
          }}
          className="h-auto"
        />
      </motion.div>
      
      {/* 4. CONTENIDO */}
      <div className="relative z-30 h-full w-full">
        
        {/* TÍTULO */}
        <div 
          className="absolute px-4" 
          style={{ 
            top: d.titulo.arriba, 
            left: d.titulo.izquierda 
          }}
        >
          <span className="text-gold font-semibold tracking-widest uppercase text-[11px] block mb-2">La Visión</span>
          <h2 className="font-serif font-bold leading-tight" style={{ fontSize: d.titulo.size }}>
            <span className="text-white block">Seguridad Jurídica</span>
            <span className="text-white/80 italic block my-1" style={{ fontSize: d.titulo.sizeItalic }}>en la Era de la</span>
            <span className="text-gold block">Inteligencia Artificial</span>
          </h2>
        </div>

        {/* PARRAFO */}
        <motion.p
          className="absolute font-extrabold leading-relaxed px-4"
          style={{ 
            top: d.texto.arriba,
            left: d.texto.izquierda,
            maxWidth: d.texto.ancho,
            fontSize: d.texto.size,
            color: d.texto.color
          }} 
        >
          Bienvenido a nuestro ecosistema de defensa legal de vanguardia, donde la trayectoria histórica de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva.
        </motion.p>

        {/* BOTÓN */}
        <div 
          className="absolute" 
          style={{ 
            bottom: d.boton.abajo, 
            right: esMovil ? 'auto' : d.boton.derecha,
            left: esMovil ? '5%' : 'auto' 
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 text-white font-bold uppercase bg-navy-dark/90 px-6 py-4 rounded-full border border-gold/40 shadow-xl backdrop-blur-md transition-all whitespace-nowrap"
            style={{ fontSize: d.boton.size }}
          >
            <Network size={18} className={isHovered ? 'text-cyan-400' : 'text-gold'} />
            <span>Red de Inteligencia Legal</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
