import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Gauge, TrendingUp, Clock } from 'lucide-react';

const results = [
  {
    icon: Gauge,
    target: 70,
    symbol: '%',
    text: 'Reducción en Tiempo de Análisis'
  },
  {
    icon: TrendingUp,
    target: 10,
    symbol: 'x',
    text: 'Mayor Capacidad de Casos'
  },
  {
    icon: Clock,
    target: 24,
    symbol: '/7',
    text: 'Disponibilidad de IA'
  }
];

const Counter = ({ target, duration = 2000 }: {target: number; duration?: number;}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
};

export const ResultsSection = () => {
  return (
    <section className="py-12 bg-charcoal-dark pt-[40px] pb-[40px]">
      <div className="container mx-auto px-2 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold">
            <span className="gradient-text-gold inline-block">Impacto Medible</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 gap-2 md:gap-8 max-w-6xl mx-auto">
          {results.map((result, index) => (
            <motion.div
              key={result.text}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center px-2 py-4 md:px-5 md:py-6 bg-gradient-to-br from-navy-dark/50 to-navy-medium/30 rounded-2xl border-2 border-gold/20 transition-all duration-400 hover:-translate-y-2 hover:border-cyan hover:shadow-2xl hover:shadow-cyan/20 h-full flex flex-col justify-center"
            >
              <div className="text-gold mb-2 md:mb-3">
                <result.icon className="w-6 h-6 md:w-12 md:h-12 mx-auto" />
              </div>

              <div className="flex items-baseline justify-center mb-1">
                <span className="text-2xl sm:text-3xl md:text-6xl font-serif font-bold text-white leading-none">
                  <Counter target={result.target} />
                </span>
                <span className="text-lg sm:text-xl md:text-4xl font-bold text-cyan ml-1 leading-none">
                  {result.symbol}
                </span>
              </div>

              {/* CLAVE: Se restauró el tamaño normal para escritorio (md:text-base) y se mantuvo diminuto para el celular (text-[10px]) */}
              <p className="text-[10px] sm:text-xs md:text-base text-cream-light/80 leading-tight md:leading-relaxed mt-1 md:mt-2">
                {result.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
