import { useState, useRef, useEffect } from 'react';
import logoShield from '@/assets/logo-shield.png'; 
import { useSearchParams } from 'react-router-dom';
import { Particles } from '@/components/Particles'; 

import { Sun, Moon, Send, Menu, X } from 'lucide-react'; 

type Message = {
  id: string;
  sender: 'user' | 'bot' | 'loading';
  text: string;
};

const MODULES_DB = [
  { name: 'Monitor de Riesgo (Arg-Ven)', hook: 'webhook-riesgo', icon: '🌐' },
  { name: 'Análisis Penal (Arg-Ven)', hook: 'webhook-penal', icon: '⚖️' },
  { name: 'Auditoría Documental', hook: 'webhook-auditoria', icon: '📄' },
  { name: 'Memoria Institucional', hook: 'webhook-memoria', icon: '🏛️' },
  { name: 'Informes Automáticos', hook: 'webhook-informes', icon: '📊' },
  { name: 'Boletín Jurídico', hook: 'webhook-boletin', icon: '📖' }
];

export default function AsistentePage() {
  const [searchParams] = useSearchParams();
  const urlParam = searchParams.get('modulo') || 'webhook-riesgo';
  const initialModule = MODULES_DB.find(m => m.hook === urlParam) || MODULES_DB[0];

  const [moduloActivo, setModuloActivo] = useState(initialModule.name);
  const [webhookActivo, setWebhookActivo] = useState(initialModule.hook);
  const [inputText, setInputText] = useState('');
  
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false); 

  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    setMessages(prev => [...prev, { id: loadingId, sender: 'loading', text: 'Analizando la jurisdicción...' }]);

    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== loadingId)); 
      setMessages(prev => [...prev, {
        id: (Date.now() + 2).toString(),
        sender: 'bot',
        text: `Recibí sus datos en el departamento de ${moduloActivo}. La interfaz ahora es completamente limpia y enfocada en el texto.`
      }]);
    }, 1500);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const palettes = {
    // MODO NOCHE: Restaurado 100% a la versión que te gustó
    dark: {
      appBG: 'bg-[#060b1a]',
      sidebarOverlay: 'bg-[#0a1526]/85 backdrop-blur-[2px]', 
      sidebarBtnText: 'text-gray-200',
      sidebarBtnHover: 'hover:bg-[#111827]',
      sidebarBtnActive: 'bg-[#1f2937] border-[#c5a059]',
      mainHeaderBG: 'bg-[#060b1a]/80', 
      mainHeaderBorder: 'border-gray-800',
      mainTitle: 'text-gray-100',
      greetingP: 'text-gray-300',
      botBubble: 'bg-gray-800 text-gray-200 border-[#c5a059]',
      userBubble: 'bg-[#2a303c] text-gray-100 border-gray-700',
      footerBG: 'bg-[#1e2330]', 
      textArea: 'text-gray-100',
      sendBtn: 'bg-[#c5a059] text-black border-none hover:bg-yellow-600' // Botón amarillo original
    },
    // MODO DÍA: Ajustado a tu petición con las flechas
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
      // Burbuja de usuario = Color exacto del panel izquierdo (#0a1526)
      userBubble: 'bg-[#0a1526] text-white border-none', 
      footerBG: 'bg-[#eee7d5]', 
      textArea: 'text-[#2a303c]',
      // Botón de enviar = Color exacto del panel izquierdo (#0a1526) con icono dorado
      sendBtn: 'bg-[#0a1526] text-[#c5a059] hover:bg-[#030712] border-none'
    }
  };

  const currentColors = palettes[theme];

  return (
    <div className={`flex h-screen w-screen overflow-hidden ${currentColors.appBG} font-sans transition-colors duration-300`}>
      
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ========================================== */}
      {/* SIDEBAR (Intacto) */}
      {/* ========================================== */}
      <aside className={`fixed md:relative top-0 left-0 z-50 h-full w-64 flex flex-col border-r border-gray-800 overflow-hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
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

        <div 
          className="p-6 relative z-10 flex flex-col items-center group cursor-pointer mt-4 md:mt-0"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <div className="relative w-20 h-24 mb-3 flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <img src={logoShield} alt="LAP Global Logo" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(197,160,89,0.4)]" />
          </div>
          <h2 className={`text-center text-[11px] uppercase tracking-widest font-bold transition-all duration-300 ${
              isLogoHovered ? 'gradient-text-gold' : 'text-white'
            }`}
          >
            Unidad de Asuntos Transnacionales & IA
          </h2>
        </div>

        <nav className={`flex-1 overflow-y-auto px-3 space-y-1 relative z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${currentColors.sidebarBtnText}`}>
          <p className="text-[10px] text-gray-500 font-bold px-3 mb-2 uppercase">Centro de Inteligencia</p>
          
          {MODULES_DB.slice(0, 3).map((mod) => (
            <button 
              key={mod.hook}
              onClick={() => cambiarModulo(mod.name, mod.hook)} 
              className={`w-full flex items-center p-3 rounded-lg text-sm transition-all ${currentColors.sidebarBtnHover} border-l-4 ${moduloActivo === mod.name ? currentColors.sidebarBtnActive : 'border-transparent hover:border-[#c5a059]'}`}
            >
              <span>{mod.icon} {mod.name.replace(' (Arg-Ven)', '')}</span>
            </button>
          ))}

          <div className="my-6 border-t border-gray-800"></div>

          <p className="text-[10px] text-gray-500 font-bold px-3 mb-2 uppercase">Alianza Estratégica</p>
          {MODULES_DB.slice(3, 6).map((mod) => (
            <button 
              key={mod.hook}
              onClick={() => cambiarModulo(mod.name, mod.hook)} 
              className={`w-full flex items-center p-3 rounded-lg text-sm transition-all ${currentColors.sidebarBtnHover} border-l-4 ${moduloActivo === mod.name ? currentColors.sidebarBtnActive : 'border-transparent hover:border-[#c5a059]'}`}
            >
              <span>{mod.icon} {mod.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* ========================================== */}
      {/* ÁREA PRINCIPAL DE CHAT */}
      {/* ========================================== */}
      <main className="flex-1 flex flex-col relative w-full">
        <header className={`h-16 border-b ${currentColors.mainHeaderBorder} flex items-center justify-between px-4 md:px-6 ${currentColors.mainHeaderBG} backdrop-blur-md sticky top-0 z-10 transition-colors duration-300`}>
          
          <div className="flex items-center gap-3">
            <button 
              className={`md:hidden p-2 -ml-2 rounded-full transition-all ${theme === 'dark' ? 'text-gray-300 hover:bg-[#16243d]' : 'text-gray-600 hover:bg-gray-200'}`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={22} />
            </button>

            <h2 className={`font-medium ${currentColors.mainTitle} tracking-wide text-base md:text-lg truncate max-w-[180px] md:max-w-none`}>
              {moduloActivo}
            </h2>
          </div>

          <div className="flex gap-2 md:gap-4 items-center">
            <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full ${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-[#1e2330]' : 'text-[#2a303c] hover:bg-[#eee7d5]'} transition-all`}
                title={theme === 'dark' ? 'Cambiar a Modo Día' : 'Cambiar a Modo Noche'}
            >
                {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <div className="flex gap-2 items-center">
                <span className="hidden sm:inline text-xs text-gray-500">Esperando consulta...</span>
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
            </div>
          </div>
        </header>

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
              
              {msg.sender === 'loading' && <div className="text-[#c5a059] text-xs md:text-sm font-medium animate-pulse ml-2">Analizando la jurisdicción...</div>}
              
              {msg.sender === 'bot' && (
                <div className={`${currentColors.botBubble} p-3 md:p-4 px-4 md:px-5 rounded-3xl rounded-tl-none max-w-[90%] border-l-4 shadow-md`}>
                  <p className="text-sm md:text-base whitespace-pre-wrap">{msg.text}</p>
                </div>
              )}

            </div>
          ))}
          <div ref={messagesEndRef} />
        </section>

        <footer className="p-4 md:pb-8">
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
                placeholder="Escriba aquí los detalles del caso..." 
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
