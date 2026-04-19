import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Clock, 
  Utensils, 
  ShoppingBag, 
  CheckCircle2, 
  ChevronRight,
  Calendar,
  Ticket,
  MapPin,
  X,
  Info,
  Star
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Stadium } from '../data/stadiums';

interface FastTrackProps {
  selectedStadium: Stadium;
}

const timeSlots = [
  "17:00 - 17:15",
  "17:15 - 17:30",
  "17:30 - 17:45",
  "17:45 - 18:00",
  "18:00 - 18:15",
  "18:15 - 18:30",
];

const bookableItems = [
  { 
    id: 'f1', 
    name: 'Premium Burger Combo', 
    price: '₹450', 
    category: 'Food', 
    icon: Utensils, 
    vendor: 'Burger Hub',
    description: 'Our signature double-patty wagyu beef burger served with truffle fries and a large soda. Perfectly seasoned and grilled to perfection.',
    ingredients: ['Wagyu Beef', 'Brioche Bun', 'Truffle Oil', 'Cheddar Cheese', 'Secret Sauce'],
    image: 'https://picsum.photos/seed/burger/800/600',
    rating: 4.8
  },
  { 
    id: 'f2', 
    name: 'Match Day Jersey', 
    price: '₹1,200', 
    category: 'Merch', 
    icon: ShoppingBag, 
    vendor: 'Fan Shop',
    description: 'Official 2024 season match day jersey. Breathable fabric with high-quality embroidery. Available in all sizes.',
    ingredients: ['100% Polyester', 'Moisture-wicking', 'Embroidered Crest'],
    image: 'https://picsum.photos/seed/jersey/800/600',
    rating: 4.9
  },
  { 
    id: 'f3', 
    name: 'Snack Bucket', 
    price: '₹300', 
    category: 'Food', 
    icon: Utensils, 
    vendor: 'Quick Bites',
    description: 'A massive bucket filled with buttery popcorn, nachos with cheese dip, and spicy peanuts. The ultimate match companion.',
    ingredients: ['Corn', 'Cheese Sauce', 'Peanuts', 'Sea Salt'],
    image: 'https://picsum.photos/seed/snacks/800/600',
    rating: 4.5
  },
  { 
    id: 'f4', 
    name: 'Limited Edition Cap', 
    price: '₹600', 
    category: 'Merch', 
    icon: ShoppingBag, 
    vendor: 'Fan Shop',
    description: 'Adjustable snapback cap with the team logo. Limited edition release for the championship finals.',
    ingredients: ['Cotton Twill', 'Adjustable Strap', '3D Embroidery'],
    image: 'https://picsum.photos/seed/cap/800/600',
    rating: 4.7
  },
];

const pastBookings = [
  {
    id: 'pb1',
    name: 'Premium Burger Combo',
    date: '2024-04-10',
    time: '18:30 - 18:45',
    vendor: 'Burger Hub',
    status: 'Completed',
    price: '₹450'
  },
  {
    id: 'pb2',
    name: 'Official Team Scarf',
    date: '2024-03-28',
    time: '17:15 - 17:30',
    vendor: 'Fan Shop',
    status: 'Completed',
    price: '₹400'
  }
];

export default function FastTrack({ selectedStadium }: FastTrackProps) {
  const [activeTab, setActiveTab] = useState<'book' | 'history'>('book');
  const [step, setStep] = useState(1);
  const [selectedItem, setSelectedItem] = useState<typeof bookableItems[0] | null>(null);
  const [viewingItem, setViewingItem] = useState<typeof bookableItems[0] | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [viewingBooking, setViewingBooking] = useState<typeof pastBookings[0] | null>(null);

  const handleBook = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setBookingConfirmed(true);
    }, 2000);
  };

  const reset = () => {
    setStep(1);
    setSelectedItem(null);
    setSelectedSlot(null);
    setBookingConfirmed(false);
  };

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-display text-accent">FAST<br />TRACK</h1>
          <p className="text-text-muted font-bold tracking-widest uppercase text-xs mt-4">
            Pre-Event Queue Booking / {selectedStadium.name}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-surface border border-white/5 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('book')}
              className={cn(
                "px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                activeTab === 'book' ? "bg-accent text-black" : "text-text-muted hover:text-white"
              )}
            >
              Book Now
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={cn(
                "px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                activeTab === 'history' ? "bg-accent text-black" : "text-text-muted hover:text-white"
              )}
            >
              My History
            </button>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-lg text-[10px] font-bold text-accent uppercase tracking-widest">
            <Zap className="w-3 h-3" /> Skip the Line
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {activeTab === 'book' ? (
          <motion.div
            key="book-tab"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            {/* Selection Area */}
            <div className="lg:col-span-2 space-y-8">
              <AnimatePresence mode="wait">
                {bookingConfirmed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-accent p-12 rounded-[40px] text-black text-center space-y-6"
                  >
                    <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-10 h-10 text-accent" />
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter">Booking Confirmed!</h2>
                    <p className="text-black/70 font-bold uppercase tracking-widest text-sm">
                      Your Fast-Track Pass is ready for {selectedItem?.name}
                    </p>
                    <div className="bg-black/10 p-6 rounded-2xl border border-black/10 inline-block">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1">Your Time Slot</p>
                      <p className="text-2xl font-black">{selectedSlot}</p>
                    </div>
                    <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                      <button 
                        onClick={reset}
                        className="px-10 py-4 bg-black text-white font-bold rounded-xl uppercase tracking-widest text-xs hover:opacity-90 transition-all"
                      >
                        Book Another Slot
                      </button>
                      <button 
                        onClick={() => {
                          reset();
                          setActiveTab('history');
                        }}
                        className="px-10 py-4 bg-transparent border border-black text-black font-bold rounded-xl uppercase tracking-widest text-xs hover:bg-black/5 transition-all"
                      >
                        View History
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    {step === 1 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">1. Select Item</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {bookableItems.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => {
                                setSelectedItem(item);
                                setStep(2);
                              }}
                              className={cn(
                                "p-6 rounded-[24px] border transition-all text-left flex items-center justify-between group",
                                selectedItem?.id === item.id 
                                  ? "bg-accent border-accent text-black" 
                                  : "bg-surface border-white/5 text-white hover:border-accent/30"
                              )}
                            >
                              <div className="flex items-center gap-4">
                                <div className={cn(
                                  "p-3 rounded-xl",
                                  selectedItem?.id === item.id ? "bg-black/10" : "bg-white/5"
                                )}>
                                  <item.icon className="w-6 h-6" />
                                </div>
                                <div>
                                  <p className="font-bold uppercase tracking-tight">{item.name}</p>
                                  <p className={cn(
                                    "text-[10px] font-bold uppercase tracking-widest",
                                    selectedItem?.id === item.id ? "text-black/60" : "text-text-muted"
                                  )}>{item.vendor}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-black text-lg">{item.price}</p>
                                <ChevronRight className="w-4 h-4 ml-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">2. Choose Time Slot</h2>
                          <button onClick={() => setStep(1)} className="text-[10px] font-bold text-accent uppercase tracking-widest hover:underline">Change Item</button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setSelectedSlot(slot)}
                              className={cn(
                                "p-4 rounded-xl border text-xs font-bold tracking-widest uppercase transition-all",
                                selectedSlot === slot 
                                  ? "bg-accent border-accent text-black" 
                                  : "bg-surface border-white/5 text-text-muted hover:text-white hover:border-white/20"
                              )}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                        <div className="pt-8">
                          <button
                            disabled={!selectedSlot || isBooking}
                            onClick={handleBook}
                            className="w-full py-5 bg-accent text-black font-black rounded-2xl uppercase tracking-[0.2em] text-sm hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                          >
                            {isBooking ? (
                              <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <Ticket className="w-5 h-5" />
                                Confirm Reservation
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Info Panel */}
            <div className="space-y-8">
              <div className="bg-surface border border-white/5 p-8 rounded-[32px] space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent/10 rounded-xl">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">How it works</h3>
                </div>
                <div className="space-y-6">
                  {[
                    { icon: Calendar, title: "Pre-Book", desc: "Select your items and preferred pickup window before you even reach the stadium." },
                    { icon: MapPin, title: "Fast-Track Lane", desc: "Head to the dedicated Fast-Track lane at the vendor location." },
                    { icon: Ticket, title: "Scan & Go", desc: "Show your digital pass, collect your items, and get back to the action." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <item.icon className="w-5 h-5 text-accent shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-white uppercase tracking-widest mb-1">{item.title}</p>
                        <p className="text-xs text-text-muted leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-info/10 border border-info/20 p-8 rounded-[32px] space-y-4">
                <h4 className="text-xs font-black text-info uppercase tracking-[0.2em]">Pro Tip</h4>
                <p className="text-xs text-info/90 leading-relaxed font-bold uppercase">
                  Book your half-time snacks at least 30 minutes in advance to guarantee your preferred slot!
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="history-tab"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Your History</h2>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Past Bookings & Reservations</p>
              </div>
              <div className="px-4 py-2 bg-white/5 rounded-lg text-[10px] font-bold text-text-muted uppercase tracking-widest">
                {pastBookings.length} Total
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastBookings.map((booking) => (
                <div 
                  key={booking.id}
                  onClick={() => setViewingBooking(booking)}
                  className="bg-surface border border-white/5 p-8 rounded-[24px] flex items-center justify-between group hover:border-accent/30 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-white/5 rounded-2xl text-text-muted group-hover:text-accent transition-colors">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white uppercase tracking-tight group-hover:text-accent transition-colors">{booking.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{booking.vendor}</span>
                        <span className="w-1 h-1 rounded-full bg-white/10" />
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{booking.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-white">{booking.price}</p>
                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest mt-1">{booking.status}</p>
                  </div>
                </div>
              ))}
            </div>

            {pastBookings.length === 0 && (
              <div className="text-center py-20 bg-surface border border-white/5 rounded-[32px]">
                <Info className="w-12 h-12 text-text-muted mx-auto mb-4" />
                <p className="text-text-muted font-bold uppercase tracking-widest text-sm">No past bookings found</p>
                <button 
                  onClick={() => setActiveTab('book')}
                  className="mt-6 text-accent font-bold uppercase tracking-widest text-xs hover:underline"
                >
                  Make your first booking
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detailed Booking Modal */}
      <AnimatePresence>
        {viewingBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingBooking(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-surface border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
            >
              <div className="p-8 md:p-12">
                <div className="flex items-start justify-between mb-10">
                  <div className="flex gap-6">
                    <div className="p-5 bg-accent/10 rounded-2xl">
                      <Ticket className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Booking Details</h2>
                      <p className="text-xs font-bold text-text-muted uppercase tracking-widest mt-2">Order #{viewingBooking.id}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setViewingBooking(null)}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-text-muted hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Item</span>
                      <span className="font-bold text-white">{viewingBooking.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Vendor</span>
                      <span className="font-bold text-white">{viewingBooking.vendor}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Date</span>
                      <span className="font-bold text-white">{viewingBooking.date}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Time Slot</span>
                      <span className="font-bold text-accent">{viewingBooking.time}</span>
                    </div>
                    <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                      <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Total Paid</span>
                      <span className="text-2xl font-black text-white">{viewingBooking.price}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-xl border border-accent/10">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest">This reservation was successfully redeemed</p>
                  </div>
                </div>

                <div className="mt-10">
                  <button 
                    onClick={() => setViewingBooking(null)}
                    className="w-full py-5 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Loader2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
