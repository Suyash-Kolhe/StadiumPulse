import { Users, MapPin, Trophy, Car } from 'lucide-react';

export interface ParkingLot {
  id: string;
  name: string;
  totalSpaces: number;
  availableSpaces: number;
  fee: number;
  queueTime: number; // in minutes
  type: 'Premium' | 'General' | 'VIP';
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Stadium {
  id: string;
  name: string;
  city: string;
  capacity: number;
  coordinates: { lat: number; lng: number };
  description: string;
  image: string;
  sectors: string[];
  parkingLots: ParkingLot[];
  faq: FAQItem[];
}

export const stadiums: Stadium[] = [
  {
    id: 'narendra-modi',
    name: 'Narendra Modi Stadium',
    city: 'Ahmedabad',
    capacity: 132000,
    coordinates: { lat: 23.0919, lng: 72.5975 },
    description: 'The largest stadium in the world, located in Motera, Ahmedabad.',
    image: 'https://picsum.photos/seed/modi-stadium/800/600',
    sectors: ['North Stand', 'South Stand', 'East Stand', 'West Stand', 'Club Pavilion'],
    parkingLots: [
      { id: 'nm-p1', name: 'West Entry Lot', totalSpaces: 5000, availableSpaces: 1200, fee: 100, queueTime: 12, type: 'General' },
      { id: 'nm-p2', name: 'East Plaza Parking', totalSpaces: 3000, availableSpaces: 150, fee: 100, queueTime: 25, type: 'General' },
      { id: 'nm-vip', name: 'Presidential Lot', totalSpaces: 500, availableSpaces: 45, fee: 500, queueTime: 5, type: 'VIP' },
      { id: 'nm-p3', name: 'South Concourse B', totalSpaces: 4000, availableSpaces: 2100, fee: 150, queueTime: 8, type: 'Premium' },
    ],
    faq: [
      { question: "Are cameras allowed?", answer: "Professional cameras are strictly prohibited. Mobile phones with cameras are allowed." },
      { question: "Is outside food permitted?", answer: "No, outside food and beverages are not allowed inside the stadium premises." },
      { question: "What is the nearest metro station?", answer: "The Motera Stadium Metro Station is the closest, located just 500 meters from the main gate." }
    ]
  },
  {
    id: 'eden-gardens',
    name: 'Eden Gardens',
    city: 'Kolkata',
    capacity: 68000,
    coordinates: { lat: 22.5646, lng: 88.3433 },
    description: 'Often called the "Mecca of Indian Cricket", it is one of the oldest and most iconic stadiums.',
    image: 'https://picsum.photos/seed/eden-gardens/800/600',
    sectors: ['B.C. Roy Club House', 'K-Block', 'L-Block', 'High Court End'],
    parkingLots: [
      { id: 'eg-p1', name: 'Maidan Lot', totalSpaces: 2000, availableSpaces: 100, fee: 80, queueTime: 30, type: 'General' },
      { id: 'eg-p2', name: 'Metro Plaza', totalSpaces: 1500, availableSpaces: 450, fee: 120, queueTime: 15, type: 'Premium' },
    ],
    faq: [
      { question: "Is there a dress code?", answer: "There is no official dress code, but we recommend comfortable clothing and hats for day matches." },
      { question: "Are helmets allowed inside?", answer: "No, for security reasons, helmets are not allowed inside the stands. Cloakrooms are available at gates." }
    ]
  },
  {
    id: 'wankhede',
    name: 'Wankhede Stadium',
    city: 'Mumbai',
    capacity: 33108,
    coordinates: { lat: 18.9389, lng: 72.8258 },
    description: 'Famous for its proximity to the Arabian Sea and hosting the 2011 World Cup Final.',
    image: 'https://picsum.photos/seed/wankhede/800/600',
    sectors: ['North Stand', 'Vijay Merchant Stand', 'Garware Stand', 'Sachin Tendulkar Stand'],
    parkingLots: [
      { id: 'wk-p1', name: 'Marine Drive Lot', totalSpaces: 1000, availableSpaces: 50, fee: 200, queueTime: 40, type: 'Premium' },
      { id: 'wk-p2', name: 'Station Road B', totalSpaces: 800, availableSpaces: 200, fee: 100, queueTime: 20, type: 'General' },
    ],
    faq: [
      { question: "Are water bottles allowed?", answer: "Sealed plastic water bottles are allowed. Reusable metal bottles are prohibited." },
      { question: "Is re-entry permitted?", answer: "No, re-entry is not permitted once you exit the stadium gates." }
    ]
  },
  {
    id: 'chinnaswamy',
    name: 'M. Chinnaswamy Stadium',
    city: 'Bengaluru',
    capacity: 40000,
    coordinates: { lat: 12.9788, lng: 77.5996 },
    description: 'Located in the heart of Bengaluru, known for high-scoring matches and its solar power system.',
    image: 'https://picsum.photos/seed/chinnaswamy/800/600',
    sectors: ['P1 Stand', 'P2 Stand', 'Grand Stand', 'Pavilion End'],
    parkingLots: [
      { id: 'cs-p1', name: 'Cubbon Park South', totalSpaces: 1200, availableSpaces: 300, fee: 70, queueTime: 18, type: 'General' },
      { id: 'cs-p2', name: 'MG Road Multi-level', totalSpaces: 2500, availableSpaces: 1100, fee: 150, queueTime: 10, type: 'Premium' },
    ],
    faq: [
      { question: "Is the stadium eco-friendly?", answer: "Yes, Chinnaswamy is the first stadium in the world to be powered by solar panels and has advanced rainwater harvesting." },
      { question: "Are power banks allowed?", answer: "Yes, small portable power banks are allowed after security screening." }
    ]
  },
  {
    id: 'arun-jaitley',
    name: 'Arun Jaitley Stadium',
    city: 'Delhi',
    capacity: 41842,
    coordinates: { lat: 28.6379, lng: 77.2431 },
    description: 'Formerly Feroz Shah Kotla, it is the second oldest functional cricket stadium in India.',
    image: 'https://picsum.photos/seed/jaitley-stadium/800/600',
    sectors: ['Old Pavilion', 'North Stand', 'East Stand', 'Hill Stand'],
    parkingLots: [
      { id: 'aj-p1', name: 'Ring Road Lot', totalSpaces: 3000, availableSpaces: 800, fee: 90, queueTime: 14, type: 'General' },
    ],
    faq: [
      { question: "Where is the box office?", answer: "The main box office is located at Gate 3 on Bahadur Shah Zafar Marg." },
      { question: "Are children under 5 allowed for free?", answer: "Children above the age of 2 must have a valid ticket for entry." }
    ]
  },
  {
    id: 'chidambaram',
    name: 'MA Chidambaram Stadium',
    city: 'Chennai',
    capacity: 50000,
    coordinates: { lat: 13.0628, lng: 80.2793 },
    description: 'Chepauk is known for its knowledgeable crowd and spin-friendly tracks.',
    image: 'https://picsum.photos/seed/chepauk/800/600',
    sectors: ['Anna Pavilion', 'V. Pattabhiraman Gate', 'K-Block', 'I-Block'],
    parkingLots: [
      { id: 'mc-p1', name: 'Beach Road Parking', totalSpaces: 2000, availableSpaces: 150, fee: 60, queueTime: 22, type: 'General' },
    ],
    faq: [
      { question: "Is smoke-free stadium?", answer: "Yes, Chepauk is a strictly no-smoking zone. E-cigarettes are also prohibited." },
      { question: "Are flags allowed?", answer: "Small handheld flags with plastic sticks are allowed. Large banners require prior permission." }
    ]
  },
  {
    id: 'rajiv-gandhi',
    name: 'Rajiv Gandhi Int. Stadium',
    city: 'Hyderabad',
    capacity: 55000,
    coordinates: { lat: 17.4065, lng: 78.5505 },
    description: 'Home to Sunrisers Hyderabad, known for its modern facilities and large boundaries.',
    image: 'https://picsum.photos/seed/hyderabad-stadium/800/600',
    sectors: ['North Pavilion', 'South Pavilion', 'East Stand', 'West Stand'],
    parkingLots: [
      { id: 'rg-p1', name: 'Uppal Main Lot', totalSpaces: 4000, availableSpaces: 1200, fee: 50, queueTime: 12, type: 'General' },
    ],
    faq: [
      { question: "Is Wi-Fi available?", answer: "Free high-speed Wi-Fi is available for all spectators within the stadium bowl." },
      { question: "Where are the first aid kits?", answer: "First aid stations are located at every exit/entry gate and near the grandstand pavilion." }
    ]
  },
  {
    id: 'hpca',
    name: 'HPCA Stadium',
    city: 'Dharamshala',
    capacity: 23000,
    coordinates: { lat: 32.1976, lng: 76.3258 },
    description: 'One of the most beautiful stadiums in the world, situated in the lap of the Himalayas.',
    image: 'https://picsum.photos/seed/hpca-stadium/800/600',
    sectors: ['Main Pavilion', 'East Stand', 'West Stand', 'North Stand'],
    parkingLots: [
      { id: 'hp-p1', name: 'Mountain Side Lot', totalSpaces: 1000, availableSpaces: 400, fee: 40, queueTime: 5, type: 'General' },
    ],
    faq: [
      { question: "Will it be cold?", answer: "Even for day matches, temperatures can drop significantly. We highly recommend carrying a jacket." },
      { question: "Is there an ATM nearby?", answer: "The nearest ATM is 1.5km away in the main Dharamshala market. Please carry sufficient cash." }
    ]
  }
];
