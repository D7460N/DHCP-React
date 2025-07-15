# DHCP Admin Portal - Modern React Implementation

A modern React application for DHCP server administration built with standard React practices and modern web standards.

## Features

### Layout Architecture
- **Single Page Application (SPA)** with React Router
- **Full Bleed Layout** - utilizes entire viewport
- **Holy Grail Layout** - header, main content area, footer structure
- **Master/Detail Workflow** - left sidebar navigation, main content area
- **Fully Responsive** - mobile-first approach with breakpoints
- **CSS Logical Properties** - internationalization-ready

### DHCP Admin Features
- **Dashboard** - Real-time DHCP server status and monitoring
- **IP Address Pool Management** - Create, edit, and manage DHCP pools
- **Active Lease Information** - View and manage current IP leases
- **Configuration Management** - Comprehensive DHCP server settings
- **Network Scope Administration** - Pool utilization and management
- **Real-time Status Monitoring** - Live updates and activity feed

### Technical Standards
- **Modern React 19** with hooks and functional components
- **Accessibility Compliance** (WCAG 2.1 AA)
- **Keyboard Navigation Support** with skip links
- **Semantic HTML Structure** with proper ARIA labels
- **Progressive Enhancement** principles
- **Standard UI/UX Patterns** for admin interfaces

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## Architecture

### File Structure
```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── MainContent.jsx
│   │   └── Footer.jsx
│   ├── Dashboard/
│   │   └── Dashboard.jsx
│   ├── IPPools/
│   │   └── IPPools.jsx
│   ├── Leases/
│   │   └── Leases.jsx
│   └── Config/
│       └── Config.jsx
├── styles/
│   ├── layout.css
│   ├── components.css
│   └── responsive.css
├── hooks/
├── services/
└── utils/
```

### Key Technologies
- **React 19** - Latest React with concurrent features
- **React Router** - Client-side routing
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting and quality
- **CSS3** - Modern CSS with logical properties

## Accessibility Features

- **Skip to main content** link for screen readers
- **Keyboard navigation** support throughout
- **ARIA labels** and semantic HTML
- **High contrast mode** support
- **Reduced motion** preferences respected
- **Focus management** with visible focus indicators

## Responsive Design

- **Mobile-first** approach with breakpoints
- **Flexible grid system** for layout
- **Responsive typography** scaling
- **Touch-friendly** interface elements
- **Adaptive navigation** for different screen sizes

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Modern mobile browsers

## License

This project is licensed under the MIT License - see the LICENSE file for details.
