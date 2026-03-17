import { useState, useEffect, useRef } from 'react';
import { MessageSquare, ArrowUp, X, Send, Mic, Square, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoShield from '@/assets/logo.png.png'; 
import { Particles } from '@/components/Particles';

type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
};

export const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Estados para el Agente de IA
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  // Estados para el micrófono
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'welcome', 
      sender: 'bot', 
      text: '¡Hola! Soy el Agente de IA de la Unidad de Asuntos Transnacionales. ¿Te gustaría conocer nuestros servicios o agendar una consulta con un experto?' 
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Paleta de colores (Idéntica a la del Asistente principal)
  const palettes = {
    dark: {
      windowBg: 'bg-[#0a1526]',
      msgAreaBg: 'bg-gradient-to-b from-[#0a1526] to-[#151f32]',
      userBubble: 'bg-gradient-to-br from-[#c5a059]/20 to-transparent border border-[#c5a059]/40 text-white',
      botBubble: 'bg-[#1e2a40] border border-gray-700 text-gray-200',
      inputAreaBg: 'bg-[#0a1526] border-gray-800',
      inputWrap: 'bg-[#151f32] border-gray-700 focus-within:border-[#c5a059]/50',
      inputText: 'text-white placeholder-gray-500',
    },
    light: {
      windowBg: 'bg-[#fdfcf5]',
      msgAreaBg: 'bg-[#fdfcf5]',
      userBubble: 'bg-[#151f32] text-white border-none',
      botBubble: 'bg-[#eee7d5] border border-[#c5a059]/50 text-[#2a303c]',
      inputAreaBg: 'bg-[#fdfcf5] border-[#c5a059]/30',
      inputWrap: 'bg-white border-[#c5a059]/30 focus-within:border-[#c5a059]',
      inputText: 'text-[#2a303c] placeholder-gray-400',
    }
  };

  const currentColors = palettes[theme];
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // Lógica de Scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lógica de auto-scroll en el chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lógica del Micrófono
  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("El reconocimiento de voz no es compatible con este navegador.");
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

    recognition.onerror = (e: any) => {
      console.error("Error micrófono:", e);
      setIsRecording(false);
    };
    
    recognition.onend = () => setIsRecording(false);
    
    try {
      recognition.start();
    } catch (err) {
      console.error("Error iniciando reconocimiento:", err);
    }
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
      // WEBHOOK DE N8N PARA EL AGENTE DE VENTAS
      const response = await fetch('https://unidaddeia.duckdns.org/webhook/agente-comercial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: 'visitante-web', 
          mensaje: userMsg.text
        })
      });

      if (!response.ok) throw new Error('Error en el servidor');
      
      const data = await response.json();
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        sender: 'bot', 
        text: data.respuesta || data.text || 'Entendido. ¿Deseas agendar una cita para detallar este asunto?' 
      };
      
      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      console.error("Error conectando al agente:", error);
      const errorMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        sender: 'bot', 
        text: 'Mis sistemas de comunicación están saturados en este momento. Por favor, intenta de nuevo en unos segundos.' 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 1. VENTANA DE CHAT FLOTANTE */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-28 right-4 md:right-8 z-50 w-[90vw] sm:w-[380px] h-[500px] max-h-[75vh] ${currentColors.windowBg} border border-[#c5a059]/40 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden transition-colors duration-300`}
          >
            {/* === HEADER DEL CHAT CON ESTILO ASISTENTE (Fondo + Partículas) === */}
            <div className="relative p-4 border-b border-[#c5a059]/20 flex justify-between items-center shrink-0 overflow-hidden min-h-[72px]">
              {/* Fondo de imagen y overlay oscuro */}
              <div className="absolute inset-0 z-0">
                <img src="/fondo-servicios.jpg.png" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#0a1526]/85 backdrop-blur-[2px]"></div>
              </div>
              {/* Partículas */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
                <Particles count={15} />
              </div>

              {/* Contenido del Header */}
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-[#1e2a40] border border-[#c5a059]/30 flex items-center justify-center p-1 shadow-lg">
                  <img src={logoShield} alt="Agente" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-white font-serif font-bold leading-tight">Asistente Comercial</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-green-500 text-[11px] uppercase tracking-wider font-bold">En línea</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1 relative z-10">
                <button 
                  onClick={toggleTheme}
                  className="text-gray-300 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
                  title={theme === 'dark' ? 'Cambiar a Modo Día' : 'Cambiar a Modo Noche'}
                >
                  {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                </button>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="text-gray-300 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Área de Mensajes */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${currentColors.msgAreaBg} [&::-webkit-scrollbar]:hidden transition-colors duration-300`}>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-[14px] md:text-[15px] leading-relaxed shadow-md transition-colors duration-300 ${
                    msg.sender === 'user' ? currentColors.userBubble : currentColors.botBubble
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className={`${currentColors.botBubble} p-4 rounded-2xl rounded-tl-sm flex gap-1.5 shadow-md`}>
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
                  placeholder={isRecording ? "Escuchando..." : "Consulte a la IA..."}
                  className={`flex-1 bg-transparent text-sm px-4 py-2 outline-none ${currentColors.inputText} ${isRecording ? 'animate-pulse' : ''}`}
                />
                
                {isRecording ? (
                  <button 
                    onClick={stopRecording}
                    className="p-2 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-95"
                    title="Detener grabación"
                  >
                    <Square size={16} className="fill-current" />
                  </button>
                ) : inputText.trim() ? (
                  <button 
                    onClick={handleSendMessage}
                    disabled={isLoading}
                    className="p-2 rounded-full bg-gradient-to-tr from-[#c5a059] to-[#e2c792] text-[#0a1526] hover:shadow-[0_0_15px_rgba(197,160,89,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Enviar mensaje"
                  >
                    <Send size={16} className="ml-0.5" />
                  </button>
                ) : (
                  <button 
                    onClick={startRecording}
                    disabled={isLoading}
                    className="p-2 rounded-full bg-gradient-to-tr from-[#c5a059] to-[#e2c792] text-[#0a1526] hover:shadow-[0_0_15px_rgba(197,160,89,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Hablar con el agente"
                  >
                    <Mic size={16} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. BOTÓN DEL AGENTE DE IA */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        aria-label="Abrir asistente virtual"
        className={`fixed bottom-8 right-4 md:right-8 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(197,160,89,0.3)] z-50 transition-all duration-300 hover:scale-110 ${
          isChatOpen 
            ? 'bg-[#151f32] text-white border border-gray-700' 
            : 'bg-gradient-to-br from-[#c5a059] to-[#e2c792] text-[#0a1526]'
        }`}
        style={{
          animation: !isChatOpen ? 'whatsapp-pulse 2s ease-in-out infinite' : 'none',
        }}
      >
        {isChatOpen ? <X size={26} /> : <MessageSquare size={26} className="fill-current" />}
      </button>

      {/* 3. BOTÓN SCROLL TO TOP */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            aria-label="Volver arriba"
            className="fixed bottom-8 left-4 md:left-8 w-12 h-12 bg-gradient-to-br from-gold to-gold-bright rounded-full flex items-center justify-center text-navy-dark shadow-lg z-50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/40"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
