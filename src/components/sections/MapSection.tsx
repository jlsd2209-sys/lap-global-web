import { useState } from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';
import { Particles } from '@/components/Particles';

export const MapSection = () => {
  // Estado para controlar la reacción del mapa al hover del botón
  const [isHovered, setIsHovered] = useState(false);

  // ============================================================
  // PANEL DE CONTROL: TUS AJUSTES EXACTOS
  // ============================================================
  const ajusteSeccion = { altura: '600px' };
  const ajusteTitulo = { desdeArriba: '22%', desdeIzquierda: '14%' };
  const ajusteMapa = {
    desdeArriba: '2%',
    desdeDerecha: '11%',    
    tamaño: '445px',       
    opacidad: isHovered ? '0.90' : '0.70', // Reacción de opacidad
  };
  const ajusteTexto = { desdeArriba: '73%', desdeIzquierda: '14%', anchoMax: '450px' };
  const ajusteBotones = { desdeAbajo: '4%', desdeDerecha: '15%' };

  return (
    <section 
      className="relative w-full overflow-hidden bg-navy-dark" 
      style={{ height: ajusteSeccion.altura }}
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
          top: ajusteMapa.desdeArriba,
          right: ajusteMapa.desdeDerecha,
        }}
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
          scale: isHovered ? 1.05 : 1, // El mapa crece sutilmente al hacer hover en el botón
        }}
        transition={{
          duration: isHovered ? 0.4 : 2.7,
          ease: "easeInOut",
          repeat: isHovered ? 0 : Infinity, // En hover se mantiene estático o pulsa distinto
        }}
      >
        <img
          src="/Mapa con escudo.png"
          alt="Mapa con escudo"
          style={{ 
            width: ajusteMapa.tamaño,
            opacity: ajusteMapa.opacidad,
            transition: 'opacity 0.4s ease'
          }}
          className="h-auto"
        />
      </motion.div>
      
      {/* 4. CONTENIDO */}
      <div className="relative z-30 h-full w-full">
        <div className="absolute" style={{ top: ajusteTitulo.desdeArriba, left: ajusteTitulo.desdeIzquierda }}>
          <span className="text-gold font-semibold tracking-widest uppercase text-sm block mb-2">La Visión</span>
          <h2 className="font-serif font-bold leading-tight">
            <span className="text-white text-3xl md:text-4xl lg:text-5xl block">Seguridad Jurídica</span>
            <span className="text-white/80 text-xl md:text-2xl italic block my-1">en la Era de la</span>
            <span className="text-gold text-3xl md:text-4xl lg:text-5xl block">Inteligencia Artificial</span>
          </h2>
        </div>

        <motion.p
          className="absolute text-navy-dark font-extrabold text-lg leading-relaxed"
          style={{ 
            top: ajusteTexto.desdeArriba,
            left: ajusteTexto.desdeIzquierda,
            maxWidth: ajusteTexto.anchoMax
          }} 
        >
          Bienvenido a nuestro ecosistema de defensa legal de vanguardia, donde la trayectoria histórica de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva.
        </motion.p>

        {/* BOTÓN CON DISPARADOR DE ESTADO (TRIGGER) */}
        <div 
          className="absolute" 
          style={{ bottom: ajusteBotones.desdeAbajo, right: ajusteBotones.desdeDerecha }}
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
