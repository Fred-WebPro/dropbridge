"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Package, Target, Megaphone, Users, HelpCircle, 
  Send, Edit, MoreVertical, Star, TrendingUp, Sparkles 
} from "lucide-react";

// Типы для сообщений
type Message = {
  id: number;
  sender: 'user' | 'ai';
  text: string;
};

// Меню возможностей ИИ
const capabilities = [
  { id: 'products', name: 'Product Recommendations', icon: Package },
  { id: 'niches', name: 'Niche Analysis', icon: Target },
  { id: 'marketing', name: 'Marketing Strategies', icon: Megaphone },
  { id: 'sellers', name: 'Seller Insights', icon: Users },
  { id: 'help', name: 'General Help', icon: HelpCircle },
];

// Сводка инсайтов (справа)
const insights = [
  { title: "Top Product Pick", desc: "Smartwatch X-9 (High Margin)", icon: Star, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/10", border: "border-orange-200 dark:border-orange-500/20" },
  { title: "Trending Niche", desc: "Home Office (Growing Demand)", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-200 dark:border-emerald-500/20" },
  { title: "Marketing Tip", desc: "Use video ads for higher engagement", icon: Megaphone, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-200 dark:border-blue-500/20" },
];

export default function AIPage() {
  const [activeCapability, setActiveCapability] = useState('products');
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Состояние чата (начальные сообщения из макета)
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'user', text: "Ask me anything about product availability?" },
    { id: 2, sender: 'ai', text: "Hello Farid! Based on your recent activity, I recommend looking into the 'Sustainable Home Goods' niche. The 'Eco-friendly Water Bottle' shows a 30% growth trend. I can also suggest effective ad copy and target audiences. How can I help you today?" }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Автоскролл вниз при новых сообщениях
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Функция отправки сообщения
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Добавляем сообщение пользователя
    const newUserMsg: Message = { id: Date.now(), sender: 'user', text: inputValue };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    // Имитируем задержку ответа от ИИ (1.5 секунды)
    setTimeout(() => {
      const aiResponse: Message = { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: "I analyzed the data. Expanding to international markets like the USA and UAE could increase your margins by 25%. Would you like me to generate a step-by-step scaling plan for the 'Smartwatch' category?" 
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // Обработка нажатия Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Шапка */}
      <div className="mb-4 shrink-0">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">AI Module & Assistant</h1>
      </div>

      {/* Основная сетка на всю оставшуюся высоту */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        
        {/* Левая колонка: AI Capabilities */}
        <div className="hidden lg:flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
          <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 px-1">AI Capabilities</h2>
          {capabilities.map(cap => (
            <button
              key={cap.id}
              onClick={() => setActiveCapability(cap.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium w-full text-left ${
                activeCapability === cap.id 
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1E293B] hover:text-slate-900 dark:hover:text-white border border-transparent'
              }`}
            >
              <cap.icon className={`w-5 h-5 ${activeCapability === cap.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
              {cap.name}
            </button>
          ))}
        </div>

        {/* Центральная колонка: Чат (занимает 2 части) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm flex flex-col overflow-hidden">
          
          {/* Шапка чата */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800/60 flex items-center justify-between bg-slate-50/50 dark:bg-[#0B1120]/30 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="font-semibold text-slate-900 dark:text-white">DropBridg AI Assistant</h2>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-[#1E293B] transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-[#1E293B] transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Область сообщений */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#F8FAFC]/50 dark:bg-transparent">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Аватарка */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white font-bold text-xs' 
                      : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                  }`}>
                    {msg.sender === 'user' ? 'F' : <Sparkles className="w-4 h-4" />}
                  </div>

                  {/* Текст сообщения */}
                  <div className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-sm' 
                      : 'bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/50 text-slate-800 dark:text-slate-200 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>

                </div>
              </div>
            ))}
            
            {/* Индикатор печатания */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="px-5 py-4 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/50 rounded-tl-sm shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Поле ввода */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800/60 bg-white dark:bg-[#0F172A] shrink-0">
            <div className="relative flex items-end gap-2 bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-700/50 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500 transition-all shadow-inner">
              <textarea 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about products, niches, or marketing..."
                className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 resize-none outline-none max-h-32 min-h-[44px] py-3 px-3 custom-scrollbar"
                rows={1}
              />
              <button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="p-3 mb-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-xl transition-colors shadow-sm shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center mt-3">
              <span className="text-[10px] text-slate-400">AI can make mistakes. Consider verifying important information.</span>
            </div>
          </div>

        </div>

        {/* Правая колонка: AI Insights Summary */}
        <div className="hidden lg:flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 px-1">AI Insights Summary</h2>
          
          {insights.map((insight, i) => (
            <div key={i} className={`p-4 rounded-2xl border ${insight.bg} ${insight.border} hover:-translate-y-1 transition-transform cursor-pointer shadow-sm`}>
              <h3 className={`text-sm font-bold flex items-center gap-2 mb-1.5 ${insight.color}`}>
                <insight.icon className="w-4 h-4" /> {insight.title}
              </h3>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed ml-6">
                {insight.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}