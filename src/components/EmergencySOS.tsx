import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertCircle, 
  MapPin, 
  Shield, 
  Phone, 
  UserPlus, 
  Loader2,
  CheckCircle2,
  XCircle,
  Search,
  Package,
  Camera,
  History,
  ArrowRight,
  Info
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Stadium } from '../data/stadiums';

interface EmergencySOSProps {
  selectedStadium: Stadium;
}

type LostFoundTab = 'report' | 'claim' | 'history';

export default function EmergencySOS({ selectedStadium }: EmergencySOSProps) {
  const [isPanicActive, setIsPanicActive] = useState(false);
  const [panicStatus, setPanicStatus] = useState<'idle' | 'locating' | 'pinging' | 'sent' | 'error'>('idle');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [lostPersonForm, setLostPersonForm] = useState({
    name: '',
    description: '',
    lastSeen: '',
    contact: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Lost & Found State
  const [lostFoundTab, setLostFoundTab] = useState<LostFoundTab>('report');
  const [lostItemForm, setLostItemForm] = useState({
    itemType: '',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    contact: ''
  });
  const [lostItemSubmitted, setLostItemSubmitted] = useState(false);

  const mockFoundItems = [
    { id: 1, name: 'iPhone 15 Pro', location: 'Section 102', date: '2024-03-15', status: 'In Custody' },
    { id: 2, name: 'Leather Wallet', location: 'East Gate', date: '2024-03-15', status: 'In Custody' },
    { id: 3, name: 'Car Keys (BMW)', location: 'Concession A', date: '2024-03-14', status: 'Claimed' },
  ];

  const handlePanic = () => {
    if (panicStatus !== 'idle') return;
    
    setPanicStatus('locating');
    
    if (!navigator.geolocation) {
      setPanicStatus('error');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setPanicStatus('pinging');
        
        // Simulate ping to security
        setTimeout(() => {
          setPanicStatus('sent');
          setIsPanicActive(true);
        }, 2000);
      },
      () => {
        setPanicStatus('error');
      }
    );
  };

  const handleLostPersonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Simulate submission
    setTimeout(() => {
      setFormSubmitted(false);
      setLostPersonForm({ name: '', description: '', lastSeen: '', contact: '' });
    }, 3000);
  };

  const handleLostItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLostItemSubmitted(true);
    setTimeout(() => {
      setLostItemSubmitted(false);
      setLostItemForm({ itemType: '', description: '', location: '', date: new Date().toISOString().split('T')[0], contact: '' });
    }, 3000);
  };

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-display text-danger">EMERGENCY<br />RESPONSE</h1>
          <p className="text-text-muted font-bold tracking-widest uppercase text-xs mt-4">
            Direct Link to {selectedStadium.name} Security
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-danger/10 border border-danger/20 rounded-lg text-[10px] font-bold text-danger uppercase tracking-widest">
            <Shield className="w-3 h-3" /> Priority Channel
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Panic Button Section */}
        <section className="bg-surface border border-white/5 p-10 rounded-[40px] flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-danger/5 opacity-20 pointer-events-none" />
          
          <div className="relative">
            <motion.div
              animate={panicStatus === 'pinging' ? { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 bg-danger rounded-full blur-3xl opacity-20"
            />
            
            <button
              onClick={handlePanic}
              disabled={panicStatus !== 'idle'}
              className={cn(
                "w-64 h-64 rounded-full flex flex-col items-center justify-center gap-4 transition-all relative z-10 shadow-2xl",
                panicStatus === 'idle' ? "bg-danger hover:scale-105 active:scale-95 cursor-pointer" : "bg-surface border-4 border-danger/50 cursor-default"
              )}
            >
              {panicStatus === 'idle' && (
                <>
                  <AlertCircle className="w-20 h-20 text-white" />
                  <span className="text-2xl font-black text-white tracking-tighter uppercase">PANIC BUTTON</span>
                </>
              )}
              {panicStatus === 'locating' && (
                <>
                  <Loader2 className="w-16 h-16 text-danger animate-spin" />
                  <span className="text-xs font-bold text-danger tracking-widest uppercase">Locating...</span>
                </>
              )}
              {panicStatus === 'pinging' && (
                <>
                  <MapPin className="w-16 h-16 text-danger animate-pulse" />
                  <span className="text-xs font-bold text-danger tracking-widest uppercase">Pinging Security...</span>
                </>
              )}
              {panicStatus === 'sent' && (
                <>
                  <CheckCircle2 className="w-16 h-16 text-accent" />
                  <span className="text-xs font-bold text-accent tracking-widest uppercase">Help is on the way</span>
                </>
              )}
              {panicStatus === 'error' && (
                <>
                  <XCircle className="w-16 h-16 text-danger" />
                  <span className="text-xs font-bold text-danger tracking-widest uppercase">Location Error</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-4 max-w-xs">
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Immediate Assistance</h3>
            <p className="text-sm text-text-muted font-medium leading-relaxed">
              Pressing the panic button will share your precise GPS coordinates with {selectedStadium.name} security team immediately.
            </p>
          </div>

          {panicStatus === 'sent' && location && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-accent/10 border border-accent/20 rounded-xl text-accent text-[10px] font-bold tracking-widest uppercase"
            >
              Location Shared: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </motion.div>
          )}

          <div className="flex gap-4 w-full pt-4">
            <button className="flex-1 py-4 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-white hover:bg-white/10 transition-all">
              <Phone className="w-4 h-4 text-accent" /> CALL SECURITY
            </button>
            <button className="flex-1 py-4 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-white hover:bg-white/10 transition-all">
              <Shield className="w-4 h-4 text-info" /> FIRST AID
            </button>
          </div>
        </section>

        {/* Lost Person Section */}
        <section className="bg-surface border border-white/5 p-10 rounded-[40px] space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-info/10 rounded-2xl">
              <UserPlus className="w-8 h-8 text-info" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Lost Person Alert</h2>
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Broadcast to all venue staff</p>
            </div>
          </div>

          <form onSubmit={handleLostPersonSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Person's Name</label>
              <input 
                type="text" 
                required
                value={lostPersonForm.name}
                onChange={(e) => setLostPersonForm({...lostPersonForm, name: e.target.value})}
                placeholder="FULL NAME"
                className="w-full bg-black/40 border border-white/5 rounded-xl px-6 py-4 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-info/50 transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Last Seen Location</label>
                <input 
                  type="text" 
                  required
                  value={lostPersonForm.lastSeen}
                  onChange={(e) => setLostPersonForm({...lostPersonForm, lastSeen: e.target.value})}
                  placeholder="E.G. GATE B"
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-6 py-4 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-info/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Your Contact</label>
                <input 
                  type="tel" 
                  required
                  value={lostPersonForm.contact}
                  onChange={(e) => setLostPersonForm({...lostPersonForm, contact: e.target.value})}
                  placeholder="PHONE NUMBER"
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-6 py-4 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-info/50 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Physical Description</label>
              <textarea 
                required
                rows={3}
                value={lostPersonForm.description}
                onChange={(e) => setLostPersonForm({...lostPersonForm, description: e.target.value})}
                placeholder="CLOTHING, HEIGHT, AGE, ETC."
                className="w-full bg-black/40 border border-white/5 rounded-xl px-6 py-4 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-info/50 transition-all resize-none"
              />
            </div>
            
            <button 
              type="submit"
              disabled={formSubmitted}
              className={cn(
                "w-full py-5 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-xl",
                formSubmitted ? "bg-accent text-black" : "bg-info text-white hover:opacity-90"
              )}
            >
              {formSubmitted ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> ALERT BROADCASTED
                </span>
              ) : "BROADCAST ALERT"}
            </button>
          </form>

          <div className="p-6 bg-white/5 border border-white/5 rounded-2xl">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-relaxed">
              * This alert will be sent to all security personnel and displayed on venue screens if necessary.
            </p>
          </div>
        </section>
      </div>

      {/* Lost & Found Integration */}
      <section className="bg-surface border border-white/5 rounded-[40px] overflow-hidden">
        <div className="p-10 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-accent/10 rounded-2xl">
              <Package className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Lost & Found</h2>
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Report or claim missing items</p>
            </div>
          </div>

          <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
            {[
              { id: 'report', label: 'Report Lost', icon: Search },
              { id: 'claim', label: 'Claim Found', icon: Package },
              { id: 'history', label: 'My Reports', icon: History },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setLostFoundTab(tab.id as LostFoundTab)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-lg text-[10px] font-bold tracking-widest transition-all uppercase",
                  lostFoundTab === tab.id 
                    ? "bg-accent text-black shadow-lg" 
                    : "text-text-muted hover:text-white"
                )}
              >
                <tab.icon className="w-3 h-3" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-10">
          <AnimatePresence mode="wait">
            {lostFoundTab === 'report' && (
              <motion.div
                key="report"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <form onSubmit={handleLostItemSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Item Type</label>
                      <input 
                        type="text" 
                        required
                        value={lostItemForm.itemType}
                        onChange={(e) => setLostItemForm({...lostItemForm, itemType: e.target.value})}
                        placeholder="E.G. WALLET, PHONE, KEYS"
                        className="w-full bg-black/40 border border-white/5 rounded-xl px-6 py-4 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-accent/50 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Lost Location</label>
                      <input 
                        type="text" 
                        required
                        value={lostItemForm.location}
                        onChange={(e) => setLostItemForm({...lostItemForm, location: e.target.value})}
                        placeholder="SECTION, GATE, OR CONCESSION"
                        className="w-full bg-black/40 border border-white/5 rounded-xl px-6 py-4 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-accent/50 transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Date Lost</label>
                        <input 
                          type="date" 
                          required
                          value={lostItemForm.date}
                          onChange={(e) => setLostItemForm({...lostItemForm, date: e.target.value})}
                          className="w-full bg-black/40 border border-white/5 rounded-xl px-6 py-4 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-accent/50 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Contact Info</label>
                        <input 
                          type="tel" 
                          required
                          value={lostItemForm.contact}
                          onChange={(e) => setLostItemForm({...lostItemForm, contact: e.target.value})}
                          placeholder="PHONE OR EMAIL"
                          className="w-full bg-black/40 border border-white/5 rounded-xl px-6 py-4 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-accent/50 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Detailed Description</label>
                      <textarea 
                        required
                        rows={5}
                        value={lostItemForm.description}
                        onChange={(e) => setLostItemForm({...lostItemForm, description: e.target.value})}
                        placeholder="COLOR, BRAND, UNIQUE FEATURES, ETC."
                        className="w-full bg-black/40 border border-white/5 rounded-xl px-6 py-4 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-accent/50 transition-all resize-none"
                      />
                    </div>
                    <div className="flex gap-4">
                      <button type="button" className="flex-1 py-4 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest text-white hover:bg-white/10 transition-all">
                        <Camera className="w-4 h-4 text-accent" /> ADD PHOTO
                      </button>
                      <button 
                        type="submit"
                        disabled={lostItemSubmitted}
                        className={cn(
                          "flex-[2] py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all",
                          lostItemSubmitted ? "bg-accent text-black" : "bg-white text-black hover:bg-accent"
                        )}
                      >
                        {lostItemSubmitted ? "REPORT SUBMITTED" : "SUBMIT REPORT"}
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}

            {lostFoundTab === 'claim' && (
              <motion.div
                key="claim"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {mockFoundItems.map((item) => (
                    <div key={item.id} className="bg-black/40 border border-white/5 p-6 rounded-3xl space-y-4 group hover:border-accent/30 transition-all">
                      <div className="flex justify-between items-start">
                        <div className="p-3 bg-accent/10 rounded-xl">
                          <Package className="w-5 h-5 text-accent" />
                        </div>
                        <span className="text-[8px] font-black bg-accent/10 text-accent px-2 py-1 rounded-full uppercase tracking-widest">
                          {item.status}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white uppercase tracking-tight">{item.name}</h3>
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Found at {item.location}</p>
                      </div>
                      <div className="pt-4 flex items-center justify-between border-t border-white/5">
                        <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">{item.date}</span>
                        <button className="text-[9px] font-black text-accent uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                          CLAIM ITEM <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-8 bg-accent/5 border border-accent/10 rounded-[32px] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Info className="w-6 h-6 text-accent" />
                    <p className="text-xs font-medium text-white">Don't see your item? New items are logged every 30 minutes.</p>
                  </div>
                  <button className="px-6 py-3 bg-accent text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                    SEARCH ALL ITEMS
                  </button>
                </div>
              </motion.div>
            )}

            {lostFoundTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-20 text-center space-y-6"
              >
                <div className="p-6 bg-white/5 rounded-full">
                  <History className="w-12 h-12 text-text-muted" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">No Active Reports</h3>
                  <p className="text-sm text-text-muted font-medium max-w-xs">You haven't submitted any lost item reports for this event yet.</p>
                </div>
                <button 
                  onClick={() => setLostFoundTab('report')}
                  className="px-8 py-4 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  SUBMIT NEW REPORT
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
