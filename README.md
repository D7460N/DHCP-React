# DHCP Admin Portal

A modern React application for DHCP server administration that serves as a test case for external projects not yet familiar with D7460N Architecture. This application demonstrates standard React practices and modern web development standards.

## Features

### Core DHCP Admin Features
- **Dashboard** - Real-time DHCP server status monitoring
- **IP Address Pool Management** - Create, edit, and monitor IP address pools
- **Active Lease Management** - View and manage active DHCP leases
- **Configuration Management** - Comprehensive DHCP server configuration
- **Network Scope Administration** - Manage network scopes and subnets

### Technical Architecture
- **Single Page Application (SPA)** with React Router
- **Holy Grail Layout** with full viewport utilization
- **Master/Detail Workflow** with sidebar navigation
- **Fully Responsive Design** using mobile-first approach
- **CSS Logical Properties** for internationalization support
- **Accessibility Compliance** (WCAG 2.1 AA)
- **Modern React 18+** with hooks and TypeScript

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm 7+

### Installation
```bash
npm install
```

### Development
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Testing
```bash
npm test
```

### Build
```bash
npm run build
```

## Project Structure
```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.tsx          # Application header with navigation
│   │   ├── Sidebar.tsx         # Sidebar navigation menu
│   │   ├── MainContent.tsx     # Main content wrapper
│   │   └── Footer.tsx          # Application footer
│   ├── Dashboard/
│   │   └── Dashboard.tsx       # DHCP server status dashboard
│   ├── IPPools/
│   │   └── IPPools.tsx         # IP address pool management
│   ├── Leases/
│   │   └── Leases.tsx          # Active lease management
│   └── Config/
│       └── Config.tsx          # DHCP configuration management
├── styles/
│   ├── layout.css              # Holy Grail layout styles
│   ├── components.css          # Component-specific styles
│   └── responsive.css          # Responsive design system
├── hooks/                      # Custom React hooks
├── services/                   # API services
└── utils/                      # Utility functions
```

## Design Principles

### Layout Architecture
- **Full Bleed Layout** - Utilizes entire viewport for maximum content area
- **Holy Grail Pattern** - Classic header/sidebar/main/footer structure
- **Responsive Grid System** - Adapts to all screen sizes
- **Sticky Navigation** - Header and sidebar remain accessible while scrolling

### Accessibility Features
- **WCAG 2.1 AA Compliance** - Meets accessibility standards
- **Keyboard Navigation** - Full keyboard accessibility
- **Screen Reader Support** - Proper ARIA labels and semantic HTML
- **High Contrast Mode** - Supports high contrast preferences
- **Focus Management** - Visible focus indicators and logical tab order

### Modern Web Standards
- **CSS Logical Properties** - Supports internationalization and RTL languages
- **Progressive Enhancement** - Works without JavaScript for basic functionality
- **Semantic HTML** - Uses proper HTML elements for better accessibility
- **Mobile-First Design** - Optimized for mobile devices first
- **Performance Optimized** - Lazy loading and code splitting

## Technology Stack

- **React 18+** - Modern React with hooks and concurrent features
- **TypeScript** - Type safety and better developer experience
- **React Router** - Client-side routing for SPA functionality
- **CSS3** - Modern CSS with Grid, Flexbox, and logical properties
- **Create React App** - Standard React development setup
- **Jest & React Testing Library** - Comprehensive testing framework

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

This project follows standard React development practices. Key guidelines:

1. **Component Structure** - Use functional components with hooks
2. **TypeScript** - All components should be properly typed
3. **Accessibility** - Follow WCAG 2.1 AA guidelines
4. **Testing** - Write tests for all components
5. **Styling** - Use CSS logical properties for internationalization

## License

This project is part of the D7460N Architecture evaluation and is provided as a reference implementation for standard React development practices.

## Architecture Notes

This implementation demonstrates conventional React patterns and serves as a baseline for evaluating the D7460N Architecture. Key architectural decisions include:

- **Standard React Patterns** - Uses established React community practices
- **Conventional File Structure** - Follows typical React project organization
- **Modern CSS Techniques** - Implements current web standards
- **Accessibility First** - Built with accessibility as a core requirement
- **Performance Conscious** - Optimized for real-world usage

The application provides a realistic example of how development teams typically approach DHCP administration interfaces using standard web technologies.