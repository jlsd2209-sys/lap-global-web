import { motion } from 'framer-motion';
import { Globe, Scale, FileSearch, Landmark, FileBarChart, Newspaper } from 'lucide-react';
import { Particles } from '../Particles';
import { Link } from 'react-router-dom';

/* ── CONFIGURACIÓN DE DISEÑO ── */
const SECTION_PADDING = 'py-14'; 
const GAP = 'gap-6';
const TITLE_SIZE = 'text-3xl md:text-4xl'; 
/* ───────────────────────────── */

const row1 = [
  { icon: Globe, title: 'Monitor de Riesgo (Arg-Ven)', hook: 'webhook-riesgo', desc: 'Vigilancia continua de indicadores de riesgo preventivo.' },
  { icon: Scale, title: 'Análisis Penal (Arg-Ven)', hook: 'webhook-penal', desc: 'Evaluación jurisdiccional transnacional asistida por IA.' },
  { icon: FileSearch, title: 'Auditoría Documental', hook: 'webhook-auditoria', desc: 'Análisis exhaustivo e inteligente de documentación legal.' }
];

const row2 = [
  { icon: Landmark, title: 'Memoria Institucional', hook: 'webhook-memoria', desc: 'Repositorio de precedentes y jurisprudencia corporativa.' },
  { icon: FileBarChart, title: 'Informes Automáticos', hook: 'webhook-informes', desc: 'Reportes y dictámenes generados en tiempo real.' },
  { icon: Newspaper, title: 'Boletín Jurídico', hook: 'webhook-boletin', desc: 'Actualizaciones normativas periódicas y alertas.' }
];

const Card = ({ item, index }: {item: typeof row1[0]; index: number;}) => (
  // El "group" en el Link nos permite controlar animaciones en cadena al pasar el mouse
  <Link to={`/asistente?modulo=${item.hook}`} target="_blank" rel="noopener noreferrer" className="block w-full h-full group">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.04 }}
      // AJUSTE FUERTE: bg-white/10 (Cristal blanco) y cambia a dorado (bg-[#c5a059]/15) en hover
      className="relative flex flex-col text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 transition-all duration-500 hover:border-[#c5a059] hover:bg-[#c5a059]/15 hover:shadow-[0_0_35px_rgba(197,160,89,0.3)] overflow-hidden cursor-pointer h-full"
    >
      {/* Destello interno dorado en Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#c5a059]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* ÍCONO: Empieza Plata/Blanco y se enciende Dorado al pasar el mouse */}
        <div className="text-gray-200 group-hover:text-[#c5a059] mb-6 flex justify-center transform transition-all duration-500 group-hover:-translate-y-1 group-hover:drop-shadow-[0_0_12px_rgba(197,160,89,0.8)]">
          <item.icon className="w-12 h-12 relative z-10" strokeWidth={1.5} />
        </div>

        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-lg font-serif font-bold text-white transition-colors duration-300">
            {item.title}
          </span>
        </div>

        <p className="text-gray-300 group-hover:text-white text-sm leading-relaxed transition-colors duration-300">{item.desc}</p>
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
        
        <div className={`grid grid-cols-1 md:grid-cols-3 ${GAP}`}>
          {row1.map((item, i) => <Card key={item.title} item={item} index={i} />)}
        </div>

        <div className="my-14 h-px bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent max-w-4xl mx-auto" />

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
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
