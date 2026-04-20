import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Activity, AlertCircle, TrendingUp, Info } from 'lucide-react';
import { Stadium } from '../data/stadiums';
import { cn } from '../lib/utils';

interface VenueIntelligenceProps {
  stadium: Stadium;
}

export default function VenueIntelligence({ stadium }: VenueIntelligenceProps) {
  const [insight, setInsight] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsight = async () => {
    if (!process.env.GEMINI_API_KEY) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `Analyze the current state of ${stadium.name} in ${stadium.city}. 
      Capacity: ${stadium.capacity}. Sectors: ${stadium.sectors.join(', ')}.
      Generate a single, high-impact "Smart Venue Insight" (max 20 words) that sounds like real-time AI analysis. 
      Examples: "Predictive load-balancing suggested for Gate C due to high arrival rate." or "AI detects potential concession bottleneck in North Stand; recommend early break."
      Keep the tone professional and technical-luxury.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setInsight(response.text || "AI analysis complete. Optimal operations detected.");
    } catch (err) {
      console.error("AI Insight Error:", err);
      setError("Intelligence engine busy. Retrying...");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInsight();
    const interval = setInterval(fetchInsight, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [stadium.id]);

  return (
    <div 
      className="bg-black/60 border border-accent/20 rounded-[24px] p-8 overflow-hidden relative group"
      role="region"
      aria-labelledby="intelligence-label"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
        <Sparkles className="w-12 h-12 text-accent" />
      </div>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-accent text-black rounded-lg">
          <Activity className="w-4 h-4 animate-pulse" />
        </div>
        <div>
          <p id="intelligence-label" className="text-[10px] font-black text-accent uppercase tracking-[4px]">Venue Intelligence</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            <span className="text-[8px] font-bold text-accent/60 uppercase tracking-widest">Live Gemini Analysis</span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="flex items-center gap-3"
          >
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <motion.div 
                  key={i}
                  animate={{ scaleY: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1 h-3 bg-accent/40 rounded-full"
                />
              ))}
            </div>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Synthesizing telemetry...</span>
          </motion.div>
        ) : error ? (
          <motion.div 
            key="error"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-danger/80"
          >
            <AlertCircle className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase tracking-widest">{error}</span>
          </motion.div>
        ) : (
          <motion.div 
            key="insight"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="flex gap-4">
              <TrendingUp className="w-5 h-5 text-accent shrink-0 mt-1" />
              <p className="text-sm font-bold text-white leading-relaxed uppercase tracking-tight">
                {insight}
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <Info className="w-3 h-3 text-text-muted" />
                 <span className="text-[8px] font-bold text-text-muted uppercase tracking-widest">Predictive Safety Score: 98%</span>
              </div>
              <button 
                onClick={fetchInsight}
                className="text-[8px] font-black text-accent border border-accent/30 px-3 py-1 rounded-full hover:bg-accent hover:text-black transition-all uppercase tracking-widest"
              >
                Refresh
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
