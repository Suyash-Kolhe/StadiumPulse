import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../components/Dashboard';
import { stadiums } from '../data/stadiums';
import React from 'react';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver as a class
window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock recharts to avoid SVG sizing errors in jsdom
vi.mock('recharts', async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    ResponsiveContainer: ({ children }: any) => <div style={{ width: '800px', height: '400px' }}>{children}</div>,
  };
});

describe('Dashboard Ticket Booking', () => {
  const mockProps = {
    selectedStadium: stadiums[0],
    setSelectedStadium: vi.fn(),
    setActiveTab: vi.fn(),
    user: { name: 'Test User', email: 'test@example.com' }
  };

  it('calculates the total price correctly based on quantity', () => {
    render(<Dashboard {...mockProps} />);
    
    // Check initial estimated total (the one in the bottom summary)
    const totalElements = screen.getAllByText(/1,200/i);
    // Usually the second one is the estimated total in the summary
    expect(totalElements.length).toBeGreaterThan(0);

    // Select 3 tickets
    const quantitySelect = screen.getByLabelText(/Quantity/i);
    fireEvent.change(quantitySelect, { target: { value: '3' } });

    // New total should be ₹3,600
    const newTotalElement = screen.getByText(/3,600/i);
    expect(newTotalElement).toBeDefined();
  });

  it('disables the payment button until seats are selected', () => {
    render(<Dashboard {...mockProps} />);
    
    const payButton = screen.getByText(/PROCEED TO PAYMENTS/i);
    // By default, 0/1 seats selected, so it should be disabled
    expect(payButton).toBeDisabled();
  });
});
