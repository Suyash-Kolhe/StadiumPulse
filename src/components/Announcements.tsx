import React from 'react';
import { motion } from 'motion/react';
import { 
  Bell, 
  ShieldAlert, 
  Trophy, 
  Music, 
  Clock, 
  Info,
  ChevronRight,
  Circle
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Stadium } from '../data/stadiums';

interface Announcement {
  id: string;
  type: 'security' | 'event' | 'performer' | 'info';
  title: string;
  message: string;
  time: string;
  isUrgent?: boolean;
}

const announcements: Announcement[] = [
  {
    id: '1',
    type: 'security',
    title: 'Security Alert: Gate B Congestion',
    message: 'Gate B is currently experiencing high traffic. Please use Gate C or D for faster entry.',
    time: '2 mins ago',
    isUrgent: true
  },
  {
    id: '2',
    type: 'event',
    title: 'Match Start: 15 Minutes',
    message: 'The main event is scheduled to begin in 15 minutes. Please find your seats.',
    time: '10 mins ago'
  },
  {
    id: '3',
    type: 'performer',
    title: 'Halftime Show: Special Guest',
    message: 'We are excited to announce a surprise performance during halftime! Stay tuned.',
    time: '25 mins ago'
  },
  {
    id: '4',
    type: 'info',
    title: 'Weather Update: Clear Skies',
    message: 'Expect clear weather throughout the evening. Enjoy the game!',
    time: '1 hour ago'
  },
  {
    id: '5',
    type: 'event',
    title: 'Player Warmups Underway',
    message: 'Teams have taken the field for pre-match warmups.',
    time: '1.5 hours ago'
  }
];

interface AnnouncementsProps {
  selectedStadium: Stadium;
}

export default function Announcements({ selectedStadium }: AnnouncementsProps) {
  const getIcon = (type: Announcement['type']) => {
    switch (type) {
      case 'security': return ShieldAlert;
      case 'event': return Trophy;
      case 'performer': return Music;
      case 'info': return Info;
      default: return Bell;
    }
  };

  const getColor = (type: Announcement['type'], isUrgent?: boolean) => {
    if (isUrgent) return 'text-danger bg-danger/10 border-danger/20';
    switch (type) {
      case 'security': return 'text-danger bg-danger/10 border-danger/20';
      case 'event': return 'text-accent bg-accent/10 border-accent/20';
      case 'performer': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'info': return 'text-info bg-info/10 border-info/20';
      default: return 'text-white bg-white/10 border-white/20';
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-display">VENUE<br />ANNOUNCEMENTS</h1>
          <p className="text-text-muted font-bold tracking-widest uppercase text-xs mt-4">Real-Time Updates / {selectedStadium.name}</p>
        </div>
        <div className="flex items-center gap-3 bg-surface border border-white/5 p-2 rounded-xl">
          <div className="px-4 py-2 flex items-center gap-2">
            <Circle className="w-2 h-2 fill-accent text-accent animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-white">Live Feed</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl space-y-6">
        {announcements.map((announcement, i) => {
          const Icon = getIcon(announcement.type);
          const colorClasses = getColor(announcement.type, announcement.isUrgent);

          return (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "group relative bg-surface border border-white/5 p-6 md:p-8 rounded-[24px] hover:border-white/10 transition-all cursor-default",
                announcement.isUrgent && "border-danger/30 bg-danger/[0.02]"
              )}
            >
              <div className="flex flex-col md:flex-row gap-6 md:items-start">
                <div className={cn(
                  "p-4 rounded-2xl border shrink-0 flex items-center justify-center",
                  colorClasses
                )}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h3 className={cn(
                      "text-xl font-bold uppercase tracking-tight",
                      announcement.isUrgent ? "text-danger" : "text-white group-hover:text-accent transition-colors"
                    )}>
                      {announcement.title}
                    </h3>
                    <div className="flex items-center gap-2 text-text-muted">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{announcement.time}</span>
                    </div>
                  </div>
                  <p className="text-text-muted font-medium leading-relaxed">
                    {announcement.message}
                  </p>
                </div>

                <div className="hidden md:flex items-center self-center">
                  <ChevronRight className="w-6 h-6 text-white/10 group-hover:text-accent transition-all transform group-hover:translate-x-1" />
                </div>
              </div>

              {announcement.isUrgent && (
                <div className="absolute -top-2 -right-2 px-3 py-1 bg-danger text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-xl shadow-danger/20">
                  Urgent
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="bg-white/5 border border-white/5 p-8 rounded-[32px] max-w-4xl">
        <div className="flex items-start gap-4">
          <Info className="w-5 h-5 text-accent shrink-0 mt-1" />
          <div className="space-y-2">
            <h4 className="text-xs font-black text-white uppercase tracking-widest">About Announcements</h4>
            <p className="text-xs text-text-muted leading-relaxed font-medium">
              This feed is updated in real-time by the venue operations center. For immediate assistance during an emergency, please use the <span className="text-danger font-bold">Emergency SOS</span> tab.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
