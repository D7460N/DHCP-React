# DHCP Admin Portal

A modern React application for managing DHCP servers, IP pools, and lease assignments. Built with standard React practices and modern web standards.

## Features

### Core Functionality
- **Dashboard**: Real-time DHCP server status monitoring
- **IP Address Pools**: Manage DHCP scopes and IP address ranges
- **Active Leases**: View and manage current IP address assignments
- **Configuration**: DHCP server settings and options management

### Architecture
- **Single Page Application (SPA)** with React Router
- **Holy Grail Layout** - header, main content area, footer structure
- **Master/Detail Workflow** - left sidebar navigation, main content area
- **Fully Responsive Design** - mobile-first approach with breakpoints
- **Accessibility Compliant** - WCAG 2.1 AA standards

### Technical Standards
- React 19+ with hooks
- Modern CSS with logical properties
- Semantic HTML structure
- Keyboard navigation support
- Progressive enhancement principles

## Development

### Prerequisites
- Node.js (20.x or later)
- npm (10.x or later)

### Installation

```bash
npm install
```

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Project Structure

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
└── App.jsx
```

### Key Features

#### Dashboard
- Server status monitoring
- Active lease counts
- Recent activity tracking
- Real-time metrics display

#### IP Pools Management
- Create, edit, and delete IP pools
- Utilization monitoring
- Network configuration
- DNS and gateway settings

#### Lease Management
- View active leases
- Filter and search functionality
- Lease renewal and release
- Sortable data tables

#### Configuration
- Tabbed interface for settings
- Server configuration options
- Global DHCP options
- Failover settings
- Logging configuration

### Accessibility Features
- Skip navigation links
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interface
- Adaptive navigation
- CSS logical properties for internationalization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.
