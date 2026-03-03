import { motion } from 'framer-motion';
import { Network, Shield } from 'lucide-react';
import { Particles } from '../Particles';
import neuralMap from '@/assets/neural-map.png';

export const MapSection = () => {
  // ============================================================
  // PANEL DE CONTROL: AJUSTA TODO AQUÍ
  // ============================================================
  
  const ajusteSeccion = {
    altura: '500px',    // <--- CAMBIA ESTO para que la sección sea más alta o baja
  };

  const ajusteFondo = {
    ancho: '100%',      // 100% cubre el ancho total
    alto: '100%',       // 100% cubre la altura de la sección
  };

  const ajusteMapa = {
    desdeArriba: '8%',  // Menos % para subirlo, más % para bajarlo
    desdeDerecha: '5%', // Más % para moverlo a la IZQUIERDA
    tamaño: '580px',    // Ancho de la imagen del mapa
  };

  const ajusteTexto = {
    desdeArriba: '52%',  // Ajusta para que caiga en la franja blanca
    desdeIzquierda: '8%',
    anchoMax: '450px',
  };

  const ajusteBotones = {
    desdeAbajo: '5%',    // Distancia desde el suelo de la sección
    desdeDerecha: '10%',
  };

  // ============================================================

  return (
    <section 
      className="relative w-full overflow-hidden bg-navy-dark" 
      style={{ height: ajusteSeccion.altura }} // <--- Aquí se aplica el tamaño
    >
      
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
      
      {/* 2. TÍTULO */}
      <div className="absolute top-[10%] left-[8%] z-20">
        <span className="text-gold font-semibold tracking-widest uppercase text-sm block">La Visión</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight text-white">
          Seguridad Jurídica <br />
          <span className="text-gold">Inteligencia Artificial</span>
        </h2>
      </div>

      {/* 3. PÁRRAFO (Franja blanca) */}
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

      {/* 4. MAPA NEURAL */}
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

      {/* 5. BOTONES */}
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
