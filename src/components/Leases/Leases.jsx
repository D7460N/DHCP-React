import React, { useState, useEffect } from 'react';

const Leases = () => {
  const [leases, setLeases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState('ip');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API call to fetch leases
    const fetchLeases = async () => {
      try {
        setTimeout(() => {
          setLeases([
            {
              id: 1,
              ip: '192.168.1.100',
              mac: '00:1B:44:11:3A:B7',
              hostname: 'laptop-001',
              clientId: 'DESKTOP-ABC123',
              leaseStart: '2024-01-20 10:30:00',
              leaseExpiry: '2024-01-21 10:30:00',
              status: 'active',
              pool: 'Main Pool'
            },
            {
              id: 2,
              ip: '192.168.1.101',
              mac: '00:1B:44:11:3A:B8',
              hostname: 'phone-002',
              clientId: 'Samsung-Galaxy',
              leaseStart: '2024-01-20 11:45:00',
              leaseExpiry: '2024-01-21 11:45:00',
              status: 'active',
              pool: 'Main Pool'
            },
            {
              id: 3,
              ip: '192.168.1.102',
              mac: '00:1B:44:11:3A:B9',
              hostname: 'tablet-003',
              clientId: 'iPad-Pro',
              leaseStart: '2024-01-20 12:22:00',
              leaseExpiry: '2024-01-21 12:22:00',
              status: 'active',
              pool: 'Main Pool'
            },
            {
              id: 4,
              ip: '192.168.2.50',
              mac: '00:1B:44:11:3A:BA',
              hostname: 'guest-device',
              clientId: 'Unknown',
              leaseStart: '2024-01-20 13:15:00',
              leaseExpiry: '2024-01-20 14:15:00',
              status: 'expired',
              pool: 'Guest Pool'
            },
            {
              id: 5,
              ip: '192.168.3.100',
              mac: '00:1B:44:11:3A:BB',
              hostname: 'iot-sensor-01',
              clientId: 'ESP32-Device',
              leaseStart: '2024-01-13 09:00:00',
              leaseExpiry: '2024-01-27 09:00:00',
              status: 'active',
              pool: 'IoT Pool'
            },
            {
              id: 6,
              ip: '192.168.1.103',
              mac: '00:1B:44:11:3A:BC',
              hostname: 'workstation-004',
              clientId: 'WS-MARKETING',
              leaseStart: '2024-01-20 08:00:00',
              leaseExpiry: '2024-01-21 08:00:00',
              status: 'active',
              pool: 'Main Pool'
            },
            {
              id: 7,
              ip: '192.168.1.104',
              mac: '00:1B:44:11:3A:BD',
              hostname: 'printer-hp',
              clientId: 'HP-LaserJet',
              leaseStart: '2024-01-19 14:30:00',
              leaseExpiry: '2024-01-20 14:30:00',
              status: 'reserved',
              pool: 'Main Pool'
            },
            {
              id: 8,
              ip: '192.168.2.51',
              mac: '00:1B:44:11:3A:BE',
              hostname: 'guest-laptop',
              clientId: 'MacBook-Air',
              leaseStart: '2024-01-20 15:45:00',
              leaseExpiry: '2024-01-20 16:45:00',
              status: 'active',
              pool: 'Guest Pool'
            }
          ]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching leases:', error);
        setIsLoading(false);
      }
    };

    fetchLeases();
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleReleaseLease = (leaseId) => {
    if (window.confirm('Are you sure you want to release this lease?')) {
      setLeases(leases.map(lease => 
        lease.id === leaseId 
          ? { ...lease, status: 'released' }
          : lease
      ));
    }
  };

  const handleReserveLease = (leaseId) => {
    setLeases(leases.map(lease => 
      lease.id === leaseId 
        ? { ...lease, status: 'reserved' }
        : lease
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'expired': return 'status-error';
      case 'reserved': return 'status-warning';
      case 'released': return 'status-inactive';
      default: return 'status-inactive';
    }
  };

  const filteredAndSortedLeases = leases
    .filter(lease => {
      const matchesStatus = filterStatus === 'all' || lease.status === filterStatus;
      const matchesSearch = 
        lease.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lease.mac.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lease.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lease.clientId.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'ip') {
        // IP address sorting
        aValue = a.ip.split('.').map(num => parseInt(num).toString().padStart(3, '0')).join('.');
        bValue = b.ip.split('.').map(num => parseInt(num).toString().padStart(3, '0')).join('.');
      }
      
      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

  const getSortIcon = (field) => {
    if (sortField !== field) {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"/>
        </svg>
      );
    }
    
    return sortDirection === 'asc' ? (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 14l5-5 5 5z"/>
      </svg>
    ) : (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 10l5 5 5-5z"/>
      </svg>
    );
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner" aria-hidden="true"></div>
        Loading leases...
      </div>
    );
  }

  return (
    <div className="leases">
      <div className="page-header">
        <h1>Active Leases</h1>
        <p className="page-description">Monitor and manage DHCP lease assignments</p>
      </div>

      {/* Filters and Search */}
      <div className="card mb-4">
        <div className="card-content">
          <div className="filters-row">
            <div className="form-group">
              <label htmlFor="search" className="form-label">Search</label>
              <input
                id="search"
                type="text"
                className="form-input"
                placeholder="Search by IP, MAC, hostname, or client ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="statusFilter" className="form-label">Status Filter</label>
              <select
                id="statusFilter"
                className="form-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="reserved">Reserved</option>
                <option value="released">Released</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Leases Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            Lease Information ({filteredAndSortedLeases.length} records)
          </h2>
          <button className="btn btn-secondary" aria-label="Refresh lease data">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
          </button>
        </div>
        <div className="card-content">
          <div className="lease-table-wrapper">
            <table className="table lease-table">
              <thead>
                <tr>
                  <th>
                    <button 
                      className="sort-button" 
                      onClick={() => handleSort('ip')}
                      aria-label="Sort by IP address"
                    >
                      IP Address {getSortIcon('ip')}
                    </button>
                  </th>
                  <th>
                    <button 
                      className="sort-button" 
                      onClick={() => handleSort('mac')}
                      aria-label="Sort by MAC address"
                    >
                      MAC Address {getSortIcon('mac')}
                    </button>
                  </th>
                  <th>
                    <button 
                      className="sort-button" 
                      onClick={() => handleSort('hostname')}
                      aria-label="Sort by hostname"
                    >
                      Hostname {getSortIcon('hostname')}
                    </button>
                  </th>
                  <th>
                    <button 
                      className="sort-button" 
                      onClick={() => handleSort('clientId')}
                      aria-label="Sort by client ID"
                    >
                      Client ID {getSortIcon('clientId')}
                    </button>
                  </th>
                  <th>
                    <button 
                      className="sort-button" 
                      onClick={() => handleSort('leaseStart')}
                      aria-label="Sort by lease start"
                    >
                      Lease Start {getSortIcon('leaseStart')}
                    </button>
                  </th>
                  <th>
                    <button 
                      className="sort-button" 
                      onClick={() => handleSort('leaseExpiry')}
                      aria-label="Sort by lease expiry"
                    >
                      Lease Expiry {getSortIcon('leaseExpiry')}
                    </button>
                  </th>
                  <th>
                    <button 
                      className="sort-button" 
                      onClick={() => handleSort('status')}
                      aria-label="Sort by status"
                    >
                      Status {getSortIcon('status')}
                    </button>
                  </th>
                  <th>
                    <button 
                      className="sort-button" 
                      onClick={() => handleSort('pool')}
                      aria-label="Sort by pool"
                    >
                      Pool {getSortIcon('pool')}
                    </button>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedLeases.map((lease) => (
                  <tr key={lease.id}>
                    <td>
                      <code>{lease.ip}</code>
                    </td>
                    <td>
                      <code>{lease.mac}</code>
                    </td>
                    <td>{lease.hostname}</td>
                    <td>{lease.clientId}</td>
                    <td>{lease.leaseStart}</td>
                    <td>{lease.leaseExpiry}</td>
                    <td>
                      <div className={`status-indicator ${getStatusColor(lease.status)}`}>
                        <span className="status-dot" aria-hidden="true"></span>
                        {lease.status}
                      </div>
                    </td>
                    <td>
                      <span className="badge">{lease.pool}</span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {lease.status === 'active' && (
                          <>
                            <button
                              className="btn btn-secondary"
                              onClick={() => handleReserveLease(lease.id)}
                              aria-label="Reserve lease"
                              title="Reserve lease"
                            >
                              Reserve
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleReleaseLease(lease.id)}
                              aria-label="Release lease"
                              title="Release lease"
                            >
                              Release
                            </button>
                          </>
                        )}
                        {lease.status === 'reserved' && (
                          <button
                            className="btn btn-danger"
                            onClick={() => handleReleaseLease(lease.id)}
                            aria-label="Release lease"
                            title="Release lease"
                          >
                            Release
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredAndSortedLeases.length === 0 && (
            <div className="empty-state">
              <p>No leases found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leases;