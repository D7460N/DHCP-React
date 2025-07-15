import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [serverStats, setServerStats] = useState({
    totalPools: 0,
    activeLeases: 0,
    availableIPs: 0,
    serverUptime: '0 days',
    isLoading: true
  });

  useEffect(() => {
    // Simulate API call to fetch server stats
    const fetchStats = async () => {
      try {
        // Mock data - in real app, this would be an API call
        setTimeout(() => {
          setServerStats({
            totalPools: 4,
            activeLeases: 156,
            availableIPs: 2048,
            serverUptime: '15 days, 3 hours',
            isLoading: false
          });
        }, 1000);
      } catch (error) {
        console.error('Error fetching server stats:', error);
        setServerStats(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchStats();
  }, []);

  const recentLeases = [
    { id: 1, ip: '192.168.1.100', mac: '00:1B:44:11:3A:B7', hostname: 'laptop-001', expires: '2024-01-20 14:30' },
    { id: 2, ip: '192.168.1.101', mac: '00:1B:44:11:3A:B8', hostname: 'phone-002', expires: '2024-01-20 15:45' },
    { id: 3, ip: '192.168.1.102', mac: '00:1B:44:11:3A:B9', hostname: 'tablet-003', expires: '2024-01-20 16:22' },
    { id: 4, ip: '192.168.1.103', mac: '00:1B:44:11:3A:BA', hostname: 'workstation-004', expires: '2024-01-20 17:15' }
  ];

  const poolUtilization = [
    { name: 'Main Pool', range: '192.168.1.0/24', used: 156, total: 254, utilization: 61 },
    { name: 'Guest Pool', range: '192.168.2.0/24', used: 23, total: 100, utilization: 23 },
    { name: 'IoT Pool', range: '192.168.3.0/24', used: 89, total: 200, utilization: 45 },
    { name: 'VPN Pool', range: '10.0.1.0/24', used: 45, total: 100, utilization: 45 }
  ];

  if (serverStats.isLoading) {
    return (
      <div className="loading">
        <div className="spinner" aria-hidden="true"></div>
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>DHCP Server Dashboard</h1>
        <p className="page-description">Monitor your DHCP server status and network activity</p>
      </div>

      {/* Server Statistics */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">{serverStats.totalPools}</div>
          <div className="stat-label">Total IP Pools</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{serverStats.activeLeases}</div>
          <div className="stat-label">Active Leases</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{serverStats.availableIPs}</div>
          <div className="stat-label">Available IPs</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{serverStats.serverUptime}</div>
          <div className="stat-label">Server Uptime</div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Pool Utilization */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Pool Utilization</h2>
            <button className="btn btn-secondary" aria-label="Refresh pool data">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
              </svg>
            </button>
          </div>
          <div className="card-content">
            <div className="pool-list">
              {poolUtilization.map((pool) => (
                <div key={pool.name} className="pool-item">
                  <div className="pool-info">
                    <h3 className="pool-name">{pool.name}</h3>
                    <p className="pool-range">{pool.range}</p>
                  </div>
                  <div className="pool-usage">
                    <div className="usage-bar">
                      <div 
                        className="usage-fill" 
                        style={{ width: `${pool.utilization}%` }}
                        aria-label={`${pool.utilization}% utilized`}
                      ></div>
                    </div>
                    <div className="usage-text">
                      {pool.used} / {pool.total} ({pool.utilization}%)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Leases */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Recent Leases</h2>
            <a href="/leases" className="btn btn-primary">View All</a>
          </div>
          <div className="card-content">
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>IP Address</th>
                    <th>MAC Address</th>
                    <th>Hostname</th>
                    <th>Expires</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeases.map((lease) => (
                    <tr key={lease.id}>
                      <td>
                        <code>{lease.ip}</code>
                      </td>
                      <td>
                        <code>{lease.mac}</code>
                      </td>
                      <td>{lease.hostname}</td>
                      <td>{lease.expires}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Server Status */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Server Status</h2>
        </div>
        <div className="card-content">
          <div className="status-grid">
            <div className="status-item">
              <div className="status-indicator status-active">
                <span className="status-dot" aria-hidden="true"></span>
                DHCP Service Running
              </div>
            </div>
            <div className="status-item">
              <div className="status-indicator status-active">
                <span className="status-dot" aria-hidden="true"></span>
                Network Interface Active
              </div>
            </div>
            <div className="status-item">
              <div className="status-indicator status-active">
                <span className="status-dot" aria-hidden="true"></span>
                Database Connected
              </div>
            </div>
            <div className="status-item">
              <div className="status-indicator status-warning">
                <span className="status-dot" aria-hidden="true"></span>
                Low Disk Space (15% remaining)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;