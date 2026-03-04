import { useState } from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';
import { Particles } from '@/components/Particles';

export const MapSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  // ============================================================
  // 🖥️ PANEL DE CONTROL: ESCRITORIO (No tocar lo que ya funciona)
  // ============================================================
  const escritorio = {
    altura: '600px',
    titulo: { arriba: '22%', izquierda: '14%' },
    mapa: { arriba: '2%', derecha: '13%', tamaño: '445px', opacidad: isHovered ? '0.90' : '0.70' },
    texto: { arriba: '73%', izquierda: '14%', anchoMax: '450px' },
    boton: { abajo: '4%', derecha: '15%' },
  };

  // ============================================================
  // 📱 PANEL DE CONTROL: MÓVIL (Ajusta estos para tu celular)
  // ============================================================
  const movil = {
    altura: '750px',
    titulo: { arriba: '10%', izquierda: '0%' }, // 0% para que el centrado sea limpio
    mapa: { arriba: '5%', derecha: '-15%', tamaño: '320px', opacidad: '0.50' },
    texto: { arriba: '55%', izquierda: '5%', anchoMax: '90%' },
    boton: { abajo: '5%', derecha: '0%' }, // 0% para centrar con la clase 'left-1/2'
  };

  return (
    <section 
      className="relative w-full overflow-hidden bg-navy-dark h-[750px] md:h-[600px]"
      style={{ 
        // Usamos una variable CSS básica para la altura responsiva
        minHeight: 'var(--section-height)' 
      }}
    >
      {/* Estilo local para manejar las alturas sin romper el JS */}
      <style>{`
        :root { --section-height: ${movil.altura}; }
        @media (min-width: 768px) { :root { --section-height: ${escritorio.altura}; } }
      `}</style>
      
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
        <Particles count={50} />
      </div>

      {/* 3. MAPA CON AURA REACTIVA */}
      <motion.div
        className="absolute z-20 pointer-events-none 
                   transition-all duration-500 ease-in-out
                   left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0" // Centrado en móvil
        style={{ 
          top: 'var(--map-top)',
          right: 'var(--map-right)',
        }}
        animate={{
          filter: isHovered 
            ? ["drop-shadow(0 0 20px rgba(100, 210, 255, 0.8))", "drop-shadow(0 0 60px rgba(140, 230, 255, 1))", "drop-shadow(0 0 20px rgba(100, 210, 255, 0.8))"]
            : ["drop-shadow(0 0 10px rgba(100, 210, 255, 0.4))", "drop-shadow(0 0 40px rgba(140, 230, 255, 0.75))", "drop-shadow(0 0 10px rgba(100, 210, 255, 0.4))"],
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 2.7, ease: "easeInOut", repeat: Infinity }}
      >
        <style>{`
          :root { --map-top: ${movil.mapa.arriba}; --map-right: ${movil.mapa.derecha}; --map-w: ${movil.mapa.tamaño}; --map-op: ${movil.mapa.opacidad}; }
          @media (min-width: 768px) { :root { --map-top: ${escritorio.mapa.arriba}; --map-right: ${escritorio.mapa.derecha}; --map-w: ${escritorio.mapa.tamaño}; --map-op: ${escritorio.mapa.opacidad}; } }
        `}</style>
        <img
          src="/Mapa con escudo.png"
          alt="Mapa con escudo"
          style={{ width: 'var(--map-w)', opacity: 'var(--map-op)', transition: 'opacity 0.4s ease' }}
          className="h-auto"
        />
      </motion.div>
      
      {/* 4. CONTENIDO */}
      <div className="relative z-30 h-full w-full">
        
        {/* TÍTULO */}
        <div 
          className="absolute w-full md:w-auto text-center md:text-left px-4" 
          style={{ top: 'var(--tit-top)', left: 'var(--tit-left)' }}
        >
          <style>{`
            :root { --tit-top: ${movil.titulo.arriba}; --tit-left: ${movil.titulo.izquierda}; }
            @media (min-width: 768px) { :root { --tit-top: ${escritorio.titulo.arriba}; --tit-left: ${escritorio.titulo.izquierda}; } }
          `}</style>
          <span className="text-gold font-semibold tracking-widest uppercase text-sm block mb-2">La Visión</span>
          <h2 className="font-serif font-bold leading-tight">
            <span className="text-white text-3xl md:text-4xl lg:text-5xl block">Seguridad Jurídica</span>
            <span className="text-white/80 text-xl md:text-2xl italic block my-1">en la Era de la</span>
            <span className="text-gold text-3xl md:text-4xl lg:text-5xl block">Inteligencia Artificial</span>
          </h2>
        </div>

        {/* TEXTO DESCRIPTIVO */}
        <motion.p
          className="absolute text-white md:text-navy-dark font-extrabold text-lg leading-relaxed text-center md:text-left
                     left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0"
          style={{ 
            top: 'var(--txt-top)',
            left: 'var(--txt-left)',
            maxWidth: 'var(--txt-width)'
          }} 
        >
          <style>{`
            :root { --txt-top: ${movil.texto.arriba}; --txt-left: ${movil.texto.izquierda}; --txt-width: ${movil.texto.anchoMax}; }
            @media (min-width: 768px) { :root { --txt-top: ${escritorio.texto.arriba}; --txt-left: ${escritorio.texto.izquierda}; --txt-width: ${escritorio.texto.anchoMax}; } }
          `}</style>
          Bienvenido a nuestro ecosistema de defensa legal de vanguardia, donde la trayectoria histórica de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva.
        </motion.p>

        {/* BOTÓN */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0" 
          style={{ bottom: 'var(--btn-bot)', right: 'var(--btn-right)' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <style>{`
            :root { --btn-bot: ${movil.boton.abajo}; --btn-right: ${movil.boton.derecha}; }
            @media (min-width: 768px) { :root { --btn-bot: ${escritorio.boton.abajo}; --btn-right: ${escritorio.boton.derecha}; } }
          `}</style>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(10, 25, 47, 0.9)' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-white text-[10px] font-bold uppercase bg-navy-dark/60 px-6 py-3 rounded-full border border-gold/40 shadow-[0_0_15px_rgba(212,175,55,0.2)] backdrop-blur-sm transition-all whitespace-nowrap"
          >
            <Network size={16} className={`transition-colors ${isHovered ? 'text-cyan-400' : 'text-gold'}`} />
            <span className={isHovered ? 'text-cyan-50' : 'text-white'}>Red de Inteligencia Legal</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
