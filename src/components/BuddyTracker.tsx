import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  MapPin, 
  Share2, 
  UserPlus, 
  Shield, 
  Zap,
  ChevronRight,
  X,
  Copy,
  Check,
  Navigation
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Stadium } from '../data/stadiums';

interface Buddy {
  id: string;
  name: string;
  location: string;
  distance: string;
  status: 'active' | 'idle' | 'offline';
  lastSeen: string;
  coords: { x: string, y: string };
}

interface BuddyTrackerProps {
  selectedStadium: Stadium;
}

export default function BuddyTracker({ selectedStadium }: BuddyTrackerProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [groupCode, setGroupCode] = useState<string | null>(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [buddies, setBuddies] = useState<Buddy[]>([
    { 
      id: '1', 
      name: 'Rahul S.', 
      location: 'Sector A4', 
      distance: '120m', 
      status: 'active', 
      lastSeen: 'Just now',
      coords: { x: '35%', y: '45%' }
    },
    { 
      id: '2', 
      name: 'Priya K.', 
      location: 'Food Court 2', 
      distance: '450m', 
      status: 'idle', 
      lastSeen: '5m ago',
      coords: { x: '65%', y: '25%' }
    },
    { 
      id: '3', 
      name: 'Amit V.', 
      location: 'Gate 7', 
      distance: '800m', 
      status: 'active', 
      lastSeen: '2m ago',
      coords: { x: '20%', y: '75%' }
    }
  ]);

  const createGroup = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGroupCode(code);
    setIsSharing(true);
  };

  const copyCode = () => {
    if (groupCode) {
      navigator.clipboard.writeText(groupCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-display">BUDDY<br />TRACKER</h1>
        <p className="text-text-muted font-bold tracking-widest uppercase text-xs mt-4">
          {selectedStadium.name} / Secure Group Location Sharing
        </p>
      </header>

      {!groupCode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={createGroup}
            className="bg-surface border border-white/5 p-10 rounded-[32px] text-left group hover:border-accent/30 transition-all"
          >
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-black transition-all">
              <UserPlus className="w-8 h-8 text-accent group-hover:text-black" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Create Group</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Start a new private group and invite your friends to share live locations inside the venue.
            </p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowJoinModal(true)}
            className="bg-surface border border-white/5 p-10 rounded-[32px] text-left group hover:border-info/30 transition-all"
          >
            <div className="w-16 h-16 bg-info/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-info group-hover:text-white transition-all">
              <Users className="w-8 h-8 text-info group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Join Group</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Enter a 6-digit code shared by your friend to join their existing group.
            </p>
          </motion.button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Buddy List */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-surface border border-white/5 rounded-[32px] p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold tracking-widest text-xs uppercase">Your Group</h3>
                <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Live</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl mb-6">
                <div>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Group Code</p>
                  <p className="text-xl font-mono font-bold tracking-tighter text-accent">{groupCode}</p>
                </div>
                <button 
                  onClick={copyCode}
                  className="p-3 hover:bg-white/10 rounded-xl transition-colors"
                >
                  {copied ? <Check className="w-5 h-5 text-accent" /> : <Copy className="w-5 h-5 text-text-muted" />}
                </button>
              </div>

              <div className="space-y-4">
                {buddies.map((buddy) => (
                  <div 
                    key={buddy.id}
                    className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-accent/20 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold text-accent">
                          {buddy.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{buddy.name}</p>
                          <p className="text-[10px] text-text-muted uppercase tracking-widest">{buddy.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xs text-accent">{buddy.distance}</p>
                        <p className="text-[10px] text-text-muted uppercase tracking-widest">{buddy.lastSeen}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" />
                Invite More
              </button>
            </div>

            <div className="bg-surface border border-white/5 rounded-[32px] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm">Privacy Mode</h4>
                  <p className="text-xs text-text-muted">Hide your exact seat number</p>
                </div>
                <button 
                  onClick={() => setIsSharing(!isSharing)}
                  className={cn(
                    "w-12 h-6 rounded-full transition-all relative",
                    isSharing ? "bg-accent" : "bg-white/10"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-4 h-4 rounded-full transition-all",
                    isSharing ? "right-1 bg-black" : "left-1 bg-text-muted"
                  )} />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Map View */}
          <div className="lg:col-span-2 relative bg-surface border border-white/5 rounded-[32px] overflow-hidden min-h-[500px]">
            <div className="absolute inset-0 p-8 flex items-center justify-center">
              <div className="relative w-full h-full max-w-2xl">
                <svg viewBox="0 0 800 600" className="w-full h-full opacity-20">
                  <ellipse cx="400" cy="300" rx="350" ry="250" fill="none" stroke="#CCFF00" strokeWidth="1" strokeDasharray="4 4" />
                  <ellipse cx="400" cy="300" rx="200" ry="120" fill="none" stroke="#CCFF00" strokeWidth="1" />
                </svg>

                {/* Buddy Markers */}
                {buddies.map((buddy) => (
                  <motion.div
                    key={buddy.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ left: buddy.coords.x, top: buddy.coords.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-20" />
                      <div className="relative w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/20 border-2 border-black">
                        <span className="text-black font-bold text-xs">{buddy.name.charAt(0)}</span>
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black/90 backdrop-blur border border-white/10 px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-[10px] font-bold text-white uppercase tracking-widest">{buddy.name}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* User Marker */}
                <motion.div
                  style={{ left: '50%', top: '50%' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-info rounded-full animate-ping opacity-20" />
                    <div className="relative w-12 h-12 bg-info rounded-full flex items-center justify-center shadow-lg shadow-info/20 border-2 border-black">
                      <Navigation className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black/90 backdrop-blur border border-white/10 px-3 py-1 rounded-lg whitespace-nowrap">
                      <p className="text-[10px] font-bold text-white uppercase tracking-widest">You (Sector B2)</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="absolute top-6 right-6 flex flex-col gap-2">
              <div className="bg-black/60 backdrop-blur border border-white/10 p-4 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-4 h-4 text-accent" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Encrypted Session</p>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-info" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">High Accuracy</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur border border-white/10 p-4 rounded-2xl flex items-center justify-between">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                Sharing location with 3 buddies in {selectedStadium.name}
              </p>
              <button 
                onClick={() => setGroupCode(null)}
                className="text-[10px] font-bold text-danger uppercase tracking-widest hover:underline"
              >
                Leave Group
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join Modal */}
      <AnimatePresence>
        {showJoinModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowJoinModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-surface border border-white/10 w-full max-w-md rounded-[32px] p-8 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-info" />
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold">Join Group</h3>
                <button onClick={() => setShowJoinModal(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-[2px] mb-3 block">
                    Enter 6-Digit Code
                  </label>
                  <input 
                    type="text" 
                    placeholder="E.G. XJ92KL"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-xl font-mono font-bold tracking-widest text-info focus:outline-none focus:border-info/50 focus:ring-4 focus:ring-info/5 transition-all uppercase"
                  />
                </div>

                <div className="p-4 bg-info/5 rounded-2xl flex gap-4">
                  <Shield className="w-5 h-5 text-info shrink-0" />
                  <p className="text-xs text-text-muted leading-relaxed">
                    Your location will only be shared with members of this group. You can stop sharing at any time.
                  </p>
                </div>

                <button 
                  onClick={() => {
                    setGroupCode('XJ92KL');
                    setShowJoinModal(false);
                    setIsSharing(true);
                  }}
                  className="w-full py-5 bg-info text-white rounded-2xl font-bold tracking-widest uppercase hover:bg-info/90 transition-all shadow-lg shadow-info/20"
                >
                  Join Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
