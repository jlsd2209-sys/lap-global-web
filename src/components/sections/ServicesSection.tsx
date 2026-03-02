import { motion } from 'framer-motion';
import { ShieldAlert, Scale, FileSearch, Library, FileBarChart, Newspaper, Lock } from 'lucide-react';

/* ── CONFIGURACIÓN DE DISEÑO ── */
const SECTION_PADDING = 'py-20';
const GAP = 'gap-6';
const TITLE_SIZE = 'text-2xl md:text-3xl';
/* ───────────────────────────── */

const row1 = [
  { icon: ShieldAlert, title: 'Monitor de Riesgo (Arg-Ven)', desc: 'Vigilancia continua de indicadores de riesgo preventivo.', locked: false },
  { icon: Scale, title: 'Análisis Penal (Arg-Ven)', desc: 'Evaluación jurisdiccional transnacional asistida por IA.', locked: false },
  { icon: FileSearch, title: 'Auditoría Documental', desc: 'Análisis exhaustivo e inteligente de documentación legal.', locked: false }
];

const row2 = [
  { icon: Library, title: 'Memoria Documental', desc: 'Repositorio de precedentes y jurisprudencia corporativa.', locked: true },
  { icon: FileBarChart, title: 'Informes Automáticos', desc: 'Reportes y dictámenes generados en tiempo real.', locked: true },
  { icon: Newspaper, title: 'Boletín Jurídico', desc: 'Actualizaciones normativas periódicas y alertas.', locked: true }
];

const Card = ({ item, index }: {item: typeof row1[0];index: number;}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group flex flex-col justify-between text-center p-6 bg-slate-800/40 backdrop-blur-md rounded-2xl border border-[#c5a059]/30 transition-all duration-400 hover:-translate-y-2 hover:border-[#c5a059]/80 hover:shadow-xl hover:shadow-[#c5a059]/20"
  >
    <div>
      {/* Icono Premium */}
      <div className="text-[#c5a059] mb-5 flex justify-center">
        <item.icon className="w-12 h-12" strokeWidth={1.5} />
      </div>

      {/* Título */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-lg font-serif font-bold text-gray-100">
          {item.title}
        </span>
        {item.locked && <Lock className="w-4 h-4 text-[#c5a059]/60 flex-shrink-0" />}
      </div>

      {/* Descripción */}
      <p className="text-gray-300 text-sm mb-6 leading-relaxed">{item.desc}</p>
    </div>

    {/* Botón de Conexión a ChatLegal */}
    <a 
      href={item.locked ? "#" : "/asistente"} 
      className={`mt-auto py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
        item.locked 
        ? 'bg-slate-800/60 text-gray-400 cursor-not-allowed border border-slate-700' 
        : 'bg-[#c5a059] text-black hover:bg-yellow-600 active:scale-95 shadow-lg shadow-[#c5a059]/20'
      }`}
    >
      {item.locked ? 'Módulo Restringido' : 'Solicitar Consulta IA'}
    </a>
  </motion.div>
);

export const ServicesSection = () => {
  return (
    <section id="servicios" className={`${SECTION_PADDING} relative`}>
      
      {/* ── FONDO CON IMAGEN Y CAPA AZUL MARINO (OVERLAY) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Tu imagen de fondo */}
        <img 
          src="/fondo-servicios.jpg" 
          alt="Fondo Servicios LAP" 
          className="w-full h-full object-cover" 
        />
        {/* Capa de pintura azul marino profundo para integrar con el resto de la página */}
        <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-[2px]"></div>
      </div>

      {/* ── CONTENIDO DE LA SECCIÓN ── */}
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        
        {/* Fila 1 – Centro de Inteligencia */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${TITLE_SIZE} text-center font-serif font-bold text-gray-100 mb-10 tracking-wide`}
          style={{ fontVariant: 'small-caps' }}>
          Centro de Inteligencia Transnacional
        </motion.h2>
        
        <div className={`grid grid-cols-1 md:grid-cols-3 ${GAP}`}>
          {row1.map((item, i) => <Card key={item.title} item={item} index={i} />)}
        </div>

        {/* Separador Dorado Elegante */}
        <div className="my-14 h-px bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent max-w-4xl mx-auto" />

        {/* Fila 2 – Módulos de Alianza */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${TITLE_SIZE} text-center font-serif font-bold text-gray-100 mb-10 tracking-wide`}
          style={{ fontVariant: 'small-caps' }}>
          Módulos de Alianza Estratégica
        </motion.h2>
        
        <div className={`grid grid-cols-1 md:grid-cols-3 ${GAP}`}>
          {row2.map((item, i) => <Card key={item.title} item={item} index={i} />)}
        </div>
      </div>
    </section>
  );
};
