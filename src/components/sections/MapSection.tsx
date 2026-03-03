import { motion } from 'framer-motion';
import { Network, Shield } from 'lucide-react';
import { Particles } from '../Particles';
import neuralMap from '@/assets/neural-map.png';

export const MapSection = () => {
  // ============================================================
  // PANEL DE CONTROL: AJUSTA LOS VALORES AQUÍ (Usa px o %)
  // ============================================================
  
  const ajusteFondo = {
    ancho: '100%',      // Puedes poner '110%' para hacerlo más grande
    alto: '90%',       // Puedes poner '110%' para que cubra más arriba/abajo
  };

  const ajusteMapa = {
    desdeArriba: '10%',  // <--- Mover ARRIBA/ABAJO (Menos % sube, más % baja)
    desdeDerecha: '5%',  // <--- Mover DERECHA/IZQUIERDA (Más % va a la izquierda)
    tamaño: '550px',     // <--- TAMAÑO del mapa
  };

  const ajusteTexto = {
    desdeArriba: '55%',  // <--- Bajar el párrafo a la zona blanca
    desdeIzquierda: '8%',// <--- Mover a la derecha o izquierda
    anchoMax: '450px',   // <--- Qué tan ancho es el bloque de texto
  };

  const ajusteBotones = {
    desdeAbajo: '10%',    // <--- Subir o bajar los botones del fondo
    desdeDerecha: '5%', // <--- Pegarlos más a la derecha o izquierda
  };

  // ============================================================

  return (
    <section className="relative w-full overflow-hidden bg-navy-dark h-[750px]">
      
      {/* 1. FONDO (Independiente) */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/Fondo Mapa PNG.png")',
          backgroundSize: `${ajusteFondo.ancho} ${ajusteFondo.alto}`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* 2. TÍTULO (Fijo arriba) */}
      <div className="absolute top-[10%] left-[8%] z-20">
        <span className="text-gold font-semibold tracking-widest uppercase text-sm block">La Visión</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight text-white">
          Seguridad Jurídica <br />
          <span className="text-gold">Inteligencia Artificial</span>
        </h2>
      </div>

      {/* 3. PÁRRAFO (Se mueve sobre la franja blanca) */}
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

      {/* 4. MAPA NEURAL (Se mueve y cambia de tamaño) */}
      <motion.div
        className="absolute z-20"
        style={{ 
          top: ajusteMapa.desdeArriba,
          right: ajusteMapa.desdeDerecha
        }}
      >
        <img
          src={neuralMap}
          alt="Mapa Neural"
          style={{ width: ajusteMapa.tamaño }}
          className="h-auto drop-shadow-2xl"
        />
      </motion.div>

      {/* 5. BOTONES (Al fondo a la derecha) */}
      <div 
        className="absolute z-20 flex gap-4"
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
