import { motion } from 'framer-motion';
import { Globe, Scale, FileSearch, Landmark, FileText, BookOpen, Lock } from 'lucide-react';
import bgCircles from '@/assets/bg-circles.png';
import worldMap from '@/assets/world-map-overlay.png';

/* ── EDITABLE CONFIG ── */
const SECTION_PADDING = 'py-20';
const CARD_PADDING = 'px-6 py-5';
const TITLE_SIZE = 'text-2xl md:text-3xl';
const CARD_TITLE_SIZE = 'text-base';
const CARD_ICON_SIZE = 'w-10 h-10';
const CARD_LOCK_SIZE = 'w-5 h-5';
const GAP = 'gap-6';
/* ───────────────────── */

const row1 = [
{ icon: Globe, title: 'Monitor de Riesgo (Arg-Ven)', desc: 'Vigilancia continua de indicadores de riesgo.', locked: false },
{ icon: Scale, title: 'Análisis Penal (Arg-Ven)', desc: 'Evaluación jurisdiccional transnacional.', locked: false },
{ icon: FileSearch, title: 'Auditoría Documental', desc: 'Análisis exhaustivo de documentación legal y compliance.', locked: false }];

const row2 = [
{ icon: Landmark, title: 'Memoria Documental', desc: 'Repositorio de precedentes y jurisprudencia.', locked: true },
{ icon: FileText, title: 'Informes Automáticos', desc: 'Reportes generados en tiempo real.', locked: true },
{ icon: BookOpen, title: 'Boletín Jurídico', desc: 'Actualizaciones normativas periódicas.', locked: true }];

const Card = ({ item, index }: {item: typeof row1[0];index: number;}) =>
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
  className="group text-center p-5 bg-gradient-to-br from-navy-dark/50 to-navy-medium/30 rounded-2xl border-2 border-gold/20 transition-all duration-400 hover:-translate-y-2 hover:border-cyan hover:shadow-2xl hover:shadow-cyan/20">

    {/* Icon */}
    <div className="text-gold mb-4">
      <item.icon className="w-12 h-12 mx-auto" />
    </div>

    {/* Title */}
    <div className="flex items-center justify-center gap-2 mb-2">
      <span className="text-lg font-serif font-bold text-white">
        {item.title}
      </span>
      {item.locked && <Lock className={`${CARD_LOCK_SIZE} text-gold/60 flex-shrink-0`} />}
    </div>

    {/* Description */}
    <p className="text-cream-light/80 text-sm">{item.desc}</p>
  </motion.div>;

export const ServicesSection = () => {
  return (
    <section id="servicios" className={SECTION_PADDING}>
      {/* Single unified background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(210,30%,18%)] via-[hsl(210,25%,22%)] to-[hsl(210,20%,26%)]" />
        <img src={worldMap} alt="" className="absolute inset-0 w-full h-full object-cover opacity-5 mix-blend-lighten" />

        <div className="relative container px-[10px] pt-[50px] pb-[50px]">
          {/* Row 1 – Centro de Inteligencia */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${TITLE_SIZE} font-serif font-bold text-cream mb-10 tracking-wide`}
            style={{ fontVariant: 'small-caps' }}>
            Centro de Inteligencia Transnacional
          </motion.h2>
          <div className={`grid grid-cols-1 md:grid-cols-3 ${GAP}`}>
            {row1.map((item, i) => <Card key={item.title} item={item} index={i} />)}
          </div>

          {/* Separator */}
          <div className="my-10 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          {/* Row 2 – Módulos de Alianza */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${TITLE_SIZE} font-serif font-bold text-cream mb-10 tracking-wide`}
            style={{ fontVariant: 'small-caps' }}>
            Módulos de Alianza Estratégica
          </motion.h2>
          <div className={`grid grid-cols-1 md:grid-cols-3 ${GAP}`}>
            {row2.map((item, i) => <Card key={item.title} item={item} index={i} />)}
          </div>
        </div>
      </div>
    </section>);
};
