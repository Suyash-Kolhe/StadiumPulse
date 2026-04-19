import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Utensils, 
  Coffee, 
  Beer, 
  ShoppingBag, 
  Activity,
  Clock,
  Star,
  ChevronRight,
  TrendingDown,
  MapPin,
  ThumbsUp,
  ThumbsDown,
  Zap,
  X,
  Info,
  Tag,
  Map as MapIcon,
  Maximize2,
  Navigation
} from 'lucide-react';
import { cn } from '../lib/utils';
import { AnimatePresence } from 'motion/react';

const services = [
  { 
    id: '1', 
    name: 'Burger Hub', 
    type: 'Concession', 
    location: 'Section 102', 
    coords: { x: 25, y: 35 },
    waitTime: 15, 
    status: 'Busy', 
    rating: 4.5, 
    icon: Utensils, 
    fastTrack: true,
    menu: [
      { name: 'Classic Cheeseburger', price: '₹250' },
      { name: 'Double Bacon Burger', price: '₹350' },
      { name: 'Veggie Supreme', price: '₹280' },
      { name: 'Truffle Fries', price: '₹150' },
      { name: 'Large Soda', price: '₹100' }
    ]
  },
  { 
    id: '2', 
    name: 'Stadium Brews', 
    type: 'Concession', 
    location: 'Section 108', 
    coords: { x: 75, y: 35 },
    waitTime: 5, 
    status: 'Open', 
    rating: 4.8, 
    icon: Beer, 
    fastTrack: true,
    menu: [
      { name: 'Craft Lager', price: '₹400' },
      { name: 'IPA Special', price: '₹450' },
      { name: 'Wheat Beer', price: '₹420' },
      { name: 'Nachos with Cheese', price: '₹200' }
    ]
  },
  { 
    id: '3', 
    name: 'Quick Bites', 
    type: 'Concession', 
    location: 'Section 115', 
    coords: { x: 85, y: 65 },
    waitTime: 8, 
    status: 'Open', 
    rating: 4.2, 
    icon: Coffee, 
    fastTrack: false,
    menu: [
      { name: 'Hot Dog', price: '₹180' },
      { name: 'Chicken Popcorn', price: '₹220' },
      { name: 'Pretzel', price: '₹120' },
      { name: 'Cappuccino', price: '₹150' }
    ]
  },
  { 
    id: '4', 
    name: 'Fan Shop', 
    type: 'Merchandise', 
    location: 'Gate A', 
    coords: { x: 50, y: 15 },
    waitTime: 0, 
    status: 'Open', 
    rating: 4.9, 
    icon: ShoppingBag, 
    fastTrack: true,
    menu: [
      { name: 'Official Jersey', price: '₹1,200' },
      { name: 'Team Cap', price: '₹600' },
      { name: 'Scarf', price: '₹400' },
      { name: 'Keyring', price: '₹150' }
    ]
  },
  { 
    id: '5', 
    name: 'Medical Station 1', 
    type: 'First Aid', 
    location: 'Section 120', 
    coords: { x: 15, y: 50 },
    waitTime: 0, 
    status: 'Open', 
    rating: 5.0, 
    icon: Activity, 
    fastTrack: false,
    menu: [
      { name: 'Basic First Aid', price: 'Free' },
      { name: 'Emergency Care', price: 'Free' }
    ]
  },
  { 
    id: '6', 
    name: 'Taco Town', 
    type: 'Concession', 
    location: 'Section 204', 
    coords: { x: 25, y: 75 },
    waitTime: 25, 
    status: 'Busy', 
    rating: 4.3, 
    icon: Utensils, 
    fastTrack: true,
    menu: [
      { name: 'Beef Tacos (3pcs)', price: '₹300' },
      { name: 'Chicken Burrito', price: '₹320' },
      { name: 'Quesadilla', price: '₹280' },
      { name: 'Churros', price: '₹150' }
    ]
  },
  { 
    id: '7', 
    name: 'Pizza Palace', 
    type: 'Concession', 
    location: 'Section 110', 
    coords: { x: 50, y: 85 },
    waitTime: 12, 
    status: 'Open', 
    rating: 4.6, 
    icon: Utensils, 
    fastTrack: true,
    menu: [
      { name: 'Margherita Pizza', price: '₹400' },
      { name: 'Pepperoni Feast', price: '₹500' },
      { name: 'Garlic Bread', price: '₹120' },
      { name: 'Coke (500ml)', price: '₹80' }
    ]
  },
  { 
    id: '8', 
    name: 'Sushi Stop', 
    type: 'Concession', 
    location: 'Section 215', 
    coords: { x: 85, y: 45 },
    waitTime: 18, 
    status: 'Open', 
    rating: 4.7, 
    icon: Utensils, 
    fastTrack: false,
    menu: [
      { name: 'California Roll', price: '₹450' },
      { name: 'Salmon Nigiri', price: '₹550' },
      { name: 'Miso Soup', price: '₹100' },
      { name: 'Green Tea', price: '₹60' }
    ]
  },
  { 
    id: '9', 
    name: 'Grill Master', 
    type: 'Concession', 
    location: 'Gate C', 
    coords: { x: 15, y: 25 },
    waitTime: 20, 
    status: 'Busy', 
    rating: 4.4, 
    icon: Utensils, 
    fastTrack: true,
    menu: [
      { name: 'BBQ Ribs', price: '₹650' },
      { name: 'Grilled Chicken', price: '₹450' },
      { name: 'Corn on the Cob', price: '₹80' },
      { name: 'Iced Tea', price: '₹90' }
    ]
  },
  { 
    id: '10', 
    name: 'Dessert Island', 
    type: 'Concession', 
    location: 'Section 105', 
    coords: { x: 75, y: 75 },
    waitTime: 5, 
    status: 'Open', 
    rating: 4.9, 
    icon: Coffee, 
    fastTrack: false,
    menu: [
      { name: 'Chocolate Sundae', price: '₹200' },
      { name: 'Fruit Salad', price: '₹150' },
      { name: 'Waffle with Ice Cream', price: '₹250' },
      { name: 'Milkshake', price: '₹180' }
    ]
  },
];

import { stadiums, Stadium } from '../data/stadiums';

interface ServicesProps {
  selectedStadium: Stadium;
}

export default function Services({ selectedStadium }: ServicesProps) {
  const [filter, setFilter] = useState('All');
  const [userFeedback, setUserFeedback] = useState<Record<string, 'up' | 'down' | null>>({});
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [showMap, setShowMap] = useState(true);

  useEffect(() => {
    const savedFeedback = localStorage.getItem('stadium_services_feedback');
    if (savedFeedback) {
      try {
        setUserFeedback(JSON.parse(savedFeedback));
      } catch (e) {
        console.error("Failed to parse feedback from localStorage", e);
      }
    }
  }, []);

  const handleFeedback = (e: React.MouseEvent, id: string, type: 'up' | 'down') => {
    e.stopPropagation();
    const newFeedback = {
      ...userFeedback,
      [id]: userFeedback[id] === type ? null : type
    };
    setUserFeedback(newFeedback);
    localStorage.setItem('stadium_services_feedback', JSON.stringify(newFeedback));
  };

  const filteredServices = services.filter(s => filter === 'All' || s.type === filter);

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-display">VENUE<br />SERVICES</h1>
          <p className="text-text-muted font-bold tracking-widest uppercase text-xs mt-4">Live Queue Optimization / {selectedStadium.city}</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowMap(!showMap)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all",
              showMap ? "bg-accent text-black" : "bg-surface border border-white/5 text-text-muted hover:text-white"
            )}
          >
            <MapIcon className="w-4 h-4" />
            {showMap ? 'Hide Map' : 'Show Map'}
          </button>
          <div className="flex items-center gap-3 bg-surface border border-white/5 p-2 rounded-xl">
            {['All', 'Concession', 'Merchandise', 'First Aid'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-2 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all",
                  filter === f 
                    ? "bg-accent text-black" 
                    : "text-text-muted hover:text-white"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className={cn("flex-1 space-y-12 transition-all duration-500", showMap ? "lg:w-2/3" : "w-full")}>
          {/* Recommendation Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-info p-10 rounded-[32px] relative overflow-hidden group"
          >
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur rounded-lg text-[10px] font-bold text-white uppercase tracking-widest">
                  <TrendingDown className="w-3 h-3" /> Smart Recommendation
                </div>
                <h2 className="text-4xl font-bold text-white tracking-tight uppercase">Stadium Brews is currently quiet</h2>
                <p className="text-white/80 max-w-md font-medium leading-relaxed">Estimated wait time is less than 5 minutes. Perfect time to grab a drink before the half-time rush!</p>
              </div>
              <button 
                onClick={() => setSelectedService(services.find(s => s.name === 'Stadium Brews') || null)}
                className="px-10 py-5 bg-white text-info font-bold rounded-xl hover:bg-white/90 transition-all shadow-2xl shadow-black/20 uppercase tracking-widest text-xs"
              >
                Locate Now
              </button>
            </div>
          </motion.div>

          <div className={cn(
            "grid gap-8 transition-all duration-500",
            showMap ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
          )}>
            {filteredServices.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedService(service)}
                className={cn(
                  "bg-surface border p-8 rounded-[24px] hover:border-accent/30 transition-all group cursor-pointer",
                  selectedService?.id === service.id ? "border-accent ring-1 ring-accent/20" : "border-white/5"
                )}
              >
            <div className="flex items-start justify-between mb-8">
              <div className="flex gap-4">
                <div className="p-4 bg-white/5 rounded-xl group-hover:bg-accent/10 transition-colors">
                  <service.icon className="w-6 h-6 text-text-muted group-hover:text-accent transition-colors" />
                </div>
                {service.fastTrack && (
                  <div className="p-4 bg-accent/10 rounded-xl flex items-center justify-center" title="Fast Track Available">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className={cn(
                  "px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest",
                  service.status === 'Open' ? "bg-accent/10 text-accent" : "bg-danger/10 text-danger"
                )}>
                  {service.status}
                </div>
                {/* Feedback Mechanism */}
                <div className="flex items-center gap-2 bg-black/20 p-1 rounded-lg border border-white/5">
                  <button 
                    onClick={(e) => handleFeedback(e, service.id, 'up')}
                    className={cn(
                      "p-1.5 rounded transition-colors",
                      userFeedback[service.id] === 'up' ? "text-accent bg-accent/10" : "text-text-muted hover:text-white"
                    )}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={(e) => handleFeedback(e, service.id, 'down')}
                    className={cn(
                      "p-1.5 rounded transition-colors",
                      userFeedback[service.id] === 'down' ? "text-danger bg-danger/10" : "text-text-muted hover:text-white"
                    )}
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors uppercase tracking-tight">{service.name}</h3>
                <p className="text-xs font-bold text-text-muted flex items-center gap-2 uppercase tracking-widest mt-2">
                  <MapPin className="w-3 h-3" /> {service.location}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Wait Time</p>
                    <div className="flex items-center gap-2">
                      <Clock className={cn("w-4 h-4", service.waitTime > 15 ? "text-danger" : "text-accent")} />
                      <span className="text-2xl font-[800] tracking-tighter text-white leading-none">{service.waitTime}m</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Rating</p>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span className="text-2xl font-[800] tracking-tighter text-white leading-none">{service.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-accent group-hover:text-black transition-all">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Interactive Map Sidebar */}
    <AnimatePresence>
      {showMap && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="lg:w-1/3 sticky top-32 h-[calc(100vh-12rem)]"
        >
          <div className="h-full bg-surface border border-white/5 rounded-[32px] overflow-hidden relative group">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="relative w-full h-full">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_30px_rgba(204,255,0,0.05)]">
                  <ellipse cx="50" cy="50" rx="45" ry="35" fill="none" stroke="#222" strokeWidth="0.5" />
                  <ellipse cx="50" cy="50" rx="25" ry="15" fill="#0a0a0a" stroke="#333" strokeWidth="0.5" />
                  
                  {/* Service Markers */}
                  {filteredServices.map((service) => (
                    <g key={service.id}>
                      <motion.circle
                        cx={service.coords.x}
                        cy={service.coords.y}
                        r={selectedService?.id === service.id ? 3 : 1.5}
                        fill={selectedService?.id === service.id ? "#CCFF00" : "#444"}
                        className="cursor-pointer"
                        onClick={() => setSelectedService(service)}
                        whileHover={{ scale: 1.5 }}
                      />
                      {selectedService?.id === service.id && (
                        <motion.circle
                          cx={service.coords.x}
                          cy={service.coords.y}
                          r={6}
                          fill="none"
                          stroke="#CCFF00"
                          strokeWidth="0.5"
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: [1, 2], opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </g>
                  ))}
                </svg>

                {/* Active Service Label on Map */}
                {selectedService && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ 
                      left: `${selectedService.coords.x}%`, 
                      top: `${selectedService.coords.y}%` 
                    }}
                    className="absolute -translate-x-1/2 -translate-y-full mb-4 bg-accent text-black px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-xl"
                  >
                    {selectedService.name}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-accent" />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute top-6 right-6 flex flex-col gap-2">
              <button className="p-3 bg-black/60 backdrop-blur border border-white/10 rounded-xl text-white hover:bg-accent hover:text-black transition-all">
                <Maximize2 className="w-4 h-4" />
              </button>
              <button className="p-3 bg-black/60 backdrop-blur border border-white/10 rounded-xl text-white hover:bg-accent hover:text-black transition-all">
                <Navigation className="w-4 h-4" />
              </button>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-black/60 backdrop-blur border border-white/10 p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <MapIcon className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white uppercase tracking-widest">Interactive Venue Map</p>
                    <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Click markers to explore</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-surface border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
            >
              <div className="p-8 md:p-12">
                <div className="flex items-start justify-between mb-10">
                  <div className="flex gap-6">
                    <div className="p-5 bg-accent/10 rounded-2xl">
                      <selectedService.icon className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white uppercase tracking-tight">{selectedService.name}</h2>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs font-bold text-text-muted uppercase tracking-widest flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" /> {selectedService.location}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-xs font-bold text-accent uppercase tracking-widest">{selectedService.type}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-text-muted hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest mb-2">Current Wait</p>
                    <div className="flex items-center gap-3">
                      <Clock className={cn("w-5 h-5", selectedService.waitTime > 15 ? "text-danger" : "text-accent")} />
                      <span className="text-3xl font-black text-white">{selectedService.waitTime}m</span>
                    </div>
                  </div>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest mb-2">User Rating</p>
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-accent fill-accent" />
                      <span className="text-3xl font-black text-white">{selectedService.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-accent" /> 
                      {selectedService.type === 'Merchandise' ? 'Available Items' : 'Menu Highlights'}
                    </h3>
                    <div className="px-3 py-1 bg-accent/10 rounded-lg text-[10px] font-bold text-accent uppercase tracking-widest">
                      Live Prices
                    </div>
                  </div>
                  
                  <div className="grid gap-3">
                    {selectedService.menu?.map((item, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center justify-between p-5 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors group/item"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover/item:bg-accent transition-colors" />
                          <span className="font-bold text-white tracking-tight">{item.name}</span>
                        </div>
                        <span className="font-mono text-accent font-bold">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 flex gap-4">
                  <button className="flex-1 py-5 bg-accent text-black font-bold rounded-xl hover:bg-accent/90 transition-all uppercase tracking-widest text-xs shadow-xl shadow-accent/10">
                    Order via App
                  </button>
                  {selectedService.fastTrack && (
                    <button className="flex-1 py-5 bg-surface border border-accent/30 text-accent font-bold rounded-xl hover:bg-accent/5 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4" /> Fast Track
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
