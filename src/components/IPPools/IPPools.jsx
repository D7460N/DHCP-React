import React, { useState, useEffect } from 'react';

const IPPools = () => {
  const [pools, setPools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPool, setNewPool] = useState({
    name: '',
    startIP: '',
    endIP: '',
    subnetMask: '',
    gateway: '',
    dns1: '',
    dns2: '',
    leaseTime: '86400'
  });

  useEffect(() => {
    // Simulate API call to fetch IP pools
    const fetchPools = async () => {
      try {
        setTimeout(() => {
          setPools([
            {
              id: 1,
              name: 'Main Pool',
              startIP: '192.168.1.100',
              endIP: '192.168.1.200',
              subnetMask: '255.255.255.0',
              gateway: '192.168.1.1',
              dns1: '8.8.8.8',
              dns2: '8.8.4.4',
              leaseTime: '86400',
              activeLeases: 45,
              totalIPs: 101,
              utilization: 45,
              status: 'active'
            },
            {
              id: 2,
              name: 'Guest Pool',
              startIP: '192.168.2.50',
              endIP: '192.168.2.100',
              subnetMask: '255.255.255.0',
              gateway: '192.168.2.1',
              dns1: '8.8.8.8',
              dns2: '8.8.4.4',
              leaseTime: '3600',
              activeLeases: 12,
              totalIPs: 51,
              utilization: 24,
              status: 'active'
            },
            {
              id: 3,
              name: 'IoT Pool',
              startIP: '192.168.3.100',
              endIP: '192.168.3.200',
              subnetMask: '255.255.255.0',
              gateway: '192.168.3.1',
              dns1: '8.8.8.8',
              dns2: '8.8.4.4',
              leaseTime: '604800',
              activeLeases: 89,
              totalIPs: 101,
              utilization: 88,
              status: 'active'
            },
            {
              id: 4,
              name: 'VPN Pool',
              startIP: '10.0.1.100',
              endIP: '10.0.1.200',
              subnetMask: '255.255.255.0',
              gateway: '10.0.1.1',
              dns1: '8.8.8.8',
              dns2: '8.8.4.4',
              leaseTime: '43200',
              activeLeases: 5,
              totalIPs: 101,
              utilization: 5,
              status: 'inactive'
            }
          ]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching pools:', error);
        setIsLoading(false);
      }
    };

    fetchPools();
  }, []);

  const handleAddPool = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newPool.name || !newPool.startIP || !newPool.endIP || !newPool.subnetMask || !newPool.gateway) {
      alert('Please fill in all required fields');
      return;
    }

    const poolToAdd = {
      id: pools.length + 1,
      ...newPool,
      activeLeases: 0,
      totalIPs: calculateTotalIPs(newPool.startIP, newPool.endIP),
      utilization: 0,
      status: 'active'
    };

    setPools([...pools, poolToAdd]);
    setNewPool({
      name: '',
      startIP: '',
      endIP: '',
      subnetMask: '',
      gateway: '',
      dns1: '',
      dns2: '',
      leaseTime: '86400'
    });
    setShowAddForm(false);
  };

  const calculateTotalIPs = (startIP, endIP) => {
    // Simple calculation for demo purposes
    const startNum = parseInt(startIP.split('.')[3]);
    const endNum = parseInt(endIP.split('.')[3]);
    return endNum - startNum + 1;
  };

  const handleTogglePool = (poolId) => {
    setPools(pools.map(pool => 
      pool.id === poolId 
        ? { ...pool, status: pool.status === 'active' ? 'inactive' : 'active' }
        : pool
    ));
  };

  const handleDeletePool = (poolId) => {
    if (window.confirm('Are you sure you want to delete this pool?')) {
      setPools(pools.filter(pool => pool.id !== poolId));
    }
  };

  const formatLeaseTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days} day${days !== 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    } else {
      return `${seconds} second${seconds !== 1 ? 's' : ''}`;
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner" aria-hidden="true"></div>
        Loading IP pools...
      </div>
    );
  }

  return (
    <div className="ip-pools">
      <div className="page-header">
        <h1>IP Pool Management</h1>
        <p className="page-description">Manage DHCP IP address pools and their configurations</p>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add New Pool'}
        </button>
      </div>

      {showAddForm && (
        <div className="card mb-4">
          <div className="card-header">
            <h2 className="card-title">Add New IP Pool</h2>
          </div>
          <div className="card-content">
            <form onSubmit={handleAddPool}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="poolName" className="form-label">Pool Name *</label>
                  <input
                    id="poolName"
                    type="text"
                    className="form-input"
                    value={newPool.name}
                    onChange={(e) => setNewPool({...newPool, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="leaseTime" className="form-label">Lease Time (seconds)</label>
                  <select
                    id="leaseTime"
                    className="form-select"
                    value={newPool.leaseTime}
                    onChange={(e) => setNewPool({...newPool, leaseTime: e.target.value})}
                  >
                    <option value="3600">1 Hour</option>
                    <option value="43200">12 Hours</option>
                    <option value="86400">24 Hours</option>
                    <option value="604800">1 Week</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="startIP" className="form-label">Start IP Address *</label>
                  <input
                    id="startIP"
                    type="text"
                    className="form-input"
                    placeholder="192.168.1.100"
                    value={newPool.startIP}
                    onChange={(e) => setNewPool({...newPool, startIP: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endIP" className="form-label">End IP Address *</label>
                  <input
                    id="endIP"
                    type="text"
                    className="form-input"
                    placeholder="192.168.1.200"
                    value={newPool.endIP}
                    onChange={(e) => setNewPool({...newPool, endIP: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="subnetMask" className="form-label">Subnet Mask *</label>
                  <input
                    id="subnetMask"
                    type="text"
                    className="form-input"
                    placeholder="255.255.255.0"
                    value={newPool.subnetMask}
                    onChange={(e) => setNewPool({...newPool, subnetMask: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gateway" className="form-label">Gateway *</label>
                  <input
                    id="gateway"
                    type="text"
                    className="form-input"
                    placeholder="192.168.1.1"
                    value={newPool.gateway}
                    onChange={(e) => setNewPool({...newPool, gateway: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dns1" className="form-label">Primary DNS</label>
                  <input
                    id="dns1"
                    type="text"
                    className="form-input"
                    placeholder="8.8.8.8"
                    value={newPool.dns1}
                    onChange={(e) => setNewPool({...newPool, dns1: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dns2" className="form-label">Secondary DNS</label>
                  <input
                    id="dns2"
                    type="text"
                    className="form-input"
                    placeholder="8.8.4.4"
                    value={newPool.dns2}
                    onChange={(e) => setNewPool({...newPool, dns2: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="btn-group">
                <button type="submit" className="btn btn-success">Add Pool</button>
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
        </div>
      )}

      <div className="pools-grid">
        {pools.map((pool) => (
          <div key={pool.id} className="card pool-card">
            <div className="card-header">
              <h3 className="card-title">{pool.name}</h3>
              <div className="pool-actions">
                <button
                  className={`btn ${pool.status === 'active' ? 'btn-secondary' : 'btn-success'}`}
                  onClick={() => handleTogglePool(pool.id)}
                  aria-label={pool.status === 'active' ? 'Deactivate pool' : 'Activate pool'}
                >
                  {pool.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeletePool(pool.id)}
                  aria-label="Delete pool"
                >
                  Delete
                </button>
              </div>
            </div>
            
            <div className="card-content">
              <div className="pool-status">
                <div className={`status-indicator ${pool.status === 'active' ? 'status-active' : 'status-inactive'}`}>
                  <span className="status-dot" aria-hidden="true"></span>
                  {pool.status === 'active' ? 'Active' : 'Inactive'}
                </div>
              </div>
              
              <div className="pool-details">
                <div className="detail-item">
                  <span className="detail-label">IP Range:</span>
                  <span className="detail-value">
                    <code>{pool.startIP} - {pool.endIP}</code>
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Subnet Mask:</span>
                  <span className="detail-value">
                    <code>{pool.subnetMask}</code>
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Gateway:</span>
                  <span className="detail-value">
                    <code>{pool.gateway}</code>
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">DNS Servers:</span>
                  <span className="detail-value">
                    <code>{pool.dns1}</code>
                    {pool.dns2 && <>, <code>{pool.dns2}</code></>}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Lease Time:</span>
                  <span className="detail-value">{formatLeaseTime(pool.leaseTime)}</span>
                </div>
              </div>
              
              <div className="pool-utilization">
                <div className="utilization-header">
                  <span className="utilization-label">Utilization</span>
                  <span className="utilization-value">
                    {pool.activeLeases} / {pool.totalIPs} ({pool.utilization}%)
                  </span>
                </div>
                <div className="usage-bar">
                  <div 
                    className="usage-fill" 
                    style={{ 
                      width: `${pool.utilization}%`,
                      backgroundColor: pool.utilization > 90 ? 'var(--error-color)' : 
                                     pool.utilization > 70 ? 'var(--warning-color)' : 
                                     'var(--success-color)'
                    }}
                    aria-label={`${pool.utilization}% utilized`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IPPools;