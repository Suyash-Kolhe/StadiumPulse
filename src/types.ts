/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VenueStatus {
  crowdLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  temperature: number;
  weather: string;
  activeAttendees: number;
  capacity: number;
}

export interface ServiceItem {
  id: string;
  name: string;
  type: 'Concession' | 'Restroom' | 'Merchandise' | 'First Aid';
  location: string;
  waitTime: number; // in minutes
  status: 'Open' | 'Closed' | 'Busy';
  rating: number;
}

export interface Alert {
  id: string;
  type: 'Info' | 'Warning' | 'Emergency';
  message: string;
  timestamp: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface UserProfile {
  name: string;
  language: string;
}
