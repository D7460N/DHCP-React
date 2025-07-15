import React, { useState, useEffect } from 'react';

interface DashboardStats {
  totalPools: number;
  activeLeases: number;
  serverStatus: 'online' | 'offline' | 'warning';
  utilizationPercentage: number;
}

interface RecentLease {
  id: string;
  ipAddress: string;
  macAddress: string;
  hostname: string;
  leaseTime: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentLeases, setRecentLeases] = useState<RecentLease[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchDashboardData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setStats({
        totalPools: 5,
        activeLeases: 142,
        serverStatus: 'online',
        utilizationPercentage: 67
      });

      setRecentLeases([
        {
          id: '1',
          ipAddress: '192.168.1.100',
          macAddress: '00:11:22:33:44:55',
          hostname: 'desktop-001',
          leaseTime: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          ipAddress: '192.168.1.101',
          macAddress: '00:11:22:33:44:56',
          hostname: 'laptop-002',
          leaseTime: '2024-01-15T10:25:00Z'
        },
        {
          id: '3',
          ipAddress: '192.168.1.102',
          macAddress: '00:11:22:33:44:57',
          hostname: 'mobile-003',
          leaseTime: '2024-01-15T10:20:00Z'
        },
        {
          id: '4',
          ipAddress: '192.168.1.103',
          macAddress: '00:11:22:33:44:58',
          hostname: 'tablet-004',
          leaseTime: '2024-01-15T10:15:00Z'
        },
        {
          id: '5',
          ipAddress: '192.168.1.104',
          macAddress: '00:11:22:33:44:59',
          hostname: 'printer-005',
          leaseTime: '2024-01-15T10:10:00Z'
        }
      ]);

      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'online':
        return 'status-badge status-online';
      case 'offline':
        return 'status-badge status-offline';
      case 'warning':
        return 'status-badge status-warning';
      default:
        return 'status-badge';
    }
  };

  const getUtilizationColor = (percentage: number) => {
    if (percentage >= 90) return 'critical';
    if (percentage >= 75) return 'high';
    return '';
  };

  const formatLeaseTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" aria-hidden="true"></div>
        <span>Loading dashboard data...</span>
      </div>
    );
  }

  return (
    <div>
      <h1>DHCP Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Server Status</h3>
          <div className="dashboard-stat">
            <span className="dashboard-stat-label">Status</span>
            <span className={getStatusBadgeClass(stats?.serverStatus || 'offline')}>
              {stats?.serverStatus || 'Unknown'}
            </span>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>IP Pools</h3>
          <div className="dashboard-stat">
            <span className="dashboard-stat-value">{stats?.totalPools || 0}</span>
            <span className="dashboard-stat-label">Total Pools</span>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Active Leases</h3>
          <div className="dashboard-stat">
            <span className="dashboard-stat-value">{stats?.activeLeases || 0}</span>
            <span className="dashboard-stat-label">Currently Active</span>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Pool Utilization</h3>
          <div className="dashboard-stat">
            <span className="dashboard-stat-value">{stats?.utilizationPercentage || 0}%</span>
            <span className="dashboard-stat-label">Average Utilization</span>
          </div>
          <div className="ip-pool-utilization">
            <div className="utilization-bar">
              <div 
                className={`utilization-fill ${getUtilizationColor(stats?.utilizationPercentage || 0)}`}
                style={{ width: `${stats?.utilizationPercentage || 0}%` }}
                role="progressbar"
                aria-valuenow={stats?.utilizationPercentage || 0}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Pool utilization: ${stats?.utilizationPercentage || 0}%`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Leases */}
      <div className="card">
        <h3>Recent Leases</h3>
        <div className="table-container">
          <table className="table" role="table">
            <thead>
              <tr>
                <th scope="col">IP Address</th>
                <th scope="col">MAC Address</th>
                <th scope="col">Hostname</th>
                <th scope="col">Lease Time</th>
              </tr>
            </thead>
            <tbody>
              {recentLeases.map((lease) => (
                <tr key={lease.id}>
                  <td>
                    <span className="lease-ip">{lease.ipAddress}</span>
                  </td>
                  <td>
                    <span className="lease-mac">{lease.macAddress}</span>
                  </td>
                  <td>{lease.hostname}</td>
                  <td>
                    <span className="lease-expires">{formatLeaseTime(lease.leaseTime)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;