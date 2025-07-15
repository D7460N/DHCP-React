import React from 'react';

const Dashboard = () => {
  const serverStatus = {
    status: 'running',
    uptime: '5 days, 12 hours',
    totalLeases: 1247,
    activeLeases: 856,
    availableIPs: 391,
    totalScopes: 5
  };

  const recentActivity = [
    { type: 'lease', ip: '192.168.1.100', mac: '00:11:22:33:44:55', action: 'assigned', time: '2 minutes ago' },
    { type: 'lease', ip: '192.168.1.101', mac: '00:11:22:33:44:56', action: 'renewed', time: '5 minutes ago' },
    { type: 'scope', name: 'Main Network', action: 'modified', time: '15 minutes ago' },
    { type: 'lease', ip: '192.168.1.102', mac: '00:11:22:33:44:57', action: 'released', time: '20 minutes ago' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>DHCP Server Dashboard</h1>
        <p className="dashboard-subtitle">Monitor and manage your DHCP server status</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Server Status</h3>
          <div className={`status-indicator ${serverStatus.status}`}>
            {serverStatus.status === 'running' ? '🟢' : '🔴'} {serverStatus.status.toUpperCase()}
          </div>
          <p>Uptime: {serverStatus.uptime}</p>
        </div>

        <div className="stat-card">
          <h3>Total Leases</h3>
          <div className="stat-number">{serverStatus.totalLeases}</div>
          <p>IP addresses managed</p>
        </div>

        <div className="stat-card">
          <h3>Active Leases</h3>
          <div className="stat-number">{serverStatus.activeLeases}</div>
          <p>Currently assigned</p>
        </div>

        <div className="stat-card">
          <h3>Available IPs</h3>
          <div className="stat-number">{serverStatus.availableIPs}</div>
          <p>Ready for assignment</p>
        </div>

        <div className="stat-card">
          <h3>Network Scopes</h3>
          <div className="stat-number">{serverStatus.totalScopes}</div>
          <p>Configured subnets</p>
        </div>
      </div>

      <div className="dashboard-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {recentActivity.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-type">
                {activity.type === 'lease' ? '📋' : '🔧'}
              </div>
              <div className="activity-content">
                <p className="activity-main">
                  {activity.type === 'lease' ? (
                    <>IP <strong>{activity.ip}</strong> ({activity.mac}) was <strong>{activity.action}</strong></>
                  ) : (
                    <>Scope <strong>{activity.name}</strong> was <strong>{activity.action}</strong></>
                  )}
                </p>
                <p className="activity-time">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;