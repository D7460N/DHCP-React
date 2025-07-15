import { useState } from 'react';

const IPPools = () => {
  const [pools, setPools] = useState([
    {
      id: 1,
      name: 'Main Pool',
      network: '192.168.1.0/24',
      startIP: '192.168.1.10',
      endIP: '192.168.1.254',
      gateway: '192.168.1.1',
      dns: ['8.8.8.8', '8.8.4.4'],
      leaseTime: '24 hours',
      status: 'active',
      used: 125,
      total: 245
    },
    {
      id: 2,
      name: 'Guest Pool',
      network: '192.168.2.0/24',
      startIP: '192.168.2.10',
      endIP: '192.168.2.200',
      gateway: '192.168.2.1',
      dns: ['8.8.8.8', '1.1.1.1'],
      leaseTime: '4 hours',
      status: 'active',
      used: 67,
      total: 191
    },
    {
      id: 3,
      name: 'DMZ Pool',
      network: '192.168.3.0/24',
      startIP: '192.168.3.10',
      endIP: '192.168.3.50',
      gateway: '192.168.3.1',
      dns: ['8.8.8.8', '8.8.4.4'],
      leaseTime: '12 hours',
      status: 'inactive',
      used: 12,
      total: 41
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddPool = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPool = {
      id: Date.now(),
      name: formData.get('name'),
      network: formData.get('network'),
      startIP: formData.get('startIP'),
      endIP: formData.get('endIP'),
      gateway: formData.get('gateway'),
      dns: formData.get('dns').split(',').map(dns => dns.trim()),
      leaseTime: formData.get('leaseTime'),
      status: 'active',
      used: 0,
      total: calculateTotal(formData.get('startIP'), formData.get('endIP'))
    };
    setPools([...pools, newPool]);
    setShowAddForm(false);
    e.target.reset();
  };

  const calculateTotal = (start, end) => {
    // Simple calculation for demo purposes
    const startParts = start.split('.').map(Number);
    const endParts = end.split('.').map(Number);
    return endParts[3] - startParts[3] + 1;
  };

  const handleToggleStatus = (poolId) => {
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

  const getUtilizationClass = (used, total) => {
    const percentage = (used / total) * 100;
    if (percentage > 80) return 'text-danger';
    if (percentage > 60) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="ip-pools">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2>IP Address Pools</h2>
              <p className="text-muted">Manage DHCP IP address pools and their configurations</p>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddForm(true)}
            >
              Add New Pool
            </button>
          </div>
        </div>
      </div>

      {/* Add Pool Form */}
      {showAddForm && (
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Add New IP Pool</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleAddPool}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">Pool Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          required
                          placeholder="e.g., Main Pool"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="network" className="form-label">Network</label>
                        <input
                          type="text"
                          id="network"
                          name="network"
                          className="form-control"
                          required
                          placeholder="e.g., 192.168.1.0/24"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="startIP" className="form-label">Start IP</label>
                        <input
                          type="text"
                          id="startIP"
                          name="startIP"
                          className="form-control"
                          required
                          placeholder="e.g., 192.168.1.10"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="endIP" className="form-label">End IP</label>
                        <input
                          type="text"
                          id="endIP"
                          name="endIP"
                          className="form-control"
                          required
                          placeholder="e.g., 192.168.1.254"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="gateway" className="form-label">Gateway</label>
                        <input
                          type="text"
                          id="gateway"
                          name="gateway"
                          className="form-control"
                          required
                          placeholder="e.g., 192.168.1.1"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="dns" className="form-label">DNS Servers</label>
                        <input
                          type="text"
                          id="dns"
                          name="dns"
                          className="form-control"
                          required
                          placeholder="e.g., 8.8.8.8, 8.8.4.4"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="leaseTime" className="form-label">Lease Time</label>
                        <select
                          id="leaseTime"
                          name="leaseTime"
                          className="form-control"
                          required
                        >
                          <option value="1 hour">1 hour</option>
                          <option value="4 hours">4 hours</option>
                          <option value="12 hours">12 hours</option>
                          <option value="24 hours">24 hours</option>
                          <option value="7 days">7 days</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <button type="submit" className="btn btn-success me-2">
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
            </div>
          </div>
        </div>
      )}

      {/* Pools Table */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Current IP Pools</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Network</th>
                      <th>Range</th>
                      <th>Gateway</th>
                      <th>DNS</th>
                      <th>Lease Time</th>
                      <th>Utilization</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pools.map((pool) => (
                      <tr key={pool.id}>
                        <td data-label="Name">{pool.name}</td>
                        <td data-label="Network">{pool.network}</td>
                        <td data-label="Range">{pool.startIP} - {pool.endIP}</td>
                        <td data-label="Gateway">{pool.gateway}</td>
                        <td data-label="DNS">{pool.dns.join(', ')}</td>
                        <td data-label="Lease Time">{pool.leaseTime}</td>
                        <td data-label="Utilization">
                          <span className={getUtilizationClass(pool.used, pool.total)}>
                            {pool.used}/{pool.total} ({Math.round((pool.used / pool.total) * 100)}%)
                          </span>
                        </td>
                        <td data-label="Status">
                          <span className={`status-indicator ${pool.status}`}>
                            <span className="status-dot"></span>
                            {pool.status.charAt(0).toUpperCase() + pool.status.slice(1)}
                          </span>
                        </td>
                        <td data-label="Actions">
                          <div className="btn-group">
                            <button
                              className={`btn btn-sm ${pool.status === 'active' ? 'btn-warning' : 'btn-success'}`}
                              onClick={() => handleToggleStatus(pool.id)}
                              title={pool.status === 'active' ? 'Deactivate pool' : 'Activate pool'}
                            >
                              {pool.status === 'active' ? 'Deactivate' : 'Activate'}
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDeletePool(pool.id)}
                              title="Delete pool"
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

export default IPPools;