import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Mail, 
  LogOut, 
  MessageSquare, 
  Shield, 
  Bell, 
  Languages, 
  ChevronRight, 
  X,
  Star,
  Send,
  UserCircle,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

export default function SettingsModal({ isOpen, onClose, user, onLogout }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'feedback' | 'security'>('profile');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.length < 10) {
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFeedback('');
      setRating(0);
      
      // Auto reset success message
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1500);
  };

  const tabs = [
    { id: 'profile', label: 'Identity & Profile', icon: User },
    { id: 'notifications', label: 'Alert Settings', icon: Bell },
    { id: 'security', label: 'Security & Privacy', icon: Shield },
    { id: 'feedback', label: 'System Feedback', icon: MessageSquare },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-[900px] h-[600px] bg-surface border border-white/10 rounded-[40px] shadow-2xl overflow-hidden flex"
      >
        {/* Sidebar */}
        <div className="w-1/3 border-r border-white/5 bg-black/40 p-8 flex flex-col justify-between">
          <div className="space-y-8">
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-black" />
              </div>
              <span className="text-sm font-black text-white tracking-[2px] uppercase">Nexus Settings</span>
            </div>

            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group",
                    activeTab === tab.id 
                      ? "bg-accent text-black" 
                      : "text-text-muted hover:text-white hover:bg-white/5"
                  )}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <button 
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-danger hover:bg-danger/10 transition-all group"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Sign Out System</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col relative">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-2 text-text-muted hover:text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex-1 p-12 overflow-y-auto no-scrollbar">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Your Profile</h2>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-[3px]">Manage your global arena identity</p>
                  </div>

                  <div className="flex items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/5">
                    <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center text-3xl font-black text-black">
                      {user?.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="space-y-1">
                      <div className="text-xl font-black text-white uppercase">{user?.name}</div>
                      <div className="text-sm font-bold text-text-muted font-mono">{user?.email}</div>
                      <div className="inline-flex mt-2 px-2 py-0.5 bg-accent/10 border border-accent/20 rounded text-[8px] font-black text-accent uppercase tracking-widest">Verified Commander</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-black/40 border border-white/5 rounded-3xl space-y-4">
                      <div className="flex items-center gap-3 text-accent">
                        <Languages className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Language</span>
                      </div>
                      <div className="text-lg font-black text-white uppercase italic">English (IN)</div>
                    </div>
                    <div className="p-6 bg-black/40 border border-white/5 rounded-3xl space-y-4">
                      <div className="flex items-center gap-3 text-accent">
                        <UserCircle className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Member Since</span>
                      </div>
                      <div className="text-lg font-black text-white uppercase italic">APR 2024</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'feedback' && (
                <motion.div
                  key="feedback"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">System Feedback</h2>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-[3px]">Help us optimize the stadium experience</p>
                  </div>

                  <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-text-muted uppercase tracking-[4px]">Rate your experience</label>
                      <div className="flex gap-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className={cn(
                              "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                              rating >= star ? "bg-accent text-black scale-110" : "bg-white/5 text-white/20 hover:bg-white/10"
                            )}
                          >
                            <Star className={cn("w-6 h-6", rating >= star && "fill-current")} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black text-text-muted uppercase tracking-[4px]">Detailed Analysis</label>
                        <span className={cn("text-[8px] font-bold uppercase", feedback.length > 500 ? "text-danger" : "text-text-muted")}>
                          {feedback.length}/500
                        </span>
                      </div>
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value.slice(0, 500))}
                        placeholder="What can we improve in your next visit?"
                        rows={4}
                        required
                        aria-invalid={submitStatus === 'error'}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 text-sm font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-accent/50 transition-all resize-none"
                      />
                      <AnimatePresence>
                        {submitStatus === 'error' && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-[10px] font-bold text-danger uppercase tracking-widest flex items-center gap-2"
                          >
                             <AlertCircle className="w-4 h-4" /> Please provide at least 10 characters.
                          </motion.p>
                        )}
                        {submitStatus === 'success' && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-[10px] font-bold text-accent uppercase tracking-widest flex items-center gap-2"
                          >
                             <CheckCircle2 className="w-4 h-4" /> Transmission successful. Thank you.
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !rating}
                      className="w-full py-6 bg-accent text-black rounded-2xl text-[10px] font-black uppercase tracking-[4px] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
                    >
                      {isSubmitting ? "TRANSMITTING..." : "SUBMIT FEEDBACK"}
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </form>
                </motion.div>
              )}

              {(activeTab === 'notifications' || activeTab === 'security') && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                    <Zap className="w-8 h-8 text-text-muted" />
                  </div>
                  <div className="text-[10px] font-black text-white uppercase tracking-[4px]">Module under maintenance</div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Zap({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={2.5} 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
    </svg>
  );
}
