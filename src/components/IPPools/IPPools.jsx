import React, { useState } from 'react';

const IPPools = () => {
  const [pools, setPools] = useState([
    {
      id: 1,
      name: 'Main Network',
      subnet: '192.168.1.0/24',
      startIP: '192.168.1.100',
      endIP: '192.168.1.200',
      gateway: '192.168.1.1',
      dns: '8.8.8.8, 8.8.4.4',
      leaseTime: '24 hours',
      active: true,
      used: 45,
      total: 101
    },
    {
      id: 2,
      name: 'Guest Network',
      subnet: '10.0.0.0/24',
      startIP: '10.0.0.50',
      endIP: '10.0.0.100',
      gateway: '10.0.0.1',
      dns: '8.8.8.8, 8.8.4.4',
      leaseTime: '2 hours',
      active: true,
      used: 12,
      total: 51
    },
    {
      id: 3,
      name: 'IoT Devices',
      subnet: '172.16.0.0/24',
      startIP: '172.16.0.10',
      endIP: '172.16.0.50',
      gateway: '172.16.0.1',
      dns: '8.8.8.8, 8.8.4.4',
      leaseTime: '7 days',
      active: false,
      used: 0,
      total: 41
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPool, setEditingPool] = useState(null);

  const handleTogglePool = (poolId) => {
    setPools(pools.map(pool => 
      pool.id === poolId ? { ...pool, active: !pool.active } : pool
    ));
  };

  const handleEditPool = (pool) => {
    setEditingPool(pool);
    setShowAddForm(true);
  };

  const handleDeletePool = (poolId) => {
    if (window.confirm('Are you sure you want to delete this IP pool?')) {
      setPools(pools.filter(pool => pool.id !== poolId));
    }
  };

  const getUtilizationPercentage = (used, total) => {
    return Math.round((used / total) * 100);
  };

  const getUtilizationColor = (percentage) => {
    if (percentage >= 90) return 'critical';
    if (percentage >= 70) return 'warning';
    return 'normal';
  };

  return (
    <div className="ip-pools">
      <div className="ip-pools-header">
        <h1>IP Address Pools</h1>
        <p className="ip-pools-subtitle">Manage DHCP IP address ranges and configuration</p>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          Add New Pool
        </button>
      </div>

      <div className="pools-grid">
        {pools.map(pool => {
          const utilizationPercentage = getUtilizationPercentage(pool.used, pool.total);
          const utilizationColor = getUtilizationColor(utilizationPercentage);
          
          return (
            <div key={pool.id} className={`pool-card ${pool.active ? 'active' : 'inactive'}`}>
              <div className="pool-header">
                <h3>{pool.name}</h3>
                <div className="pool-actions">
                  <button 
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleEditPool(pool)}
                    aria-label={`Edit ${pool.name}`}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeletePool(pool.id)}
                    aria-label={`Delete ${pool.name}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="pool-info">
                <div className="info-row">
                  <span className="info-label">Subnet:</span>
                  <span className="info-value">{pool.subnet}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Range:</span>
                  <span className="info-value">{pool.startIP} - {pool.endIP}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Gateway:</span>
                  <span className="info-value">{pool.gateway}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">DNS:</span>
                  <span className="info-value">{pool.dns}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Lease Time:</span>
                  <span className="info-value">{pool.leaseTime}</span>
                </div>
              </div>

              <div className="pool-utilization">
                <div className="utilization-header">
                  <span>Utilization</span>
                  <span className={`utilization-percentage ${utilizationColor}`}>
                    {utilizationPercentage}%
                  </span>
                </div>
                <div className="utilization-bar">
                  <div 
                    className={`utilization-fill ${utilizationColor}`}
                    style={{ width: `${utilizationPercentage}%` }}
                  ></div>
                </div>
                <div className="utilization-info">
                  <span>{pool.used} used</span>
                  <span>{pool.total - pool.used} available</span>
                </div>
              </div>

              <div className="pool-controls">
                <button 
                  className={`btn btn-sm ${pool.active ? 'btn-warning' : 'btn-success'}`}
                  onClick={() => handleTogglePool(pool.id)}
                >
                  {pool.active ? 'Disable' : 'Enable'}
                </button>
                <span className={`status-indicator ${pool.active ? 'active' : 'inactive'}`}>
                  {pool.active ? '🟢 Active' : '🔴 Inactive'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingPool ? 'Edit IP Pool' : 'Add New IP Pool'}</h2>
            <form className="pool-form">
              <div className="form-group">
                <label htmlFor="poolName">Pool Name</label>
                <input 
                  type="text" 
                  id="poolName" 
                  defaultValue={editingPool?.name || ''}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="subnet">Subnet</label>
                <input 
                  type="text" 
                  id="subnet" 
                  defaultValue={editingPool?.subnet || ''}
                  placeholder="e.g., 192.168.1.0/24"
                  required 
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="startIP">Start IP</label>
                  <input 
                    type="text" 
                    id="startIP" 
                    defaultValue={editingPool?.startIP || ''}
                    placeholder="e.g., 192.168.1.100"
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endIP">End IP</label>
                  <input 
                    type="text" 
                    id="endIP" 
                    defaultValue={editingPool?.endIP || ''}
                    placeholder="e.g., 192.168.1.200"
                    required 
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="gateway">Gateway</label>
                <input 
                  type="text" 
                  id="gateway" 
                  defaultValue={editingPool?.gateway || ''}
                  placeholder="e.g., 192.168.1.1"
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="dns">DNS Servers</label>
                <input 
                  type="text" 
                  id="dns" 
                  defaultValue={editingPool?.dns || ''}
                  placeholder="e.g., 8.8.8.8, 8.8.4.4"
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="leaseTime">Lease Time</label>
                <select id="leaseTime" defaultValue={editingPool?.leaseTime || '24 hours'}>
                  <option value="1 hour">1 hour</option>
                  <option value="2 hours">2 hours</option>
                  <option value="8 hours">8 hours</option>
                  <option value="24 hours">24 hours</option>
                  <option value="7 days">7 days</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => {
                  setShowAddForm(false);
                  setEditingPool(null);
                }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingPool ? 'Update Pool' : 'Create Pool'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IPPools;