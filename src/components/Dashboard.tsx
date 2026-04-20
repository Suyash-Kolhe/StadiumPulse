import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Thermometer, 
  Clock,
  TrendingUp,
  MapPin,
  ChevronRight,
  AlertCircle,
  Zap,
  Activity,
  ChevronDown,
  Ticket,
  CheckCircle2,
  CreditCard
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  ReferenceLine
} from 'recharts';
import { stadiums, Stadium } from '../data/stadiums';
import { cn } from '../lib/utils';

const data = [
  { time: '14:00', attendees: 20000 },
  { time: '15:00', attendees: 45000 },
  { time: '16:00', attendees: 68000 },
  { time: '17:00', attendees: 75000 },
  { time: '18:00', attendees: 79500 },
  { time: '19:00', attendees: 78000 },
];

interface DashboardProps {
  selectedStadium: Stadium;
  setSelectedStadium: (stadium: Stadium) => void;
  setActiveTab: (tab: string) => void;
  user: { name: string; email: string } | null;
}

export default function Dashboard({ selectedStadium, setSelectedStadium, setActiveTab, user }: DashboardProps) {
  const [densityStadium, setDensityStadium] = useState<Stadium>(selectedStadium);
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedSector, setSelectedSector] = useState(selectedStadium.sectors[0]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookingStep, setBookingStep] = useState<'selection' | 'payment' | 'success'>('selection');
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  // Mock available seats for the visual grid
  const seatAvailability = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: `${selectedSector.slice(0, 1)}${i + 1}`,
      isAvailable: Math.random() > 0.3
    }));
  }, [selectedSector]);

  const toggleSeat = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(id => id !== seatId));
    } else if (selectedSeats.length < ticketCount) {
      setSelectedSeats(prev => [...prev, seatId]);
    }
  };

  const densityData = useMemo(() => {
    const seed = densityStadium.id.length;
    return [
      { time: '14:00', value: 1, level: 'Low' },
      { time: '15:00', value: 2, level: 'Moderate' },
      { time: '16:00', value: 2, level: 'Moderate' },
      { time: '17:00', value: 3, level: 'High' },
      { time: '18:00', value: 4, level: 'Critical' },
      { time: '19:00', value: 3, level: 'High' },
      { time: '20:00', value: 2, level: 'Moderate' },
    ].map(item => {
      // Dynamic shift based on stadium
      const shift = (seed % 3) - 1;
      let newValue = Math.min(4, Math.max(1, item.value + shift));
      const labels = ['', 'Low', 'Moderate', 'High', 'Critical'];
      return { ...item, value: newValue, level: labels[newValue] };
    });
  }, [densityStadium]);

  const getYAxisLabel = (value: number) => {
    const labels: Record<number, string> = {
      1: 'LOW',
      2: 'MOD',
      3: 'HIGH',
      4: 'CRIT'
    };
    return labels[value] || '';
  };

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="text-[10px] font-black text-accent uppercase tracking-[4px]">COMMANDER: {user?.name || 'GUEST'}</span>
          </div>
          <h1 className="text-display leading-tight">{selectedStadium.name.split(' ').slice(0, -1).join(' ')}<br />{selectedStadium.name.split(' ').slice(-1)}</h1>
          <p className="text-text-muted font-bold tracking-widest uppercase text-xs mt-4">Real-time Command Center / {selectedStadium.city}</p>
        </div>
        <div className="text-right space-y-1">
          <div className="text-accent text-sm font-bold tracking-[2px] uppercase">Latest Sync: 14:32:01</div>
          <div className="text-accent text-sm font-bold tracking-[2px] uppercase">Capacity: {selectedStadium.capacity.toLocaleString()}</div>
        </div>
      </header>

      {/* Stadium Selection Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="section-label mb-0">Select Venue</p>
          <div className="text-text-muted text-[10px] font-bold tracking-widest uppercase">8 Available across India</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stadiums.map((stadium) => (
            <motion.button
              key={stadium.id}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedStadium(stadium)}
              className={cn(
                "p-6 rounded-[24px] border transition-all text-left group relative overflow-hidden h-full",
                selectedStadium.id === stadium.id 
                  ? "bg-accent border-accent" 
                  : "bg-surface border-white/5 hover:border-white/20"
              )}
            >
              <div className="relative z-10 space-y-4">
                <div className="flex items-start justify-between">
                  <div className={cn(
                    "p-3 rounded-xl",
                    selectedStadium.id === stadium.id ? "bg-black/10" : "bg-white/5"
                  )}>
                    <MapPin className={cn("w-5 h-5", selectedStadium.id === stadium.id ? "text-black" : "text-accent")} />
                  </div>
                  {selectedStadium.id === stadium.id && (
                    <div className="bg-black text-accent text-[8px] font-bold px-2 py-1 rounded uppercase tracking-widest">Active</div>
                  )}
                </div>
                <div>
                  <h3 className={cn("font-bold text-lg leading-tight uppercase", selectedStadium.id === stadium.id ? "text-black" : "text-white")}>
                    {stadium.name}
                  </h3>
                  <p className={cn("text-[10px] font-bold uppercase tracking-widest mt-1", selectedStadium.id === stadium.id ? "text-black/60" : "text-text-muted")}>
                    {stadium.city} • {stadium.capacity.toLocaleString()} Seats
                  </p>
                </div>
              </div>
              {/* Decorative Background Image */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                <img src={stadium.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Attendance', value: (selectedStadium.capacity * 0.9).toLocaleString().split('.')[0], sub: '90.2% Capacity', icon: Users, color: 'text-accent', bg: 'bg-surface' },
          { label: 'Crowd Density', value: 'High', sub: 'Main Concourse', icon: TrendingUp, color: 'text-danger', bg: 'bg-surface' },
          { label: 'Temperature', value: '28°C', sub: 'Clear Sky', icon: Thermometer, color: 'text-info', bg: 'bg-surface' },
          { label: 'Wait Times', value: '15m', sub: 'Avg. Concession', icon: Clock, color: 'text-accent', bg: 'bg-surface' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn("p-8 rounded-[24px] border border-white/5 transition-colors group", stat.bg)}
          >
            <div className="flex items-start justify-between mb-6">
              <p className="section-label mb-0">{stat.label}</p>
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
            <div className="space-y-1">
              <div className="text-[48px] font-[800] tracking-[-1px] leading-none text-white">{stat.value}</div>
              <p className="text-[14px] text-text-muted font-semibold uppercase tracking-wider">{stat.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-surface border border-white/5 p-8 rounded-[24px]">
          <div className="flex items-center justify-between mb-8">
            <p className="section-label">Attendance Flow</p>
            <div className="text-accent text-xs font-bold tracking-widest uppercase">Live Stream</div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorAttend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#CCFF00" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#CCFF00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#444" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fontWeight: 700, letterSpacing: 1 }}
                />
                <YAxis 
                  stroke="#444" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `${value / 1000}k`}
                  tick={{ fontWeight: 700 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#151515', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff', fontWeight: 700 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="attendees" 
                  stroke="#CCFF00" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorAttend)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Crowd Density Chart */}
        <div className="lg:col-span-2 bg-surface border border-white/5 p-8 rounded-[24px]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Activity className="w-4 h-4 text-accent" />
              </div>
              <p className="section-label mb-0">Live Crowd Density Index</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-text-muted uppercase tracking-widest mr-2">Switch Venue:</span>
              <div className="relative">
                <select 
                  value={densityStadium.id}
                  onChange={(e) => {
                    const stadium = stadiums.find(s => s.id === e.target.value);
                    if (stadium) setDensityStadium(stadium);
                  }}
                  className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black tracking-widest text-white uppercase appearance-none pr-10 focus:outline-none focus:border-accent/50 cursor-pointer"
                >
                  {stadiums.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-text-muted pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={densityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#444" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fontWeight: 700, letterSpacing: 1 }}
                />
                <YAxis 
                  stroke="#444" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  domain={[0, 5]}
                  ticks={[1, 2, 3, 4]}
                  tickFormatter={getYAxisLabel}
                  tick={{ fontWeight: 700, letterSpacing: 1 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#151515', border: '1px solid #333', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff', fontWeight: 700, fontSize: '10px', textTransform: 'uppercase' }}
                  labelStyle={{ color: '#aaa', fontSize: '9px', marginBottom: '4px', fontWeight: 800 }}
                  formatter={(value: number) => [getYAxisLabel(value), 'Density Level']}
                />
                <ReferenceLine y={3.5} stroke="#FF3B30" strokeDasharray="3 3" label={{ position: 'right', value: 'ALERT THRESHOLD', fill: '#FF3B30', fontSize: 8, fontWeight: 900 }} />
                <Line 
                  type="stepAfter" 
                  dataKey="value" 
                  stroke="#CCFF00" 
                  strokeWidth={3}
                  dot={{ fill: '#000', stroke: '#CCFF00', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#CCFF00', strokeWidth: 2, fill: '#CCFF00' }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 grid grid-cols-4 gap-4">
            {[
              { label: 'Low', color: 'bg-green-500' },
              { label: 'Moderate', color: 'bg-yellow-500' },
              { label: 'High', color: 'bg-orange-500' },
              { label: 'Critical', color: 'bg-red-500' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", l.color)} />
                <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Booking Section */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <p className="section-label mb-0">Ticket Booking</p>
            <div className="flex items-center gap-2 text-text-muted text-[10px] font-bold tracking-widest uppercase">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Booking Live for IPL 2024
            </div>
          </div>
          
          <div className="bg-surface border border-white/5 rounded-[32px] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Event Info */}
              <div className="p-10 bg-accent/5 border-r border-white/5 space-y-8">
                <div className="space-y-4">
                  <span className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-lg text-[10px] font-black text-accent uppercase tracking-widest">
                    Featured Event
                  </span>
                  <h3 className="text-4xl font-black text-white leading-tight uppercase tracking-tighter">
                    {selectedStadium.city} TITANS<br /><span className="text-accent">VS</span><br />MUMBAI INDIANS
                  </h3>
                  <div className="flex items-center gap-4 text-text-muted text-xs font-bold uppercase tracking-widest">
                    <Clock className="w-4 h-4" />
                    28 APR / 19:30 IST
                  </div>
                </div>

                <div className="space-y-4 pt-8 border-t border-white/10">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[2px]">
                    <span className="text-text-muted">Selected Venue</span>
                    <span className="text-white">{selectedStadium.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[2px]">
                    <span className="text-text-muted">Base Price From</span>
                    <span className="text-accent underline">₹1,200.00</span>
                  </div>
                </div>

                <div className="p-6 bg-black/40 border border-white/5 rounded-2xl flex gap-4">
                  <Ticket className="w-6 h-6 text-accent shrink-0" />
                  <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-widest">
                    Digital tickets only. Safe and secure entry via QR code on your mobile device.
                  </p>
                </div>
              </div>

              {/* Booking Form Interface */}
              <div className="p-10 space-y-8 min-h-[500px] flex flex-col">
                <AnimatePresence mode="wait">
                  {bookingStep === 'selection' && (
                    <motion.div
                      key="selection"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6 flex-1"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <label htmlFor="sector-select" className="text-[10px] font-black text-text-muted uppercase tracking-[4px] px-2">Sector</label>
                          <div className="relative">
                            <select 
                              id="sector-select"
                              value={selectedSector}
                              onChange={(e) => {
                                setSelectedSector(e.target.value);
                                setSelectedSeats([]);
                              }}
                              aria-label="Select stadium sector"
                              className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold tracking-widest text-white appearance-none focus:outline-none focus:border-accent/50"
                            >
                              {selectedStadium.sectors.map(sector => (
                                <option key={sector} value={sector} className="bg-bg">{sector.toUpperCase()}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label htmlFor="quantity-select" className="text-[10px] font-black text-text-muted uppercase tracking-[4px] px-2">Quantity</label>
                          <div className="relative">
                            <select 
                              id="quantity-select"
                              value={ticketCount}
                              onChange={(e) => {
                                setTicketCount(Number(e.target.value));
                                setSelectedSeats([]);
                              }}
                              aria-label="Number of tickets"
                              className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold tracking-widest text-white appearance-none focus:outline-none focus:border-accent/50"
                            >
                              {[1, 2, 3, 4, 5, 6].map(num => (
                                <option key={num} value={num} className="bg-bg">{num}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center px-2">
                           <label className="text-[10px] font-black text-text-muted uppercase tracking-[4px]">Choose Seats ({selectedSeats.length}/{ticketCount})</label>
                           <span className="text-[8px] font-bold text-accent uppercase tracking-widest">Sector {selectedSector.slice(0, 1)} Grid</span>
                        </div>
                        <div className="bg-black/20 p-4 rounded-2xl border border-white/5" role="group" aria-label="Seat Selection Grid">
                          <div className="grid grid-cols-8 gap-2">
                            {seatAvailability.map((seat) => (
                              <button
                                key={seat.id}
                                disabled={!seat.isAvailable}
                                onClick={() => toggleSeat(seat.id)}
                                className={cn(
                                  "aspect-square rounded-md text-[8px] font-bold flex items-center justify-center transition-all",
                                  !seat.isAvailable 
                                    ? "bg-white/5 text-transparent cursor-not-allowed opacity-20" 
                                    : selectedSeats.includes(seat.id)
                                      ? "bg-accent text-black"
                                      : "bg-white/10 text-white/40 hover:bg-white/20"
                                )}
                                title={seat.isAvailable ? `Seat ${seat.id}` : 'Occupied'}
                              >
                                {seat.id}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 pt-6">
                        <div className="flex items-center justify-between px-2">
                           <span className="text-[10px] font-black text-white uppercase tracking-[4px]">Estimated Total</span>
                           <span className="text-2xl font-black text-accent italic">₹{(1200 * ticketCount).toLocaleString()}</span>
                        </div>
                        <button 
                          disabled={selectedSeats.length !== ticketCount}
                          onClick={() => setBookingStep('payment')}
                          className="w-full py-6 bg-accent text-black rounded-2xl text-[10px] font-black uppercase tracking-[4px] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group"
                        >
                          PROCEED TO PAYMENTS
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </button>
                        <p className="text-[8px] font-bold text-center text-text-muted uppercase tracking-[2px]">
                          No refunds available within 48 hours of matches.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {bookingStep === 'payment' && (
                    <motion.div
                      key="payment"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8 flex-1 flex flex-col h-full"
                    >
                      <div className="space-y-3">
                        <button 
                          onClick={() => setBookingStep('selection')}
                          className="text-[10px] font-black text-accent uppercase tracking-[4px] hover:underline"
                        >
                          ← BACK TO SELECTION
                        </button>
                        <h4 className="text-2xl font-black text-white uppercase tracking-tighter">SELECT PAYMENT</h4>
                      </div>

                      <div className="space-y-3 flex-1">
                        {[
                          { id: 'upi', label: 'UPI / BHIM', icon: Zap, sub: 'Instant transfer' },
                          { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, sub: 'Visa, Master, Amex' },
                          { id: 'wallet', label: 'Digital Wallets', icon: Ticket, sub: 'Paytm, PhonePe, Amazon' }
                        ].map((method) => (
                          <button
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id)}
                            className={cn(
                              "w-full p-6 rounded-2xl border transition-all flex items-center justify-between group",
                              paymentMethod === method.id 
                                ? "bg-accent/10 border-accent" 
                                : "bg-black/40 border-white/5 hover:border-white/20"
                            )}
                          >
                            <div className="flex items-center gap-4">
                              <div className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center",
                                paymentMethod === method.id ? "bg-accent/20" : "bg-white/5"
                              )}>
                                <method.icon className={cn("w-6 h-6", paymentMethod === method.id ? "text-accent" : "text-white/40")} />
                              </div>
                              <div className="text-left">
                                <div className={cn("text-[10px] font-black uppercase tracking-widest", paymentMethod === method.id ? "text-accent" : "text-white")}>
                                  {method.label}
                                </div>
                                <div className="text-[8px] font-bold text-text-muted uppercase tracking-widest mt-0.5">
                                  {method.sub}
                                </div>
                              </div>
                            </div>
                            <div className={cn(
                              "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                              paymentMethod === method.id ? "border-accent bg-accent" : "border-white/10"
                            )}>
                              {paymentMethod === method.id && <Activity className="w-3 h-3 text-black" />}
                            </div>
                          </button>
                        ))}
                      </div>

                      <div className="space-y-4 pt-6 border-t border-white/5">
                        <div className="flex items-center justify-between px-2">
                           <span className="text-[10px] font-black text-white uppercase tracking-[4px]">Order Total</span>
                           <span className="text-2xl font-black text-accent italic">₹{(1200 * ticketCount).toLocaleString()}</span>
                        </div>
                        <button 
                          disabled={!paymentMethod}
                          onClick={() => setBookingStep('success')}
                          className="w-full py-6 bg-accent text-black rounded-2xl text-[10px] font-black uppercase tracking-[4px] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group"
                        >
                          COMPLETE TRANSACTION
                          <Zap className="w-5 h-5 group-hover:scale-125 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {bookingStep === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex-1 flex flex-col items-center justify-center text-center space-y-8 py-10"
                    >
                      <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(204,255,0,0.3)]">
                        <CheckCircle2 className="w-12 h-12 text-black" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-3xl font-black text-white uppercase tracking-tighter">BOOKING SECURED</h4>
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-[4px]">Ticket ID: #AP-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                      </div>
                      <div className="p-6 bg-accent/5 border border-accent/20 rounded-2xl w-full">
                         <div className="text-[8px] font-black text-accent uppercase tracking-widest mb-2">Digital Pass Sent To</div>
                         <div className="text-sm font-bold text-white uppercase">{user?.email || 'GUEST USER'}</div>
                      </div>
                      <button 
                        onClick={() => {
                          setBookingStep('selection');
                          setSelectedSeats([]);
                          setPaymentMethod(null);
                        }}
                        className="text-[10px] font-black text-accent uppercase tracking-[4px] hover:underline"
                      >
                        BOOK MORE TICKETS
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Alerts & Roadmap */}
        <div className="space-y-8 flex flex-col">
          <div className="bg-surface border border-white/5 p-8 rounded-[24px] flex-1">
            <p className="section-label">Active Alerts</p>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
              {[
                { type: 'Warning', msg: 'High congestion at Gate B. Use Gate C for faster exit.', time: '2m ago', color: 'text-danger', bg: 'bg-danger/10' },
                { type: 'Info', msg: 'Half-time show starting in 10 minutes.', time: '5m ago', color: 'text-info', bg: 'bg-info/10' },
                { type: 'Info', msg: 'New merchandise drop at Section 104.', time: '15m ago', color: 'text-accent', bg: 'bg-accent/10' },
              ].map((alert, i) => (
                <div key={i} className="p-5 bg-white/5 border border-white/5 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={cn("text-[10px] font-bold uppercase tracking-widest", alert.color)}>{alert.type}</span>
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{alert.time}</span>
                  </div>
                  <p className="text-sm text-gray-200 leading-tight font-medium">{alert.msg}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-info p-8 rounded-[24px] text-white">
            <h3 className="text-lg font-bold uppercase tracking-widest mb-4">Solution Roadmap</h3>
            <p className="text-sm opacity-90 leading-relaxed mb-6 font-medium">
              Enhance the attendee experience with these strategic integrations:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                'AR WAYFINDING', 'SMART CONCESSION RECO', 'PREDICTIVE BOTTLENECK AI',
                'GEO-LOCATED BUDDY FINDER', 'IN-SEAT DELIVERY SYNC', 'DYNAMIC GATE ASSIGNMENT'
              ].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-white/20 rounded-lg text-[10px] font-bold tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-accent p-8 rounded-[24px] text-black">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6" />
              <h3 className="text-lg font-bold uppercase tracking-widest">Fast Track</h3>
            </div>
            <p className="text-sm text-black/70 leading-relaxed mb-6 font-bold uppercase">
              Skip the lines. Pre-book your food & merch slots now.
            </p>
            <button 
              onClick={() => setActiveTab('fasttrack')}
              className="w-full py-4 bg-black text-accent font-bold rounded-xl hover:opacity-90 transition-all uppercase tracking-widest text-xs"
            >
              Reserve Slot
            </button>
          </div>

          <div className="bg-danger p-8 rounded-[24px] text-white">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold uppercase tracking-widest">Emergency SOS</h3>
            </div>
            <p className="text-sm opacity-90 leading-relaxed mb-6 font-medium">
              Immediate assistance required? Ping security with your GPS location.
            </p>
            <button 
              onClick={() => setActiveTab('sos')}
              className="w-full py-4 bg-white text-danger font-bold rounded-xl hover:bg-white/90 transition-all uppercase tracking-widest text-xs"
            >
              Open SOS Panel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
