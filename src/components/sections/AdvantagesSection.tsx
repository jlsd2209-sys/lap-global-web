import { motion } from 'framer-motion';
import { Flag, Brain, Globe, GraduationCap, Video, Award } from 'lucide-react';
const advantages = [{
  icon: Flag,
  title: 'Doble Jurisdicción',
  description: 'Matrícula profesional activa en Venezuela y Argentina. Capacidad legal para ejercer plenamente en ambos países.',
  badge: {
    icon: Award,
    text: 'Certificado UBA'
  },
  flags: ['🇻🇪', '🇦🇷']
}, {
  icon: Brain,
  title: 'Especialización en IA',
  description: 'Postgrado en Inteligencia Artificial Generativa, Prompting y Derecho (Universidad de Buenos Aires). Combinación de expertise legal y tecnológica.',
  badge: {
    icon: GraduationCap,
    text: 'Postgrado UBA 2024'
  },
  hasPulse: true
}, {
  icon: Globe,
  title: 'Alcance Regional',
  description: 'Atención a clientes en Argentina y Venezuela, de manera presencial y virtual. Cobertura transfronteriza real.',
  badge: {
    icon: Video,
    text: 'Capacidad PJN'
  },
  hasOrbit: true
}];
export const AdvantagesSection = () => {
  return <section id="nosotros" className="py-14 bg-gradient-to-b from-navy-dark to-charcoal pt-[40px] pb-[40px]">
      <div className="container">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">¿Por Qué la Unidad de Asuntos Transnacionales & IA?</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {advantages.map((advantage, index) => <motion.div key={advantage.title} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: index * 0.1
        }} className="group relative bg-cream/5 backdrop-blur-sm border-2 border-gold/30 rounded-2xl p-6 text-center transition-all duration-400 hover:-translate-y-2 hover:border-gold-bright hover:shadow-2xl hover:shadow-cyan/20 overflow-hidden">
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              
              {/* Icon container */}
              <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-gold/20 to-cyan/10 rounded-full border-2 border-gold">
                <advantage.icon className="w-10 h-10 text-gold-bright relative z-10" />
                
                {/* Flags for first card */}
                {advantage.flags && <div className="absolute -top-1 -right-1 flex gap-1 text-2xl">
                    {advantage.flags.map((flag, i) => <span key={i}>{flag}</span>)}
                  </div>}
                
                {/* Pulse ring for second card */}
                {advantage.hasPulse && <div className="absolute w-[120%] h-[120%] rounded-full border-2 border-cyan" style={{
              animation: 'pulse-ring 2s ease-out infinite'
            }} />}
                
                {/* Orbit for third card */}
                {advantage.hasOrbit && <div className="absolute w-[140%] h-[140%] rounded-full border border-dashed border-gold opacity-30" style={{
              animation: 'rotate-orbit 20s linear infinite'
            }} />}
              </div>

              {/* Content */}
              <h3 className="text-xl font-serif font-bold text-white mb-4 relative z-10">
                {advantage.title}
              </h3>
              <p className="text-cream-light/80 mb-6 leading-relaxed relative z-10">
                {advantage.description}
              </p>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold/20 to-gold-bright/10 rounded-full text-sm text-gold-bright border border-gold/50 relative z-10">
                <advantage.badge.icon className="w-4 h-4" />
                {advantage.badge.text}
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
