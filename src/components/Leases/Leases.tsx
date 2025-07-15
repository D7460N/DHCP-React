import React, { useState } from 'react';

interface Lease {
  id: string;
  ipAddress: string;
  macAddress: string;
  hostname: string;
  leaseStart: string;
  leaseEnd: string;
  status: 'active' | 'expired' | 'reserved';
  clientType: string;
  pool: string;
}

const Leases: React.FC = () => {
  const [leases] = useState<Lease[]>([
    {
      id: '1',
      ipAddress: '192.168.1.100',
      macAddress: '00:11:22:33:44:55',
      hostname: 'workstation-01',
      leaseStart: '2024-01-15T10:30:00Z',
      leaseEnd: '2024-01-16T10:30:00Z',
      status: 'active',
      clientType: 'Windows PC',
      pool: 'Main Network Pool'
    },
    {
      id: '2',
      ipAddress: '192.168.1.101',
      macAddress: '00:11:22:33:44:56',
      hostname: 'laptop-02',
      leaseStart: '2024-01-15T11:15:00Z',
      leaseEnd: '2024-01-16T11:15:00Z',
      status: 'active',
      clientType: 'MacBook',
      pool: 'Main Network Pool'
    },
    {
      id: '3',
      ipAddress: '192.168.2.75',
      macAddress: '00:11:22:33:44:57',
      hostname: 'guest-device',
      leaseStart: '2024-01-15T14:20:00Z',
      leaseEnd: '2024-01-15T15:20:00Z',
      status: 'active',
      clientType: 'Mobile Phone',
      pool: 'Guest Network Pool'
    },
    {
      id: '4',
      ipAddress: '192.168.3.45',
      macAddress: '00:11:22:33:44:58',
      hostname: 'iot-sensor-01',
      leaseStart: '2024-01-10T08:00:00Z',
      leaseEnd: '2024-01-17T08:00:00Z',
      status: 'active',
      clientType: 'IoT Device',
      pool: 'IoT Devices Pool'
    },
    {
      id: '5',
      ipAddress: '192.168.1.105',
      macAddress: '00:11:22:33:44:59',
      hostname: 'old-printer',
      leaseStart: '2024-01-14T16:45:00Z',
      leaseEnd: '2024-01-15T16:45:00Z',
      status: 'expired',
      clientType: 'Network Printer',
      pool: 'Main Network Pool'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'active' | 'expired' | 'reserved'>('all');

  const filteredLeases = leases.filter(lease => filter === 'all' || lease.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'online';
      case 'expired': return 'warning';
      case 'reserved': return 'offline';
      default: return 'offline';
    }
  };

  const getTimeRemaining = (endTime: string) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0, color: '#1e293b' }}>Active Leases</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <label htmlFor="status-filter" className="sr-only">Filter by status</label>
          <select
            id="status-filter"
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            style={{ width: 'auto' }}
          >
            <option value="all">All Leases</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="reserved">Reserved</option>
          </select>
          <button className="btn btn-primary">
            Refresh
          </button>
        </div>
      </div>

      <div className="dashboard-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0 }}>Lease Information</h3>
          <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
            Showing {filteredLeases.length} of {leases.length} leases
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>IP Address</th>
                <th>MAC Address</th>
                <th>Hostname</th>
                <th>Client Type</th>
                <th>Pool</th>
                <th>Status</th>
                <th>Time Remaining</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeases.map((lease) => (
                <tr key={lease.id}>
                  <td style={{ fontFamily: 'monospace' }}>{lease.ipAddress}</td>
                  <td style={{ fontFamily: 'monospace' }}>{lease.macAddress}</td>
                  <td>{lease.hostname}</td>
                  <td>{lease.clientType}</td>
                  <td>{lease.pool}</td>
                  <td>
                    <span className={`status-indicator ${getStatusColor(lease.status)}`} aria-hidden="true"></span>
                    {lease.status.charAt(0).toUpperCase() + lease.status.slice(1)}
                  </td>
                  <td>{getTimeRemaining(lease.leaseEnd)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        className="btn btn-secondary"
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                        aria-label={`Renew lease for ${lease.hostname}`}
                      >
                        Renew
                      </button>
                      <button
                        className="btn btn-secondary"
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                        aria-label={`Release lease for ${lease.hostname}`}
                      >
                        Release
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLeases.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
            No leases found matching the selected filter.
          </div>
        )}
      </div>

      <div className="dashboard-card" style={{ marginTop: '2rem' }}>
        <h3>Lease Statistics</h3>
        <div className="dashboard-grid">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
              {leases.filter(l => l.status === 'active').length}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Active Leases</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
              {leases.filter(l => l.status === 'expired').length}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Expired Leases</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6b7280' }}>
              {leases.filter(l => l.status === 'reserved').length}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Reserved Leases</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leases;