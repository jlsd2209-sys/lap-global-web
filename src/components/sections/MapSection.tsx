import { motion } from 'framer-motion';
import { Network, Shield } from 'lucide-react';

export const MapSection = () => {
  // ============================================================
  // PANEL DE CONTROL: TUS AJUSTES CONSERVADOS
  // ============================================================
  
  const ajusteSeccion = {
    altura: '600px',
  };

  const ajusteTitulo = {
    desdeArriba: '22%',    
    desdeIzquierda: '14%',
  };

  const ajusteMapa = {
    desdeArriba: '-2%',
    desdeDerecha: '8%',    
    tamaño: '480px',       
    opacidad: '0.65',       
  };

  const ajusteTexto = {
    desdeArriba: '73%',
    desdeIzquierda: '14%',
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
      
      {/* 1. FONDO PRINCIPAL */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: 'url("/Fondo Mapa PNG.png")',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* 2. MAPA NEURAL (Nueva imagen desde carpeta public) */}
      <motion.div
        className="absolute z-20 pointer-events-none"
        style={{ 
          top: ajusteMapa.desdeArriba,
          right: ajusteMapa.desdeDerecha,
          opacity: ajusteMapa.opacidad 
        }}
      >
        <img
          src="/Mapa con escudo.png"
          alt="Mapa con escudo"
          style={{ width: ajusteMapa.tamaño }}
          className="h-auto drop-shadow-2xl"
        />
      </motion.div>
      
      {/* 3. TÍTULO EN 3 NIVELES */}
      <div 
        className="absolute z-30"
        style={{ 
          top: ajusteTitulo.desdeArriba, 
          left: ajusteTitulo.desdeIzquierda 
        }}
      >
        <span className="text-gold font-semibold tracking-widest uppercase text-sm block mb-2">La Visión</span>
        <h2 className="font-serif font-bold leading-tight">
          <span className="text-white text-3xl md:text-4xl lg:text-5xl block">Seguridad Jurídica</span>
          <span className="text-white/80 text-xl md:text-2xl italic block my-1">en la Era de la</span>
          <span className="text-gold text-3xl md:text-4xl lg:text-5xl block">Inteligencia Artificial</span>
        </h2>
      </div>

      {/* 4. PÁRRAFO (Franja blanca) */}
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

      {/* 5. BOTONES */}
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
