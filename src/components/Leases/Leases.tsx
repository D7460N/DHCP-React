import React, { useState, useEffect } from 'react';

interface Lease {
  id: string;
  ipAddress: string;
  macAddress: string;
  hostname: string;
  clientId: string;
  startTime: Date;
  endTime: Date;
  leaseTime: number;
  status: 'active' | 'expired' | 'released';
  pool: string;
}

const Leases: React.FC = () => {
  const [leases, setLeases] = useState<Lease[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLeases([
        {
          id: '1',
          ipAddress: '192.168.1.105',
          macAddress: '00:1B:44:11:3A:B7',
          hostname: 'laptop-john',
          clientId: 'laptop-john',
          startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
          endTime: new Date(Date.now() + 22 * 60 * 60 * 1000),
          leaseTime: 86400,
          status: 'active',
          pool: 'Main Office Network'
        },
        {
          id: '2',
          ipAddress: '192.168.1.89',
          macAddress: '08:00:27:AB:CD:EF',
          hostname: 'desktop-mary',
          clientId: 'desktop-mary',
          startTime: new Date(Date.now() - 30 * 60 * 1000),
          endTime: new Date(Date.now() + 23.5 * 60 * 60 * 1000),
          leaseTime: 86400,
          status: 'active',
          pool: 'Main Office Network'
        },
        {
          id: '3',
          ipAddress: '192.168.2.78',
          macAddress: 'AA:BB:CC:DD:EE:FF',
          hostname: 'guest-phone',
          clientId: 'guest-phone',
          startTime: new Date(Date.now() - 45 * 60 * 1000),
          endTime: new Date(Date.now() + 15 * 60 * 1000),
          leaseTime: 3600,
          status: 'active',
          pool: 'Guest Network'
        },
        {
          id: '4',
          ipAddress: '192.168.1.67',
          macAddress: '00:50:56:C0:00:01',
          hostname: 'old-printer',
          clientId: 'old-printer',
          startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          endTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          leaseTime: 86400,
          status: 'expired',
          pool: 'Main Office Network'
        },
        {
          id: '5',
          ipAddress: '192.168.3.25',
          macAddress: '12:34:56:78:90:AB',
          hostname: 'smart-thermostat',
          clientId: 'smart-thermostat',
          startTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
          leaseTime: 604800,
          status: 'active',
          pool: 'IoT Devices'
        }
      ]);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const filteredLeases = leases.filter(lease => {
    const matchesFilter = filter === 'all' || lease.status === filter;
    const matchesSearch = !searchTerm || 
      lease.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lease.macAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lease.hostname.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="status-indicator online">Active</span>;
      case 'expired':
        return <span className="status-indicator offline">Expired</span>;
      case 'released':
        return <span className="status-indicator warning">Released</span>;
      default:
        return <span className="status-indicator">{status}</span>;
    }
  };

  const formatDateTime = (date: Date): string => {
    return date.toLocaleString();
  };

  const getTimeRemaining = (endTime: Date): string => {
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    }
    return `${minutes}m remaining`;
  };

  const handleReleaseLease = (leaseId: string) => {
    setLeases(leases.map(lease => 
      lease.id === leaseId ? { ...lease, status: 'released' as const } : lease
    ));
  };

  const handleRenewLease = (leaseId: string) => {
    setLeases(leases.map(lease => 
      lease.id === leaseId ? { 
        ...lease, 
        endTime: new Date(Date.now() + lease.leaseTime * 1000),
        status: 'active' as const 
      } : lease
    ));
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner" aria-label="Loading lease information"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="content-header">
        <h1 className="content-title">Active Leases</h1>
        <p className="content-subtitle">
          Current IP address assignments and lease information
        </p>
      </div>

      {/* Controls */}
      <div className="card">
        <div className="card-content">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div className="form-group" style={{ minWidth: '200px', marginBottom: 0 }}>
              <label htmlFor="filterStatus" className="form-label">Filter by Status</label>
              <select
                id="filterStatus"
                className="form-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Leases</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="released">Released</option>
              </select>
            </div>
            
            <div className="form-group" style={{ minWidth: '250px', marginBottom: 0 }}>
              <label htmlFor="searchLeases" className="form-label">Search</label>
              <input
                type="text"
                id="searchLeases"
                className="form-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="IP, MAC, or hostname..."
              />
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
              <button className="btn btn-primary btn-sm">
                Export Leases
              </button>
              <button className="btn btn-outline btn-sm">
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lease Statistics */}
      <div className="dashboard-grid">
        <div className="metric-card">
          <div className="metric-value">{leases.filter(l => l.status === 'active').length}</div>
          <div className="metric-label">Active Leases</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-value">{leases.filter(l => l.status === 'expired').length}</div>
          <div className="metric-label">Expired Leases</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-value">{leases.filter(l => l.status === 'released').length}</div>
          <div className="metric-label">Released Leases</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-value">{leases.length}</div>
          <div className="metric-label">Total Leases</div>
        </div>
      </div>

      {/* Leases Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Lease Details</h2>
          <span style={{ color: '#7f8c8d' }}>
            Showing {filteredLeases.length} of {leases.length} leases
          </span>
        </div>
        <div className="card-content">
          {filteredLeases.length === 0 ? (
            <div className="alert alert-info">
              No leases found matching your criteria.
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>IP Address</th>
                  <th>MAC Address</th>
                  <th>Hostname</th>
                  <th>Pool</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Time Remaining</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeases.map((lease) => (
                  <tr key={lease.id}>
                    <td>
                      <span className="ip-address">{lease.ipAddress}</span>
                    </td>
                    <td>
                      <span className="mac-address">{lease.macAddress}</span>
                    </td>
                    <td>
                      <strong>{lease.hostname}</strong>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.875rem', color: '#7f8c8d' }}>
                        {lease.pool}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.875rem' }}>
                        {formatDateTime(lease.startTime)}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.875rem' }}>
                        {formatDateTime(lease.endTime)}
                      </span>
                    </td>
                    <td>
                      <span style={{ 
                        fontSize: '0.875rem',
                        color: lease.status === 'expired' ? '#e74c3c' : '#7f8c8d'
                      }}>
                        {getTimeRemaining(lease.endTime)}
                      </span>
                    </td>
                    <td>
                      {getStatusBadge(lease.status)}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {lease.status === 'active' && (
                          <>
                            <button 
                              className="btn btn-outline btn-sm"
                              onClick={() => handleRenewLease(lease.id)}
                            >
                              Renew
                            </button>
                            <button 
                              className="btn btn-danger btn-sm"
                              onClick={() => handleReleaseLease(lease.id)}
                            >
                              Release
                            </button>
                          </>
                        )}
                        {lease.status === 'expired' && (
                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => handleRenewLease(lease.id)}
                          >
                            Renew
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leases;