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
  <Link to={`/asistente?modulo=${item.hook}`} target="_blank" rel="noopener noreferrer" className="block w-full h-full group">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.04 }}
      // CAMBIO RADICAL: Fondo Crema sólido (bg-[#fdfcf5]) que pasa a Dorado sólido (hover:bg-[#c5a059])
      className="relative flex flex-col text-center p-8 bg-[#fdfcf5] rounded-2xl border-2 border-[#c5a059]/20 transition-all duration-500 hover:border-[#c5a059] hover:bg-[#c5a059] hover:shadow-[0_0_40px_rgba(197,160,89,0.4)] overflow-hidden cursor-pointer h-full"
    >
      <div className="relative z-10 flex flex-col h-full">
        {/* ÍCONO: Empieza Dorado y pasa a Azul Oscuro al hacer hover */}
        <div className="text-[#c5a059] group-hover:text-[#0a1526] mb-6 flex justify-center transform transition-all duration-500 group-hover:-translate-y-1">
          <item.icon className="w-12 h-12 relative z-10" strokeWidth={1.5} />
        </div>

        <div className="flex items-center justify-center gap-2 mb-3">
          {/* TÍTULO: Azul oscuro puro, siempre legible y elegante */}
          <span className="text-lg font-serif font-bold text-[#0a1526] transition-colors duration-300">
            {item.title}
          </span>
        </div>

        {/* DESCRIPCIÓN: Gris oscuro que se vuelve Azul Oscuro intenso en hover */}
        <p className="text-gray-600 group-hover:text-[#0a1526]/90 text-sm leading-relaxed mt-auto transition-colors duration-300 font-medium">
          {item.desc}
        </p>
      </div>
    </motion.div>
  </Link>
);

export const ServicesSection = () => {
  return (
    <section id="servicios" className={`${SECTION_PADDING} relative pt-[40px] pb-[40px]`}>
      
      {/* ── FONDO (Queda idéntico, azul corporativo oscuro) ── */}
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
