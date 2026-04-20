/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LiveMap from './components/LiveMap';
import Services from './components/Services';
import EmergencySOS from './components/EmergencySOS';
import FastTrack from './components/FastTrack';
import BuddyTracker from './components/BuddyTracker';
import Announcements from './components/Announcements';
import IntroPage from './components/IntroPage';
import UserAuth from './components/UserAuth';
import Parking from './components/Parking';
import SettingsModal from './components/SettingsModal';
import ErrorBoundary from './components/ErrorBoundary';
import { motion, AnimatePresence } from 'motion/react';
import { stadiums, Stadium } from './data/stadiums';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStadium, setSelectedStadium] = useState<Stadium>(stadiums[0]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard selectedStadium={selectedStadium} setSelectedStadium={setSelectedStadium} setActiveTab={setActiveTab} user={user} />;
      case 'map':
        return <LiveMap selectedStadium={selectedStadium} />;
      case 'announcements':
        return <Announcements selectedStadium={selectedStadium} />;
      case 'parking':
        return <Parking selectedStadium={selectedStadium} />;
      case 'services':
        return <Services selectedStadium={selectedStadium} />;
      case 'fasttrack':
        return <FastTrack selectedStadium={selectedStadium} />;
      case 'buddy':
        return <BuddyTracker selectedStadium={selectedStadium} />;
      case 'sos':
        return <EmergencySOS selectedStadium={selectedStadium} />;
      default:
        return <Dashboard selectedStadium={selectedStadium} setSelectedStadium={setSelectedStadium} setActiveTab={setActiveTab} user={user} />;
    }
  };

  if (showIntro) {
    return <IntroPage onEnter={() => setShowIntro(false)} />;
  }

  if (!user) {
    return <UserAuth onAuthComplete={(u) => setUser(u)} onBack={() => setShowIntro(true)} />;
  }

  return (
    <div className="flex min-h-screen bg-[#050505] font-sans selection:bg-blue-500/30" role="application" aria-label="ArenaPulse Platform">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-accent focus:text-black focus:font-black focus:rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black"
      >
        Skip to main content
      </a>
      
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user}
        onLogout={() => {
          setUser(null);
          setActiveTab('dashboard');
        }}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <AnimatePresence>
        {isSettingsOpen && (
          <SettingsModal 
            isOpen={isSettingsOpen} 
            onClose={() => setIsSettingsOpen(false)} 
            user={user}
            onLogout={() => {
              setUser(null);
              setActiveTab('dashboard');
            }}
          />
        )}
      </AnimatePresence>
      
      <main id="main-content" className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto h-screen no-scrollbar" role="main" aria-label={`${activeTab} view`}>
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb / Status Bar */}
          <nav className="mb-8 flex items-center gap-4 text-[10px] font-black uppercase tracking-[3px]" aria-label="Breadcrumb">
            <span className="text-text-muted">Command</span>
            <div className="w-1 h-1 bg-white/20 rounded-full" />
            <span className="text-accent">{activeTab}</span>
            {activeTab !== 'dashboard' && (
              <>
                <div className="w-1 h-1 bg-white/20 rounded-full" />
                <span className="text-white/40">Active Session</span>
              </>
            )}
          </nav>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <ErrorBoundary>
                {renderContent()}
              </ErrorBoundary>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
