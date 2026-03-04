import { useState } from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';
import { Particles } from '@/components/Particles';

export const MapSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  // ============================================================
  // 🖥️ PANEL DE CONTROL: ESCRITORIO (Valores Originales)
  // ============================================================
  const escritorio = {
    altura: '600px',
    titulo: { arriba: '22%', izquierda: '14%' },
    mapa: { arriba: '2%', derecha: '13%', tamaño: '445px', opacidad: isHovered ? '0.90' : '0.70' },
    texto: { arriba: '73%', izquierda: '14%', ancho: '300px' },
    boton: { abajo: '4%', derecha: '15%', size: '10px' } // Ajusté el tamaño aquí
  };

  // ============================================================
  // 📱 PANEL DE CONTROL: MÓVIL (Edita aquí libremente)
  // ============================================================
  const movil = {
    altura: '600px',
    titulo: { arriba: '20%', izquierda: '5%', size: '1.8rem', sizeItalic: '1.1rem' },
    mapa:   { arriba: '9%', derecha: '6%', tamaño: '280px', opacidad: '0.50' },
    texto:  { arriba: '72.4%', izquierda: '5%', ancho: '62%', size: '0.8rem' },
    boton:  { abajo: '30%', derecha: '0%', size: '9px' } // Aquí puedes bajarle al botón
  };

  // Lógica de detección de pantalla
  const esMovil = typeof window !== 'undefined' && window.innerWidth < 768;
  const p = esMovil ? movil : escritorio;

  return (
    <section 
      className="relative w-full overflow-hidden bg-navy-dark" 
      style={{ height: p.altura }}
    >
      {/* 1. FONDO */}
      <div 
        className="absolute inset-0 z-0"
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

      {/* 3. MAPA */}
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
          style={{ 
            width: p.mapa.tamaño,
            opacity: p.mapa.opacidad,
            transition: 'all 0.4s ease'
          }}
          className="h-auto"
        />
      </motion.div>
      
      {/* 4. CONTENIDO */}
      <div className="relative z-30 h-full w-full">
        {/* TÍTULO */}
        <div className="absolute px-4" style={{ top: p.titulo.arriba, left: p.titulo.izquierda }}>
          <span className="text-gold font-semibold tracking-widest uppercase text-[11px] block mb-2">La Visión</span>
          <h2 className="font-serif font-bold leading-tight" style={{ fontSize: esMovil ? p.titulo.size : 'inherit' }}>
            <span className="text-white text-3xl md:text-4xl lg:text-5xl block">Seguridad Jurídica</span>
            <span className="text-white/80 text-xl md:text-2xl italic block my-1" style={{ fontSize: esMovil ? p.titulo.sizeItalic : 'inherit' }}>en la Era de la</span>
            <span className="text-gold text-3xl md:text-4xl lg:text-5xl block">Inteligencia Artificial</span>
          </h2>
        </div>

        {/* TEXTO */}
        <motion.p
          className="absolute text-navy-dark font-extrabold leading-relaxed px-4"
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
          className="absolute" 
          style={{ 
            bottom: p.boton.abajo, 
            right: p.boton.derecha,
            left: esMovil ? '5%' : 'auto' // Asegura que en móvil no se pierda a la derecha
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-white font-bold uppercase bg-navy-dark/60 px-6 py-3 rounded-full border border-gold/40 shadow-lg backdrop-blur-sm transition-all"
            style={{ fontSize: p.boton.size }} // ¡AHORA SÍ RESPONDE A TU AJUSTE!
          >
            <Network size={16} className={isHovered ? 'text-cyan-400' : 'text-gold'} />
            <span>Red de Inteligencia Legal</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
