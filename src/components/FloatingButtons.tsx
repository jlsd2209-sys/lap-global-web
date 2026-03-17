import { useState, useEffect, useRef } from 'react';
import { MessageSquare, ArrowUp, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// Ajusta esta ruta según dónde esté tu logo
import logoShield from '@/assets/logo.png.png'; 

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
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'welcome', 
      sender: 'bot', 
      text: '¡Hola! Soy el Agente de IA de la Unidad de Asuntos Transnacionales. ¿Te gustaría conocer nuestros servicios o agendar una consulta con un experto?' 
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Lógica para mostrar/ocultar el botón de "Volver arriba"
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
          sessionId: 'visitante-web', // Puedes generar un ID único con localStorage si quieres mantener la sesión
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
            className="fixed bottom-28 right-4 md:right-8 z-50 w-[90vw] sm:w-[380px] h-[500px] max-h-[75vh] bg-[#0a1526] border border-[#c5a059]/40 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden"
          >
            {/* Header del Chat */}
            <div className="bg-gradient-to-r from-[#151f32] to-[#0a1526] p-4 border-b border-[#c5a059]/20 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1e2a40] border border-[#c5a059]/30 flex items-center justify-center p-1">
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
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Área de Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#0a1526] to-[#151f32] [&::-webkit-scrollbar]:hidden">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-[14px] leading-relaxed shadow-md ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-br from-[#c5a059]/20 to-transparent border border-[#c5a059]/40 text-white rounded-tr-sm' 
                      : 'bg-[#1e2a40] border border-gray-700 text-gray-200 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {/* Animación de "escribiendo" */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#1e2a40] border border-gray-700 p-4 rounded-2xl rounded-tl-sm flex gap-1.5 shadow-md">
                    <span className="w-2 h-2 bg-[#c5a059] rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-[#c5a059] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-[#c5a059] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input para escribir */}
            <div className="p-3 border-t border-gray-800 bg-[#0a1526] shrink-0">
              <div className="flex items-center gap-2 bg-[#151f32] border border-gray-700 rounded-full p-1 pr-1.5 focus-within:border-[#c5a059]/50 transition-colors">
                <input 
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Consulte a la IA..."
                  className="flex-1 bg-transparent text-white text-sm px-4 py-2 outline-none placeholder-gray-500"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="p-2 rounded-full bg-gradient-to-tr from-[#c5a059] to-[#e2c792] text-[#0a1526] hover:shadow-[0_0_15px_rgba(197,160,89,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} className="ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. BOTÓN DEL AGENTE DE IA (Reemplaza a WhatsApp) */}
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

      {/* 3. BOTÓN SCROLL TO TOP (Intacto) */}
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
