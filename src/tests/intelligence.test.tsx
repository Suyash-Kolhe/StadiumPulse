import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import VenueIntelligence from '../components/VenueIntelligence';
import { stadiums } from '../data/stadiums';

// Mock the Gemini SDK
vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: class {
      models = {
        generateContent: vi.fn().mockResolvedValue({
          text: "MOCKED_INSIGHT"
        })
      };
    }
  };
});

describe('VenueIntelligence Component', () => {
  const mockStadium = stadiums[0];

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GEMINI_API_KEY = 'test-key';
  });

  it('shows loading state initially', async () => {
    render(<VenueIntelligence stadium={mockStadium} />);
    expect(screen.getByText(/Synthesizing/i)).toBeDefined();
  });

  it('renders insight after loading', async () => {
    render(<VenueIntelligence stadium={mockStadium} />);
    
    const insightElement = await screen.findByText("MOCKED_INSIGHT");
    expect(insightElement).toBeDefined();
  });

  it('displays predictive safety score', async () => {
    render(<VenueIntelligence stadium={mockStadium} />);
    
    const scoreElement = await screen.findByText(/Predictive Safety Score: 98%/i);
    expect(scoreElement).toBeDefined();
  });
});
