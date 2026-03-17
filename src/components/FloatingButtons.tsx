import { useState, useEffect, useRef } from 'react';
import { ArrowUp, X, Send, Mic, Square, Sun, Moon, Trash2, BotMessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoShield from '@/assets/logo.png.png'; 
import { Particles } from '@/components/Particles';

type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
};

// ==========================================
// SUBCOMPONENTE: MENSAJE DEL USUARIO (LIMPIO)
// ==========================================
const UserMessageBubble = ({ msg, currentColors }: { msg: Message, currentColors: any }) => {
  return (
    <div className="flex flex-col items-end max-w-[90%] md:max-w-[85%]">
      <div className={`${currentColors.userBubble} p-3 md:p-4 px-4 md:px-5 rounded-3xl rounded-tr-none shadow-md`}>
        <p className="text-[14px] md:text-[15px] leading-relaxed whitespace-pre-wrap break-words">
          {msg.text}
        </p>
      </div>
    </div>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL FLOTANTE
// ==========================================
export const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Estados para el Agente
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // MODIFICADO: Inicia en 'light' por defecto
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  
  // Estados de micrófono
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  const initialMessage: Message = { 
    id: 'welcome', 
    sender: 'bot', 
    text: '¡Hola! Soy el Asesor Virtual de la Unidad de Asuntos Transnacionales. ¿Te gustaría conocer nuestros servicios o agendar una consulta con un experto?' 
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Paleta de colores
  const palettes = {
    dark: {
      windowBg: 'bg-[#151f32]',
      msgAreaBg: 'bg-transparent',
      userBubble: 'bg-[#2a303c] text-gray-100 border border-gray-700',
      botBubble: 'bg-[#1e2a40] border-l-4 border-[#c5a059] text-gray-200',
      inputAreaBg: 'bg-[#0a1526] border-gray-800',
      inputWrap: 'bg-[#151f32] border-gray-700 focus-within:border-[#c5a059]/50',
      inputText: 'text-white placeholder-gray-500',
    },
    light: {
      windowBg: 'bg-[#fdfcf5]',
      msgAreaBg: 'bg-transparent',
      userBubble: 'bg-[#151f32] text-white border-none',
      botBubble: 'bg-[#eee7d5] border-l-4 border-[#c5a059] text-[#2a303c]',
      inputAreaBg: 'bg-[#fdfcf5] border-[#c5a059]/30',
      inputWrap: 'bg-white border-[#c5a059]/30 focus-within:border-[#c5a059]',
      inputText: 'text-[#2a303c] placeholder-gray-400',
    }
  };

  const currentColors = palettes[theme];
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // Lógica de Scroll
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleClearChat = () => {
    if (window.confirm("¿Deseas reiniciar la conversación?")) {
      setMessages([initialMessage]);
    }
  };

  // Lógica del Micrófono
  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast("Reconocimiento de voz no compatible con este navegador.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-VE'; 
    recognition.continuous = false; 
    recognition.interimResults = false;
    recognitionRef.current = recognition;
    recognition.onstart = () => setIsRecording(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(prev => prev ? prev + ' ' + transcript : transcript);
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
    try { recognition.start(); } catch (err) {}
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputText };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // AQUÍ ESTÁ EL WEBHOOK QUE DEBES USAR EN N8N:
      const response = await fetch('https://unidaddeia.duckdns.org/webhook/agente-comercial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: 'visitante-web', mensaje: userMsg.text })
      });

      if (!response.ok) throw new Error('Error en el servidor');
      const data = await response.json();
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), sender: 'bot', 
        text: data.respuesta || data.text || 'Entendido. ¿Deseas agendar una cita para detallar este asunto?' 
      };
      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'bot', text: 'Mis sistemas de comunicación están saturados en este momento. Por favor, intenta de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes agent-pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); background-color: rgba(255, 255, 255, 0.9); }
          50% { transform: scale(1.3); box-shadow: 0 0 0 15px rgba(197, 160, 89, 0); background-color: rgba(197, 160, 89, 0.5); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(197, 160, 89, 0); background-color: rgba(255, 255, 255, 0); }
        }
      `}</style>

      {/* TOAST FLOTANTE */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[100] bg-[#0a1526] text-[#c5a059] border border-[#c5a059]/30 px-6 py-3 rounded-full shadow-[0_0_20px_rgba(197,160,89,0.2)] flex items-center gap-3 text-[14px] font-medium whitespace-nowrap max-w-[90vw]"
          >
            <Check size={16} /> <span className="truncate">{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. VENTANA DE CHAT FLOTANTE */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} transition={{ duration: 0.3 }}
            className={`fixed bottom-24 right-4 md:right-8 z-50 w-[90vw] sm:w-[380px] h-[550px] max-h-[75vh] ${currentColors.windowBg} border border-[#c5a059]/40 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden transition-colors duration-300`}
          >
            {/* Header del Chat Estilo Asistente */}
            <div className="relative p-4 border-b border-[#c5a059]/20 flex justify-between items-center shrink-0 overflow-hidden min-h-[75px]">
              <div className="absolute inset-0 z-0">
                <img src="/fondo-servicios.jpg.png" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#0a1526]/85 backdrop-blur-[2px]"></div>
              </div>
              <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
                <Particles count={15} />
              </div>

              {/* BLOQUE HOVER: Escudo y Texto en Mayúsculas */}
              <div 
                className="flex items-center gap-3 relative z-10 cursor-pointer group"
                onMouseEnter={() => setIsHeaderHovered(true)}
                onMouseLeave={() => setIsHeaderHovered(false)}
              >
                <div className="relative w-10 h-11 flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <img src={logoShield} alt="Agente" className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
                </div>
                <div>
                  <h3 className={`font-serif font-bold leading-tight text-[15px] transition-colors duration-300 ${isHeaderHovered ? 'gradient-text-gold text-[#c5a059]' : 'text-white'}`}>
                    ASESOR VIRTUAL
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-green-500 text-[10px] uppercase tracking-wider font-bold">En línea</span>
                  </div>
                </div>
              </div>
              
              {/* Botones del Header */}
              <div className="flex items-center gap-1 relative z-10">
                <button onClick={handleClearChat} className="text-gray-300 hover:text-red-400 transition-colors p-1.5 rounded-full hover:bg-white/10" title="Limpiar historial">
                  <Trash2 size={18} />
                </button>
                <button onClick={toggleTheme} className="text-gray-300 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10" title="Modo Día/Noche">
                  {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                </button>
                <button onClick={() => setIsChatOpen(false)} className="text-gray-300 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10">
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Área de Mensajes */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${currentColors.msgAreaBg} [&::-webkit-scrollbar]:hidden transition-colors duration-300`}>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'user' ? (
                    <UserMessageBubble msg={msg} currentColors={currentColors} />
                  ) : (
                    <div className="flex flex-col gap-1 max-w-[90%]">
                      <div className={`${currentColors.botBubble} p-3 md:p-4 px-4 md:px-5 rounded-3xl rounded-tl-none shadow-md overflow-hidden`}>
                        <div 
                          className={`leading-relaxed text-[13px] md:text-[14px] font-sans max-w-none [&_strong]:font-bold [&_p]:mb-2 [&_ul]:list-disc [&_ul]:ml-4`}
                          dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} 
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className={`${currentColors.botBubble} p-4 rounded-3xl rounded-tl-none shadow-md flex gap-1.5`}>
                    <span className="w-2 h-2 bg-[#c5a059] rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-[#c5a059] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-[#c5a059] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input para escribir o hablar */}
            <div className={`p-3 border-t ${currentColors.inputAreaBg} shrink-0 transition-colors duration-300`}>
              <div className={`flex items-center gap-2 border rounded-full p-1 pr-1.5 transition-colors duration-300 ${currentColors.inputWrap}`}>
                <input 
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={isRecording ? "Escuchando..." : "Escribe tu consulta aquí..."}
                  className={`flex-1 bg-transparent text-[14px] px-4 py-2 outline-none ${currentColors.inputText} ${isRecording ? 'animate-pulse text-red-400' : ''}`}
                />
                
                {isRecording ? (
                  <button onClick={stopRecording} className="p-2.5 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                    <Square size={16} className="fill-current" />
                  </button>
                ) : inputText.trim() ? (
                  <button onClick={handleSendMessage} disabled={isLoading} className="p-2.5 rounded-full bg-gradient-to-tr from-[#c5a059] to-[#e2c792] text-[#0a1526] hover:shadow-[0_0_15px_rgba(197,160,89,0.4)] transition-all">
                    <Send size={16} className="ml-0.5" />
                  </button>
                ) : (
                  <button onClick={startRecording} disabled={isLoading} className="p-2.5 rounded-full bg-gradient-to-tr from-[#c5a059] to-[#e2c792] text-[#0a1526] hover:shadow-[0_0_15px_rgba(197,160,89,0.4)] transition-all">
                    <Mic size={16} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. BOTÓN DEL AGENTE DE IA (NUEVO ICONO: BotMessageSquare) */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        aria-label="Abrir asesor virtual"
        className="fixed bottom-8 right-4 md:right-8 w-[60px] h-[60px] z-50 flex items-center justify-center outline-none group"
      >
        {!isChatOpen && (
          <div className="absolute inset-0 rounded-full z-0" style={{ animation: 'agent-pulse 2.5s infinite' }} />
        )}
        
        <div className={`relative z-10 w-full h-full rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_4px_20px_rgba(197,160,89,0.5)] ${
          isChatOpen ? 'bg-[#151f32] border border-gray-700' : 'bg-gradient-to-br from-[#0a1526] to-[#151f32] border-2 border-[#c5a059]'
        }`}>
          {isChatOpen ? (
            <X size={28} className="text-white" />
          ) : (
            // Usamos BotMessageSquare (Burbuja de chat con carita de IA)
            <BotMessageSquare size={30} className="text-[#c5a059] drop-shadow-[0_0_8px_rgba(197,160,89,0.6)] transition-transform group-hover:scale-110" />
          )}
        </div>
      </button>

      {/* 3. BOTÓN SCROLL TO TOP */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={scrollToTop}
            className="fixed bottom-8 left-4 md:left-8 w-12 h-12 bg-gradient-to-br from-gold to-gold-bright rounded-full flex items-center justify-center text-navy-dark shadow-lg z-50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/40"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
