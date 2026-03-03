import { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Shield, Settings, Plus, Minus } from 'lucide-react';
import { Particles } from '../Particles';
import neuralMap from '@/assets/neural-map.png';

export const MapSection = () => {
  // ==========================================
  // ESTADOS PARA JUGAR EN TIEMPO REAL
  // ==========================================
  const [bgSize, setBgSize] = useState(100); // Tamaño del fondo en %
  const [bgPos, setBgPos] = useState(50);   // Posición vertical del fondo
  const [mapScale, setMapScale] = useState(500); // Tamaño del mapa en px
  const [showControls, setShowControls] = useState(true); // Mostrar/Ocultar panel

  return (
    <section className="relative w-full overflow-hidden bg-navy-dark h-[800px]">
      
      {/* 1. FONDO INDEPENDIENTE (Controlado por bgSize y bgPos) */}
      <div 
        className="absolute inset-0 z-0 transition-all duration-150"
        style={{
          backgroundImage: 'url("/Fondo Mapa PNG.png")',
          backgroundSize: `${bgSize}% ${bgSize}%`, // <--- BOTONES CONTROLAN ESTO
          backgroundPosition: `center ${bgPos}%`,   // <--- SLIDER CONTROLA ESTO
          backgroundRepeat: 'no-no-repeat'
        }}
      />

      {/* 2. PANEL DE CONTROL FLOTANTE (Solo para ajuste) */}
      {showControls && (
        <div className="fixed bottom-5 left-5 z-50 bg-white/90 p-4 rounded-xl shadow-2xl border-2 border-gold flex flex-col gap-4 text-navy-dark text-xs font-bold">
          <div className="flex justify-between items-center border-b pb-2">
            <span>AJUSTES EN VIVO</span>
            <button onClick={() => setShowControls(false)} className="text-red-500">X</button>
          </div>
          
          {/* Controles de Fondo */}
          <div className="space-y-2">
            <p>TAMAÑO FONDO: {bgSize}%</p>
            <div className="flex gap-2">
              <button onClick={() => setBgSize(bgSize + 5)} className="p-2 bg-navy-dark text-white rounded"><Plus size={14}/></button>
              <button onClick={() => setBgSize(bgSize - 5)} className="p-2 bg-navy-dark text-white rounded"><Minus size={14}/></button>
            </div>
          </div>

          {/* Controles de Mapa */}
          <div className="space-y-2">
            <p>TAMAÑO MAPA: {mapScale}px</p>
            <input 
              type="range" min="200" max="1000" value={mapScale} 
              onChange={(e) => setMapScale(parseInt(e.target.value))}
              className="w-full accent-gold"
            />
          </div>

          <p className="text-[10px] text-gray-500 italic">* Una vez que te guste, anota los números <br/> y los dejamos fijos en el código.</p>
        </div>
      )}

      {/* Botón para reabrir panel si lo cierras */}
      {!showControls && (
        <button 
          onClick={() => setShowControls(true)}
          className="fixed bottom-5 left-5 z-50 p-3 bg-gold rounded-full shadow-lg"
        >
          <Settings className="text-navy-dark" />
        </button>
      )}

      {/* 3. ELEMENTOS DE CONTENIDO (Mantenemos position absolute para no mover el fondo) */}
      <div className="absolute top-[10%] left-[8%] z-20 pointer-events-none">
        <span className="text-gold font-semibold tracking-widest uppercase text-sm block">La Visión</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">
          <span className="text-white">Seguridad Jurídica</span><br />
          <span className="text-gold">Inteligencia Artificial</span>
        </h2>
      </div>

      <motion.p
        className="absolute z-20 text-navy-dark font-extrabold text-lg leading-relaxed max-w-[450px]"
        style={{ top: '55%', left: '8%' }} 
      >
        Bienvenido a nuestro ecosistema de defensa penal de vanguardia, donde la trayectoria histórica de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva.
      </motion.p>

      <motion.div
        className="absolute z-20"
        style={{ top: '15%', right: '5%' }}
      >
        <img
          src={neuralMap}
          alt="Mapa Neural"
          style={{ width: `${mapScale}px` }} // <--- SE AJUSTA CON EL SLIDER
          className="h-auto drop-shadow-2xl"
        />
      </motion.div>

      <div className="absolute z-20 flex gap-4 bottom-[10%] right-[8%]">
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
