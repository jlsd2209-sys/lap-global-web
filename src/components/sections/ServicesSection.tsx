import { motion } from 'framer-motion';
import { Globe, Scale, FileSearch, Landmark, FileBarChart, Newspaper } from 'lucide-react';
import { Particles } from '../Particles';

/* ── CONFIGURACIÓN DE DISEÑO ── */
const SECTION_PADDING = 'py-24';
const GAP = 'gap-8';
const TITLE_SIZE = 'text-2xl md:text-3xl lg:text-4xl';
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
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ scale: 1.05 }}
    className="group relative flex flex-col text-center p-8 bg-[#0f172a]/40 backdrop-blur-xl rounded-2xl border border-[#c5a059]/30 transition-all duration-500 hover:border-[#c5a059] hover:shadow-[0_0_30px_rgba(197,160,89,0.2)] overflow-hidden cursor-pointer"
  >
    {/* Destello interno premium */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(197,160,89,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10">
      <div className="text-[#c5a059] mb-6 flex justify-center group-hover:scale-110 transition-transform duration-500">
        <item.icon className="w-14 h-14" strokeWidth={1.2} />
      </div>

      <h3 className="text-xl font-serif font-bold text-white mb-4 tracking-tight leading-tight">
        {item.title}
      </h3>

      <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans font-light">
        {item.desc}
      </p>
    </div>
  </motion.div>
);

export const ServicesSection = () => {
  return (
    <section id="servicios" className={`${SECTION_PADDING} relative bg-[#060b13] overflow-hidden`}>
      
      {/* ── FONDO DINÁMICO MEJORADO ── */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/fondo-servicios.jpg.png" 
          alt="" 
          className="w-full h-full object-cover opacity-20 mix-blend-overlay" 
        />
        {/* Gradiente para eliminar el "exceso de azul" y dar profundidad real */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.8),#060b13)]" />
      </div>

      {/* ── PARTÍCULAS (Configuración Mapa) ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Particles count={55} />
      </div>

      <div className="relative z-20 container mx-auto px-6">
        
        {/* Título Fila 1 */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${TITLE_SIZE} text-center font-serif font-bold text-white mb-12 tracking-widest uppercase`}
        >
          Centro de Inteligencia Transnacional
        </motion.h2>
        
        <div className={`grid grid-cols-1 md:grid-cols-3 ${GAP}`}>
          {row1.map((item, i) => <Card key={item.title} item={item} index={i} />)}
        </div>

        {/* Divisor */}
        <div className="my-20 flex justify-center items-center gap-4 opacity-50">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#c5a059]" />
          <div className="w-2 h-2 rotate-45 border border-[#c5a059]" />
          <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#c5a059]" />
        </div>

        {/* Título Fila 2 */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${TITLE_SIZE} text-center font-serif font-bold text-white mb-12 tracking-widest uppercase`}
        >
          Módulos de Alianza Estratégica
        </motion.h2>
        
        <div className={`grid grid-cols-1 md:grid-cols-3 ${GAP}`}>
          {row2.map((item, i) => <Card key={item.title} item={item} index={i + 3} />)}
        </div>
      </div>
    </section>
  );
};
