import { useState } from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';
import { Particles } from '@/components/Particles';

export const MapSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  // ============================================================
  // 🖥️ PANEL DE CONTROL: AJUSTES ESCRITORIO (Tus valores originales)
  // ============================================================
  const escritorio = {
    altura: '600px',
    titulo: { arriba: '22%', izquierda: '14%' },
    mapa: { arriba: '2%', derecha: '13%', tamaño: '445px', opacidad: isHovered ? '0.90' : '0.70' },
    texto: { arriba: '73%', izquierda: '14%', ancho: '450px' },
    boton: { abajo: '4%', derecha: '15%' }
  };

  // ============================================================
  // 📱 PANEL DE CONTROL: AJUSTES MÓVIL (Para que tú los ajustes)
  // ============================================================
  const movil = {
    altura: '750px',
    titulo: { arriba: '12%', izquierda: '5%' },
    mapa: { arriba: '15%', derecha: '8%', tamaño: '250px', opacidad: '0.60' },
    texto: { arriba: '60%', izquierda: '5%', ancho: '20%' },
    boton: { abajo: '40%', derecha: '10%' }
  };

  return (
    <section 
      className="relative w-full overflow-hidden bg-navy-dark" 
      style={{ height: escritorio.altura }} // En desktop usa tu altura original
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
        <Particles count={50} />
      </div>

      {/* 3. MAPA CON AURA REACTIVA */}
      <motion.div
        className="absolute z-20 pointer-events-none"
        style={{ 
          // Si la pantalla es pequeña usa 'movil', si es grande usa 'escritorio'
          top: typeof window !== 'undefined' && window.innerWidth < 768 ? movil.mapa.arriba : escritorio.mapa.arriba,
          right: typeof window !== 'undefined' && window.innerWidth < 768 ? movil.mapa.derecha : escritorio.mapa.derecha,
        }}
        animate={{
          filter: isHovered 
            ? ["drop-shadow(0 0 20px rgba(100, 210, 255, 0.8))", "drop-shadow(0 0 60px rgba(140, 230, 255, 1))", "drop-shadow(0 0 20px rgba(100, 210, 255, 0.8))"]
            : ["drop-shadow(0 0 10px rgba(100, 210, 255, 0.4))", "drop-shadow(0 0 40px rgba(140, 230, 255, 0.75))", "drop-shadow(0 0 10px rgba(100, 210, 255, 0.4))"],
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
            width: typeof window !== 'undefined' && window.innerWidth < 768 ? movil.mapa.tamaño : escritorio.mapa.tamaño,
            opacity: typeof window !== 'undefined' && window.innerWidth < 768 ? movil.mapa.opacidad : escritorio.mapa.opacidad,
            transition: 'opacity 0.4s ease'
          }}
          className="h-auto"
        />
      </motion.div>
      
      {/* 4. CONTENIDO */}
      <div className="relative z-30 h-full w-full">
        {/* TÍTULO */}
        <div 
          className="absolute" 
          style={{ 
            top: typeof window !== 'undefined' && window.innerWidth < 768 ? movil.titulo.arriba : escritorio.titulo.arriba, 
            left: typeof window !== 'undefined' && window.innerWidth < 768 ? movil.titulo.izquierda : escritorio.titulo.izquierda 
          }}
        >
          <span className="text-gold font-semibold tracking-widest uppercase text-sm block mb-2">La Visión</span>
          <h2 className="font-serif font-bold leading-tight">
            <span className="text-white text-3xl md:text-4xl lg:text-5xl block">Seguridad Jurídica</span>
            <span className="text-white/80 text-xl md:text-2xl italic block my-1">en la Era de la</span>
            <span className="text-gold text-3xl md:text-4xl lg:text-5xl block">Inteligencia Artificial</span>
          </h2>
        </div>

        {/* TEXTO */}
        <motion.p
          className="absolute text-navy-dark font-extrabold text-lg leading-relaxed"
          style={{ 
            top: typeof window !== 'undefined' && window.innerWidth < 768 ? movil.texto.arriba : escritorio.texto.arriba,
            left: typeof window !== 'undefined' && window.innerWidth < 768 ? movil.texto.izquierda : escritorio.texto.izquierda,
            maxWidth: typeof window !== 'undefined' && window.innerWidth < 768 ? movil.texto.ancho : escritorio.texto.ancho
          }} 
        >
          Bienvenido a nuestro ecosistema de defensa legal de vanguardia, donde la trayectoria histórica de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva.
        </motion.p>

        {/* BOTÓN */}
        <div 
          className="absolute" 
          style={{ 
            bottom: typeof window !== 'undefined' && window.innerWidth < 768 ? movil.boton.abajo : escritorio.boton.abajo, 
            right: typeof window !== 'undefined' && window.innerWidth < 768 ? movil.boton.derecha : escritorio.boton.derecha 
          }}
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
