import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';
import { Particles } from '@/components/Particles';

export const MapSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Escucha el tamaño de la ventana para que los ajustes cambien en tiempo real
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const esMovil = windowWidth < 768;

  // ============================================================
  // 🖥️ PANEL DE CONTROL: ESCRITORIO (Ajustes exactos imagen 1)
  // ============================================================
  const escritorio = {
    altura: '600px',
    titulo: { arriba: '22%', izquierda: '14%', size: '3.2rem', sizeItalic: '1.6rem' },
    mapa:   { arriba: '2%', derecha: '13%', tamaño: '445px', opacidad: isHovered ? '0.90' : '0.70' },
    texto:  { arriba: '73%', izquierda: '14%', ancho: '450px', size: '1.1rem', color: '#0A192F' },
    boton:  { abajo: '4%', derecha: '15%', size: '10px' }
  };

  // ============================================================
  // 📱 PANEL DE CONTROL: MÓVIL (Ajusta aquí tus tamaños de letra)
  // ============================================================
  const movil = {
    altura: '600px',
    titulo: { arriba: '20%', izquierda: '5%', size: '1.8rem', sizeItalic: '1.1rem' },
    mapa:   { arriba: '10%', derecha: '8%', tamaño: '270px', opacidad: '0.50' },
    texto:  { arriba: '75%', izquierda: '5%', ancho: '60%', size: '0.8rem', color: '#0A192F' },
    boton:  { abajo: '30%', derecha: '0%', size: '8px' }
  };

  // Selección automática de valores
  const p = esMovil ? movil : escritorio;

  return (
    <section 
      className="relative w-full overflow-hidden bg-navy-dark" 
      style={{ height: p.altura, transition: 'height 0.3s ease' }}
    >
      {/* 1. FONDO */}
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/Fondo Mapa PNG.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* 2. PARTÍCULAS */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Particles count={esMovil ? 20 : 50} />
      </div>

      {/* 3. MAPA CON AURA */}
      <motion.div
        className="absolute z-20 pointer-events-none"
        style={{ top: p.mapa.arriba, right: p.mapa.derecha }}
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
          style={{ width: p.mapa.tamaño, opacity: p.mapa.opacidad, transition: 'all 0.4s ease' }}
          className="h-auto"
        />
      </motion.div>
      
      {/* 4. CONTENIDO */}
      <div className="relative z-30 h-full w-full">
        
        {/* TÍTULO CON TAMAÑO AJUSTABLE */}
        <div className="absolute" style={{ top: p.titulo.arriba, left: p.titulo.izquierda, width: esMovil ? '90%' : 'auto' }}>
          <span className="text-gold font-semibold tracking-widest uppercase text-[12px] block mb-2">La Visión</span>
          <h2 className="font-serif font-bold leading-tight" style={{ fontSize: p.titulo.size }}>
            <span className="text-white block">Seguridad Jurídica</span>
            <span className="text-white/80 italic block my-1" style={{ fontSize: p.titulo.sizeItalic }}>en la Era de la</span>
            <span className="text-gold block">Inteligencia Artificial</span>
          </h2>
        </div>

        {/* PARRAFO CON TAMAÑO Y COLOR AJUSTABLE */}
        <motion.p
          className="absolute font-extrabold leading-relaxed"
          style={{ 
            top: p.texto.arriba,
            left: p.texto.izquierda,
            maxWidth: p.texto.ancho,
            fontSize: p.texto.size,
            color: p.texto.color,
            textShadow: esMovil ? '1px 1px 4px rgba(0,0,0,0.8)' : 'none'
          }} 
        >
          Bienvenido a nuestro ecosistema de defensa legal de vanguardia, donde la trayectoria histórica de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva.
        </motion.p>

        {/* BOTÓN CON TAMAÑO AJUSTABLE */}
        <div 
          className="absolute" 
          style={{ bottom: p.boton.abajo, right: esMovil ? 'auto' : p.boton.right, left: esMovil ? '5%' : 'auto' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 text-white font-bold uppercase bg-navy-dark/90 px-6 py-4 rounded-full border border-gold/40 shadow-xl backdrop-blur-md transition-all whitespace-nowrap"
            style={{ fontSize: p.boton.size }}
          >
            <Network size={18} className={isHovered ? 'text-cyan-400' : 'text-gold'} />
            <span className={isHovered ? 'text-cyan-50' : 'text-white'}>Red de Inteligencia Legal</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
