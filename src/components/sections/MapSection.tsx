import { useState } from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';
import { Particles } from '@/components/Particles';

export const MapSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  // ============================================================
  // 🖥️ PANEL DE CONTROL: ESCRITORIO
  // ============================================================
  const escritorio = {
    altura: '600px',
    titulo: { arriba: '22%', izquierda: '14%' },
    mapa: { arriba: '2%', derecha: '13%', tamaño: '445px', opacidad: isHovered ? '0.90' : '0.70' },
    texto: { arriba: '73%', izquierda: '14%', ancho: '450px' },
    boton: { abajo: '4%', derecha: '15%' },
    // AJUSTE DE LETRAS ESCRITORIO
    fuentes: {
      tituloPrincipal: '3rem', // Tamaño del h2
      tituloItalic: '1.5rem',  // Tamaño de "en la era de la"
      parrafo: '1.125rem',     // Tamaño del texto descriptivo
      boton: '10px'            // Tamaño letra botón
    }
  };

  // ============================================================
  // 📱 PANEL DE CONTROL: MÓVIL (Ajusta aquí para que no se amontone)
  // ============================================================
  const movil = {
    altura: '850px', // Te sugiero subirla un poco para que respire
    titulo: { arriba: '8%', izquierda: '5%' },
    mapa: { arriba: '20%', derecha: '5%', tamaño: '280px', opacidad: '0.40' },
    texto: { arriba: '65%', izquierda: '5%', ancho: '90%' },
    boton: { abajo: '5%', derecha: '10%' },
    // AJUSTE DE LETRAS MÓVIL (Aquí puedes bajar los tamaños)
    fuentes: {
      tituloPrincipal: '1.8rem', // Más pequeño para que no choque
      tituloItalic: '1.1rem', 
      parrafo: '0.6rem',        // Texto más fino para móvil
      boton: '7px'
    }
  };

  // Lógica para detectar móvil de forma segura
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
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* 2. PARTÍCULAS */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Particles count={30} />
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
          style={{ width: p.mapa.tamaño, opacity: p.mapa.opacidad }}
          className="h-auto transition-opacity duration-500"
        />
      </motion.div>
      
      {/* 4. CONTENIDO */}
      <div className="relative z-30 h-full w-full">
        {/* TÍTULO */}
        <div className="absolute" style={{ top: p.titulo.arriba, left: p.titulo.izquierda }}>
          <span className="text-gold font-semibold tracking-widest uppercase text-xs block mb-2">La Visión</span>
          <h2 className="font-serif font-bold leading-tight" style={{ fontSize: p.fuentes.tituloPrincipal }}>
            <span className="text-white block">Seguridad Jurídica</span>
            <span className="text-white/80 italic block my-1" style={{ fontSize: p.fuentes.tituloItalic }}>en la Era de la</span>
            <span className="text-gold block">Inteligencia Artificial</span>
          </h2>
        </div>

        {/* TEXTO */}
        <motion.p
          className="absolute font-extrabold leading-relaxed"
          style={{ 
            top: p.texto.arriba,
            left: p.texto.izquierda,
            maxWidth: p.texto.ancho,
            fontSize: p.fuentes.parrafo,
            color: esMovil ? '#FFFFFF' : '#0A192F' // Blanco en móvil para legibilidad, oscuro en PC
          }} 
        >
          Bienvenido a nuestro ecosistema de defensa legal de vanguardia, donde la trayectoria histórica de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva.
        </motion.p>

        {/* BOTÓN */}
        <div 
          className="absolute" 
          style={{ bottom: p.boton.abajo, right: p.boton.derecha }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-white font-bold uppercase bg-navy-dark/80 px-6 py-3 rounded-full border border-gold/40 shadow-lg backdrop-blur-sm transition-all"
            style={{ fontSize: p.fuentes.boton }}
          >
            <Network size={16} className={isHovered ? 'text-cyan-400' : 'text-gold'} />
            <span>Red de Inteligencia Legal</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
