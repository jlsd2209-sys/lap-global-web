import { motion } from 'framer-motion';
import { Network, Shield } from 'lucide-react';
import neuralMap from '@/assets/neural-map.png';

export const MapSection = () => {
  // ============================================================
  // PANEL DE CONTROL: AJUSTA TODO AQUÍ
  // ============================================================
  
  const ajusteSeccion = {
    altura: '600px',
  };

  const ajusteTitulo = {
    desdeArriba: '20%',   // <--- MUEVE EL TÍTULO ARRIBA/ABAJO
    desdeIzquierda: '10%', // <--- MUEVE EL TÍTULO IZQUIERDA/DERECHA
  };

  const ajusteMapa = {
    desdeArriba: '8%',
    desdeDerecha: '8%',
    tamaño: '480px',
  };

  const ajusteTexto = {
    desdeArriba: '73%',
    desdeIzquierda: '10%',
    anchoMax: '450px',
  };

  const ajusteBotones = {
    desdeAbajo: '4%',
    desdeDerecha: '5%',
  };

  // ============================================================

  return (
    <section 
      className="relative w-full overflow-hidden bg-navy-dark" 
      style={{ height: ajusteSeccion.altura }}
    >
      
      {/* 1. MAPA NEURAL (Capa z-10: Se coloca al fondo de todo) */}
      <motion.div
        className="absolute z-10"
        style={{ 
          top: ajusteMapa.desdeArriba,
          right: ajusteMapa.desdeDerecha
        }}
      >
        <img
          src={neuralMap}
          alt="Mapa Neural"
          style={{ width: ajusteMapa.tamaño }}
          className="h-auto opacity-80" // Un poco de transparencia para que funda mejor
        />
      </motion.div>

      {/* 2. FONDO PRINCIPAL (Capa z-20: Encima del mapa para taparlo) */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          backgroundImage: 'url("/Fondo Mapa PNG.png")',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* 3. TÍTULO (Capa z-30: Encima de todo) */}
      <div 
        className="absolute z-30"
        style={{ 
          top: ajusteTitulo.desdeArriba, 
          left: ajusteTitulo.desdeIzquierda 
        }}
      >
        <span className="text-gold font-semibold tracking-widest uppercase text-sm block">La Visión</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight text-white">
          Seguridad Jurídica <br />
          <span className="text-gold">Inteligencia Artificial</span>
        </h2>
      </div>

      {/* 4. PÁRRAFO (Franja blanca - Capa z-30) */}
      <motion.p
        className="absolute z-30 text-navy-dark font-extrabold text-lg leading-relaxed"
        style={{ 
          top: ajusteTexto.desdeArriba,
          left: ajusteTexto.desdeIzquierda,
          maxWidth: ajusteTexto.anchoMax
        }} 
      >
        Bienvenido a nuestro ecosistema de defensa penal de vanguardia, donde la trayectoria histórica de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva.
      </motion.p>

      {/* 5. BOTONES (Capa z-30) */}
      <div 
        className="absolute z-30 flex gap-4"
        style={{ 
          bottom: ajusteBotones.desdeAbajo,
          right: ajusteBotones.desdeDerecha
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
