import React, { useState } from 'react';

const IPPools = () => {
  const [pools, setPools] = useState([
    {
      id: 1,
      name: 'Main Office Network',
      network: '192.168.1.0/24',
      startIP: '192.168.1.10',
      endIP: '192.168.1.200',
      gateway: '192.168.1.1',
      dnsServers: ['192.168.1.1', '8.8.8.8'],
      leaseTime: '24 hours',
      utilization: 78,
      status: 'active'
    },
    {
      id: 2,
      name: 'Guest Network',
      network: '192.168.100.0/24',
      startIP: '192.168.100.10',
      endIP: '192.168.100.50',
      gateway: '192.168.100.1',
      dnsServers: ['8.8.8.8', '8.8.4.4'],
      leaseTime: '4 hours',
      utilization: 45,
      status: 'active'
    },
    {
      id: 3,
      name: 'IoT Devices',
      network: '192.168.200.0/24',
      startIP: '192.168.200.10',
      endIP: '192.168.200.100',
      gateway: '192.168.200.1',
      dnsServers: ['192.168.1.1'],
      leaseTime: '7 days',
      utilization: 23,
      status: 'active'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPool, setEditingPool] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    network: '',
    startIP: '',
    endIP: '',
    gateway: '',
    dnsServers: '',
    leaseTime: '24 hours'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newPool = {
      id: editingPool ? editingPool.id : Date.now(),
      ...formData,
      dnsServers: formData.dnsServers.split(',').map(s => s.trim()),
      utilization: 0,
      status: 'active'
    };

    if (editingPool) {
      setPools(pools.map(pool => 
        pool.id === editingPool.id ? newPool : pool
      ));
      setEditingPool(null);
    } else {
      setPools([...pools, newPool]);
    }

    setFormData({
      name: '',
      network: '',
      startIP: '',
      endIP: '',
      gateway: '',
      dnsServers: '',
      leaseTime: '24 hours'
    });
    setShowAddForm(false);
  };

  const handleEdit = (pool) => {
    setEditingPool(pool);
    setFormData({
      name: pool.name,
      network: pool.network,
      startIP: pool.startIP,
      endIP: pool.endIP,
      gateway: pool.gateway,
      dnsServers: pool.dnsServers.join(', '),
      leaseTime: pool.leaseTime
    });
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this IP pool?')) {
      setPools(pools.filter(pool => pool.id !== id));
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingPool(null);
    setFormData({
      name: '',
      network: '',
      startIP: '',
      endIP: '',
      gateway: '',
      dnsServers: '',
      leaseTime: '24 hours'
    });
  };

  const getUtilizationColor = (utilization) => {
    if (utilization >= 80) return '#dc3545';
    if (utilization >= 60) return '#ffc107';
    return '#28a745';
  };

  return (
    <div className="ip-pools">
      <div className="dashboard-header">
        <h1>IP Address Pools</h1>
        <p className="subtitle">Manage DHCP scopes and IP address ranges</p>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <button
          className="btn btn-primary"
          onClick={() => setShowAddForm(true)}
          aria-label="Add new IP pool"
        >
          ➕ Add IP Pool
        </button>
      </div>

      {showAddForm && (
        <div className="dashboard-card mb-4">
          <h3>{editingPool ? 'Edit IP Pool' : 'Add New IP Pool'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Pool Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  placeholder="e.g., Main Office Network"
                />
              </div>
              <div className="form-group">
                <label htmlFor="network" className="form-label">Network CIDR</label>
                <input
                  type="text"
                  id="network"
                  name="network"
                  value={formData.network}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  placeholder="e.g., 192.168.1.0/24"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startIP" className="form-label">Start IP</label>
                <input
                  type="text"
                  id="startIP"
                  name="startIP"
                  value={formData.startIP}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  placeholder="e.g., 192.168.1.10"
                />
              </div>
              <div className="form-group">
                <label htmlFor="endIP" className="form-label">End IP</label>
                <input
                  type="text"
                  id="endIP"
                  name="endIP"
                  value={formData.endIP}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  placeholder="e.g., 192.168.1.200"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gateway" className="form-label">Gateway</label>
                <input
                  type="text"
                  id="gateway"
                  name="gateway"
                  value={formData.gateway}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  placeholder="e.g., 192.168.1.1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="leaseTime" className="form-label">Lease Time</label>
                <select
                  id="leaseTime"
                  name="leaseTime"
                  value={formData.leaseTime}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="4 hours">4 hours</option>
                  <option value="8 hours">8 hours</option>
                  <option value="24 hours">24 hours</option>
                  <option value="7 days">7 days</option>
                  <option value="30 days">30 days</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="dnsServers" className="form-label">DNS Servers</label>
              <input
                type="text"
                id="dnsServers"
                name="dnsServers"
                value={formData.dnsServers}
                onChange={handleInputChange}
                className="form-input"
                required
                placeholder="e.g., 192.168.1.1, 8.8.8.8"
              />
              <small className="text-muted">Separate multiple DNS servers with commas</small>
            </div>

            <div className="btn-group">
              <button type="submit" className="btn btn-primary">
                {editingPool ? 'Update Pool' : 'Create Pool'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="dashboard-grid">
        {pools.map((pool) => (
          <div key={pool.id} className="dashboard-card">
            <div className="flex justify-between items-center mb-3">
              <h3>{pool.name}</h3>
              <div className="btn-group">
                <button
                  className="btn btn-secondary"
                  onClick={() => handleEdit(pool)}
                  aria-label={`Edit ${pool.name}`}
                  style={{ padding: '0.5rem' }}
                >
                  ✏️
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(pool.id)}
                  aria-label={`Delete ${pool.name}`}
                  style={{ padding: '0.5rem' }}
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className="mb-3">
              <p><strong>Network:</strong> {pool.network}</p>
              <p><strong>Range:</strong> {pool.startIP} - {pool.endIP}</p>
              <p><strong>Gateway:</strong> {pool.gateway}</p>
              <p><strong>DNS:</strong> {pool.dnsServers.join(', ')}</p>
              <p><strong>Lease Time:</strong> {pool.leaseTime}</p>
            </div>

            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span>Utilization</span>
                <span>{pool.utilization}%</span>
              </div>
              <div style={{ 
                width: '100%', 
                height: '8px', 
                backgroundColor: '#e0e0e0', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${pool.utilization}%`, 
                  height: '100%', 
                  backgroundColor: getUtilizationColor(pool.utilization),
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
            </div>

            <div className="status-indicator online">
              <span className="status-dot"></span>
              Active
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IPPools;