# DHCP Admin Portal

A modern React application for DHCP server administration built with standard React practices and modern web standards.

## Features

- **Dashboard** - Monitor DHCP server status and network activity
- **IP Pool Management** - Create, configure, and manage IP address pools
- **Active Leases** - View and manage current DHCP lease assignments
- **Configuration** - Server settings and network configuration management

## Architecture

- Single Page Application (SPA) with React Router
- Full Bleed Layout utilizing entire viewport
- Holy Grail Layout with header, main content, and footer
- Master/Detail Workflow with sidebar navigation
- Fully Responsive design with mobile-first approach
- CSS Logical Properties for internationalization support
- Accessibility compliance (WCAG 2.1 AA)

## Technologies Used

- React 18+ with hooks
- React Router for navigation
- Vite for build tooling
- CSS3 with custom properties
- Semantic HTML5
- Modern JavaScript (ES6+)

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Project Structure

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

## Key Features

### Responsive Design
- Mobile-first CSS approach
- Breakpoints for tablet and desktop
- Adaptive sidebar navigation
- Touch-friendly interfaces

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Semantic HTML structure

### DHCP Management
- Real-time server status monitoring
- IP pool configuration and management
- Lease tracking and administration
- Network settings configuration
- Server restart and backup functionality

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - see LICENSE file for details
