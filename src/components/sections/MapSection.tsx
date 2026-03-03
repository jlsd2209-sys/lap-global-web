import { motion } from 'framer-motion';
import { Network, Shield } from 'lucide-react';
import { Particles } from '../Particles';
import neuralMap from '@/assets/neural-map.png';

export const MapSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-navy-dark min-h-[650px] flex items-center">
      
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
          
          {/* --- BLOQUE IZQUIERDO --- */}
          <div className="flex flex-col">
            
            {/* Título: Se queda arriba */}
            <motion.div className="mb-[120px]"> {/* <--- AJUSTA ESTE MARGEN para separar el título del párrafo */}
              <span className="text-gold font-semibold tracking-widest uppercase text-sm block">La Visión</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">
                <span className="text-white">Seguridad Jurídica</span><br />
                <span className="text-gold">Inteligencia Artificial</span>
              </h2>
            </motion.div>

            {/* Párrafo: DEBE CAER EN LA FRANJA BLANCA */}
            <motion.p
              className="text-navy-dark font-extrabold text-lg leading-relaxed max-w-md"
              style={{ 
                marginTop: '80px',  // <--- CAMBIA ESTE VALOR para subir o bajar el texto dentro del blanco
                marginLeft: '20px'  // <--- CAMBIA ESTE VALOR para moverlo a la derecha/izquierda
              }} 
            >
              Bienvenido a nuestro ecosistema de defensa penal de vanguardia, donde la trayectoria histórica de nuestra firma se fusiona con Sistemas de Inteligencia Jurídica de Propiedad Exclusiva.
            </motion.p>
          </div>

          {/* --- BLOQUE DERECHO --- */}
          <div className="relative flex flex-col items-center lg:items-end">
            
            {/* Mapa Neural: MOVIMIENTO HACIA EL HUECO DERECHO */}
            <motion.div
              className="relative"
              style={{ 
                marginTop: '100px', // <--- CAMBIA ESTE VALOR para bajar el mapa
                marginRight: '50px' // <--- AUMENTA ESTO para mover el mapa más a la IZQUIERDA
              }}
            >
              <img
                src={neuralMap}
                alt="Mapa Neural"
                className="w-full max-w-[600px] h-auto drop-shadow-2xl"
              />
            </motion.div>

            {/* Badges: AJUSTE AL FONDO A LA DERECHA */}
            <div 
              className="flex gap-4"
              style={{ 
                marginTop: '150px', // <--- CAMBIA ESTE VALOR para bajar los botones a la franja azul de abajo
                marginRight: '10px' // <--- CAMBIA ESTE VALOR para pegarlos más al borde derecho
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
