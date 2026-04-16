import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import * as MOCK_DATA from "../../data/mockData";
import { useAppContext } from "../../context/AppContext";

export default function AiChatWidget() {
  const { user } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: "Hi! I'm your StudentHub AI Assistant. How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  
  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error("API key is missing! Please add it to your .env.local file.");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

      // PRIVACY LAYER: Filter data based on user role
      const isTeacher = user?.role === 'teacher';
      const roleAwareData = {};
      
      Object.keys(MOCK_DATA).forEach(key => {
        // 1. Skip non-data/React components
        if (key === 'INITIAL_ALERTS' || key === 'default' || key === 'COLORS') return;
        
        // 2. Teacher-only data protection
        const isTeacherKey = key.startsWith('TEACHER_');
        const isPublicTeacherData = ['TEACHER_COURSE_CONTENT_DATA'].includes(key);

        if (isTeacherKey && !isTeacher && !isPublicTeacherData) {
          // Skip sensitive teacher data for student accounts
          return;
        }

        roleAwareData[key] = MOCK_DATA[key];
      });

      const systemPrompt = `You are a helpful teaching and student assistant built into the StudentHub Learning Management System. 
      
      CURRENT USER CONTEXT:
      - Name: ${user?.name || "Viewer"}
      - Role: ${user?.role || "student"}
      
      PRIVACY NOTICE: 
      - You are currently speaking to a ${user?.role || "student"}.
      - NEVER mention or reveal data about other students (like names, grades, or attendance of others) to a student.
      - ONLY use the JSON data provided below. If the data is missing, the user doesn't have permission to see it.

      ACCESSIBLE PROJECT DATA (JSON):
      ${JSON.stringify(roleAwareData, null, 2)}

      INSTRUCTIONS:
      1. Answer questions based ONLY on the provided JSON data.
      2. Keep answers concise, professional, and use Markdown (tables, bolding, lists).
      `;

      // Combine system prompt with user message
      const prompt = `${systemPrompt}\n\nUser asks: ${userMessage}`;

      // Set a safety timeout for the generation
      const result = await Promise.race([
        model.generateContent(prompt),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out. Please try a shorter question.")), 30000))
      ]);

      const responseText = result.response.text();

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("AI Error:", error);
      
      // Extract the actual error message if possible
      const errorMessage = error?.message || "";
      let userFriendlyError = `I encountered an error: ${errorMessage}.`;
      
      if (errorMessage.includes("503")) {
        userFriendlyError = "Google's AI servers are currently very busy (503 High Demand). This is usually temporary—please click send again in a few seconds!";
      }
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: userFriendlyError,
        isError: true 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      
      {/* Search Window */}
      {isOpen && (
        <div className="mb-4 flex w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-xl shadow-2xl shadow-[#4C6EF5]/10 animate-fade-in-up dark:border-slate-700 dark:bg-slate-900/90">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-white/50 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#4C6EF5] to-[#7950f2] text-white shadow-md">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-800 dark:text-white">AI Assistant</h3>
                <p className="text-[10px] uppercase tracking-wider text-emerald-500 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span> Online
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat History */}
          <div className="custom-scrollbar flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Avatar */}
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    msg.role === 'user' ? 'bg-slate-100 dark:bg-slate-800' : 'bg-indigo-50 dark:bg-indigo-900/30'
                  }`}>
                    {msg.role === 'user' ? <User size={14} className="text-slate-600 dark:text-slate-400" /> : <Bot size={14} className="text-[#4C6EF5]" />}
                  </div>
                  
                  {/* Message Bubble */}
                  <div className={`rounded-2xl px-4 py-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#4C6EF5] text-white rounded-tr-none shadow-md shadow-[#4C6EF5]/20' 
                      : msg.isError 
                        ? 'bg-rose-50 text-rose-600 border border-rose-100 dark:bg-rose-900/20 dark:border-rose-800/50 rounded-tl-none'
                        : 'bg-slate-50 text-slate-700 border border-slate-100 rounded-tl-none dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-300'
                  }`}>
                    {msg.role === 'user' ? (
                      msg.text
                    ) : (
                      <div className="prose prose-sm max-w-none dark:prose-invert prose-p:leading-relaxed prose-pre:bg-slate-800 prose-pre:text-white prose-a:text-[#4C6EF5] prose-th:px-2 prose-td:px-2 prose-table:border-collapse prose-tr:border-b prose-tr:border-slate-200 dark:prose-tr:border-slate-700">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[85%]">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/30">
                    <Bot size={14} className="text-[#4C6EF5]" />
                  </div>
                  <div className="rounded-2xl rounded-tl-none border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
                    <Loader2 size={16} className="text-[#4C6EF5] animate-spin" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="relative flex items-end overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 focus-within:border-[#4C6EF5] focus-within:ring-1 focus-within:ring-[#4C6EF5] dark:border-slate-700 dark:bg-slate-800">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="custom-scrollbar max-h-32 w-full resize-none bg-transparent py-4 pl-4 pr-12 text-sm text-slate-800 focus:outline-none dark:text-slate-200"
                rows={1}
                disabled={isTyping}
              />
              <button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-xl bg-[#4C6EF5] text-white shadow-md disabled:bg-slate-200 disabled:shadow-none transition-colors dark:disabled:bg-slate-700"
              >
                <Send size={14} className={inputValue.trim() ? "translate-x-[-1px] translate-y-[1px]" : ""} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#4C6EF5] to-[#7950f2] text-white shadow-xl shadow-[#4C6EF5]/30 transition-transform hover:scale-105 active:scale-95"
          aria-label="Open AI Assistant"
        >
          <Bot size={28} className="transition-transform group-hover:scale-110" />
          
          {/* Notification Dot */}
          <span className="absolute -right-1 -top-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-amber-400 dark:border-slate-900"></span>
          </span>
        </button>
      )}

    </div>
  );
}
