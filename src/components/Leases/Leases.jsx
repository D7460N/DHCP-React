import React, { useState } from 'react';

const Leases = () => {
  const [leases, setLeases] = useState([
    {
      id: 1,
      ipAddress: '192.168.1.105',
      macAddress: '00:1A:2B:3C:4D:5E',
      hostname: 'laptop-user1',
      clientId: 'DESKTOP-ABC123',
      startTime: '2024-01-15T08:30:00Z',
      endTime: '2024-01-16T08:30:00Z',
      status: 'active',
      pool: 'Main Office Network'
    },
    {
      id: 2,
      ipAddress: '192.168.1.89',
      macAddress: '00:1A:2B:3C:4D:5F',
      hostname: 'desktop-user2',
      clientId: 'LAPTOP-XYZ789',
      startTime: '2024-01-15T09:15:00Z',
      endTime: '2024-01-16T09:15:00Z',
      status: 'active',
      pool: 'Main Office Network'
    },
    {
      id: 3,
      ipAddress: '192.168.100.25',
      macAddress: '00:1A:2B:3C:4D:60',
      hostname: 'guest-device',
      clientId: 'android-device',
      startTime: '2024-01-15T10:00:00Z',
      endTime: '2024-01-15T14:00:00Z',
      status: 'active',
      pool: 'Guest Network'
    },
    {
      id: 4,
      ipAddress: '192.168.200.15',
      macAddress: '00:1A:2B:3C:4D:61',
      hostname: 'smart-thermostat',
      clientId: 'IOT-THERMO-001',
      startTime: '2024-01-08T12:00:00Z',
      endTime: '2024-01-15T12:00:00Z',
      status: 'active',
      pool: 'IoT Devices'
    },
    {
      id: 5,
      ipAddress: '192.168.1.78',
      macAddress: '00:1A:2B:3C:4D:62',
      hostname: 'old-laptop',
      clientId: 'LAPTOP-OLD456',
      startTime: '2024-01-14T16:00:00Z',
      endTime: '2024-01-15T16:00:00Z',
      status: 'expired',
      pool: 'Main Office Network'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [poolFilter, setPoolFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'startTime', direction: 'desc' });

  const pools = ['Main Office Network', 'Guest Network', 'IoT Devices'];

  const filteredLeases = leases.filter(lease => {
    const matchesSearch = 
      lease.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lease.macAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lease.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lease.clientId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lease.status === statusFilter;
    const matchesPool = poolFilter === 'all' || lease.pool === poolFilter;
    
    return matchesSearch && matchesStatus && matchesPool;
  });

  const sortedLeases = [...filteredLeases].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getTimeRemaining = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const handleReleaseLease = (id) => {
    if (window.confirm('Are you sure you want to release this lease?')) {
      setLeases(leases.filter(lease => lease.id !== id));
    }
  };

  const handleRenewLease = (id) => {
    const newEndTime = new Date();
    newEndTime.setHours(newEndTime.getHours() + 24);
    
    setLeases(leases.map(lease => 
      lease.id === id 
        ? { ...lease, endTime: newEndTime.toISOString(), status: 'active' }
        : lease
    ));
  };

  const getStatusBadge = (status) => {
    const baseClasses = 'status-indicator';
    switch (status) {
      case 'active':
        return `${baseClasses} online`;
      case 'expired':
        return `${baseClasses} error`;
      case 'reserved':
        return `${baseClasses} offline`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className="leases">
      <div className="dashboard-header">
        <h1>Active Leases</h1>
        <p className="subtitle">Monitor and manage DHCP lease assignments</p>
      </div>

      <div className="dashboard-card mb-4">
        <h3>Filters</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="search" className="form-label">Search</label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              placeholder="Search by IP, MAC, hostname, or client ID"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status-filter" className="form-label">Status</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="reserved">Reserved</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="pool-filter" className="form-label">Pool</label>
            <select
              id="pool-filter"
              value={poolFilter}
              onChange={(e) => setPoolFilter(e.target.value)}
              className="form-select"
            >
              <option value="all">All Pools</option>
              {pools.map(pool => (
                <option key={pool} value={pool}>{pool}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="flex justify-between items-center mb-3">
          <h3>Lease Information</h3>
          <div className="text-muted">
            Showing {sortedLeases.length} of {leases.length} leases
          </div>
        </div>

        {sortedLeases.length === 0 ? (
          <div className="text-center py-4">
            <p>No leases found matching your criteria.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>
                    <button
                      className="btn-sort"
                      onClick={() => handleSort('ipAddress')}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      IP Address
                      <span aria-hidden="true">{getSortIcon('ipAddress')}</span>
                    </button>
                  </th>
                  <th>
                    <button
                      className="btn-sort"
                      onClick={() => handleSort('macAddress')}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      MAC Address
                      <span aria-hidden="true">{getSortIcon('macAddress')}</span>
                    </button>
                  </th>
                  <th>
                    <button
                      className="btn-sort"
                      onClick={() => handleSort('hostname')}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      Hostname
                      <span aria-hidden="true">{getSortIcon('hostname')}</span>
                    </button>
                  </th>
                  <th>Client ID</th>
                  <th>Pool</th>
                  <th>
                    <button
                      className="btn-sort"
                      onClick={() => handleSort('startTime')}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      Start Time
                      <span aria-hidden="true">{getSortIcon('startTime')}</span>
                    </button>
                  </th>
                  <th>Time Remaining</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedLeases.map((lease) => (
                  <tr key={lease.id}>
                    <td><code>{lease.ipAddress}</code></td>
                    <td><code>{lease.macAddress}</code></td>
                    <td>{lease.hostname}</td>
                    <td>{lease.clientId}</td>
                    <td>{lease.pool}</td>
                    <td>{formatDateTime(lease.startTime)}</td>
                    <td>{getTimeRemaining(lease.endTime)}</td>
                    <td>
                      <span className={getStatusBadge(lease.status)}>
                        <span className="status-dot"></span>
                        {lease.status}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group">
                        {lease.status === 'active' && (
                          <>
                            <button
                              className="btn btn-secondary"
                              onClick={() => handleRenewLease(lease.id)}
                              aria-label={`Renew lease for ${lease.ipAddress}`}
                              style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                            >
                              🔄 Renew
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleReleaseLease(lease.id)}
                              aria-label={`Release lease for ${lease.ipAddress}`}
                              style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                            >
                              ❌ Release
                            </button>
                          </>
                        )}
                        {lease.status === 'expired' && (
                          <button
                            className="btn btn-secondary"
                            onClick={() => handleReleaseLease(lease.id)}
                            aria-label={`Remove expired lease for ${lease.ipAddress}`}
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                          >
                            🗑️ Remove
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leases;