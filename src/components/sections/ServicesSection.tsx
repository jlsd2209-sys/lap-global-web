import { motion } from 'framer-motion';
import { Globe, Scale, FileSearch, Landmark, FileBarChart, Newspaper } from 'lucide-react';
import { Particles } from '../Particles';
// 1. IMPORTAMOS EL COMPONENTE LINK PARA LA NAVEGACIÓN
import { Link } from 'react-router-dom';

/* ── CONFIGURACIÓN DE DISEÑO ── */
const SECTION_PADDING = 'py-14'; 
const GAP = 'gap-6';
const TITLE_SIZE = 'text-3xl md:text-4xl'; 
/* ───────────────────────────── */

const row1 = [
  { icon: Globe, title: 'Monitor de Riesgo (Arg-Ven)', desc: 'Vigilancia continua de indicadores de riesgo preventivo.' },
  { icon: Scale, title: 'Análisis Penal (Arg-Ven)', desc: 'Evaluación jurisdiccional transnacional asistida por IA.' },
  { icon: FileSearch, title: 'Auditoría Documental', desc: 'Análisis exhaustivo e inteligente de documentación legal.' }
];

const row2 = [
  { icon: Landmark, title: 'Memoria Documental', desc: 'Repositorio de precedentes y jurisprudencia corporativa.' },
  { icon: FileBarChart, title: 'Informes Automáticos', desc: 'Reportes y dictámenes generados en tiempo real.' },
  { icon: Newspaper, title: 'Boletín Jurídico', desc: 'Actualizaciones normativas periódicas y alertas.' }
];

const Card = ({ item, index }: {item: typeof row1[0]; index: number;}) => (
  // 2. ENVOLVEMOS LA TARJETA EN UN LINK HACIA LA RUTA DEL ASISTENTE
  <Link to="/asistente" className="block w-full h-full">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.04 }}
      className="group relative flex flex-col text-center p-8 bg-cream/5 backdrop-blur-md rounded-2xl border-2 border-[#c5a059]/30 transition-all duration-400 hover:border-[#c5a059] hover:shadow-2xl hover:shadow-cyan/20 overflow-hidden cursor-pointer h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-0" />
      
      <div className="relative z-10">
        <div className="text-[#c5a059] mb-6 flex justify-center">
          <item.icon className="w-12 h-12 relative z-10" strokeWidth={1.5} />
        </div>

        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-lg font-serif font-bold text-white">
            {item.title}
          </span>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  </Link>
);

export const ServicesSection = () => {
  return (
    <section id="servicios" className={`${SECTION_PADDING} relative pt-[40px] pb-[40px]`}>
      
      {/* ── FONDO ORIGINAL ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="/fondo-servicios.jpg.png" 
          alt="" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-[#0a1526]/85 backdrop-blur-[2px]"></div>
      </div>

      {/* ── PARTÍCULAS ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Particles count={50} />
      </div>

      <div className="relative z-20 container mx-auto px-4 md:px-8">
        
        {/* Título Fila 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className={`${TITLE_SIZE} font-serif font-bold gradient-text-gold`}>
            Centro de Inteligencia Transnacional
          </h2>
        </motion.div>
        
        <div className={`grid grid-cols-1 md:grid-cols-3 ${GAP}`}>
          {row1.map((item, i) => <Card key={item.title} item={item} index={i} />)}
        </div>

        {/* Separador */}
        <div className="my-14 h-px bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent max-w-4xl mx-auto" />

        {/* Título Fila 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className={`${TITLE_SIZE} font-serif font-bold gradient-text-gold`}>
            Módulos de Alianza Estratégica
          </h2>
        </motion.div>
        
        <div className={`grid grid-cols-1 md:grid-cols-3 ${GAP}`}>
          {row2.map((item, i) => <Card key={item.title} item={item} index={i + 3} />)}
        </div>
      </div>
    </section>
  );
};
