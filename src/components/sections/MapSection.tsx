import { motion } from 'framer-motion';
import { Network, Shield } from 'lucide-react';
import { Particles } from '../Particles';
import neuralMap from '@/assets/neural-map.png';

export const MapSection = () => {
  // ==========================================
  // PANEL DE CONTROL: ¡JUEGA CON ESTOS VALORES!
  // ==========================================
  
  const configMapa = {
    arriba: '20px',    // Menos es más arriba, más es más abajo
    derecha: '10px',   // Más es más a la IZQUIERDA, menos es más a la DERECHA
    escala: '580px',   // Ancho del mapa (ej: 400px, 600px...)
  };

  const configParrafo = {
    arriba: '120px',   // Para bajarlo a la franja blanca
    izquierda: '40px', // Para separarlo del borde
    anchoMax: '450px', // Qué tan ancho quieres el bloque de texto
  };

  const configBotones = {
    arriba: '180px',   // Para bajarlos a la zona azul oscuro
    derecha: '30px',   // Para alinearlos a la derecha
  };

  // ==========================================

  return (
    <section className="relative w-full overflow-hidden bg-navy-dark min-h-[700px] flex items-center">
      
      {/* FONDO PRINCIPAL */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/Fondo Mapa PNG.png")',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <div className="container relative z-20 mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-start pt-12">
          
          {/* SECCIÓN IZQUIERDA (Títulos y Párrafo) */}
          <div className="flex flex-col">
            <motion.div className="mb-10">
              <span className="text-gold font-semibold tracking-widest uppercase text-sm block">La Visión</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">
                <span className="text-white">Seguridad Jurídica</span><br />
                <span className="text-gold">Inteligencia Artificial</span>
              </h2>
            </motion.div>

            <motion.p
              className="text-navy-dark font-extrabold text-lg leading-relaxed"
              style={{ 
                marginTop: configParrafo.arriba,
                marginLeft: configParrafo.izquierda,
                maxWidth: configParrafo.anchoMax
              }} 
            >
              Bienvenido a nuestro ecosistema de defensa penal de vanguardia, donde la trayectoria histórica de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva.
            </motion.p>
          </div>

          {/* SECCIÓN DERECHA (Mapa y Botones) */}
          <div className="relative flex flex-col items-center lg:items-end">
            
            {/* Mapa Neural */}
            <motion.div
              style={{ 
                marginTop: configMapa.arriba,
                marginRight: configMapa.derecha
              }}
            >
              <img
                src={neuralMap}
                alt="Mapa Neural"
                style={{ width: configMapa.escala }}
                className="h-auto drop-shadow-2xl"
              />
            </motion.div>

            {/* Botones / Badges */}
            <div 
              className="flex gap-4"
              style={{ 
                marginTop: configBotones.arriba,
                marginRight: configBotones.derecha
              }}
            >
              <span className="flex items-center gap-2 text-white text-[10px] font-bold uppercase bg-navy-dark/60 px-4 py-2 rounded-full border border-gold/40">
                <Shield size={14} className="text-gold" /> Cobertura Transfronteriza
              </span>
              <span className="flex items-center gap-2 text-white text-[10px] font-bold uppercase bg-navy-dark/60 px-4 py-2 rounded-full border border-gold/40">
                <Network size={14} className="text-gold" /> Red de Inteligencia Legal
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
