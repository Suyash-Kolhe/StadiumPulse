import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Lock, ArrowRight, Github, Chrome, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface UserAuthProps {
  onAuthComplete: (user: { name: string; email: string }) => void;
  onBack: () => void;
}

export default function UserAuth({ onAuthComplete, onBack }: UserAuthProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onAuthComplete({ 
        name: mode === 'signup' ? name : email.split('@')[0], 
        email 
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black flex items-center justify-center p-6 font-sans">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-2 bg-surface border border-white/10 rounded-[40px] overflow-hidden shadow-2xl"
      >
        {/* Left Side: Brand/Info */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-accent/5 border-r border-white/5 relative overflow-hidden">
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-black text-white tracking-widest uppercase italic">ARENA_PULSE</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-5xl font-black text-white leading-[0.9] uppercase tracking-tighter">
                SECURE<br /><span className="text-accent">IDENTITY</span><br />SYSTEM.
              </h2>
              <p className="text-sm text-text-muted font-bold tracking-[2px] leading-relaxed uppercase">
                Access your personalized concierge, real-time alerts, and fast-track services.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="text-[10px] font-black text-accent uppercase tracking-[4px]">2FA ACTIVE</div>
              <div className="text-sm font-bold text-white uppercase tracking-widest">ENCRYPTED DATA</div>
            </div>
            <div className="space-y-2">
              <div className="text-[10px] font-black text-accent uppercase tracking-[4px]">PROTECTED</div>
              <div className="text-sm font-bold text-white uppercase tracking-widest">BIO AUTH READY</div>
            </div>
          </div>

          {/* Abstract Deco */}
          <div className="absolute bottom-[-20%] right-[-20%] w-full h-full border border-accent/10 rounded-full scale-150 pointer-events-none" />
          <div className="absolute bottom-[-15%] right-[-15%] w-full h-full border border-white/5 rounded-full scale-150 pointer-events-none" />
        </div>

        {/* Right Side: Form */}
        <div className="p-10 lg:p-20 flex flex-col justify-center">
          <div className="space-y-12">
            <div className="space-y-4">
              <div className="inline-flex gap-1 p-1 bg-black/40 border border-white/5 rounded-xl">
                <button 
                  onClick={() => setMode('login')}
                  className={cn(
                    "px-6 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all",
                    mode === 'login' ? "bg-accent text-black" : "text-text-muted hover:text-white"
                  )}
                >
                  LOGIN
                </button>
                <button 
                  onClick={() => setMode('signup')}
                  className={cn(
                    "px-6 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all",
                    mode === 'signup' ? "bg-accent text-black" : "text-text-muted hover:text-white"
                  )}
                >
                  SIGN UP
                </button>
              </div>
              <h1 className="text-4xl font-black text-white uppercase tracking-tight">
                {mode === 'login' ? 'Welcome Back' : 'Join the Arena'}
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {mode === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-2"
                  >
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-[4px] px-2 flex items-center gap-2">
                      <User className="w-3 h-3" /> Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="ENTER YOUR NAME"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 text-sm font-bold tracking-widest text-white focus:outline-none focus:border-accent/50 transition-all"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-[4px] px-2 flex items-center gap-2">
                  <Mail className="w-3 h-3" /> Email Address
                </label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 text-sm font-bold tracking-widest text-white focus:outline-none focus:border-accent/50 transition-all font-mono lowercase"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between px-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-[4px] flex items-center gap-2">
                    <Lock className="w-3 h-3" /> Password
                  </label>
                  {mode === 'login' && (
                    <button type="button" className="text-[9px] font-black text-accent uppercase tracking-widest hover:underline">Forgot?</button>
                  )}
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 text-sm font-bold tracking-widest text-white focus:outline-none focus:border-accent/50 transition-all"
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-6 bg-accent text-black rounded-2xl text-[10px] font-black uppercase tracking-[4px] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group"
              >
                {isLoading ? (
                  <Zap className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    {mode === 'login' ? 'AUTHENTICATE' : 'INITIALIZE ACCOUNT'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="space-y-8">
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-white/5"></div>
                <span className="flex-shrink px-6 text-[9px] font-black text-white/30 uppercase tracking-[4px]">OR CONTINUE WITH</span>
                <div className="flex-grow border-t border-white/5"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all">
                  <Chrome className="w-5 h-5 text-accent" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">GOOGLE</span>
                </button>
                <button className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all">
                  <Github className="w-5 h-5 text-white" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">GITHUB</span>
                </button>
              </div>

              <button 
                onClick={onBack}
                className="w-full text-[10px] font-black text-text-muted uppercase tracking-[4px] hover:text-white transition-colors"
              >
                ← BACK TO INTRO
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
