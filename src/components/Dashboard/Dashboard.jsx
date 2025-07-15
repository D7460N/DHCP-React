import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [serverStatus] = useState({
    status: 'online',
    uptime: '2d 14h 32m',
    version: '4.4.1',
    totalScopes: 5,
    activeLeases: 156,
    availableIPs: 344
  });

  const [recentActivity] = useState([
    {
      id: 1,
      type: 'lease_granted',
      ip: '192.168.1.105',
      mac: '00:1A:2B:3C:4D:5E',
      hostname: 'laptop-user1',
      timestamp: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      type: 'lease_renewed',
      ip: '192.168.1.89',
      mac: '00:1A:2B:3C:4D:5F',
      hostname: 'desktop-user2',
      timestamp: '2024-01-15T10:25:00Z'
    },
    {
      id: 3,
      type: 'lease_expired',
      ip: '192.168.1.78',
      mac: '00:1A:2B:3C:4D:60',
      hostname: 'mobile-device',
      timestamp: '2024-01-15T10:20:00Z'
    }
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'lease_granted':
        return '✅';
      case 'lease_renewed':
        return '🔄';
      case 'lease_expired':
        return '⏰';
      default:
        return '📝';
    }
  };

  const getActivityText = (type) => {
    switch (type) {
      case 'lease_granted':
        return 'Lease Granted';
      case 'lease_renewed':
        return 'Lease Renewed';
      case 'lease_expired':
        return 'Lease Expired';
      default:
        return 'Activity';
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" aria-label="Loading dashboard data"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>DHCP Server Dashboard</h1>
        <p className="subtitle">Monitor and manage your DHCP server status</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Server Status</h3>
          <div className="status-indicator online">
            <span className="status-dot"></span>
            Online
          </div>
          <div className="mt-3">
            <p><strong>Uptime:</strong> {serverStatus.uptime}</p>
            <p><strong>Version:</strong> {serverStatus.version}</p>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Active Scopes</h3>
          <div className="text-center">
            <div style={{ fontSize: '2rem', color: '#1976d2', fontWeight: 'bold' }}>
              {serverStatus.totalScopes}
            </div>
            <p>Total Configured Scopes</p>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Active Leases</h3>
          <div className="text-center">
            <div style={{ fontSize: '2rem', color: '#28a745', fontWeight: 'bold' }}>
              {serverStatus.activeLeases}
            </div>
            <p>Currently Assigned IPs</p>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Available IPs</h3>
          <div className="text-center">
            <div style={{ fontSize: '2rem', color: '#ffc107', fontWeight: 'bold' }}>
              {serverStatus.availableIPs}
            </div>
            <p>Remaining in Pool</p>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <h3>Recent Activity</h3>
        {recentActivity.length === 0 ? (
          <p>No recent activity</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>IP Address</th>
                <th>MAC Address</th>
                <th>Hostname</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity) => (
                <tr key={activity.id}>
                  <td>
                    <span className="flex items-center gap-2">
                      <span aria-hidden="true">{getActivityIcon(activity.type)}</span>
                      {getActivityText(activity.type)}
                    </span>
                  </td>
                  <td>{activity.ip}</td>
                  <td>{activity.mac}</td>
                  <td>{activity.hostname}</td>
                  <td>{formatTimestamp(activity.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;