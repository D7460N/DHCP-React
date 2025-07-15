import { useState, useEffect } from 'react';

const Leases = () => {
  const [leases, setLeases] = useState([
    {
      id: 1,
      ipAddress: '192.168.1.45',
      macAddress: 'AA:BB:CC:DD:EE:FF',
      hostname: 'laptop-001',
      leaseStart: '2024-01-15 10:30:00',
      leaseExpiry: '2024-01-16 10:30:00',
      status: 'active',
      clientId: 'DHCP-Client-001',
      pool: 'Main Pool'
    },
    {
      id: 2,
      ipAddress: '192.168.1.78',
      macAddress: '11:22:33:44:55:66',
      hostname: 'desktop-002',
      leaseStart: '2024-01-15 09:15:00',
      leaseExpiry: '2024-01-16 09:15:00',
      status: 'active',
      clientId: 'DHCP-Client-002',
      pool: 'Main Pool'
    },
    {
      id: 3,
      ipAddress: '192.168.2.25',
      macAddress: 'AA:11:BB:22:CC:33',
      hostname: 'guest-tablet',
      leaseStart: '2024-01-15 14:20:00',
      leaseExpiry: '2024-01-15 18:20:00',
      status: 'active',
      clientId: 'DHCP-Client-003',
      pool: 'Guest Pool'
    },
    {
      id: 4,
      ipAddress: '192.168.1.32',
      macAddress: 'DD:EE:FF:AA:BB:CC',
      hostname: 'server-001',
      leaseStart: '2024-01-14 08:00:00',
      leaseExpiry: '2024-01-15 08:00:00',
      status: 'expired',
      clientId: 'DHCP-Client-004',
      pool: 'Main Pool'
    },
    {
      id: 5,
      ipAddress: '192.168.3.15',
      macAddress: 'FF:EE:DD:CC:BB:AA',
      hostname: 'dmz-server',
      leaseStart: '2024-01-15 12:00:00',
      leaseExpiry: '2024-01-16 00:00:00',
      status: 'active',
      clientId: 'DHCP-Client-005',
      pool: 'DMZ Pool'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPool, setFilterPool] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLeases(prevLeases => 
        prevLeases.map(lease => {
          const now = new Date();
          const expiry = new Date(lease.leaseExpiry);
          
          if (now > expiry && lease.status === 'active') {
            return { ...lease, status: 'expired' };
          }
          
          return lease;
        })
      );
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRenewLease = (leaseId) => {
    setLeases(prevLeases => 
      prevLeases.map(lease => {
        if (lease.id === leaseId) {
          const now = new Date();
          const newExpiry = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours
          return {
            ...lease,
            leaseExpiry: newExpiry.toISOString().slice(0, 19).replace('T', ' '),
            status: 'active'
          };
        }
        return lease;
      })
    );
  };

  const handleReleaseLease = (leaseId) => {
    if (window.confirm('Are you sure you want to release this lease?')) {
      setLeases(prevLeases => 
        prevLeases.map(lease => 
          lease.id === leaseId 
            ? { ...lease, status: 'released' }
            : lease
        )
      );
    }
  };

  const handleDeleteLease = (leaseId) => {
    if (window.confirm('Are you sure you want to delete this lease record?')) {
      setLeases(prevLeases => prevLeases.filter(lease => lease.id !== leaseId));
    }
  };

  const getTimeRemaining = (expiryTime) => {
    const now = new Date();
    const expiry = new Date(expiryTime);
    const diff = expiry - now;
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'active':
        return 'active';
      case 'expired':
        return 'warning';
      case 'released':
        return 'inactive';
      default:
        return 'inactive';
    }
  };

  const filteredLeases = leases.filter(lease => {
    const matchesStatus = filterStatus === 'all' || lease.status === filterStatus;
    const matchesPool = filterPool === 'all' || lease.pool === filterPool;
    const matchesSearch = !searchTerm || 
      lease.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lease.macAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lease.hostname.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesPool && matchesSearch;
  });

  const pools = [...new Set(leases.map(lease => lease.pool))];

  return (
    <div className="leases">
      <div className="row">
        <div className="col-12">
          <h2>Active Leases</h2>
          <p className="text-muted">Monitor and manage current IP address leases</p>
        </div>
      </div>

      {/* Filters */}
      <div className="row mb-3">
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="filterStatus" className="form-label">Filter by Status</label>
            <select
              id="filterStatus"
              className="form-control"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="released">Released</option>
            </select>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="filterPool" className="form-label">Filter by Pool</label>
            <select
              id="filterPool"
              className="form-control"
              value={filterPool}
              onChange={(e) => setFilterPool(e.target.value)}
            >
              <option value="all">All Pools</option>
              {pools.map(pool => (
                <option key={pool} value={pool}>{pool}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="searchTerm" className="form-label">Search</label>
            <input
              type="text"
              id="searchTerm"
              className="form-control"
              placeholder="Search by IP, MAC, or hostname..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Lease Statistics */}
      <div className="row mb-3">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <h3 className="text-success">{leases.filter(l => l.status === 'active').length}</h3>
              <p className="card-text">Active Leases</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <h3 className="text-warning">{leases.filter(l => l.status === 'expired').length}</h3>
              <p className="card-text">Expired Leases</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <h3 className="text-info">{leases.filter(l => l.status === 'released').length}</h3>
              <p className="card-text">Released Leases</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <h3 className="text-primary">{leases.length}</h3>
              <p className="card-text">Total Leases</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leases Table */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Lease Details ({filteredLeases.length} records)</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>IP Address</th>
                      <th>MAC Address</th>
                      <th>Hostname</th>
                      <th>Pool</th>
                      <th>Lease Start</th>
                      <th>Lease Expiry</th>
                      <th>Time Remaining</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeases.map((lease) => (
                      <tr key={lease.id}>
                        <td data-label="IP Address">{lease.ipAddress}</td>
                        <td data-label="MAC Address">{lease.macAddress}</td>
                        <td data-label="Hostname">{lease.hostname}</td>
                        <td data-label="Pool">{lease.pool}</td>
                        <td data-label="Lease Start">{lease.leaseStart}</td>
                        <td data-label="Lease Expiry">{lease.leaseExpiry}</td>
                        <td data-label="Time Remaining">{getTimeRemaining(lease.leaseExpiry)}</td>
                        <td data-label="Status">
                          <span className={`status-indicator ${getStatusClass(lease.status)}`}>
                            <span className="status-dot"></span>
                            {lease.status.charAt(0).toUpperCase() + lease.status.slice(1)}
                          </span>
                        </td>
                        <td data-label="Actions">
                          <div className="btn-group">
                            {lease.status === 'active' && (
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => handleReleaseLease(lease.id)}
                                title="Release lease"
                              >
                                Release
                              </button>
                            )}
                            {(lease.status === 'expired' || lease.status === 'released') && (
                              <button
                                className="btn btn-sm btn-success"
                                onClick={() => handleRenewLease(lease.id)}
                                title="Renew lease"
                              >
                                Renew
                              </button>
                            )}
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDeleteLease(lease.id)}
                              title="Delete lease record"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leases;