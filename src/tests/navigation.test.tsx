import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Sidebar from '../components/Sidebar';

// Mock ResizeObserver
window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe('Sidebar Navigation', () => {
  const mockSetActiveTab = vi.fn();
  const mockOnLogout = vi.fn();
  const mockOnOpenSettings = vi.fn();
  const mockUser = { name: 'John Doe', email: 'john@example.com' };

  it('renders all navigation items', () => {
    render(
      <Sidebar 
        activeTab="dashboard" 
        setActiveTab={mockSetActiveTab} 
        user={mockUser} 
        onLogout={mockOnLogout} 
        onOpenSettings={mockOnOpenSettings} 
      />
    );

    expect(screen.getByLabelText('Navigate to Dashboard')).toBeDefined();
    expect(screen.getByLabelText('Navigate to Live Map')).toBeDefined();
    expect(screen.getByLabelText('Navigate to Announcements')).toBeDefined();
  });

  it('calls setActiveTab when a navigation item is clicked', () => {
    render(
      <Sidebar 
        activeTab="dashboard" 
        setActiveTab={mockSetActiveTab} 
        user={mockUser} 
        onLogout={mockOnLogout} 
        onOpenSettings={mockOnOpenSettings} 
      />
    );

    fireEvent.click(screen.getByLabelText('Navigate to Live Map'));
    expect(mockSetActiveTab).toHaveBeenCalledWith('map');
  });

  it('calls onOpenSettings when the settings button is clicked', () => {
    render(
      <Sidebar 
        activeTab="dashboard" 
        setActiveTab={mockSetActiveTab} 
        user={mockUser} 
        onLogout={mockOnLogout} 
        onOpenSettings={mockOnOpenSettings} 
      />
    );

    fireEvent.click(screen.getByLabelText('Open global application settings'));
    expect(mockOnOpenSettings).toHaveBeenCalled();
  });

  it('displays user initials correctly', () => {
    render(
      <Sidebar 
        activeTab="dashboard" 
        setActiveTab={mockSetActiveTab} 
        user={mockUser} 
        onLogout={mockOnLogout} 
        onOpenSettings={mockOnOpenSettings} 
      />
    );

    expect(screen.getByText('JD')).toBeDefined();
  });
});
