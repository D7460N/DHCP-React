import React, { useState } from 'react';

interface IPPool {
  id: string;
  name: string;
  network: string;
  startIP: string;
  endIP: string;
  subnetMask: string;
  gateway: string;
  dns: string[];
  leaseTime: number;
  available: number;
  allocated: number;
  status: 'active' | 'inactive';
}

const IPPools: React.FC = () => {
  const [pools] = useState<IPPool[]>([
    {
      id: '1',
      name: 'Main Network Pool',
      network: '192.168.1.0/24',
      startIP: '192.168.1.100',
      endIP: '192.168.1.200',
      subnetMask: '255.255.255.0',
      gateway: '192.168.1.1',
      dns: ['8.8.8.8', '8.8.4.4'],
      leaseTime: 86400, // 24 hours
      available: 67,
      allocated: 34,
      status: 'active'
    },
    {
      id: '2',
      name: 'Guest Network Pool',
      network: '192.168.2.0/24',
      startIP: '192.168.2.50',
      endIP: '192.168.2.150',
      subnetMask: '255.255.255.0',
      gateway: '192.168.2.1',
      dns: ['1.1.1.1', '1.0.0.1'],
      leaseTime: 3600, // 1 hour
      available: 89,
      allocated: 12,
      status: 'active'
    },
    {
      id: '3',
      name: 'IoT Devices Pool',
      network: '192.168.3.0/24',
      startIP: '192.168.3.10',
      endIP: '192.168.3.100',
      subnetMask: '255.255.255.0',
      gateway: '192.168.3.1',
      dns: ['192.168.1.1'],
      leaseTime: 604800, // 7 days
      available: 45,
      allocated: 46,
      status: 'active'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const formatLeaseTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} days`;
    return `${hours} hours`;
  };

  const getUtilization = (available: number, allocated: number) => {
    const total = available + allocated;
    return total > 0 ? Math.round((allocated / total) * 100) : 0;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0, color: '#1e293b' }}>IP Address Pools</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddForm(true)}
          aria-label="Add new IP pool"
        >
          Add New Pool
        </button>
      </div>

      <div className="dashboard-grid">
        {pools.map((pool) => (
          <div key={pool.id} className="dashboard-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>{pool.name}</h3>
              <span className={`status-indicator ${pool.status === 'active' ? 'online' : 'offline'}`} aria-hidden="true"></span>
            </div>
            
            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
              <p><strong>Network:</strong> {pool.network}</p>
              <p><strong>Range:</strong> {pool.startIP} - {pool.endIP}</p>
              <p><strong>Gateway:</strong> {pool.gateway}</p>
              <p><strong>DNS:</strong> {pool.dns.join(', ')}</p>
              <p><strong>Lease Time:</strong> {formatLeaseTime(pool.leaseTime)}</p>
            </div>

            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>Available: {pool.available}</span>
                <span>Allocated: {pool.allocated}</span>
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
                Utilization: {getUtilization(pool.available, pool.allocated)}%
              </div>
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-secondary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
                Edit
              </button>
              <button className="btn btn-secondary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
                View Leases
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="dashboard-card" style={{ marginTop: '2rem' }}>
          <h3>Add New IP Pool</h3>
          <form onSubmit={(e) => { e.preventDefault(); setShowAddForm(false); }}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="pool-name">Pool Name</label>
                <input
                  type="text"
                  id="pool-name"
                  className="form-input"
                  placeholder="e.g., Main Network Pool"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="network">Network</label>
                <input
                  type="text"
                  id="network"
                  className="form-input"
                  placeholder="e.g., 192.168.1.0/24"
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="start-ip">Start IP</label>
                <input
                  type="text"
                  id="start-ip"
                  className="form-input"
                  placeholder="e.g., 192.168.1.100"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="end-ip">End IP</label>
                <input
                  type="text"
                  id="end-ip"
                  className="form-input"
                  placeholder="e.g., 192.168.1.200"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="gateway">Gateway</label>
                <input
                  type="text"
                  id="gateway"
                  className="form-input"
                  placeholder="e.g., 192.168.1.1"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="lease-time">Lease Time (hours)</label>
                <input
                  type="number"
                  id="lease-time"
                  className="form-input"
                  defaultValue={24}
                  min={1}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="dns-servers">DNS Servers</label>
              <input
                type="text"
                id="dns-servers"
                className="form-input"
                placeholder="e.g., 8.8.8.8, 8.8.4.4"
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button type="submit" className="btn btn-primary">
                Create Pool
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default IPPools;