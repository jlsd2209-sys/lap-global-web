export const MapSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative w-full h-[600px] overflow-hidden bg-navy-dark flex items-center">
      {/* 1. FONDO - backgroundSize: 'cover' es mejor para zoom */}
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/Fondo Mapa PNG.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="absolute inset-0 z-10 pointer-events-none">
        <Particles count={30} />
      </div>

      {/* 2. CONTENEDOR GUÍA - Esto alinea el texto con el Header/Footer */}
      <div className="container mx-auto px-6 relative z-30 flex flex-col justify-center h-full">
        
        {/* BLOQUE DE TEXTO - Ya no usamos porcentajes manuales, usamos margen natural */}
        <div className="max-w-xl md:ml-10">
          <span className="gradient-text-gold font-semibold tracking-widest uppercase text-sm block mb-2">
            La Visión
          </span>
          <h2 className="font-serif font-bold leading-tight text-white">
            <span className="text-3xl md:text-5xl block">Seguridad Jurídica</span>
            <span className="text-white/80 text-xl md:text-2xl italic block my-1">en la Era de la</span>
            <span className="gradient-text-gold text-3xl md:text-5xl block">Inteligencia Artificial</span>
          </h2>
          
          <p className="mt-6 text-white/90 font-medium leading-relaxed text-sm md:text-lg">
            Bienvenido a nuestro ecosistema de defensa legal de vanguardia...
          </p>

          <div className="mt-8">
            <motion.button 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="flex items-center gap-2 text-white font-bold uppercase bg-navy-dark/60 px-6 py-3 rounded-full border border-gold/40 backdrop-blur-sm transition-all"
            >
              <Network size={16} className={isHovered ? 'text-cyan-400' : 'text-gold'} />
              Red de Inteligencia Legal
            </motion.button>
          </div>
        </div>
      </div>

      {/* 3. MAPA - Posicionado a la derecha de forma fluida */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 right-0 md:right-[5%] z-20 w-[300px] md:w-[500px]"
        animate={{
          scale: isHovered ? 1.05 : 1,
          opacity: isHovered ? 1 : 0.7
        }}
      >
        <img src="/Mapa con escudo.png" alt="Mapa" className="w-full h-auto drop-shadow-2xl" />
      </motion.div>
    </section>
  );
};
