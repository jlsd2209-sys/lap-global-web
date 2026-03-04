import { motion } from 'framer-motion';
import { Network, Shield } from 'lucide-react';
import { Particles } from '@/components/Particles';

export const MapSection = () => {
  // ============================================================
  // PANEL DE CONTROL: TUS AJUSTES EXACTOS
  // ============================================================
  
  const ajusteSeccion = { altura: '600px' };
  const ajusteTitulo = { desdeArriba: '22%', desdeIzquierda: '14%' };

  const ajusteMapa = {
    desdeArriba: '2%',
    desdeDerecha: '11%',    
    tamaño: '450px',       
    opacidad: '0.85', // Un poco más de opacidad para que brille mejor
  };

  const ajusteTexto = { desdeArriba: '73%', desdeIzquierda: '14%', anchoMax: '450px' };
  const ajusteBotones = { desdeAbajo: '4%', desdeDerecha: '5%' };

  return (
    <section 
      className="relative w-full overflow-hidden bg-navy-dark" 
      style={{ height: ajusteSeccion.altura }}
    >
      
      {/* 1. FONDO (Capa z-0) */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/Fondo Mapa PNG.png")',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* 2. PARTÍCULAS (Capa z-10) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Particles count={50} />
      </div>

      {/* 3. MAPA CON AURA QUE SIGUE LA SILUETA (Capa z-20) */}
      <motion.div
        className="absolute z-20 pointer-events-none"
        style={{ 
          top: ajusteMapa.desdeArriba,
          right: ajusteMapa.desdeDerecha,
        }}
        // ANIMACIÓN DE AURA DORADA
        animate={{
          filter: [
            "drop-shadow(0 0 5px rgba(212, 175, 55, 0.3))",
            "drop-shadow(0 0 25px rgba(212, 175, 55, 0.7))",
            "drop-shadow(0 0 5px rgba(212, 175, 55, 0.3))"
          ],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <img
          src="/Mapa con escudo.png"
          alt="Mapa con escudo"
          style={{ 
            width: ajusteMapa.tamaño,
            opacity: ajusteMapa.opacidad 
          }}
          className="h-auto"
        />
      </motion.div>
      
      {/* 4. CONTENIDO (Capa z-30) */}
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
          Bienvenido a nuestro ecosistema de defensa penal de vanguardia, donde la trayectoria histórica de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva.
        </motion.p>

        <div className="absolute flex gap-4" style={{ bottom: ajusteBotones.desdeAbajo, right: ajusteBotones.desdeDerecha }}>
          <span className="flex items-center gap-2 text-white text-[10px] font-bold uppercase bg-navy-dark/60 px-4 py-2 rounded-full border border-gold/40 shadow-lg">
            <Shield size={14} className="text-gold" /> Cobertura Transfronteriza
          </span>
          <span className="flex items-center gap-2 text-white text-[10px] font-bold uppercase bg-navy-dark/60 px-4 py-2 rounded-full border border-gold/40 shadow-lg">
            <Network size={14} className="text-gold" /> Red de Inteligencia Legal
          </span>
        </div>
      </div>

    </section>
  );
};
