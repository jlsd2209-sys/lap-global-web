import { motion } from 'framer-motion';
import { Network, Shield } from 'lucide-react';
import neuralMap from '@/assets/neural-map.png';

export const MapSection = () => {
  // ============================================================
  // PANEL DE CONTROL: RECUPERADO DE TUS AJUSTES
  // ============================================================
  
  const ajusteSeccion = {
    altura: '600px',
  };

  const ajusteTitulo = {
    arriba: '120px',    // <--- Valor recuperado de tu captura
    izquierda: '40px',  // <--- Valor recuperado de tu captura
  };

  const ajusteMapa = {
    arriba: '70px',     // <--- Valor recuperado de tu captura
    derecha: '40px',    // <--- Valor recuperado de tu captura
    tamaño: '550px',    // <--- Valor recuperado de tu captura
  };

  const ajusteBotones = {
    arriba: '100px',    // <--- Valor recuperado de tu captura (ajuste relativo)
    derecha: '80px',    // <--- Valor recuperado de tu captura
  };

  const ajusteTexto = {
    desdeArriba: '430px', // Ajustado para caer en la franja blanca
    desdeIzquierda: '40px',
    anchoMax: '450px',
  };

  // ============================================================

  return (
    <section 
      className="relative w-full overflow-hidden bg-navy-dark" 
      style={{ height: ajusteSeccion.altura }}
    >
      
      {/* 1. FONDO PRINCIPAL */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/Fondo Mapa PNG.png")',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* 2. MAPA NEURAL */}
      <motion.div
        className="absolute z-10 pointer-events-none"
        style={{ 
          top: ajusteMapa.arriba,
          right: ajusteMapa.derecha
        }}
      >
        <img
          src={neuralMap}
          alt="Mapa Neural"
          style={{ width: ajusteMapa.tamaño }}
          className="h-auto opacity-80 drop-shadow-2xl"
        />
      </motion.div>
      
      {/* 3. TÍTULO EN 3 NIVELES */}
      <div 
        className="absolute z-20"
        style={{ 
          top: ajusteTitulo.arriba, 
          left: ajusteTitulo.izquierda 
        }}
      >
        <span className="text-gold font-semibold tracking-widest uppercase text-sm block mb-2">La Visión</span>
        <h2 className="font-serif font-bold leading-tight">
          <span className="text-white text-3xl md:text-4xl lg:text-5xl block">Seguridad Jurídica</span>
          <span className="text-white/80 text-xl md:text-2xl italic block my-1">en la Era de la</span>
          <span className="text-gold text-3xl md:text-4xl lg:text-5xl block">Inteligencia Artificial</span>
        </h2>
      </div>

      {/* 4. PÁRRAFO (Sobre la franja blanca) */}
      <motion.p
        className="absolute z-20 text-navy-dark font-extrabold text-lg leading-relaxed"
        style={{ 
          top: ajusteTexto.desdeArriba,
          left: ajusteTexto.desdeIzquierda,
          maxWidth: ajusteTexto.anchoMax
        }} 
      >
        Bienvenido a nuestro ecosistema de defensa penal de vanguardia, donde la trayectoria histórica de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva.
      </motion.p>

      {/* 5. BOTONES */}
      <div 
        className="absolute z-20 flex gap-4"
        style={{ 
          bottom: '40px', // Ajuste fijo para que no floten
          right: ajusteBotones.derecha
        }}
      >
        <span className="flex items-center gap-2 text-white text-[10px] font-bold uppercase bg-navy-dark/60 px-4 py-2 rounded-full border border-gold/40">
          <Shield size={14} className="text-gold" /> Cobertura Transfronteriza
        </span>
        <span className="flex items-center gap-2 text-white text-[10px] font-bold uppercase bg-navy-dark/60 px-4 py-2 rounded-full border border-gold/40">
          <Network size={14} className="text-gold" /> Red de Inteligencia Legal
        </span>
      </div>

    </section>
  );
};
