import React, { useState } from 'react';

const Leases = () => {
  const [leases, setLeases] = useState([
    {
      id: 1,
      ip: '192.168.1.100',
      mac: '00:11:22:33:44:55',
      hostname: 'laptop-john',
      clientId: 'john-laptop',
      leaseStart: '2024-01-15 09:30:00',
      leaseEnd: '2024-01-16 09:30:00',
      status: 'active',
      pool: 'Main Network',
      vendor: 'Dell Inc.'
    },
    {
      id: 2,
      ip: '192.168.1.101',
      mac: '00:11:22:33:44:56',
      hostname: 'phone-jane',
      clientId: 'jane-phone',
      leaseStart: '2024-01-15 10:15:00',
      leaseEnd: '2024-01-16 10:15:00',
      status: 'active',
      pool: 'Main Network',
      vendor: 'Apple Inc.'
    },
    {
      id: 3,
      ip: '10.0.0.50',
      mac: '00:11:22:33:44:57',
      hostname: 'guest-device',
      clientId: 'guest-001',
      leaseStart: '2024-01-15 14:20:00',
      leaseEnd: '2024-01-15 16:20:00',
      status: 'active',
      pool: 'Guest Network',
      vendor: 'Samsung'
    },
    {
      id: 4,
      ip: '192.168.1.102',
      mac: '00:11:22:33:44:58',
      hostname: 'printer-office',
      clientId: 'office-printer',
      leaseStart: '2024-01-14 08:00:00',
      leaseEnd: '2024-01-15 08:00:00',
      status: 'expired',
      pool: 'Main Network',
      vendor: 'HP Inc.'
    },
    {
      id: 5,
      ip: '192.168.1.103',
      mac: '00:11:22:33:44:59',
      hostname: 'server-backup',
      clientId: 'backup-server',
      leaseStart: '2024-01-15 12:00:00',
      leaseEnd: '2024-01-16 12:00:00',
      status: 'reserved',
      pool: 'Main Network',
      vendor: 'Unknown'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('leaseEnd');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleReleaseLease = (leaseId) => {
    if (window.confirm('Are you sure you want to release this lease?')) {
      setLeases(leases.map(lease => 
        lease.id === leaseId ? { ...lease, status: 'released' } : lease
      ));
    }
  };

  const handleRenewLease = (leaseId) => {
    const now = new Date();
    const newEndTime = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours
    
    setLeases(leases.map(lease => 
      lease.id === leaseId ? { 
        ...lease, 
        leaseEnd: newEndTime.toISOString().slice(0, 19).replace('T', ' '),
        status: 'active'
      } : lease
    ));
  };

  const handleReserveLease = (leaseId) => {
    setLeases(leases.map(lease => 
      lease.id === leaseId ? { ...lease, status: 'reserved' } : lease
    ));
  };

  const filteredLeases = leases.filter(lease => {
    const matchesFilter = filter === 'all' || lease.status === filter;
    const matchesSearch = searchTerm === '' || 
      lease.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lease.mac.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lease.hostname.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const sortedLeases = [...filteredLeases].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === 'leaseEnd' || sortBy === 'leaseStart') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'expired': return 'warning';
      case 'reserved': return 'info';
      case 'released': return 'secondary';
      default: return 'secondary';
    }
  };

  const getTimeRemaining = (leaseEnd) => {
    const now = new Date();
    const end = new Date(leaseEnd);
    const diff = end - now;
    
    if (diff < 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  return (
    <div className="leases">
      <div className="leases-header">
        <h1>Active Leases</h1>
        <p className="leases-subtitle">Monitor and manage DHCP lease assignments</p>
      </div>

      <div className="leases-controls">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search by IP, MAC, or hostname..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="reserved">Reserved</option>
            <option value="released">Released</option>
          </select>
          
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="leaseEnd">Sort by Lease End</option>
            <option value="leaseStart">Sort by Lease Start</option>
            <option value="ip">Sort by IP</option>
            <option value="hostname">Sort by Hostname</option>
          </select>
          
          <button 
            className="sort-order-btn"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <div className="leases-stats">
        <div className="stat-item">
          <span className="stat-label">Total Leases:</span>
          <span className="stat-value">{leases.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Active:</span>
          <span className="stat-value">{leases.filter(l => l.status === 'active').length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Expired:</span>
          <span className="stat-value">{leases.filter(l => l.status === 'expired').length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Reserved:</span>
          <span className="stat-value">{leases.filter(l => l.status === 'reserved').length}</span>
        </div>
      </div>

      <div className="leases-table-container">
        <table className="leases-table">
          <thead>
            <tr>
              <th>IP Address</th>
              <th>MAC Address</th>
              <th>Hostname</th>
              <th>Lease Start</th>
              <th>Lease End</th>
              <th>Time Remaining</th>
              <th>Status</th>
              <th>Pool</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedLeases.map(lease => (
              <tr key={lease.id} className={`lease-row ${lease.status}`}>
                <td className="ip-cell">{lease.ip}</td>
                <td className="mac-cell">{lease.mac}</td>
                <td className="hostname-cell">{lease.hostname}</td>
                <td className="date-cell">{lease.leaseStart}</td>
                <td className="date-cell">{lease.leaseEnd}</td>
                <td className="time-cell">{getTimeRemaining(lease.leaseEnd)}</td>
                <td className="status-cell">
                  <span className={`status-badge ${getStatusColor(lease.status)}`}>
                    {lease.status}
                  </span>
                </td>
                <td className="pool-cell">{lease.pool}</td>
                <td className="actions-cell">
                  <div className="action-buttons">
                    {lease.status === 'active' && (
                      <>
                        <button 
                          className="btn btn-sm btn-warning"
                          onClick={() => handleReleaseLease(lease.id)}
                          title="Release lease"
                        >
                          Release
                        </button>
                        <button 
                          className="btn btn-sm btn-info"
                          onClick={() => handleReserveLease(lease.id)}
                          title="Reserve lease"
                        >
                          Reserve
                        </button>
                      </>
                    )}
                    {lease.status === 'expired' && (
                      <button 
                        className="btn btn-sm btn-success"
                        onClick={() => handleRenewLease(lease.id)}
                        title="Renew lease"
                      >
                        Renew
                      </button>
                    )}
                    {lease.status === 'reserved' && (
                      <button 
                        className="btn btn-sm btn-warning"
                        onClick={() => handleReleaseLease(lease.id)}
                        title="Release reservation"
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

      {sortedLeases.length === 0 && (
        <div className="no-results">
          <p>No leases found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Leases;