import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Utensils, 
  AlertCircle,
  Zap,
  Users,
  Settings,
  LogOut,
  Bell,
  Car
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: { name: string; email: string } | null;
  onLogout: () => void;
  onOpenSettings: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, user, onLogout, onOpenSettings }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'map', icon: MapIcon, label: 'Live Map' },
    { id: 'announcements', icon: Bell, label: 'Announcements' },
    { id: 'parking', icon: Car, label: 'Parking' },
    { id: 'services', icon: Utensils, label: 'Services' },
    { id: 'fasttrack', icon: Zap, label: 'Fast Track' },
    { id: 'buddy', icon: Users, label: 'Buddy Tracker' },
    { id: 'sos', icon: AlertCircle, label: 'Emergency SOS' },
  ];

  return (
    <aside className="w-20 bg-bg border-r border-[#222] flex flex-col h-screen sticky top-0 z-50">
      <div className="py-10 flex flex-col items-center gap-8">
        <div 
          className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.3)]"
          aria-hidden="true"
        >
          <div className="w-4 h-4 bg-black rounded-full animate-pulse" />
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-6 flex flex-col items-center" aria-label="Main Navigation">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            title={item.label}
            aria-label={`Navigate to ${item.label}`}
            aria-current={activeTab === item.id ? 'page' : undefined}
            className={cn(
              "p-3 rounded-xl transition-all duration-200 group relative",
              activeTab === item.id 
                ? "bg-accent text-black" 
                : "text-text-muted hover:text-white hover:bg-surface"
            )}
          >
            <item.icon className="w-6 h-6" />
            {activeTab === item.id && (
              <motion.div 
                layoutId="active-indicator"
                className="absolute -right-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-l-full shadow-[0_0_10px_rgba(204,255,0,0.5)]"
              />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-[#222] space-y-4 flex flex-col items-center" role="group" aria-label="User Controls">
        {user && (
          <div 
            title={user.name}
            aria-label={`User profile for ${user.name}`}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-accent uppercase tracking-tighter overflow-hidden"
          >
            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
        )}
        <button 
          onClick={onOpenSettings}
          title="Open Settings"
          aria-label="Open global application settings"
          className="p-3 text-text-muted hover:text-white transition-colors"
        >
          <Settings className="w-6 h-6" />
        </button>
        <button 
          onClick={onLogout}
          title="Logout"
          aria-label="Sign out of the system"
          className="p-3 text-danger hover:opacity-80 transition-colors"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </aside>
  );
}
