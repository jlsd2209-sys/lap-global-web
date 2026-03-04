import { useState } from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';
import { Particles } from '@/components/Particles';

export const MapSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  // ============================================================
  // 🎛️ PANEL DE CONTROL CENTRALIZADO
  // ============================================================
  
  // Ajustes para Escritorio (Desktop)
  const dsk = {
    seccionH: '600px',
    titulo: { top: '22%', left: '14%' },
    mapa:   { top: '2%', right: '11%', size: '445px', opacity: isHovered ? 0.90 : 0.70 },
    texto:  { top: '73%', left: '14%', maxWidth: '450px' },
    boton:  { bottom: '4%', right: '15%' }
  };

  // Ajustes para Dispositivos Móviles (Mobile)
  const mob = {
    seccionH: '800px',
    titulo: { top: '12%', left: '0%' }, // Centrado via layout
    mapa:   { top: '5%', right: '-15%', size: '320px', opacity: 0.50 },
    texto:  { top: '58%', left: '50%', maxWidth: '90%' },
    boton:  { bottom: '8%' }
  };

  return (
    <section 
      className="relative w-full overflow-hidden bg-navy-dark transition-all duration-500" 
      style={{ height: `var(--section-h, ${dsk.seccionH})` }}
    >
      {/* Inyección de variables CSS para manejo responsivo limpio */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root { --section-h: ${mob.seccionH}; }
        @media (min-width: 768px) { :root { --section-h: ${dsk.seccionH}; } }
      `}} />
      
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
        <Particles count={30} />
      </div>

      {/* 3. MAPA CON AURA REACTIVA */}
      <motion.div
        className="absolute z-20 pointer-events-none flex justify-center md:justify-start"
        style={{ 
          top: `var(--m-top, ${mob.mapa.top})`,
          right: `var(--m-right, ${mob.mapa.right})`,
        }}
        animate={{
          filter: isHovered 
            ? ["drop-shadow(0 0 20px rgba(100, 210, 255, 0.8))", "drop-shadow(0 0 60px rgba(140, 230, 255, 1))", "drop-shadow(0 0 20px rgba(100, 210, 255, 0.8))"]
            : ["drop-shadow(0 0 10px rgba(100, 210, 255, 0.4))", "drop-shadow(0 0 40px rgba(140, 230, 255, 0.75))", "drop-shadow(0 0 10px rgba(100, 210, 255, 0.4))"],
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 2.7, ease: "easeInOut", repeat: Infinity }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          :root { --m-top: ${mob.mapa.top}; --m-right: ${mob.mapa.right}; --m-size: ${mob.mapa.size}; --m-op: ${mob.mapa.opacity}; }
          @media (min-width: 768px) { --m-top: ${dsk.mapa.top}; --m-right: ${dsk.mapa.right}; --m-size: ${dsk.mapa.size}; --m-op: ${dsk.mapa.opacity}; }
        `}} />
        <img
          src="/Mapa con escudo.png"
          alt="Mapa con escudo"
          style={{ width: 'var(--m-size)', opacity: 'var(--m-op)', transition: 'all 0.4s ease' }}
          className="h-auto"
        />
      </motion.div>
      
      {/* 4. CONTENIDO */}
      <div className="relative z-30 h-full w-full">
        
        {/* TÍTULO */}
        <div 
          className="absolute w-full md:w-auto text-center md:text-left px-6"
          style={{ top: `var(--t-top, ${mob.titulo.top})`, left: `var(--t-left, ${mob.titulo.left})` }}
        >
          <style dangerouslySetInnerHTML={{ __html: `
            :root { --t-top: ${mob.titulo.top}; --t-left: ${mob.titulo.left}; }
            @media (min-width: 768px) { --t-top: ${dsk.titulo.top}; --t-left: ${dsk.titulo.left}; }
          `}} />
          <span className="text-gold font-semibold tracking-widest uppercase text-xs md:text-sm block mb-2">La Visión</span>
          <h2 className="font-serif font-bold leading-tight text-white">
            <span className="text-2xl md:text-4xl lg:text-5xl block">Seguridad Jurídica</span>
            <span className="text-white/80 text-lg md:text-2xl italic block my-1">en la Era de la</span>
            <span className="text-gold text-2xl md:text-4xl lg:text-5xl block">Inteligencia Artificial</span>
          </h2>
        </div>

        {/* TEXTO DESCRIPTIVO */}
        <motion.p
          className="absolute text-white md:text-navy-dark font-bold md:font-extrabold text-base md:text-lg leading-relaxed text-center md:text-left"
          style={{ 
            top: `var(--p-top, ${mob.texto.top})`,
            left: `var(--p-left, ${mob.texto.left})`,
            maxWidth: `var(--p-max, ${mob.texto.maxWidth})`,
            transform: `var(--p-trans, translate(-50%, 0))`
          }} 
        >
          <style dangerouslySetInnerHTML={{ __html: `
            :root { --p-top: ${mob.texto.top}; --p-left: ${mob.texto.left}; --p-max: ${mob.texto.maxWidth}; --p-trans: translate(-50%, 0); }
            @media (min-width: 768px) { --p-top: ${dsk.texto.top}; --p-left: ${dsk.texto.left}; --p-max: ${dsk.texto.maxWidth}; --p-trans: translate(0, 0); }
          `}} />
          Bienvenido a nuestro ecosistema de defensa legal de vanguardia, donde la trayectoria histórica de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva.
        </motion.p>

        {/* BOTÓN REACCIÓN */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 md:left-auto" 
          style={{ bottom: `var(--b-bot, ${mob.boton.bottom})`, right: `var(--b-right, auto)` }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <style dangerouslySetInnerHTML={{ __html: `
            :root { --b-bot: ${mob.boton.bottom}; --b-right: auto; }
            @media (min-width: 768px) { --b-bot: ${dsk.boton.bottom}; --b-right: ${dsk.boton.right}; }
          `}} />
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
