import React, { useState, useEffect } from 'react';

interface IPPool {
  id: string;
  name: string;
  network: string;
  subnet: string;
  startIP: string;
  endIP: string;
  totalAddresses: number;
  availableAddresses: number;
  utilizationPercentage: number;
  status: 'active' | 'inactive' | 'error';
  description: string;
  leaseTime: string;
}

const IPPools: React.FC = () => {
  const [pools, setPools] = useState<IPPool[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchPools = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data
      setPools([
        {
          id: '1',
          name: 'Main Office Network',
          network: '192.168.1.0/24',
          subnet: '255.255.255.0',
          startIP: '192.168.1.100',
          endIP: '192.168.1.200',
          totalAddresses: 101,
          availableAddresses: 34,
          utilizationPercentage: 66,
          status: 'active',
          description: 'Primary network for office devices',
          leaseTime: '24 hours'
        },
        {
          id: '2',
          name: 'Guest Network',
          network: '192.168.2.0/24',
          subnet: '255.255.255.0',
          startIP: '192.168.2.50',
          endIP: '192.168.2.100',
          totalAddresses: 51,
          availableAddresses: 45,
          utilizationPercentage: 12,
          status: 'active',
          description: 'Network for guest devices',
          leaseTime: '1 hour'
        },
        {
          id: '3',
          name: 'IoT Devices',
          network: '192.168.3.0/24',
          subnet: '255.255.255.0',
          startIP: '192.168.3.10',
          endIP: '192.168.3.50',
          totalAddresses: 41,
          availableAddresses: 12,
          utilizationPercentage: 71,
          status: 'active',
          description: 'Network for IoT and smart devices',
          leaseTime: '7 days'
        },
        {
          id: '4',
          name: 'Development Lab',
          network: '192.168.4.0/24',
          subnet: '255.255.255.0',
          startIP: '192.168.4.20',
          endIP: '192.168.4.80',
          totalAddresses: 61,
          availableAddresses: 5,
          utilizationPercentage: 92,
          status: 'active',
          description: 'Network for development and testing',
          leaseTime: '12 hours'
        },
        {
          id: '5',
          name: 'Server Network',
          network: '192.168.5.0/24',
          subnet: '255.255.255.0',
          startIP: '192.168.5.10',
          endIP: '192.168.5.30',
          totalAddresses: 21,
          availableAddresses: 0,
          utilizationPercentage: 100,
          status: 'error',
          description: 'Network for server infrastructure',
          leaseTime: '30 days'
        }
      ]);

      setLoading(false);
    };

    fetchPools();
  }, []);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'status-badge status-online';
      case 'inactive':
        return 'status-badge status-offline';
      case 'error':
        return 'status-badge status-offline';
      default:
        return 'status-badge';
    }
  };

  const getUtilizationColor = (percentage: number) => {
    if (percentage >= 90) return 'critical';
    if (percentage >= 75) return 'high';
    return '';
  };

  const handleAddPool = () => {
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
  };

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
    console.log('Adding new pool...');
    setShowAddForm(false);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" aria-hidden="true"></div>
        <span>Loading IP pools...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="ip-pool-header">
        <h1>IP Pool Management</h1>
        <button 
          className="btn btn-primary" 
          onClick={handleAddPool}
          aria-label="Add new IP pool"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 3.5V12.5M3.5 8H12.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Add Pool
        </button>
      </div>

      {/* Add Pool Form */}
      {showAddForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <form onSubmit={handleSubmitForm} className="config-form">
            <h3>Add New IP Pool</h3>
            <div className="config-form-row">
              <div className="form-group">
                <label htmlFor="poolName" className="form-label">Pool Name</label>
                <input
                  type="text"
                  id="poolName"
                  name="poolName"
                  className="form-input"
                  required
                  placeholder="Enter pool name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="network" className="form-label">Network</label>
                <input
                  type="text"
                  id="network"
                  name="network"
                  className="form-input"
                  required
                  placeholder="192.168.1.0/24"
                />
              </div>
            </div>
            <div className="config-form-row">
              <div className="form-group">
                <label htmlFor="startIP" className="form-label">Start IP</label>
                <input
                  type="text"
                  id="startIP"
                  name="startIP"
                  className="form-input"
                  required
                  placeholder="192.168.1.100"
                />
              </div>
              <div className="form-group">
                <label htmlFor="endIP" className="form-label">End IP</label>
                <input
                  type="text"
                  id="endIP"
                  name="endIP"
                  className="form-input"
                  required
                  placeholder="192.168.1.200"
                />
              </div>
            </div>
            <div className="config-form-row">
              <div className="form-group">
                <label htmlFor="leaseTime" className="form-label">Lease Time</label>
                <select
                  id="leaseTime"
                  name="leaseTime"
                  className="form-select"
                  required
                >
                  <option value="">Select lease time</option>
                  <option value="1h">1 Hour</option>
                  <option value="12h">12 Hours</option>
                  <option value="24h">24 Hours</option>
                  <option value="7d">7 Days</option>
                  <option value="30d">30 Days</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="description" className="form-label">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="form-input"
                  placeholder="Pool description"
                />
              </div>
            </div>
            <div className="config-actions">
              <button type="submit" className="btn btn-primary">
                Create Pool
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCloseForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* IP Pools Grid */}
      <div className="ip-pool-grid">
        {pools.map((pool) => (
          <div key={pool.id} className="ip-pool-card">
            <div className="ip-pool-info">
              <h3>{pool.name}</h3>
              <span className={getStatusBadgeClass(pool.status)}>
                {pool.status}
              </span>
            </div>
            <div className="ip-pool-range">
              <strong>Network:</strong> {pool.network}
            </div>
            <div className="ip-pool-range">
              <strong>Range:</strong> {pool.startIP} - {pool.endIP}
            </div>
            <div className="ip-pool-range">
              <strong>Available:</strong> {pool.availableAddresses} of {pool.totalAddresses}
            </div>
            <div className="ip-pool-range">
              <strong>Lease Time:</strong> {pool.leaseTime}
            </div>
            <div className="ip-pool-range">
              <strong>Description:</strong> {pool.description}
            </div>
            
            <div className="ip-pool-utilization">
              <div className="utilization-bar">
                <div 
                  className={`utilization-fill ${getUtilizationColor(pool.utilizationPercentage)}`}
                  style={{ width: `${pool.utilizationPercentage}%` }}
                  role="progressbar"
                  aria-valuenow={pool.utilizationPercentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Pool utilization: ${pool.utilizationPercentage}%`}
                />
              </div>
              <div className="utilization-text">
                {pool.utilizationPercentage}% utilized
              </div>
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-secondary" style={{ flex: 1 }}>
                Edit
              </button>
              <button className="btn btn-secondary" style={{ flex: 1 }}>
                View Leases
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IPPools;