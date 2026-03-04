import { useState } from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';
import { Particles } from '@/components/Particles';

export const MapSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  // ============================================================
  // 🎛️ PANEL DE CONTROL (AJUSTA AQUÍ TUS TAMAÑOS Y POSICIONES)
  // ============================================================
  
  // 🖥️ AJUSTES PARA COMPUTADORA (Escritorio)
  const escritorio = {
    alturaSeccion: '600px',
    titulo: { arriba: '22%', izquierda: '14%' },
    mapa:   { arriba: '2%', derecha: '11%', tamaño: '445px', opacidad: isHovered ? 0.90 : 0.70 },
    texto:  { arriba: '73%', izquierda: '14%', anchoMax: '450px' },
    boton:  { abajo: '4%', derecha: '15%' }
  };

  // 📱 AJUSTES PARA CELULAR (Móvil)
  const movil = {
    alturaSeccion: '750px',
    titulo: { arriba: '12%', izquierda: '0%' }, // 0% e 'invisible' el left porque se centra solo
    mapa:   { arriba: '8%', derecha: '-15%', tamaño: '320px', opacidad: 0.50 },
    texto:  { arriba: '55%', izquierda: '50%', anchoMax: '90%' },
    boton:  { abajo: '8%' }
  };

  return (
    <section 
      className="relative w-full overflow-hidden bg-navy-dark" 
      style={{ height: `calc(window.innerWidth < 768 ? ${movil.alturaSeccion} : ${escritorio.alturaSeccion})` }}
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
        <Particles count={50} />
      </div>

      {/* 3. MAPA CON AURA */}
      <motion.div
        className="absolute z-20 pointer-events-none flex justify-center md:justify-start"
        style={{ 
          // Esta lógica elige automáticamente entre el ajuste móvil o escritorio
          top: window.innerWidth < 768 ? movil.mapa.arriba : escritorio.mapa.arriba,
          right: window.innerWidth < 768 ? movil.mapa.derecha : escritorio.mapa.derecha,
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
            width: window.innerWidth < 768 ? movil.mapa.tamaño : escritorio.mapa.tamaño, 
            opacity: window.innerWidth < 768 ? movil.mapa.opacidad : escritorio.mapa.opacidad, 
            transition: 'all 0.4s ease' 
          }}
          className="h-auto"
        />
      </motion.div>
      
      {/* 4. CONTENIDO */}
      <div className="relative z-30 h-full w-full">
        
        {/* TÍTULO */}
        <div 
          className="absolute w-full md:w-auto text-center md:text-left px-6"
          style={{ 
            top: window.innerWidth < 768 ? movil.titulo.arriba : escritorio.titulo.arriba, 
            left: window.innerWidth < 768 ? movil.titulo.izquierda : escritorio.titulo.izquierda 
          }}
        >
          <span className="text-gold font-semibold tracking-widest uppercase text-xs md:text-sm block mb-2">La Visión</span>
          <h2 className="font-serif font-bold leading-tight">
            <span className="text-white text-3xl md:text-4xl lg:text-5xl block">Seguridad Jurídica</span>
            <span className="text-white/80 text-xl md:text-2xl italic block my-1">en la Era de la</span>
            <span className="text-gold text-3xl md:text-4xl lg:text-5xl block">Inteligencia Artificial</span>
          </h2>
        </div>

        {/* TEXTO DESCRIPTIVO */}
        <motion.p
          className="absolute text-white md:text-navy-dark font-bold md:font-extrabold text-base md:text-lg leading-relaxed text-center md:text-left"
          style={{ 
            top: window.innerWidth < 768 ? movil.texto.arriba : escritorio.texto.arriba,
            left: window.innerWidth < 768 ? movil.texto.izquierda : escritorio.texto.izquierda,
            maxWidth: window.innerWidth < 768 ? movil.texto.anchoMax : escritorio.texto.anchoMax,
            transform: window.innerWidth < 768 ? 'translateX(-50%)' : 'none'
          }} 
        >
          Bienvenido a nuestro ecosistema de defensa legal de vanguardia, donde la trayectoria histórica de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva.
        </motion.p>

        {/* BOTÓN REACCIÓN */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 md:left-auto" 
          style={{ 
            bottom: window.innerWidth < 768 ? movil.boton.abajo : escritorio.boton.abajo, 
            right: window.innerWidth < 768 ? 'auto' : escritorio.boton.derecha 
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 text-white text-[10px] md:text-[11px] font-bold uppercase bg-navy-dark/80 px-8 py-4 md:px-6 md:py-3 rounded-full border border-gold/40 shadow-lg backdrop-blur-md transition-all whitespace-nowrap"
          >
            <Network size={18} className={`transition-colors ${isHovered ? 'text-cyan-400' : 'text-gold'}`} />
            <span className={isHovered ? 'text-cyan-50' : 'text-white'}>Red de Inteligencia Legal</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
