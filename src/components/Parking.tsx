import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, 
  MapPin, 
  Clock, 
  CreditCard, 
  ChevronRight, 
  Info, 
  AlertTriangle,
  Zap,
  Navigation,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { Stadium, ParkingLot } from '../data/stadiums';
import { cn } from '../lib/utils';

interface ParkingProps {
  selectedStadium: Stadium;
}

export default function Parking({ selectedStadium }: ParkingProps) {
  const [activeLot, setActiveLot] = useState<ParkingLot | null>(selectedStadium.parkingLots[0]);

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-display">PARKING<br />SOLUTIONS</h1>
          <p className="text-text-muted font-bold tracking-widest uppercase text-xs mt-4">Venue Logistics / {selectedStadium.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-6 py-3 bg-surface border border-white/5 rounded-2xl flex flex-col items-end">
            <span className="text-[10px] font-black text-text-muted uppercase tracking-[2px]">Total Capacity</span>
            <span className="text-xl font-black text-white uppercase italic">
              {selectedStadium.parkingLots.reduce((acc, lot) => acc + lot.totalSpaces, 0).toLocaleString()} <span className="text-accent">Slots</span>
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Parking Lots List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <p className="section-label mb-0">Available Zones</p>
            <div className="text-accent text-[10px] font-black tracking-widest uppercase">Live Status Update</div>
          </div>
          
          <div className="space-y-4">
            {selectedStadium.parkingLots.map((lot) => (
              <motion.button
                key={lot.id}
                whileHover={{ x: 10 }}
                onClick={() => setActiveLot(lot)}
                className={cn(
                  "w-full p-8 rounded-[32px] border transition-all text-left group relative overflow-hidden",
                  activeLot?.id === lot.id 
                    ? "bg-accent border-accent" 
                    : "bg-surface border-white/5 hover:border-white/20"
                )}
              >
                <div className="relative z-10 flex items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0",
                      activeLot?.id === lot.id ? "bg-black/10" : "bg-white/5"
                    )}>
                      <Car className={cn("w-8 h-8", activeLot?.id === lot.id ? "text-black" : "text-accent")} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className={cn("text-xl font-black uppercase tracking-tight", activeLot?.id === lot.id ? "text-black" : "text-white")}>
                          {lot.name}
                        </h3>
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-[2px]",
                          activeLot?.id === lot.id ? "bg-black/20 text-black" : "bg-accent/10 text-accent"
                        )}>
                          {lot.type}
                        </span>
                      </div>
                      <div className={cn("flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest", activeLot?.id === lot.id ? "text-black/60" : "text-text-muted")}>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3" />
                          {lot.availableSpaces} Available
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          {lot.queueTime}m Queue
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn("text-2xl font-black italic", activeLot?.id === lot.id ? "text-black" : "text-white")}>
                      ₹{lot.fee}
                    </div>
                    <div className={cn("text-[8px] font-black uppercase tracking-[2px]", activeLot?.id === lot.id ? "text-black/40" : "text-text-muted")}>
                      Flat Rate
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar for Availability */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(lot.availableSpaces / lot.totalSpaces) * 100}%` }}
                    className={cn(
                      "h-full",
                      activeLot?.id === lot.id ? "bg-black/20" : "bg-accent"
                    )}
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Selected Lot Details / Actions */}
        <div className="space-y-8">
          <AnimatePresence mode="wait">
            {activeLot ? (
              <motion.div
                key={activeLot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-surface border border-white/5 p-10 rounded-[40px] space-y-8 sticky top-32"
              >
                <div className="space-y-4">
                  <p className="section-label">Zone Summary</p>
                  <h2 className="text-4xl font-black text-white leading-tight uppercase tracking-tighter">
                    {activeLot.name}
                  </h2>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-lg text-[10px] font-black text-accent uppercase tracking-widest">
                      {activeLot.type} ACCESS
                    </span>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-white uppercase tracking-widest">
                      LEVEL G1
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-black/40 border border-white/5 rounded-3xl space-y-2">
                    <Clock className="w-5 h-5 text-accent" />
                    <div className="text-[8px] font-black text-text-muted uppercase tracking-[2px]">Wait Time</div>
                    <div className="text-2xl font-black text-white tracking-widest uppercase italic">{activeLot.queueTime} <span className="text-xs">mins</span></div>
                  </div>
                  <div className="p-6 bg-black/40 border border-white/5 rounded-3xl space-y-2">
                    <Navigation className="w-5 h-5 text-info" />
                    <div className="text-[8px] font-black text-text-muted uppercase tracking-[2px]">Distance</div>
                    <div className="text-2xl font-black text-white tracking-widest uppercase italic">0.4 <span className="text-xs">km</span></div>
                  </div>
                </div>

                <div className="space-y-6 pt-6 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-accent" />
                      <span className="text-[10px] font-black text-white uppercase tracking-[3px]">Parking Fee</span>
                    </div>
                    <span className="text-xl font-black text-accent italic">₹{activeLot.fee}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-white/40" />
                      <span className="text-[10px] font-black text-white uppercase tracking-[3px]">Digital Permit</span>
                    </div>
                    <span className="text-[10px] font-black text-accent uppercase tracking-[2px]">Included</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button className="w-full py-6 bg-accent text-black rounded-2xl text-[10px] font-black uppercase tracking-[4px] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group">
                    RESERVE SPOT NOW
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                  <button className="w-full py-6 bg-white/5 border border-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-[4px] hover:bg-white/10 transition-all">
                    GET NAVIGATION
                  </button>
                </div>

                <div className="p-6 bg-orange-500/5 border border-orange-500/10 rounded-2xl flex gap-4">
                  <AlertTriangle className="w-6 h-6 text-orange-500 shrink-0" />
                  <p className="text-[10px] font-bold text-orange-200/60 leading-relaxed uppercase tracking-widest">
                    Parking zones are filling up fast. General admission lots are expected to reach <span className="text-orange-500">100% capacity</span> in 45 minutes.
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="h-[400px] flex items-center justify-center border-2 border-dashed border-white/5 rounded-[40px]">
                <p className="text-[10px] font-black text-text-muted uppercase tracking-[4px]">Select a zone to view details</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={3} 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}
