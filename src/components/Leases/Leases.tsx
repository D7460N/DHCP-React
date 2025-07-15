import React, { useState, useEffect } from 'react';

interface Lease {
  id: string;
  ipAddress: string;
  macAddress: string;
  hostname: string;
  clientId: string;
  leaseStart: string;
  leaseExpiry: string;
  status: 'active' | 'expired' | 'reserved';
  pool: string;
  vendorClass: string;
}

const Leases: React.FC = () => {
  const [leases, setLeases] = useState<Lease[]>([]);
  const [filteredLeases, setFilteredLeases] = useState<Lease[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [poolFilter, setPoolFilter] = useState('all');

  useEffect(() => {
    // Simulate API call
    const fetchLeases = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockLeases: Lease[] = [
        {
          id: '1',
          ipAddress: '192.168.1.100',
          macAddress: '00:11:22:33:44:55',
          hostname: 'desktop-001',
          clientId: 'desktop-001',
          leaseStart: '2024-01-15T09:00:00Z',
          leaseExpiry: '2024-01-16T09:00:00Z',
          status: 'active',
          pool: 'Main Office Network',
          vendorClass: 'MSFT 5.0'
        },
        {
          id: '2',
          ipAddress: '192.168.1.101',
          macAddress: '00:11:22:33:44:56',
          hostname: 'laptop-002',
          clientId: 'laptop-002',
          leaseStart: '2024-01-15T08:30:00Z',
          leaseExpiry: '2024-01-16T08:30:00Z',
          status: 'active',
          pool: 'Main Office Network',
          vendorClass: 'MSFT 5.0'
        },
        {
          id: '3',
          ipAddress: '192.168.2.60',
          macAddress: '00:11:22:33:44:57',
          hostname: 'guest-mobile',
          clientId: 'guest-mobile',
          leaseStart: '2024-01-15T10:00:00Z',
          leaseExpiry: '2024-01-15T11:00:00Z',
          status: 'active',
          pool: 'Guest Network',
          vendorClass: 'android-dhcp'
        },
        {
          id: '4',
          ipAddress: '192.168.3.25',
          macAddress: '00:11:22:33:44:58',
          hostname: 'iot-sensor-01',
          clientId: 'iot-sensor-01',
          leaseStart: '2024-01-08T10:00:00Z',
          leaseExpiry: '2024-01-15T10:00:00Z',
          status: 'active',
          pool: 'IoT Devices',
          vendorClass: 'IoT Device'
        },
        {
          id: '5',
          ipAddress: '192.168.4.45',
          macAddress: '00:11:22:33:44:59',
          hostname: 'dev-vm-01',
          clientId: 'dev-vm-01',
          leaseStart: '2024-01-15T06:00:00Z',
          leaseExpiry: '2024-01-15T18:00:00Z',
          status: 'active',
          pool: 'Development Lab',
          vendorClass: 'VMware'
        },
        {
          id: '6',
          ipAddress: '192.168.1.105',
          macAddress: '00:11:22:33:44:60',
          hostname: 'old-desktop',
          clientId: 'old-desktop',
          leaseStart: '2024-01-14T10:00:00Z',
          leaseExpiry: '2024-01-15T10:00:00Z',
          status: 'expired',
          pool: 'Main Office Network',
          vendorClass: 'MSFT 5.0'
        },
        {
          id: '7',
          ipAddress: '192.168.1.110',
          macAddress: '00:11:22:33:44:61',
          hostname: 'server-01',
          clientId: 'server-01',
          leaseStart: '2024-01-01T00:00:00Z',
          leaseExpiry: '2024-12-31T23:59:59Z',
          status: 'reserved',
          pool: 'Main Office Network',
          vendorClass: 'PXEClient'
        },
        {
          id: '8',
          ipAddress: '192.168.2.75',
          macAddress: '00:11:22:33:44:62',
          hostname: 'guest-tablet',
          clientId: 'guest-tablet',
          leaseStart: '2024-01-15T09:45:00Z',
          leaseExpiry: '2024-01-15T10:45:00Z',
          status: 'active',
          pool: 'Guest Network',
          vendorClass: 'iPad'
        }
      ];

      setLeases(mockLeases);
      setFilteredLeases(mockLeases);
      setLoading(false);
    };

    fetchLeases();
  }, []);

  // Filter leases based on search term and filters
  useEffect(() => {
    let filtered = leases;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(lease =>
        lease.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lease.macAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lease.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lease.clientId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(lease => lease.status === statusFilter);
    }

    // Apply pool filter
    if (poolFilter !== 'all') {
      filtered = filtered.filter(lease => lease.pool === poolFilter);
    }

    setFilteredLeases(filtered);
  }, [leases, searchTerm, statusFilter, poolFilter]);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'status-badge status-online';
      case 'expired':
        return 'status-badge status-offline';
      case 'reserved':
        return 'status-badge status-warning';
      default:
        return 'status-badge';
    }
  };

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const getTimeRemaining = (expiryTime: string) => {
    const now = new Date();
    const expiry = new Date(expiryTime);
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    
    return `${hours}h ${minutes}m`;
  };

  const uniquePools = Array.from(new Set(leases.map(lease => lease.pool)));

  const handleReleaseLease = (leaseId: string) => {
    console.log(`Releasing lease ${leaseId}`);
    // Handle lease release
  };

  const handleRenewLease = (leaseId: string) => {
    console.log(`Renewing lease ${leaseId}`);
    // Handle lease renewal
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" aria-hidden="true"></div>
        <span>Loading active leases...</span>
      </div>
    );
  }

  return (
    <div>
      <h1>Active Leases</h1>
      
      {/* Filters */}
      <div className="lease-filters">
        <div className="lease-filter">
          <label htmlFor="search" className="form-label">Search</label>
          <input
            type="text"
            id="search"
            className="form-input"
            placeholder="Search by IP, MAC, hostname..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="lease-filter">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            id="status"
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="reserved">Reserved</option>
          </select>
        </div>
        
        <div className="lease-filter">
          <label htmlFor="pool" className="form-label">Pool</label>
          <select
            id="pool"
            className="form-select"
            value={poolFilter}
            onChange={(e) => setPoolFilter(e.target.value)}
          >
            <option value="all">All Pools</option>
            {uniquePools.map(pool => (
              <option key={pool} value={pool}>{pool}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="alert alert-info">
        Showing {filteredLeases.length} of {leases.length} leases
      </div>

      {/* Leases Table */}
      <div className="card">
        <div className="table-container">
          <table className="lease-table" role="table">
            <thead>
              <tr>
                <th scope="col">IP Address</th>
                <th scope="col">MAC Address</th>
                <th scope="col">Hostname</th>
                <th scope="col">Status</th>
                <th scope="col">Pool</th>
                <th scope="col">Lease Start</th>
                <th scope="col">Expires</th>
                <th scope="col">Time Remaining</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeases.map((lease) => (
                <tr key={lease.id}>
                  <td>
                    <span className="lease-ip">{lease.ipAddress}</span>
                  </td>
                  <td>
                    <span className="lease-mac">{lease.macAddress}</span>
                  </td>
                  <td>{lease.hostname}</td>
                  <td>
                    <span className={getStatusBadgeClass(lease.status)}>
                      {lease.status}
                    </span>
                  </td>
                  <td>{lease.pool}</td>
                  <td>
                    <span className="lease-expires">{formatDateTime(lease.leaseStart)}</span>
                  </td>
                  <td>
                    <span className="lease-expires">{formatDateTime(lease.leaseExpiry)}</span>
                  </td>
                  <td>
                    <span className="lease-expires">{getTimeRemaining(lease.leaseExpiry)}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      {lease.status === 'active' && (
                        <>
                          <button
                            className="btn btn-secondary"
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                            onClick={() => handleRenewLease(lease.id)}
                            title="Renew lease"
                          >
                            Renew
                          </button>
                          <button
                            className="btn btn-secondary"
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                            onClick={() => handleReleaseLease(lease.id)}
                            title="Release lease"
                          >
                            Release
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leases;