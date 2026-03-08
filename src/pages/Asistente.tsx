import { useState, useRef, useEffect } from 'react';
import logoShield from '@/assets/logo-shield.png'; 
import { useSearchParams } from 'react-router-dom';
import { Particles } from '@/components/Particles'; 
import { Sun, Moon, Send, Menu, X, Lock, Eye, EyeOff } from 'lucide-react'; 

type Message = {
  id: string;
  sender: 'user' | 'bot' | 'loading';
  text: string;
};

// ==========================================
// BASE DE DATOS DE MÓDULOS 
// ==========================================
const MODULES_DB = [
  { 
    name: 'Monitor de Riesgo (Arg-Ven)', 
    hook: 'webhook-riesgo', 
    icon: '🌐',
    demoText: "He procesado su parámetro de búsqueda. En la versión verificada para clientes, nuestro módulo cruza esta información en tiempo real para anticipar vulnerabilidades corporativas antes de que ocurran. Nuestro sistema es capaz de predecir contingencias binacionales evaluando miles de indicadores diarios. Este módulo será adaptado a sus necesidades corporativas. Para obtener un reporte completo, blindar sus operaciones y desbloquear la matriz predictiva aplicada a su caso, contacte a nuestros especialistas para habilitar su cuenta.",
    loadingText: "Cruzando indicadores de riesgo corporativo en tiempo real..."
  },
  { 
    name: 'Análisis Penal (Arg-Ven)', 
    hook: 'webhook-penal', 
    icon: '⚖️',
    demoText: "He analizado los elementos preliminares de su caso. En nuestro entorno seguro, este módulo estructura una defensa comparada, cruzando legislación vigente de Argentina y/o Venezuela junto con los tratados bilaterales para encontrar la mejor ruta de mitigación, generando dictámenes con niveles altos de precisión argumentativa. Este módulo será adaptado a sus necesidades corporativas. Para un análisis confidencial y detallado por nuestra red de expertos, inicie su proceso de alta como cliente.",
    loadingText: "Analizando marcos normativos y tratados vigentes..."
  },
  { 
    name: 'Auditoría Documental', 
    hook: 'webhook-auditoria', 
    icon: '📄',
    demoText: "Parámetros de auditoría recibidos. En la red verificada, este servicio es capaz de procesar cientos de folios en segundos, detectando cláusulas abusivas, contingencias ocultas y vacíos normativos que el ojo humano podría pasar por alto. Este módulo será adaptado a sus necesidades corporativas. Si desea someter su documentación a nuestro ecosistema legal bajo estricto secreto profesional, contacte a nuestro equipo.",
    loadingText: "Detectando contingencias y vacíos normativos..."
  },
  { 
    name: 'Memoria Institucional', 
    hook: 'webhook-memoria', 
    icon: '🏛️',
    demoText: "Búsqueda en el archivo simulada. Este módulo exclusivo permite a nuestros clientes interactuar con el 'Cerebro Histórico' de sus casos, encontrando precedentes exactos, respuestas estratégicas en tiempo real y estandarizando sus decisiones legales victoriosas en el pasado. Este módulo será adaptado a sus necesidades corporativas. Su historial legal es su mayor activo; contáctenos para digitalizar y blindar su memoria corporativa.",
    loadingText: "Procesando archivos del repositorio corporativo..."
  },
  { 
    name: 'Informes Automáticos', 
    hook: 'webhook-informes', 
    icon: '📊',
    demoText: "Parámetros de generación recibidos. En la versión sin restricciones, nuestro sistema cruza la data solicitada y emite un reporte estructurado de los casos, argumentado y maquetado con los estándares más altos, listos para ser presentados ante Juntas Directivas, ahorrando días de trabajo analítico. Este módulo será adaptado a sus necesidades corporativas. Habilite su usuario para obtener documentos listos para la acción.",
    loadingText: "Estructurando reporte para la generación del dictamen..."
  },
  { 
    name: 'Boletín Jurídico', 
    hook: 'webhook-boletin', 
    icon: '📖',
    demoText: "Tema registrado en nuestro radar. A diferencia de un boletín tradicional, este modelo monitorea gacetas oficiales y despachos legislativos 24/7, filtrando únicamente los cambios normativos que impactan directamente en el sector de cada cliente. Este módulo será adaptado a sus necesidades corporativas. No sufra sorpresas legales; contáctenos para configurar su radar personalizado.",
    loadingText: "Filtrando impactos legislativos en tiempo real..."
  }
];

export default function AsistentePage() {
  const [accessMode, setAccessMode] = useState<'none' | 'client' | 'guest'>('none');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginHovered, setIsLoginHovered] = useState(false);

  const [searchParams] = useSearchParams();
  const urlParam = searchParams.get('modulo') || 'webhook-riesgo';
  const initialModule = MODULES_DB.find(m => m.hook === urlParam) || MODULES_DB[0];

  const [moduloActivo, setModuloActivo] = useState(initialModule.name);
  const [webhookActivo, setWebhookActivo] = useState(initialModule.hook);
  const [inputText, setInputText] = useState('');
  
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false); 

  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'cliente123' && password === 'cliente123') {
      setLoginError(false);
      setAccessMode('client');
    } else {
      setLoginError(true);
    }
  };

  const cambiarModulo = (nombre: string, webhook: string) => {
    setModuloActivo(nombre);
    setWebhookActivo(webhook);
    setMessages([]); 
    setIsMobileMenuOpen(false); 
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputText };
    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');
    
    const textarea = document.getElementById('userInput');
    if (textarea) {
      textarea.style.height = '44px';
    }

    const loadingId = (Date.now() + 1).toString();
    const activeModuleData = MODULES_DB.find(m => m.name === moduloActivo);
    const dynamicLoadingText = activeModuleData?.loadingText || "Analizando datos...";

    setMessages(prev => [...prev, { id: loadingId, sender: 'loading', text: dynamicLoadingText }]);

    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== loadingId)); 
      
      if (accessMode === 'guest') {
        const botResponse = activeModuleData?.demoText || "Esta es una función de demostración.";
        setMessages(prev => [...prev, {
          id: (Date.now() + 2).toString(),
          sender: 'bot',
          text: botResponse
        }]);
      } else {
        setMessages(prev => [...prev, {
          id: (Date.now() + 2).toString(),
          sender: 'bot',
          text: `[SISTEMA VERIFICADO]: Recibí sus datos en el departamento de ${moduloActivo}. Evaluando conexión segura con su panel corporativo...`
        }]);
      }

    }, 1500);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const palettes = {
    dark: {
      appBG: 'bg-[#151f32]',
      sidebarOverlay: 'bg-[#0a1526]/85 backdrop-blur-[2px]', 
      sidebarBtnText: 'text-gray-200',
      sidebarBtnHover: 'hover:bg-[#111827]',
      sidebarBtnActive: 'bg-[#1f2937] border-[#c5a059]',
      mainHeaderBG: 'bg-[#151f32]/90', 
      mainHeaderBorder: 'border-[#1e2a40]', 
      mainTitle: 'text-gray-100',
      greetingP: 'text-gray-300',
      botBubble: 'bg-[#1e2a40] text-gray-200 border-[#c5a059]', 
      userBubble: 'bg-[#2a303c] text-gray-100 border-gray-700',
      footerBG: 'bg-[#1e2a40]', 
      textArea: 'text-gray-100',
      sendBtn: 'bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30 hover:bg-[#c5a059]/20'
    },
    light: {
      appBG: 'bg-[#fdfcf5]', 
      sidebarOverlay: 'bg-[#0a1526]/95', 
      sidebarBtnText: 'text-gray-200',
      sidebarBtnHover: 'hover:bg-[#111827]',
      sidebarBtnActive: 'bg-[#1f2937] border-[#c5a059]',
      mainHeaderBG: 'bg-[#fdfcf5]/80',
      mainHeaderBorder: 'border-[#c5a059]/30', 
      mainTitle: 'text-[#0a1526]', 
      greetingP: 'text-[#2a303c]', 
      botBubble: 'bg-[#eee7d5] text-[#2a303c] border-[#c5a059]', 
      userBubble: 'bg-[#0a1526] text-white border-none', 
      footerBG: 'bg-[#eee7d5]', 
      textArea: 'text-[#2a303c]',
      sendBtn: 'bg-[#0a1526] text-[#c5a059] border border-[#0a1526] hover:bg-[#111827]'
    }
  };

  const currentColors = palettes[theme];

  // PANTALLA DE LOGIN (Ajustada con h-[100dvh] para evitar scrolls raros)
  if (accessMode === 'none') {
    return (
      <div className="relative flex h-[100dvh] w-screen items-center justify-center bg-[#0a1526] font-sans overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img src="/fondo-servicios.jpg.png" alt="Fondo" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0a1526]/85 backdrop-blur-[2px]"></div>
        </div>
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
          <Particles count={40} />
        </div>
        
        <div className="relative z-10 w-full max-w-md p-8 sm:p-10 mx-4 bg-gradient-to-br from-[#151f32]/95 via-[#0a1526]/95 to-[#030712]/95 backdrop-blur-xl border border-[#c5a059]/30 rounded-3xl shadow-[0_0_40px_rgba(197,160,89,0.15)]">
          <div 
            className="flex flex-col items-center mb-8 group cursor-pointer"
            onMouseEnter={() => setIsLoginHovered(true)}
            onMouseLeave={() => setIsLoginHovered(false)}
          >
            <div className="relative w-20 h-24 mb-4 flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <img src={logoShield} alt="LAP Global" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(197,160,89,0.3)]" />
            </div>
            <h2 className={`text-xl font-serif tracking-wide transition-colors duration-300 ${isLoginHovered ? 'gradient-text-gold' : 'text-white'}`}>
              Acceso Seguro
            </h2>
            <p className="text-[#c5a059] text-xs uppercase tracking-widest mt-1">Plataforma de Inteligencia Legal</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="text" 
                placeholder="Usuario" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#1e2330]/80 text-white placeholder-gray-500 border border-gray-700 rounded-xl p-4 focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] outline-none transition-all"
              />
            </div>
            <div className="space-y-1">
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Contraseña" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1e2330]/80 text-white placeholder-gray-500 border border-gray-700 rounded-xl p-4 pr-12 focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] outline-none transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#c5a059] transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="flex justify-end pr-1 pt-1">
                <button 
                  type="button"
                  onClick={() => alert("Por favor, contacte a su administrador de cuenta corporativa para restablecer sus credenciales.")}
                  className="text-xs text-gray-400 hover:text-[#c5a059] transition-colors"
                >
                  ¿Olvidó su contraseña?
                </button>
              </div>
            </div>
            {loginError && (
              <p className="text-red-400 text-sm text-center animate-pulse">Credenciales incorrectas. Intente nuevamente.</p>
            )}
            <button 
              type="submit" 
              className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#c5a059] via-[#e2c792] to-[#c5a059] text-[#0a1526] font-bold uppercase tracking-wider py-4 rounded-xl hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-all active:scale-95 mt-2"
            >
              <Lock size={18} /> Ingresar a la red
            </button>
          </form>
          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm mb-3">¿Desea conocer la plataforma?</p>
            <button 
              onClick={() => setAccessMode('guest')}
              className="text-[#c5a059] hover:text-white text-sm font-medium transition-colors border border-[#c5a059]/30 px-6 py-2 rounded-full hover:bg-[#c5a059]/10"
            >
              Entrar a la versión Demo (Invitado)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // EL CHAT INTERNO (Ajustado con h-[100dvh] y flex-shrink-0)
  // ==========================================
  return (
    <div className={`flex h-[100dvh] w-screen overflow-hidden ${currentColors.appBG} font-sans transition-colors duration-300`}>
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`fixed md:relative top-0 left-0 z-50 h-full flex flex-col border-r border-gray-800 overflow-x-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full md:translate-x-0'} ${isDesktopSidebarCollapsed ? 'md:w-[80px]' : 'md:w-[280px]'}`}>
        
        <button 
          className="absolute top-4 right-4 z-50 md:hidden text-gray-400 hover:text-white"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={24} />
        </button>

        <div className="absolute inset-0 z-0 overflow-hidden">
          <img src="/fondo-servicios.jpg.png" alt="" className="w-full h-full object-cover" />
          <div className={`absolute inset-0 ${currentColors.sidebarOverlay} transition-colors duration-300`}></div>
        </div>
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
          <Particles count={25} />
        </div>

        <div className={`hidden md:flex relative z-20 w-full pt-5 px-5 transition-all duration-300 ${isDesktopSidebarCollapsed ? 'justify-center px-0' : 'justify-end'}`}>
          <button 
            onClick={() => setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)}
            className={`p-2 rounded-lg transition-all text-gray-400 hover:text-[#c5a059] ${currentColors.sidebarBtnHover}`}
            title={isDesktopSidebarCollapsed ? "Expandir panel" : "Minimizar panel"}
          >
            <Menu size={22} />
          </button>
        </div>

        <div 
          className={`pt-2 pb-6 px-6 relative z-10 flex flex-col items-center group cursor-pointer transition-all duration-300`}
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <div className={`relative ${isDesktopSidebarCollapsed ? 'md:w-10 md:h-12 w-20 h-24' : 'w-20 h-24'} mb-3 flex-shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
            <img src={logoShield} alt="LAP Global Logo" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(197,160,89,0.4)]" />
          </div>
          <h2 className={`text-center text-[11px] uppercase tracking-widest font-bold transition-all duration-300 ${isLogoHovered ? 'gradient-text-gold' : 'text-white'} ${isDesktopSidebarCollapsed ? 'md:hidden' : ''}`}>
            Unidad de Asuntos Transnacionales & IA
          </h2>
        </div>

        <nav className={`flex-1 overflow-y-auto px-3 space-y-1 relative z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${currentColors.sidebarBtnText}`}>
          <p className={`text-[10px] text-gray-500 font-bold px-3 mb-2 uppercase ${isDesktopSidebarCollapsed ? 'md:hidden' : ''}`}>Centro de Inteligencia</p>
          {MODULES_DB.slice(0, 3).map((mod) => (
            <button 
              key={mod.hook}
              onClick={() => cambiarModulo(mod.name, mod.hook)} 
              title={isDesktopSidebarCollapsed ? mod.name : undefined}
              className={`w-full flex items-center p-3 rounded-lg text-sm transition-all ${currentColors.sidebarBtnHover} border-l-4 ${moduloActivo === mod.name ? currentColors.sidebarBtnActive : 'border-transparent hover:border-[#c5a059]'}`}
            >
              <div className="flex items-center justify-center w-5 h-5 text-lg flex-shrink-0">{mod.icon}</div>
              <span className={`ml-3 whitespace-nowrap ${isDesktopSidebarCollapsed ? 'md:hidden' : ''}`}>{mod.name}</span>
            </button>
          ))}

          <div className="my-6 border-t border-gray-800"></div>

          <p className={`text-[10px] text-gray-500 font-bold px-3 mb-2 uppercase ${isDesktopSidebarCollapsed ? 'md:hidden' : ''}`}>Alianza Estratégica</p>
          {MODULES_DB.slice(3, 6).map((mod) => (
            <button 
              key={mod.hook}
              onClick={() => cambiarModulo(mod.name, mod.hook)} 
              title={isDesktopSidebarCollapsed ? mod.name : undefined}
              className={`w-full flex items-center p-3 rounded-lg text-sm transition-all ${currentColors.sidebarBtnHover} border-l-4 ${moduloActivo === mod.name ? currentColors.sidebarBtnActive : 'border-transparent hover:border-[#c5a059]'}`}
            >
              <div className="flex items-center justify-center w-5 h-5 text-lg flex-shrink-0">{mod.icon}</div>
              <span className={`ml-3 whitespace-nowrap ${isDesktopSidebarCollapsed ? 'md:hidden' : ''}`}>{mod.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CHAT AREA */}
      <main className="flex-1 flex flex-col relative w-full min-w-0 transition-all duration-300">
        
        {/* HEADER: flex-shrink-0 evita que se comprima, z-10 lo mantiene arriba */}
        <header className={`flex-shrink-0 min-h-[4rem] py-3 border-b ${currentColors.mainHeaderBorder} flex items-center justify-between px-4 md:px-6 ${currentColors.mainHeaderBG} backdrop-blur-md z-10 transition-colors duration-300`}>
          
          <div className="flex items-center gap-3 md:gap-4 w-full">
            <button 
              className={`md:hidden p-2 -ml-2 rounded-full transition-all flex-shrink-0 ${theme === 'dark' ? 'text-gray-300 hover:bg-[#1e2a40]' : 'text-gray-600 hover:bg-gray-200'}`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={22} />
            </button>

            <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-3 flex-1">
              <h2 className={`font-medium ${currentColors.mainTitle} tracking-wide text-base md:text-lg leading-tight`}>
                {moduloActivo}
              </h2>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-medium border ${accessMode === 'client' ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-blue-500/30 text-blue-400 bg-blue-500/10'}`}>
                {accessMode === 'client' ? 'Verificado' : 'Modo Demo'}
              </span>
            </div>
          </div>

          <div className="flex gap-3 md:gap-4 items-center flex-shrink-0">
            <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full ${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-[#1e2a40]' : 'text-[#2a303c] hover:bg-[#eee7d5]'} transition-all`}
                title={theme === 'dark' ? 'Cambiar a Modo Día' : 'Cambiar a Modo Noche'}
            >
                {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <div className="flex gap-2 items-center">
                <span className="hidden sm:inline text-xs text-gray-500">Esperando...</span>
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
            </div>
          </div>
        </header>

        {/* ÁREA DE MENSAJES: La única parte que hace scroll (overflow-y-auto) */}
        <section className={`flex-1 overflow-y-auto px-4 md:px-12 py-4 md:py-12 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${currentColors.textArea}`}>
          {messages.length === 0 && (
            <div className="max-w-3xl mx-auto flex gap-4 items-start mb-4">
              <img src={logoShield} className="w-8 h-10 md:w-10 md:h-12 object-contain" alt="Logo" />
              <div className="space-y-4 mt-1">
                <p className={`text-lg md:text-xl font-light ${currentColors.mainTitle}`}>Conectado a la red de <strong>{moduloActivo}</strong>.</p>
                <p className={`${currentColors.greetingP} leading-relaxed text-sm md:text-base`}>¿En qué asunto legal específico puedo ayudarle?</p>
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={`max-w-3xl mx-auto flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start mt-2'}`}>
              {msg.sender === 'user' && (
                <div className={`${currentColors.userBubble} p-3 md:p-4 px-4 md:px-5 rounded-3xl rounded-tr-none max-w-[90%] shadow-md`}>
                  <p className="text-sm md:text-base whitespace-pre-wrap break-words">{msg.text}</p>
                </div>
              )}
              {msg.sender === 'loading' && <div className="text-[#c5a059] text-xs md:text-sm font-medium animate-pulse ml-2">{msg.text}</div>}
              {msg.sender === 'bot' && (
                <div className={`${currentColors.botBubble} p-3 md:p-4 px-4 md:px-5 rounded-3xl rounded-tl-none max-w-[90%] border-l-4 shadow-md`}>
                  <p className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </section>

        {/* FOOTER INPUT: flex-shrink-0 lo bloquea abajo */}
        <footer className="flex-shrink-0 p-4 md:pb-8">
          <div className="max-w-3xl mx-auto relative group">
            <div className={`${currentColors.footerBG} rounded-3xl border border-gray-700 p-2 pl-4 flex items-end gap-2 focus-within:border-[#c5a059] transition-all shadow-2xl transition-colors duration-300`}>
              <textarea 
                id="userInput"
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  e.target.style.height = "5px";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                onKeyDown={(e) => { 
                  if (e.key === 'Enter' && !e.shiftKey) { 
                    e.preventDefault(); 
                    handleSend(); 
                  } 
                }}
                placeholder="Escriba aquí..." 
                rows={1}
                className={`w-full bg-transparent outline-none text-sm md:text-base resize-none max-h-[150px] md:max-h-[220px] [&::-webkit-scrollbar]:hidden ${currentColors.textArea}`}
                style={{ minHeight: '44px' }}
              />
              <button 
                onClick={handleSend}
                className={`${currentColors.sendBtn} p-3 rounded-2xl mb-1 transition-all active:scale-95 flex-shrink-0`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-5 md:w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
