import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import logoShield from '@/assets/logo-shield.png'; // Asegúrate de que esta ruta sea la misma que usas en el Header

// Definimos la estructura de los mensajes
type Message = {
  id: string;
  sender: 'system' | 'user' | 'bot' | 'loading';
  text: string;
};

export default function AsistentePage() {
  const [moduloActivo, setModuloActivo] = useState('Monitor de Riesgo (Arg-Ven)');
  const [webhookActivo, setWebhookActivo] = useState('webhook-riesgo');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      sender: 'system',
      text: 'Módulo Monitor de Riesgo (Arg-Ven) activo. ¿Cuál es su consulta transnacional?'
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll hacia el último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const cambiarModulo = (nombre: string, webhook: string) => {
    setModuloActivo(nombre);
    setWebhookActivo(webhook);
    setMessages([{
      id: Date.now().toString(),
      sender: 'system',
      text: `Conectado a la red de ${nombre}. ¿En qué asunto legal específico puedo ayudarle?`
    }]);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    // 1. Agregar mensaje del usuario
    const newUserMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputText };
    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');

    // 2. Agregar estado de carga
    const loadingId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: loadingId, sender: 'loading', text: 'Analizando la jurisdicción...' }]);

    // 3. Simular respuesta de la IA (Aquí luego conectaremos tu N8N real)
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== loadingId)); // Quitamos el 'loading'
      setMessages(prev => [...prev, {
        id: (Date.now() + 2).toString(),
        sender: 'bot',
        text: `Recibí sus datos en el departamento de ${moduloActivo}. La interfaz ahora es completamente limpia y enfocada en el texto.`
      }]);
    }, 1500);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#060b1a] text-gray-200 font-sans">
      
      {/* SIDEBAR (Escritorio) */}
      <aside className="w-64 bg-[#030712] flex-col border-r border-gray-800 hidden md:flex">
        <div className="p-6">
          <img src={logoShield} alt="LAP Global Logo" className="w-20 h-20 mx-auto mb-3 object-contain drop-shadow-[0_0_15px_rgba(197,160,89,0.4)]" />
          <h2 className="text-center text-[11px] uppercase tracking-widest text-[#c5a059] font-bold">Unidad de Asuntos Transnacionales & IA</h2>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 space-y-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <p className="text-[10px] text-gray-500 font-bold px-3 mb-2 uppercase">Centro de Inteligencia</p>
          
          {[
            { name: 'Monitor de Riesgo (Arg-Ven)', hook: 'webhook-riesgo', icon: '🌐' },
            { name: 'Análisis Penal', hook: 'webhook-penal', icon: '⚖️' },
            { name: 'Auditoría Documental', hook: 'webhook-auditoria', icon: '📄' }
          ].map((mod) => (
            <button 
              key={mod.hook}
              onClick={() => cambiarModulo(mod.name, mod.hook)} 
              className={`w-full flex items-center p-3 rounded-lg text-sm transition-all hover:bg-gray-900 border-l-4 ${moduloActivo === mod.name ? 'bg-gray-800 border-[#c5a059]' : 'border-transparent hover:border-[#c5a059]'}`}
            >
              <span>{mod.icon} {mod.name.replace(' (Arg-Ven)', '')}</span>
            </button>
          ))}

          <div className="my-6 border-t border-gray-800"></div>

          <p className="text-[10px] text-gray-500 font-bold px-3 mb-2 uppercase">Alianza Estratégica</p>
          {[
            { name: 'Memoria Institucional', hook: 'webhook-memoria', icon: '🏛️' },
            { name: 'Informes Automáticos', hook: 'webhook-informes', icon: '📊' },
            { name: 'Boletín Jurídico', hook: 'webhook-boletin', icon: '📖' }
          ].map((mod) => (
            <button 
              key={mod.hook}
              onClick={() => cambiarModulo(mod.name, mod.hook)} 
              className={`w-full flex items-center p-3 rounded-lg text-sm transition-all hover:bg-gray-900 border-l-4 ${moduloActivo === mod.name ? 'bg-gray-800 border-[#c5a059]' : 'border-transparent hover:border-[#c5a059]'}`}
            >
              <span>{mod.icon} {mod.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* ÁREA PRINCIPAL DE CHAT */}
      <main className="flex-1 flex flex-col relative">
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-[#060b1a]/80 backdrop-blur-md sticky top-0 z-10">
          <h2 className="font-medium text-gray-100">{moduloActivo}</h2>
          <div className="flex gap-2 items-center">
            <span className="text-xs text-gray-500">Esperando consulta...</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          </div>
        </header>

        {/* MENSAJES */}
        <section className="flex-1 overflow-y-auto p-4 md:p-12 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="max-w-3xl mx-auto flex gap-4 items-start mb-4">
            <img src={logoShield} className="w-10 h-12 object-contain" alt="Logo" />
            <div className="space-y-4 mt-1">
              <p className="text-xl font-light text-gray-300">Inteligencia Artificial <strong className="font-bold text-white">LAP Global</strong>.</p>
            </div>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`max-w-3xl mx-auto flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {msg.sender === 'system' && (
                 <p className="text-gray-400 leading-relaxed text-sm">{msg.text}</p>
              )}

              {msg.sender === 'user' && (
                <div className="bg-[#2a303c] text-gray-100 p-4 rounded-3xl rounded-tr-none max-w-[90%] border border-gray-700 shadow-md">
                  <p className="text-base">{msg.text}</p>
                </div>
              )}

              {msg.sender === 'loading' && (
                <div className="text-[#c5a059] text-sm font-medium animate-pulse ml-2">
                  {msg.text}
                </div>
              )}

              {msg.sender === 'bot' && (
                <div className="bg-gray-800 text-gray-200 p-4 rounded-3xl rounded-tl-none max-w-[90%] border-l-4 border-[#c5a059] shadow-md">
                  <p className="text-base whitespace-pre-wrap">{msg.text}</p>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </section>

        {/* FORMULARIO INPUT */}
        <footer className="p-4 md:pb-8">
          <div className="max-w-3xl mx-auto relative group">
            <div className="bg-[#1e2330] rounded-3xl border border-gray-700 p-2 pl-4 flex items-end gap-2 focus-within:border-[#c5a059] transition-all shadow-2xl">
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Escriba aquí los detalles del caso..." 
                rows={1}
                className="w-full bg-transparent text-gray-100 py-3 outline-none text-base resize-none max-h-32 [&::-webkit-scrollbar]:hidden"
              />
              <button 
                onClick={handleSend}
                className="bg-[#c5a059] text-black p-3 rounded-2xl mb-1 hover:bg-yellow-600 transition-all active:scale-95"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
