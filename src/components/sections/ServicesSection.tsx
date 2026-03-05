import { motion } from 'framer-motion';
import { Globe, Scale, FileSearch, Landmark, FileBarChart, Newspaper } from 'lucide-react';
import { Particles } from '../Particles';

/* ── CONFIGURACIÓN DE DISEÑO ── */
const SECTION_PADDING = 'py-20';
const GAP = 'gap-6';
const TITLE_SIZE = 'text-2xl md:text-3xl';
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
    whileHover={{ scale: 1.04 }}
    className="group relative flex flex-col text-center p-8 bg-white/5 backdrop-blur-lg rounded-2xl border-2 border-[#c5a059]/30 transition-all duration-400 hover:border-[#c5a059] hover:shadow-2xl hover:shadow-cyan/30 overflow-hidden cursor-pointer"
  >
    {/* Iluminación interna reactiva - Subimos un poco la opacidad para contraste */}
    <div className="absolute inset-0 bg-gradient-to-br from-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-0" />
    
    <div className="relative z-10">
      <div className="text-[#c5a059] mb-6 flex justify-center">
        <item.icon className="w-12 h-12 relative z-10" strokeWidth={1.5} />
      </div>

      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-lg font-serif font-bold text-white uppercase tracking-wider">
          {item.title}
        </span>
      </div>

      <p className="text-gray-200 text-sm leading-relaxed">{item.desc}</p>
    </div>
  </motion.div>
);

export const ServicesSection = () => {
  return (
    <section id="servicios" className={`${SECTION_PADDING} relative overflow-hidden`}>
      
      {/* ── FONDO DINÁMICO (Adiós al azul plano) ── */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/fondo-servicios.jpg.png" 
          alt="" 
          className="w-full h-full object-cover opacity-40" 
        />
        {/* Degradado Radial para dar profundidad: de un azul acero a un azul profundo casi negro */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1526]/90 via-[#0f1d33]/80 to-[#0a1526]/95"></div>
        {/* Luces sutiles en las esquinas para romper la monotonía azul */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,89,0.05),transparent_70%)]"></div>
      </div>

      {/* ── PARTÍCULAS (Brillo Máximo) ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Particles count={60} />
      </div>

      {/* ── CONTENIDO ── */}
      <div className="relative z-20 container mx-auto px-4 md:px-8">
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${TITLE_SIZE} text-center font-serif font-bold text-white mb-10 tracking-[0.2em]`}
          style={{ fontVariant: 'small-caps' }}>
          Centro de Inteligencia Transnacional
        </motion.h2>
        
        <div className={`grid grid-cols-1 md:grid-cols-3 ${GAP}`}>
          {row1.map((item, i) => <Card key={item.title} item={item} index={i} />)}
        </div>

        <div className="my-14 h-px bg-gradient-to-r from-transparent via-[#c5a059]/50 to-transparent max-w-4xl mx-auto" />

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${TITLE_SIZE} text-center font-serif font-bold text-white mb-10 tracking-[0.2em]`}
          style={{ fontVariant: 'small-caps' }}>
          Módulos de Alianza Estratégica
        </motion.h2>
        
        <div className={`grid grid-cols-1 md:grid-cols-3 ${GAP}`}>
          {row2.map((item, i) => <Card key={item.title} item={item} index={i + 3} />)}
        </div>
      </div>
    </section>
  );
};
