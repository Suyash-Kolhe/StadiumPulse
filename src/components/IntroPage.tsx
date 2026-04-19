import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowRight, Shield, Activity, Users, Zap, Search, Bell } from 'lucide-react';
import { cn } from '../lib/utils';

interface IntroPageProps {
  onEnter: () => void;
}

export default function IntroPage({ onEnter }: IntroPageProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(onEnter, 1000);
  };

  return (
    <div className="relative z-[100] bg-black font-sans min-h-screen">
      {/* Background Ambience - Fixed to remain behind during scroll */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ 
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2036&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-20"
          style={{ filter: 'contrast(1.2) brightness(0.4)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
        
        {/* Animated Grid lines */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 20, repeat: Infinity, delay: i * 1.5, ease: "linear" }}
              className="absolute h-px w-full bg-accent/20"
              style={{ top: `${(i + 1) * 7}%` }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {!isExiting && (
          <div className="relative z-10">
            {/* HERO SECTION */}
            <section className="min-h-screen flex flex-col justify-between p-8 md:p-20 relative overflow-hidden">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-start"
              >
                <div className="flex gap-12 text-[10px] font-black tracking-[4px] text-white/40 uppercase">
                  <span>INDEX / 01</span>
                  <span>SYSTEM / PULSE</span>
                  <span>STATUS / OPTIMAL</span>
                </div>
                <div className="text-[10px] font-black tracking-[4px] text-accent uppercase">
                  OS V2.4 / LIVE
                </div>
              </motion.div>

              <div className="relative py-20">
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col"
                >
                  <div className="flex items-baseline gap-4 mb-[-2vw]">
                     <span className="text-[10px] font-black text-white/40 uppercase tracking-[6px] rotate-[-90deg] origin-left">TECH-FIRST</span>
                     <h1 className="text-[clamp(6rem,18vw,22rem)] font-black text-white leading-[0.85] tracking-[-0.05em] uppercase">
                      ARENA
                    </h1>
                  </div>
                  <div className="flex items-center gap-8 justify-end">
                     <h1 className="text-[clamp(6rem,18vw,22rem)] font-black text-accent leading-[0.85] tracking-[-0.05em] uppercase">
                      PULSE
                    </h1>
                     <div className="hidden lg:block w-32 h-px bg-accent/50" />
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-0 right-0 max-w-xs text-right hidden xl:block"
                >
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-[4px] leading-relaxed">
                    DECRYPTING SPECTATOR BEHAVIOR IN REAL-TIME. ARCHITECTURAL INTELLIGENCE FOR THE NEXT GENERATION OF SPORTS.
                  </p>
                </motion.div>
              </div>

              <div className="flex flex-col md:flex-row items-end justify-between gap-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-px bg-accent" />
                    <span className="text-[10px] font-black tracking-[4px] text-accent uppercase">BORN OF THE GAME</span>
                  </div>
                  <p className="text-xl font-medium text-white/80 leading-relaxed uppercase tracking-tighter italic max-w-md">
                    WE TRANSCEND THE SPECTATOR EXPERIENCE. DATA-DRIVEN ATHLETICISM / ARCHITECTURAL DOMINANCE.
                  </p>
                </div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex flex-col items-center gap-4"
                >
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[4px]">SCROLL TO DISCOVER</span>
                  <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
                </motion.div>
              </div>
            </section>

            {/* INFO SECTION 1: THE CORE */}
            <section className="py-40 px-8 md:px-20 border-t border-white/5 bg-black/40 backdrop-blur-3xl">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-12">
                  <div className="space-y-4">
                    <div className="text-accent text-[12px] font-black tracking-[6px] uppercase">01 / CAPABILITIES</div>
                    <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase">
                      REAL-TIME<br />RESPONSE<br /><span className="text-white/20 italic">INFRASTRUCTURE</span>
                    </h2>
                  </div>
                  <p className="text-lg text-text-muted font-medium leading-relaxed uppercase tracking-tight max-w-lg">
                    ArenaPulse isn't just a website; it's a living OS for world-class venues. We bridge the gap between architectural staticity and digital fluidity.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-4 p-8 bg-white/5 rounded-[32px] border border-white/5 hover:border-white/10 transition-all group">
                      <Activity className="w-8 h-8 text-accent group-hover:scale-110 transition-transform" />
                      <h4 className="text-xl font-bold text-white uppercase tracking-tight">CROWD ANALYTICS</h4>
                      <p className="text-xs text-text-muted font-bold leading-relaxed uppercase tracking-widest">Live heatmaps and density tracking for optimal flow management.</p>
                    </div>
                    <div className="space-y-4 p-8 bg-white/5 rounded-[32px] border border-white/5 hover:border-white/10 transition-all group">
                      <Shield className="w-8 h-8 text-danger group-hover:scale-110 transition-transform" />
                      <h4 className="text-xl font-bold text-white uppercase tracking-tight">PRECISION SOS</h4>
                      <p className="text-xs text-text-muted font-bold leading-relaxed uppercase tracking-widest">Direct GPS-linked security pings for immediate emergency support.</p>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-square">
                  <div className="absolute inset-0 bg-accent/20 blur-[120px] rounded-full animate-pulse" />
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative h-full rounded-[40px] border border-white/10 overflow-hidden shadow-2xl"
                  >
                    <img src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2073&auto=format&fit=crop" alt="Stadium Tech" className="w-full h-full object-cover grayscale opacity-60 transition-transform duration-700 hover:scale-110" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8 p-8 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10">
                      <div className="flex items-center gap-4 mb-4">
                        <Users className="w-5 h-5 text-accent" />
                        <span className="text-[10px] font-black text-white uppercase tracking-[4px]">LIVE DATA SYNC</span>
                      </div>
                      <p className="text-sm font-bold text-gray-300 uppercase tracking-widest leading-relaxed">
                        Processing over 1.2M seat interactions per second across the national arena network.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* INFO SECTION 2: SERVICES */}
            <section className="py-20 md:py-40 px-8 md:px-20">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { icon: Zap, label: 'FAST TRACK', detail: 'PRE-BOOK SLOTS FOR FOOD & MERCH' },
                    { icon: Search, label: 'LOST & FOUND', detail: 'SECURE REPORTING & ITEM CLAIMING' },
                    { icon: Bell, label: 'LIVE ALERTS', detail: 'REAL-TIME VENUE-WIDE BROADCASTS' },
                    { icon: Users, label: 'BUDDY TRACK', detail: 'GEO-LOCKED FRIEND LOCATORS' },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -10 }}
                      className="p-10 bg-surface border border-white/5 rounded-[40px] space-y-6 hover:border-accent/30 transition-all text-center lg:text-left"
                    >
                      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto lg:mx-0">
                        <feature.icon className="w-8 h-8 text-accent" />
                      </div>
                      <h3 className="text-2xl font-black text-white tracking-tighter uppercase">{feature.label}</h3>
                      <p className="text-[10px] font-bold text-text-muted tracking-[3px] leading-relaxed uppercase">{feature.detail}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-40 px-8 md:px-20 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
              <div className="max-w-4xl mx-auto space-y-12 relative z-10">
                <div className="flex flex-col items-center gap-6">
                  <div className="text-accent text-[12px] font-black tracking-[8px] uppercase">READY FOR KICKOFF?</div>
                  <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none uppercase">
                    TAKE YOUR<br /><span className="text-accent">SEAT.</span>
                  </h2>
                </div>
                
                <p className="text-xl text-text-muted font-medium uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
                  Join millions of fans experiencing the future of sports. One system. Infinite venues.
                </p>

                <div className="pt-12">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEnter}
                    className="group relative inline-flex items-center gap-12 py-10 px-16 bg-accent shadow-[0_0_80px_rgba(204,255,0,0.25)] rounded-full overflow-hidden transition-all"
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                    <span className="text-3xl font-black text-black tracking-tighter uppercase relative z-10">ENTER THE ARENA</span>
                    <div className="relative z-10 w-16 h-16 rounded-full border-2 border-black flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500 bg-black">
                      <ArrowRight className="w-8 h-8 text-accent" />
                    </div>
                  </motion.button>
                </div>
                
                <div className="pt-24 flex justify-center gap-24">
                  <div className="text-left">
                    <div className="text-[10px] font-black text-white/30 uppercase tracking-[4px] mb-2">NETWORK</div>
                    <div className="text-4xl font-black text-white tracking-tighter">8 VENUES</div>
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-black text-white/30 uppercase tracking-[4px] mb-2">LIVE FANS</div>
                    <div className="text-4xl font-black text-white tracking-tighter">1.2M+</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </AnimatePresence>

      {/* Exit Transition Overlay */}
      <AnimatePresence>
        {isExiting && (
          <motion.div 
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[110] bg-accent origin-bottom flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-black text-4xl md:text-6xl font-black tracking-tighter italic uppercase"
            >
              INITIALIZING PULSE_SYSTEM...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
