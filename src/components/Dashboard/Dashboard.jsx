import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [serverStatus, setServerStatus] = useState({
    status: 'active',
    uptime: '5 days, 3 hours, 42 minutes',
    totalLeases: 342,
    availableIPs: 1658,
    reservedIPs: 25,
    serverLoad: 'low'
  });

  const [recentActivity] = useState([
    { id: 1, type: 'lease', message: 'New lease assigned: 192.168.1.45 to AA:BB:CC:DD:EE:FF', timestamp: '2 minutes ago' },
    { id: 2, type: 'config', message: 'DHCP pool 192.168.1.0/24 configuration updated', timestamp: '15 minutes ago' },
    { id: 3, type: 'lease', message: 'Lease expired: 192.168.1.32', timestamp: '28 minutes ago' },
    { id: 4, type: 'system', message: 'DHCP server restarted', timestamp: '2 hours ago' },
  ]);

  const [poolStats] = useState([
    { name: 'Main Pool (192.168.1.0/24)', used: 125, total: 254, utilization: 49 },
    { name: 'Guest Pool (192.168.2.0/24)', used: 67, total: 200, utilization: 34 },
    { name: 'DMZ Pool (192.168.3.0/24)', used: 12, total: 50, utilization: 24 },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setServerStatus(prev => ({
        ...prev,
        totalLeases: prev.totalLeases + Math.floor(Math.random() * 3) - 1,
        availableIPs: prev.availableIPs + Math.floor(Math.random() * 3) - 1,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <div className="row">
        <div className="col-12">
          <h2>DHCP Server Dashboard</h2>
          <p className="text-muted">Real-time monitoring and status overview</p>
        </div>
      </div>

      {/* Server Status Cards */}
      <div className="row">
        <div className="col-md-3 col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Server Status</h5>
              <div className={`status-indicator ${serverStatus.status}`}>
                <span className="status-dot"></span>
                {serverStatus.status.charAt(0).toUpperCase() + serverStatus.status.slice(1)}
              </div>
              <p className="card-text mt-2">
                <small className="text-muted">Uptime: {serverStatus.uptime}</small>
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Active Leases</h5>
              <h2 className="text-primary">{serverStatus.totalLeases}</h2>
              <p className="card-text">
                <small className="text-muted">Currently assigned</small>
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Available IPs</h5>
              <h2 className="text-success">{serverStatus.availableIPs}</h2>
              <p className="card-text">
                <small className="text-muted">Ready for assignment</small>
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Reserved IPs</h5>
              <h2 className="text-warning">{serverStatus.reservedIPs}</h2>
              <p className="card-text">
                <small className="text-muted">Static assignments</small>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pool Utilization */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Pool Utilization</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Pool Name</th>
                      <th>Used</th>
                      <th>Total</th>
                      <th>Utilization</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {poolStats.map((pool, index) => (
                      <tr key={index}>
                        <td data-label="Pool Name">{pool.name}</td>
                        <td data-label="Used">{pool.used}</td>
                        <td data-label="Total">{pool.total}</td>
                        <td data-label="Utilization">{pool.utilization}%</td>
                        <td data-label="Status">
                          <span className={`status-indicator ${pool.utilization > 80 ? 'warning' : pool.utilization > 60 ? 'active' : 'inactive'}`}>
                            <span className="status-dot"></span>
                            {pool.utilization > 80 ? 'High' : pool.utilization > 60 ? 'Normal' : 'Low'}
                          </span>
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

      {/* Recent Activity */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Recent Activity</h5>
            </div>
            <div className="card-body">
              <div className="activity-feed">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-content">
                      <div className="activity-message">{activity.message}</div>
                      <div className="activity-timestamp text-muted">{activity.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;