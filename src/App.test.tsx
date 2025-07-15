import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders DHCP Admin Portal', () => {
  render(<App />);
  const titleElement = screen.getByText(/DHCP Admin Portal/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders navigation menu', () => {
  render(<App />);
  const dashboardLink = screen.getByText(/Dashboard/i);
  expect(dashboardLink).toBeInTheDocument();
});
