import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Sparkles, 
  User, 
  Bot, 
  Loader2,
  MapPin,
  Clock,
  Info,
  AlertCircle,
  UserPlus
} from 'lucide-react';
import { cn } from '../lib/utils';
import { getChatResponse } from '../services/geminiService';
import { ChatMessage, UserProfile } from '../types';

import { stadiums, Stadium } from '../data/stadiums';
import { X, Save, Languages } from 'lucide-react';

interface AIConciergeProps {
  selectedStadium: Stadium;
}

export default function AIConcierge({ selectedStadium }: AIConciergeProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [profile, setProfile] = useState<UserProfile>({ name: '', language: 'English' });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [tempProfile, setTempProfile] = useState<UserProfile>({ name: '', language: 'English' });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize and reset messages
  useEffect(() => {
    const welcomeMsg = profile.name 
      ? `Hello ${profile.name}! I'm your ${selectedStadium.name} Concierge. How can I help you enjoy the event today?`
      : `Hello! I'm your ${selectedStadium.name} Concierge. How can I help you enjoy the event today?`;
    
    setMessages([{ role: 'model', text: welcomeMsg }]);
  }, [selectedStadium, profile.name]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const response = await getChatResponse(userMessage, messages, selectedStadium, profile);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  const saveProfile = () => {
    setProfile(tempProfile);
    setIsProfileOpen(false);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-display">AI<br />CONCIERGE</h1>
          <p className="text-text-muted font-bold tracking-widest uppercase text-xs mt-4">Powered by Gemini / Real-time Assistance</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              setTempProfile(profile);
              setIsProfileOpen(true);
            }}
            className="px-4 py-2 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all"
          >
            <User className="w-3 h-3 text-accent" /> {profile.name || 'Set Profile'}
          </button>
          <div className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-lg text-[10px] font-bold text-accent uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="w-3 h-3" /> System Active
          </div>
        </div>
      </header>

      <div className="flex-1 bg-surface border border-white/5 rounded-[32px] flex flex-col overflow-hidden relative">
        {/* Profile Overlay */}
        <AnimatePresence>
          {isProfileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-surface border border-white/10 p-8 rounded-[32px] w-full max-w-md space-y-8 relative"
              >
                <button 
                  onClick={() => setIsProfileOpen(false)}
                  className="absolute top-6 right-6 p-2 text-text-muted hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Personalize AI</h2>
                  <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Help Gemini assist you better</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                      <User className="w-3 h-3" /> Your Name
                    </label>
                    <input 
                      type="text" 
                      value={tempProfile.name}
                      onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})}
                      placeholder="HOW SHOULD WE CALL YOU?"
                      className="w-full bg-black/40 border border-white/5 rounded-xl px-6 py-4 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-accent/50 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                      <Languages className="w-3 h-3" /> Preferred Language
                    </label>
                    <select 
                      value={tempProfile.language}
                      onChange={(e) => setTempProfile({...tempProfile, language: e.target.value})}
                      className="w-full bg-black/40 border border-white/5 rounded-xl px-6 py-4 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-accent/50 transition-all appearance-none cursor-pointer"
                    >
                      <option value="English">ENGLISH</option>
                      <option value="Hindi">HINDI</option>
                      <option value="Bengali">BENGALI</option>
                      <option value="Tamil">TAMIL</option>
                      <option value="Telugu">TELUGU</option>
                      <option value="Spanish">SPANISH</option>
                      <option value="French">FRENCH</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setIsProfileOpen(false)}
                    className="flex-1 py-4 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                    CANCEL
                  </button>
                  <button 
                    onClick={saveProfile}
                    className="flex-1 py-4 bg-accent text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" /> SAVE PROFILE
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={cn(
                  "flex gap-6 max-w-[80%]",
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg",
                  msg.role === 'user' ? "bg-accent text-black" : "bg-white/5 text-accent"
                )}>
                  {msg.role === 'user' ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                </div>
                <div className={cn(
                  "p-6 rounded-2xl text-sm leading-relaxed font-medium",
                  msg.role === 'user' 
                    ? "bg-accent text-black rounded-tr-none" 
                    : "bg-white/5 text-gray-200 border border-white/5 rounded-tl-none"
                )}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <div className="flex gap-6 mr-auto">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <Loader2 className="w-6 h-6 text-accent animate-spin" />
              </div>
              <div className="bg-white/5 p-6 rounded-2xl rounded-tl-none border border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Questions */}
        <div className="px-10 py-5 flex gap-3 overflow-x-auto no-scrollbar border-t border-white/5">
          {[
            { label: 'NEAREST RESTROOM', icon: MapPin },
            { label: 'FOOD WAIT TIMES', icon: Clock },
            { label: 'EMERGENCY SOS', icon: AlertCircle },
            { label: 'LOST PERSON', icon: UserPlus },
          ].map((q) => (
            <button
              key={q.label}
              onClick={() => setInput(q.label)}
              className="px-5 py-2.5 bg-white/5 hover:bg-accent hover:text-black border border-white/5 rounded-lg text-[10px] font-bold tracking-widest text-text-muted transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <q.icon className="w-3.5 h-3.5" />
              {q.label}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-8 bg-black/40 border-t border-white/5">
          <div className="relative flex items-center gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="ASK ANYTHING ABOUT THE VENUE..."
              className="flex-1 bg-surface border border-white/5 rounded-xl px-8 py-5 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all placeholder:text-text-muted"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="p-5 bg-accent hover:opacity-90 disabled:opacity-50 text-black rounded-xl transition-all shadow-xl shadow-accent/10"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
