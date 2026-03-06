import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';
import { Particles } from '@/components/Particles';

export const MapSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    // Verificación segura de window para evitar error en Vercel
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const esMovil = windowWidth < 768;

  const handleToggleClick = () => {
    if (esMovil) setIsHovered(!isHovered);
  };

  // Configuración de Escritorio
  const escritorio = {
    altura: '600px',
    titulo: { arriba: '22%', izquierda: '14%' },
    mapa: { arriba: '2%', derecha: '13%', tamaño: '445px', opacidad: isHovered ? 0.90 : 0.70 },
    texto: { arriba: '73%', izquierda: '14%', anchoMax: '450px' },
    boton: { abajo: '4%', derecha: '15%', size: '10px' }
  };

  // Configuración de Móvil
  const movil = {
    altura: '600px',
    titulo: { arriba: '20%', izquierda: '5%', size: '1.8rem', sizeItalic: '1.1rem' },
    mapa: { arriba: '9%', derecha: '4%', tamaño: '310px', opacidad: isHovered ? 0.85 : 0.55 },
    texto: { arriba: '72.4%', izquierda: '5%', ancho: '55%', size: '0.8rem' },
    boton: { abajo: '30%', izquierda: '5%', size: '9px' }
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
          backgroundSize: 'cover', // Cambiado a 'cover' para evitar espacios negros al alejar
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* 2. PARTÍCULAS */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Particles count={esMovil ? 20 : 50} />
      </div>

      {/* 3. MAPA */}
      <motion.div
        className="absolute z-20 cursor-pointer pointer-events-auto"
        style={{ 
          top: p.mapa.arriba, 
          right: p.mapa.derecha 
        }}
        onMouseEnter={() => !esMovil && setIsHovered(true)}
        onMouseLeave={() => !esMovil && setIsHovered(false)}
        onClick={handleToggleClick}
        animate={{
          scale: isHovered ? 1.05 : 1, 
        }}
        transition={{ duration: 0.4 }}
      >
        <img
          src="/Mapa con escudo.png"
          alt="Mapa con escudo"
          style={{ 
            width: p.mapa.tamaño, 
            opacity: p.mapa.opacidad,
            filter: isHovered ? 'drop-shadow(0 0 20px rgba(100, 210, 255, 0.8))' : 'drop-shadow(0 0 10px rgba(100, 210, 255, 0.4))',
            transition: 'all 0.4s ease'
          }}
          className="h-auto"
        />
      </motion.div>
      
      {/* 4. CONTENIDO */}
      <div className="relative z-30 h-full w-full pointer-events-none">
        
        {/* TÍTULO */}
        <div className="absolute" style={{ top: p.titulo.arriba, left: p.titulo.izquierda }}>
          <span className="gradient-text-gold font-semibold tracking-widest uppercase text-sm block mb-2">
            La Visión
          </span>
          
          <h2 className="font-serif font-bold leading-tight">
            <span className="text-white text-3xl md:text-5xl block" style={{ fontSize: esMovil ? p.titulo.size : '' }}>
              Seguridad Jurídica
            </span>
            <span className="text-white/80 text-xl md:text-2xl italic block my-1" style={{ fontSize: esMovil ? p.titulo.sizeItalic : '' }}>
              en la Era de la
            </span>
            <span className="gradient-text-gold text-3xl md:text-5xl block" style={{ fontSize: esMovil ? p.titulo.size : '' }}>
              Inteligencia Artificial
            </span>
          </h2>
        </div>

        {/* PARRAFO */}
        <p
          className="absolute text-white/90 font-medium leading-relaxed"
          style={{ 
            top: p.texto.arriba,
            left: p.texto.izquierda,
            maxWidth: esMovil ? p.texto.ancho : escritorio.texto.anchoMax,
            fontSize: esMovil ? p.texto.size : '1.125rem' 
          }} 
        >
          Bienvenido a nuestro ecosistema de defensa legal de vanguardia, donde la trayectoria histórica de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva.
        </p>

        {/* BOTÓN */}
        <div 
          className="absolute pointer-events-auto"
          style={{ 
            bottom: p.boton.abajo, 
            right: esMovil ? 'auto' : escritorio.boton.derecha,
            left: esMovil ? p.boton.izquierda : 'auto'
          }}
          onClick={handleToggleClick}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-white font-bold uppercase bg-navy-dark/60 px-6 py-3 rounded-full border border-gold/40 backdrop-blur-sm"
            style={{ fontSize: p.boton.size }}
          >
            <Network size={16} className={isHovered ? 'text-cyan-400' : 'text-gold'} />
            <span>Red de Inteligencia Legal</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
