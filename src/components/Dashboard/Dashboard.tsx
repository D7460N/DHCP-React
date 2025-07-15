import React, { useState, useEffect } from 'react';

interface ServerStatus {
  status: 'online' | 'offline' | 'warning';
  uptime: string;
  version: string;
  lastUpdate: string;
}

interface DHCPMetrics {
  totalLeases: number;
  activeLeases: number;
  availableIPs: number;
  expiredLeases: number;
  poolUtilization: number;
}

const Dashboard: React.FC = () => {
  const [serverStatus, setServerStatus] = useState<ServerStatus>({
    status: 'online',
    uptime: '15 days, 3 hours',
    version: '4.4.2',
    lastUpdate: new Date().toLocaleString()
  });

  const [metrics] = useState<DHCPMetrics>({
    totalLeases: 1250,
    activeLeases: 847,
    availableIPs: 403,
    expiredLeases: 23,
    poolUtilization: 67.8
  });

  const [isLoading, setIsLoading] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const interval = setInterval(() => {
      setServerStatus(prev => ({
        ...prev,
        lastUpdate: new Date().toLocaleString()
      }));
    }, 30000); // Update every 30 seconds

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner" aria-label="Loading dashboard data"></div>
      </div>
    );
  }

  const getUtilizationColor = (utilization: number) => {
    if (utilization > 80) return 'danger';
    if (utilization > 60) return 'warning';
    return 'success';
  };

  return (
    <div>
      <div className="content-header">
        <h1 className="content-title">Dashboard</h1>
        <p className="content-subtitle">
          DHCP server status and performance metrics
        </p>
      </div>

      {/* Server Status Card */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Server Status</h2>
          <div className={`status-indicator ${serverStatus.status}`}>
            <span className="status-dot" aria-hidden="true"></span>
            <span className="sr-only">Server is </span>
            {serverStatus.status}
          </div>
        </div>
        <div className="card-content">
          <div className="dashboard-grid">
            <div>
              <strong>Uptime:</strong> {serverStatus.uptime}
            </div>
            <div>
              <strong>Version:</strong> {serverStatus.version}
            </div>
            <div>
              <strong>Last Updated:</strong> {serverStatus.lastUpdate}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="dashboard-grid">
        <div className="metric-card">
          <div className="metric-value">{metrics.totalLeases.toLocaleString()}</div>
          <div className="metric-label">Total Leases</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-value">{metrics.activeLeases.toLocaleString()}</div>
          <div className="metric-label">Active Leases</div>
          <div className="metric-change positive">+12 today</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-value">{metrics.availableIPs.toLocaleString()}</div>
          <div className="metric-label">Available IPs</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-value">{metrics.expiredLeases}</div>
          <div className="metric-label">Expired Leases</div>
          <div className="metric-change negative">+5 today</div>
        </div>
      </div>

      {/* Pool Utilization */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Pool Utilization</h2>
          <span className="metric-value" style={{ fontSize: '1.5rem' }}>
            {metrics.poolUtilization.toFixed(1)}%
          </span>
        </div>
        <div className="card-content">
          <div className="progress-bar">
            <div 
              className={`progress-fill ${getUtilizationColor(metrics.poolUtilization)}`}
              style={{ width: `${metrics.poolUtilization}%` }}
              role="progressbar"
              aria-valuenow={metrics.poolUtilization}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Pool utilization: ${metrics.poolUtilization}%`}
            ></div>
          </div>
          <p style={{ marginTop: '1rem', color: '#7f8c8d' }}>
            {metrics.activeLeases} of {metrics.totalLeases} addresses in use
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Recent Activity</h2>
          <button className="btn btn-outline btn-sm">View All</button>
        </div>
        <div className="card-content">
          <table className="table">
            <thead>
              <tr>
                <th>Time</th>
                <th>IP Address</th>
                <th>MAC Address</th>
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10:34 AM</td>
                <td><span className="ip-address">192.168.1.105</span></td>
                <td><span className="mac-address">00:1B:44:11:3A:B7</span></td>
                <td>Lease Renewed</td>
                <td><span className="status-indicator online">Active</span></td>
              </tr>
              <tr>
                <td>10:28 AM</td>
                <td><span className="ip-address">192.168.1.89</span></td>
                <td><span className="mac-address">08:00:27:AB:CD:EF</span></td>
                <td>New Lease</td>
                <td><span className="status-indicator online">Active</span></td>
              </tr>
              <tr>
                <td>10:15 AM</td>
                <td><span className="ip-address">192.168.1.67</span></td>
                <td><span className="mac-address">00:50:56:C0:00:01</span></td>
                <td>Lease Expired</td>
                <td><span className="status-indicator offline">Expired</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;