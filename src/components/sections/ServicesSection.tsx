import { motion } from 'framer-motion';
import { Globe, Scale, FileSearch, Landmark, FileBarChart, Newspaper } from 'lucide-react';
import { Particles } from '../Particles';
import { Link } from 'react-router-dom';

/* ── CONFIGURACIÓN DE DISEÑO ── */
const SECTION_PADDING = 'py-14'; 
const TITLE_SIZE = 'text-3xl md:text-4xl'; 
/* ───────────────────────────── */

const modulesList = [
  { icon: Globe, title: 'Monitor de Riesgo (Arg-Ven)', hook: 'webhook-riesgo', desc: 'Vigilancia continua de indicadores de riesgo preventivo.' },
  { icon: Scale, title: 'Análisis Penal (Arg-Ven)', hook: 'webhook-penal', desc: 'Evaluación jurisdiccional transnacional asistida por Modelos de Lenguaje.' },
  { icon: FileSearch, title: 'Auditoría Documental', hook: 'webhook-auditoria', desc: 'Análisis exhaustivo e inteligente de documentación legal.' },
  { icon: Landmark, title: 'Memoria Institucional', hook: 'webhook-memoria', desc: 'Repositorio de precedentes y jurisprudencia corporativa.' },
  { icon: FileBarChart, title: 'Informes Automáticos', hook: 'webhook-informes', desc: 'Reportes y dictámenes generados en tiempo real.' },
  { icon: Newspaper, title: 'Boletín Jurídico', hook: 'webhook-boletin', desc: 'Actualizaciones normativas periódicas y alertas.' }
];

const Card = ({ item, index }: {item: typeof modulesList[0]; index: number;}) => (
  <Link to={`/asistente?modulo=${item.hook}`} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.04 }}
      // Padding ajustado para ser compacto a los lados (px-5) y con aire arriba/abajo (py-6)
      className="group relative flex flex-col text-center px-4 py-6 md:px-5 md:py-8 bg-cream/5 backdrop-blur-md rounded-2xl border-2 border-[#c5a059]/30 transition-all duration-400 hover:border-[#c5a059] hover:shadow-2xl hover:shadow-cyan/20 overflow-hidden cursor-pointer h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-0" />
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Tamaños originales restaurados: mb-6 y w-12 h-12 */}
          <div className="text-[#c5a059] mb-6 flex justify-center">
            <item.icon className="w-12 h-12 relative z-10" strokeWidth={1.5} />
          </div>

          {/* Tamaños originales restaurados: mb-3 y text-lg */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-lg font-serif font-bold text-white leading-tight">
              {item.title}
            </span>
          </div>
        </div>

        {/* Tamaños originales restaurados: text-sm */}
        <p className="text-gray-300 text-sm leading-relaxed mt-2">{item.desc}</p>
      </div>
    </motion.div>
  </Link>
);

export const ServicesSection = () => {
  return (
    <section id="servicios" className={`${SECTION_PADDING} relative pt-[40px] pb-[40px]`}>
      
      {/* ── FONDO ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img src="/fondo-servicios.jpg.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0a1526]/85 backdrop-blur-[2px]"></div>
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <Particles count={50} />
      </div>

      <div className="relative z-20 container mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className={`${TITLE_SIZE} font-serif font-bold gradient-text-gold`}>
            Centro de Inteligencia Transnacional
          </h2>
        </motion.div>
        
        {/* LA CLAVE ESTÁ AQUÍ: max-w-5xl fuerza a la grilla a ser más estrecha (aprox 1024px de ancho total), haciendo las tarjetas físicamente más delgadas */}
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto`}>
          {modulesList.map((item, i) => <Card key={item.title} item={item} index={i} />)}
        </div>
      </div>
    </section>
  );
};
