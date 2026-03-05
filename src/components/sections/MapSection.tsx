import { useState } from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';
import { Particles } from '@/components/Particles';

export const MapSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  // ============================================================
  // PANEL DE CONTROL: TUS AJUSTES EXACTOS (INTACTOS)
  // ============================================================
  const ajusteSeccion = { altura: '600px' };
  const ajusteTitulo = { desdeArriba: '22%', desdeIzquierda: '14%' };
  const ajusteMapa = {
    desdeArriba: '2%',
    desdeDerecha: '13%',    
    tamaño: '445px',       
    opacidad: isHovered ? '0.90' : '0.70', 
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
            width: ajusteMapa.tamaño,
            opacity: ajusteMapa.opacidad,
            transition: 'opacity 0.4s ease'
          }}
          className="h-auto"
        />
      </motion.div>
      
      {/* 4. CONTENIDO - Ajustado a tu diseño global */}
      <div className="relative z-30 h-full w-full">
        <div className="absolute" style={{ top: ajusteTitulo.desdeArriba, left: ajusteTitulo.desdeIzquierda }}>
          <span className="text-gold font-semibold tracking-widest uppercase text-sm block mb-2 opacity-80">La Visión</span>
          <h2 className="font-serif font-bold leading-tight">
            <span className="text-white text-3xl md:text-4xl lg:text-5xl block">Seguridad Jurídica</span>
            <span className="text-cream-light/60 text-xl md:text-2xl italic font-light block my-1">en la Era de la</span>
            {/* Implementamos el degradado blanco-oro aquí */}
            <span className="gradient-text-gold text-3xl md:text-4xl lg:text-5xl block">Inteligencia Artificial</span>
          </h2>
        </div>

        <motion.p
          /* Cambiamos text-navy-dark por cream-light para que no se pierda con el fondo */
          className="absolute text-cream-light/90 font-light text-lg leading-relaxed border-l-2 border-gold/30 pl-6"
          style={{ 
            top: ajusteTexto.desdeArriba,
            left: ajusteTexto.desdeIzquierda,
            maxWidth: ajusteTexto.anchoMax
          }} 
        >
          Bienvenido a nuestro ecosistema de defensa legal de vanguardia, donde la <span className="text-white font-medium">trayectoria histórica</span> de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva.
        </motion.p>

        {/* 5. BOTÓN - Mismo trigger, look mejorado */}
        <div 
          className="absolute" 
          style={{ bottom: ajusteBotones.desdeAbajo, right: ajusteBotones.desdeDerecha }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 text-white text-[10px] font-bold uppercase bg-navy-dark/80 px-6 py-3 rounded-full border border-gold/50 shadow-2xl backdrop-blur-md transition-all group"
          >
            <Network size={16} className={`transition-colors ${isHovered ? 'text-cyan-400' : 'text-gold'}`} />
            <span className="group-hover:text-gold transition-colors">Red de Inteligencia Legal</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
