import { motion } from 'framer-motion';
import { Globe, Scale, FileSearch, Landmark, FileBarChart, Newspaper } from 'lucide-react'; // Eliminado 'Lock'
import { Particles } from '../Particles';

/* ── CONFIGURACIÓN DE DISEÑO ── */
const SECTION_PADDING = 'py-20';
const GAP = 'gap-8'; // Aumenté el espacio un poco ya que las tarjetas son más pequeñas
const TITLE_SIZE = 'text-2xl md:text-3xl';
/* ───────────────────────────── */

// Unificamos y limpiamos los arrays. Ya no necesitamos la propiedad 'locked'.
const allServices = [
  // Fila 1 - Centro de Inteligencia
  { icon: Globe, title: 'Monitor de Riesgo (Arg-Ven)', desc: 'Vigilancia continua de indicadores de riesgo preventivo.' },
  { icon: Scale, title: 'Análisis Penal (Arg-Ven)', desc: 'Evaluación jurisdiccional transnacional asistida por IA.' },
  { icon: FileSearch, title: 'Auditoría Documental', desc: 'Análisis exhaustivo e inteligente de documentación legal.' },
  // Fila 2 - Módulos de Alianza
  { icon: Landmark, title: 'Memoria Documental', desc: 'Repositorio de precedentes y jurisprudencia corporativa.' },
  { icon: FileBarChart, title: 'Informes Automáticos', desc: 'Reportes y dictámenes generados en tiempo real.' },
  { icon: Newspaper, title: 'Boletín Jurídico', desc: 'Actualizaciones normativas periódicas y alertas.' }
];

// Nueva Tarjeta Premium: Animación de escala, hover de luz y sin botones.
const PremiumCard = ({ item, index }: {item: typeof allServices[0]; index: number;}) => (
  <motion.div
    // 1. Animación de Entrada (Al cargar la página)
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}

    // 2. Animación de Hover (El efecto de hacerse "un poquito más grande")
    whileHover={{ 
      scale: 1.04, // Un aumento sutil del 4% (igual que el mapa)
      transition: { duration: 0.4, ease: "easeInOut" } // Transición suave y elegante
    }}

    // Clases base de la tarjeta. Eliminado 'justify-between' porque ya no hay botón al final.
    className="group relative flex flex-col items-center text-center p-8 bg-cream/5 backdrop-blur-lg rounded-3xl border-2 border-[#c5a059]/20 transition-all duration-500 overflow-hidden cursor-pointer"
    style={{
      // Blindamos los detalles de iluminación y sombra que ya tenías
      boxShadow: '0 10px 30px -10px rgba(10, 25, 47, 0.3)',
    }}
  >
    {/* 3. EFECTO DE LUZ INTERNA (Se mantiene y se blindó) */}
    <div 
      className="absolute inset-0 bg-gradient-to-br from-cyan/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" 
      style={{
        // Agregamos un shadow extra en hover para la tarjeta completa, igual que en el código de base
        '--tw-shadow': '0 20px 25px -5px rgba(0, 255, 255, 0.1), 0 8px 10px -6px rgba(0, 255, 255, 0.1)',
        '--tw-shadow-colored': '0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color)',
        'box-shadow': 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
      }}
    />
    
    {/* Contenido z-10 para estar sobre la luz */}
    <div className="relative z-10">
      {/* Icono Premium */}
      <div className="text-[#c5a059] mb-8 flex justify-center">
        <item.icon className="w-14 h-14 relative z-10" strokeWidth={1} />
      </div>

      {/* Título (Texto intacto, Lock eliminado) */}
      <div className="flex items-center justify-center mb-4">
        <span className="text-xl font-serif font-bold text-white tracking-wide">
          {item.title}
        </span>
      </div>

      {/* Descripción (Texto intacto) */}
      <p className="text-gray-300 text-base leading-relaxed">{item.desc}</p>
    </div>
  </motion.div>
);

export const ServicesSection = () => {
  return (
    <section id="servicios" className={`${SECTION_PADDING} relative`}>
      
      {/* ── FONDO CON IMAGEN Y CAPA PROFUNDA ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="/fondo-servicios.jpg.png" 
          alt="" 
          className="w-full h-full object-cover" 
        />
        {/* Capa de pintura azul noche profundo con desenfoque */}
        <div className="absolute inset-0 bg-[#0a1526]/85 backdrop-blur-[2px]"></div>
      </div>

      {/* ── PARTÍCULAS (Mantenemos tu ajuste de destellos) ── */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-60">
        <Particles count={45} />
      </div>

      {/* ── CONTENIDO DE LA SECCIÓN (z-20 para estar sobre las partículas) ── */}
      <div className="relative z-20 container mx-auto px-6 md:px-12">
        
        {/* Fila 1 – Centro de Inteligencia */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${TITLE_SIZE} text-center font-serif font-bold text-white mb-12 tracking-wide`}
          style={{ fontVariant: 'small-caps' }}>
          Centro de Inteligencia Transnacional
        </motion.h2>
        
        {/* Usamos un grid de 1 columna para que las 3 tarjetas de la fila 1 ocupen su lugar */}
        <div className={`grid grid-cols-1 md:grid-cols-3 ${GAP} mb-14`}>
          {allServices.slice(0, 3).map((item, i) => (
            <PremiumCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Separador Dorado Elegante */}
        <div className="my-16 h-px bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent max-w-5xl mx-auto" />

        {/* Fila 2 – Módulos de Alianza */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${TITLE_SIZE} text-center font-serif font-bold text-white mb-12 tracking-wide`}
          style={{ fontVariant: 'small-caps' }}>
          Módulos de Alianza Estratégica
        </motion.h2>
        
        {/* Usamos un grid de 1 columna para las otras 3 tarjetas */}
        <div className={`grid grid-cols-1 md:grid-cols-3 ${GAP}`}>
          {allServices.slice(3, 6).map((item, i) => (
            <PremiumCard key={item.title} item={item} index={i + 3} /> // index + 3 para el delay correcto
          ))}
        </div>
      </div>
    </section>
  );
};
