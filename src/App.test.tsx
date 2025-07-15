import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './components/Dashboard/Dashboard';

test('renders dashboard component', () => {
  render(<Dashboard />);
  const dashboardElement = screen.getByText(/Dashboard/i);
  expect(dashboardElement).toBeInTheDocument();
});

test('renders DHCP server status', () => {
  render(<Dashboard />);
  const serverStatusElement = screen.getByText(/DHCP Server Status/i);
  expect(serverStatusElement).toBeInTheDocument();
});

test('renders total IP addresses', () => {
  render(<Dashboard />);
  const totalIPElement = screen.getByText(/Total IP Addresses/i);
  expect(totalIPElement).toBeInTheDocument();
});
