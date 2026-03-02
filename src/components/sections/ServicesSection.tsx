import { motion } from 'framer-motion';
import { Globe, Scale, FileSearch, Landmark, FileBarChart, Newspaper, Lock } from 'lucide-react';

/* ── CONFIGURACIÓN DE DISEÑO ── */
const SECTION_PADDING = 'py-20';
const GAP = 'gap-6';
const TITLE_SIZE = 'text-2xl md:text-3xl';
/* ───────────────────────────── */

const row1 = [
  { icon: Globe, title: 'Monitor de Riesgo (Arg-Ven)', desc: 'Vigilancia continua de indicadores de riesgo preventivo.', locked: false },
  { icon: Scale, title: 'Análisis Penal (Arg-Ven)', desc: 'Evaluación jurisdiccional transnacional asistida por IA.', locked: false },
  { icon: FileSearch, title: 'Auditoría Documental', desc: 'Análisis exhaustivo e inteligente de documentación legal.', locked: false }
];

const row2 = [
  { icon: Landmark, title: 'Memoria Documental', desc: 'Repositorio de precedentes y jurisprudencia corporativa.', locked: true },
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

    {/* Botón de Conexión a ChatLegal con EFECTO DE LUZ */}
    {item.locked ? (
      <div className="mt-auto py-3 px-4 rounded-xl text-sm font-semibold bg-slate-800/60 text-gray-400 cursor-not-allowed border border-slate-700">
        Módulo Restringido
      </div>
    ) : (
      <div className="relative mt-auto group/btn">
        {/* Capa de resplandor animado (Aura Creciente Dorada) */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#c5a059] via-yellow-400 to-[#c5a059] rounded-xl blur-md opacity-40 group-hover/btn:opacity-100 animate-pulse transition-all duration-500"></div>
        
        {/* Botón Real */}
        <a 
          href="/asistente" 
          className="relative flex justify-center items-center py-3 px-4 rounded-xl text-sm font-semibold bg-[#c5a059] text-black hover:bg-[#b38f4a] active:scale-95 transition-all duration-300"
        >
          Consultar
        </a>
      </div>
    )}
  </motion.div>
);

export const ServicesSection = () => {
  return (
    <section id="servicios" className={`${SECTION_PADDING} relative`}>
      
      {/* ── FONDO Y DESTELLOS DE LUCES ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Imagen de fondo */}
        <img 
          src="/fondo-servicios.jpg" 
          alt="Fondo Servicios LAP" 
          className="w-full h-full object-cover" 
        />
        {/* Capa oscura */}
        <div className="absolute inset-0 bg-[#0a1526]/85 backdrop-blur-[2px]"></div>
        
        {/* Destellos de Luces (Partículas Animadas) */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-[#c5a059] rounded-full"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, -100, -200],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.5, 0.5]
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
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
