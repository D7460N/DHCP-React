import React, { useState, useEffect } from 'react';

interface IPPool {
  id: string;
  name: string;
  startIP: string;
  endIP: string;
  subnetMask: string;
  gateway: string;
  dnsServers: string[];
  leaseTime: number;
  totalIPs: number;
  usedIPs: number;
  status: 'active' | 'inactive' | 'warning';
}

const IPPools: React.FC = () => {
  const [pools, setPools] = useState<IPPool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPool, setNewPool] = useState({
    name: '',
    startIP: '',
    endIP: '',
    subnetMask: '255.255.255.0',
    gateway: '',
    dnsServers: '',
    leaseTime: 86400
  });

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setPools([
        {
          id: '1',
          name: 'Main Office Network',
          startIP: '192.168.1.100',
          endIP: '192.168.1.200',
          subnetMask: '255.255.255.0',
          gateway: '192.168.1.1',
          dnsServers: ['8.8.8.8', '8.8.4.4'],
          leaseTime: 86400,
          totalIPs: 101,
          usedIPs: 67,
          status: 'active'
        },
        {
          id: '2',
          name: 'Guest Network',
          startIP: '192.168.2.50',
          endIP: '192.168.2.100',
          subnetMask: '255.255.255.0',
          gateway: '192.168.2.1',
          dnsServers: ['1.1.1.1', '1.0.0.1'],
          leaseTime: 3600,
          totalIPs: 51,
          usedIPs: 23,
          status: 'active'
        },
        {
          id: '3',
          name: 'IoT Devices',
          startIP: '192.168.3.10',
          endIP: '192.168.3.50',
          subnetMask: '255.255.255.0',
          gateway: '192.168.3.1',
          dnsServers: ['192.168.1.1'],
          leaseTime: 604800,
          totalIPs: 41,
          usedIPs: 38,
          status: 'warning'
        }
      ]);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleCreatePool = (e: React.FormEvent) => {
    e.preventDefault();
    const dnsArray = newPool.dnsServers.split(',').map(dns => dns.trim());
    const pool: IPPool = {
      id: Date.now().toString(),
      name: newPool.name,
      startIP: newPool.startIP,
      endIP: newPool.endIP,
      subnetMask: newPool.subnetMask,
      gateway: newPool.gateway,
      dnsServers: dnsArray,
      leaseTime: newPool.leaseTime,
      totalIPs: calculateTotalIPs(newPool.startIP, newPool.endIP),
      usedIPs: 0,
      status: 'active'
    };
    
    setPools([...pools, pool]);
    setNewPool({
      name: '',
      startIP: '',
      endIP: '',
      subnetMask: '255.255.255.0',
      gateway: '',
      dnsServers: '',
      leaseTime: 86400
    });
    setShowCreateForm(false);
  };

  const calculateTotalIPs = (start: string, end: string): number => {
    // Simple calculation - would need proper IP range calculation in production
    return 50; // Placeholder
  };

  const getUtilization = (used: number, total: number): number => {
    return (used / total) * 100;
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization > 80) return 'danger';
    if (utilization > 60) return 'warning';
    return 'success';
  };

  const formatLeaseTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return `${seconds} seconds`;
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner" aria-label="Loading IP pools"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="content-header">
        <h1 className="content-title">IP Pools</h1>
        <p className="content-subtitle">
          Manage IP address pools and their configurations
        </p>
      </div>

      <div className="action-buttons">
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateForm(true)}
        >
          Create New Pool
        </button>
        <button className="btn btn-outline">
          Import Configuration
        </button>
      </div>

      {/* Create Pool Form */}
      {showCreateForm && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Create New IP Pool</h2>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setShowCreateForm(false)}
            >
              Cancel
            </button>
          </div>
          <form onSubmit={handleCreatePool} className="card-content">
            <div className="form-group">
              <label htmlFor="poolName" className="form-label">Pool Name</label>
              <input
                type="text"
                id="poolName"
                className="form-input"
                value={newPool.name}
                onChange={(e) => setNewPool({...newPool, name: e.target.value})}
                required
                placeholder="e.g., Main Office Network"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="startIP" className="form-label">Start IP</label>
                <input
                  type="text"
                  id="startIP"
                  className="form-input"
                  value={newPool.startIP}
                  onChange={(e) => setNewPool({...newPool, startIP: e.target.value})}
                  required
                  placeholder="192.168.1.100"
                  pattern="^(\d{1,3}\.){3}\d{1,3}$"
                />
              </div>

              <div className="form-group">
                <label htmlFor="endIP" className="form-label">End IP</label>
                <input
                  type="text"
                  id="endIP"
                  className="form-input"
                  value={newPool.endIP}
                  onChange={(e) => setNewPool({...newPool, endIP: e.target.value})}
                  required
                  placeholder="192.168.1.200"
                  pattern="^(\d{1,3}\.){3}\d{1,3}$"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subnetMask" className="form-label">Subnet Mask</label>
                <select
                  id="subnetMask"
                  className="form-select"
                  value={newPool.subnetMask}
                  onChange={(e) => setNewPool({...newPool, subnetMask: e.target.value})}
                >
                  <option value="255.255.255.0">255.255.255.0 (/24)</option>
                  <option value="255.255.254.0">255.255.254.0 (/23)</option>
                  <option value="255.255.252.0">255.255.252.0 (/22)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="gateway" className="form-label">Gateway</label>
                <input
                  type="text"
                  id="gateway"
                  className="form-input"
                  value={newPool.gateway}
                  onChange={(e) => setNewPool({...newPool, gateway: e.target.value})}
                  required
                  placeholder="192.168.1.1"
                  pattern="^(\d{1,3}\.){3}\d{1,3}$"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="dnsServers" className="form-label">DNS Servers</label>
              <input
                type="text"
                id="dnsServers"
                className="form-input"
                value={newPool.dnsServers}
                onChange={(e) => setNewPool({...newPool, dnsServers: e.target.value})}
                placeholder="8.8.8.8, 8.8.4.4"
              />
              <small style={{ color: '#7f8c8d' }}>Separate multiple DNS servers with commas</small>
            </div>

            <div className="form-group">
              <label htmlFor="leaseTime" className="form-label">Lease Time (seconds)</label>
              <select
                id="leaseTime"
                className="form-select"
                value={newPool.leaseTime}
                onChange={(e) => setNewPool({...newPool, leaseTime: parseInt(e.target.value)})}
              >
                <option value={3600}>1 hour</option>
                <option value={86400}>24 hours</option>
                <option value={604800}>7 days</option>
              </select>
            </div>

            <div className="action-buttons">
              <button type="submit" className="btn btn-primary">
                Create Pool
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Pools Grid */}
      <div className="dashboard-grid">
        {pools.map((pool) => (
          <div key={pool.id} className="card">
            <div className="card-header">
              <h3 className="card-title">{pool.name}</h3>
              <div className={`status-indicator ${pool.status}`}>
                <span className="status-dot" aria-hidden="true"></span>
                {pool.status}
              </div>
            </div>
            <div className="card-content">
              <div style={{ marginBottom: '1rem' }}>
                <p><strong>Range:</strong> <span className="ip-address">{pool.startIP}</span> - <span className="ip-address">{pool.endIP}</span></p>
                <p><strong>Gateway:</strong> <span className="ip-address">{pool.gateway}</span></p>
                <p><strong>Subnet Mask:</strong> <span className="ip-address">{pool.subnetMask}</span></p>
                <p><strong>DNS:</strong> {pool.dnsServers.map(dns => <span key={dns} className="ip-address" style={{ marginRight: '0.5rem' }}>{dns}</span>)}</p>
                <p><strong>Lease Time:</strong> {formatLeaseTime(pool.leaseTime)}</p>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Utilization</span>
                  <span>{getUtilization(pool.usedIPs, pool.totalIPs).toFixed(1)}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className={`progress-fill ${getUtilizationColor(getUtilization(pool.usedIPs, pool.totalIPs))}`}
                    style={{ width: `${getUtilization(pool.usedIPs, pool.totalIPs)}%` }}
                    role="progressbar"
                    aria-valuenow={getUtilization(pool.usedIPs, pool.totalIPs)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${pool.name} utilization: ${getUtilization(pool.usedIPs, pool.totalIPs).toFixed(1)}%`}
                  ></div>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#7f8c8d', marginTop: '0.5rem' }}>
                  {pool.usedIPs} of {pool.totalIPs} addresses in use
                </p>
              </div>

              <div className="action-buttons">
                <button className="btn btn-outline btn-sm">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IPPools;