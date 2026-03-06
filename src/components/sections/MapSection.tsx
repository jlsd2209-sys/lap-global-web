import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';
import { Particles } from '@/components/Particles';

export const MapSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  // Inicializamos en 1200 por defecto para evitar errores en Vercel, pero se actualiza en el cliente
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const esMovil = windowWidth < 768;

  const handleToggleClick = () => {
    if (esMovil) {
      setIsHovered(!isHovered);
    }
  };

  // ============================================================
  // 🖥️ PANEL ESCRITORIO: AJUSTES ORIGINALES
  // ============================================================
  const escritorio = {
    altura: '600px',
    titulo: { arriba: '22%', izquierda: '4%' }, // Ajustado levemente al usar max-w-7xl
    mapa: { arriba: '2%', derecha: '2%', tamaño: '445px', opacidad: isHovered ? '0.90' : '0.70' },
    texto: { arriba: '73%', izquierda: '4%', anchoMax: '450px' },
    boton: { abajo: '4%', derecha: '2%', size: '10px' }
  };

  // ============================================================
  // 📱 PANEL MÓVIL: AJUSTES CORREGIDOS (Evita pérdida de palabras)
  // ============================================================
  const movil = {
    altura: '600px',
    titulo: { arriba: '20%', izquierda: '5%', size: '1.8rem', sizeItalic: '1.1rem' },
    mapa:   { arriba: '9%', derecha: '4%', tamaño: '310px', opacidad: isHovered ? '0.85' : '0.55' },
    // CAMBIO: Ancho de 55% a 90% para que no se corten las palabras en celular
    texto:  { arriba: '72.4%', izquierda: '5%', ancho: '90%', size: '0.85rem' }, 
    boton:  { abajo: '22%', izquierda: '5%', size: '9px' } // Bajé un poco el botón para dar espacio al texto
  };

  const p = esMovil ? movil : escritorio;

  return (
    <section 
      // CAMBIO: Se agregó flex y justify-center para centrar el contenedor interno en monitores grandes
      className="relative w-full overflow-hidden bg-navy-dark flex justify-center" 
      style={{ height: p.altura }}
    >
      {/* 1. FONDO (Siempre ocupa toda la pantalla) */}
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/Fondo Mapa PNG.png")',
          backgroundSize: 'cover', // cover evita que aparezcan bordes negros al hacer zoom
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* 2. PARTÍCULAS */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Particles count={esMovil ? 20 : 50} />
      </div>

      {/* CAMBIO VITAL: Este contenedor encapsula tus coordenadas absolutas para que NO se desarmen al hacer Zoom en PC */}
      <div className="relative w-full max-w-7xl h-full pointer-events-none">
        
        {/* 3. MAPA CON DOBLE DISPARADOR */}
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
        {/* TÍTULO */}
        <div className="absolute pointer-events-auto" style={{ top: p.titulo.arriba, left: p.titulo.izquierda }}>
          {/* CAMBIO: Se limpiaron estilos inline para usar gradient-text-gold puro y evitar recortes */}
          <span className="gradient-text-gold inline-block font-semibold tracking-widest uppercase text-sm mb-2">
            La Visión
          </span>
          
          <h2 className="font-serif font-bold leading-tight">
            <span className="text-white text-3xl md:text-4xl lg:text-5xl block" style={{ fontSize: esMovil ? p.titulo.size : '' }}>
              Seguridad Jurídica
            </span>
            <span className="text-white/80 text-xl md:text-2xl italic block my-1" style={{ fontSize: esMovil ? p.titulo.sizeItalic : '' }}>
              en la Era de la
            </span>
            <span className="gradient-text-gold inline-block text-3xl md:text-4xl lg:text-5xl" style={{ fontSize: esMovil ? p.titulo.size : '' }}>
              Inteligencia Artificial
            </span>
          </h2>
        </div>

        {/* PARRAFO */}
        <motion.p
          // CAMBIO: text-white/90 en lugar de text-navy-dark para que se lea y pointer-events-auto
          className="absolute text-white/90 font-medium leading-relaxed pointer-events-auto"
          style={{ 
            top: p.texto.arriba,
            left: p.texto.izquierda,
            maxWidth: esMovil ? p.texto.ancho : escritorio.texto.anchoMax,
            fontSize: esMovil ? p.texto.size : '1.125rem' 
          }} 
        >
          Bienvenido a nuestro ecosistema de defensa legal de vanguardia, donde la trayectoria histórica de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva.
        </motion.p>

        {/* BOTÓN */}
        <div 
          className="absolute pointer-events-auto"
          style={{ 
            bottom: p.boton.abajo, 
            right: esMovil ? 'auto' : escritorio.boton.derecha,
            left: esMovil ? p.boton.izquierda : 'auto'
          }}
          onMouseEnter={() => !esMovil && setIsHovered(true)}
          onMouseLeave={() => !esMovil && setIsHovered(false)}
          onClick={handleToggleClick}
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
