import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Info, 
  Layers,
  Maximize2,
  Navigation,
  Droplets,
  Utensils,
  LogOut
} from 'lucide-react';
import { cn } from '../lib/utils';

import { stadiums, Stadium } from '../data/stadiums';

interface LiveMapProps {
  selectedStadium: Stadium;
}

export default function LiveMap({ selectedStadium }: LiveMapProps) {
  const [activeLayer, setActiveLayer] = useState('crowd');

  const renderSvgLayers = () => {
    if (activeLayer !== 'crowd') return null;
    return (
      <>
        <motion.circle 
          cx="200" cy="200" r="60" 
          fill="url(#heat-accent)" 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.circle 
          cx="600" cy="400" r="80" 
          fill="url(#heat-danger)" 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </>
    );
  };

  const renderOverlayLayers = () => {
    switch (activeLayer) {
      case 'crowd':
        return (
          <>
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 bg-black/90 backdrop-blur border border-white/10 px-4 py-2 rounded-lg text-[10px] font-bold text-accent uppercase tracking-[2px]">
              {selectedStadium.sectors[0]} - Heavy
            </div>
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 bg-black/90 backdrop-blur border border-white/10 px-4 py-2 rounded-lg text-[10px] font-bold text-danger uppercase tracking-[2px]">
              {selectedStadium.sectors[1]} - Critical
            </div>
          </>
        );
      case 'restrooms':
        return (
          <>
            {[
              { x: '30%', y: '20%' }, { x: '70%', y: '20%' },
              { x: '30%', y: '80%' }, { x: '70%', y: '80%' }
            ].map((pos, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{ left: pos.x, top: pos.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 p-3 bg-info rounded-full shadow-lg shadow-info/20"
              >
                <Droplets className="w-4 h-4 text-white" />
              </motion.div>
            ))}
          </>
        );
      case 'food':
        return (
          <>
            {[
              { x: '50%', y: '15%' }, { x: '15%', y: '50%' },
              { x: '85%', y: '50%' }, { x: '50%', y: '85%' }
            ].map((pos, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{ left: pos.x, top: pos.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 p-3 bg-accent rounded-full shadow-lg shadow-accent/20"
              >
                <Utensils className="w-4 h-4 text-black" />
              </motion.div>
            ))}
          </>
        );
      case 'exits':
        return (
          <>
            {[
              { x: '10%', y: '10%' }, { x: '90%', y: '10%' },
              { x: '10%', y: '90%' }, { x: '90%', y: '90%' }
            ].map((pos, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{ left: pos.x, top: pos.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 p-3 bg-danger rounded-full shadow-lg shadow-danger/20"
              >
                <LogOut className="w-4 h-4 text-white" />
              </motion.div>
            ))}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-display">FLOW<br />MAP</h1>
          <p className="text-text-muted font-bold tracking-widest uppercase text-xs mt-4">
            {selectedStadium.name} / {selectedStadium.city} / Real-time Pressure Points
          </p>
        </div>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent transition-colors" />
          <input 
            type="text" 
            placeholder="SEARCH SEATS, GATES..."
            className="bg-surface border border-white/5 rounded-xl pl-12 pr-6 py-4 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 w-full md:w-80 transition-all placeholder:text-text-muted"
          />
        </div>
      </header>

      <div className="flex-1 relative bg-surface border border-white/5 rounded-[32px] overflow-hidden group">
        {/* Map Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full max-w-2xl max-h-[500px] p-8">
            <svg viewBox="0 0 800 600" className="w-full h-full drop-shadow-[0_0_30px_rgba(204,255,0,0.05)]">
              <ellipse cx="400" cy="300" rx="350" ry="250" fill="none" stroke="#222" strokeWidth="2" />
              <ellipse cx="400" cy="300" rx="200" ry="120" fill="#0a0a0a" stroke="#333" strokeWidth="2" />
              
              <defs>
                <radialGradient id="heat-accent">
                  <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#CCFF00" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="heat-danger">
                  <stop offset="0%" stopColor="#FF3B30" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#FF3B30" stopOpacity="0" />
                </radialGradient>
              </defs>

              {renderSvgLayers()}
            </svg>

            {renderOverlayLayers()}
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-8 right-8 flex flex-col gap-3">
          <button className="p-4 bg-black/60 backdrop-blur border border-white/10 rounded-xl text-white hover:bg-accent hover:text-black transition-all">
            <Maximize2 className="w-5 h-5" />
          </button>
          <button className="p-4 bg-black/60 backdrop-blur border border-white/10 rounded-xl text-white hover:bg-accent hover:text-black transition-all">
            <Navigation className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/60 backdrop-blur border border-white/10 p-3 rounded-2xl overflow-x-auto max-w-[90vw] no-scrollbar">
          {[
            { id: 'crowd', label: 'CROWD', icon: Layers },
            { id: 'restrooms', label: 'RESTROOMS', icon: Droplets },
            { id: 'food', label: 'FOOD', icon: Utensils },
            { id: 'exits', label: 'EXITS', icon: LogOut },
          ].map((layer) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-bold tracking-widest transition-all whitespace-nowrap",
                activeLayer === layer.id 
                  ? "bg-accent text-black shadow-lg shadow-accent/20" 
                  : "text-text-muted hover:text-white hover:bg-white/5"
              )}
            >
              <layer.icon className="w-4 h-4" />
              {layer.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
