import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  status: 'online' | 'offline' | 'warning';
  description: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, status, description }) => {
  return (
    <div className="dashboard-card">
      <h3>{title}</h3>
      <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        <span className={`status-indicator ${status}`} aria-hidden="true"></span>
        {value}
      </div>
      <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>{description}</p>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const dashboardData = [
    {
      title: 'DHCP Server Status',
      value: 'Online',
      status: 'online' as const,
      description: 'Server running normally'
    },
    {
      title: 'Total IP Addresses',
      value: '1,024',
      status: 'online' as const,
      description: 'Addresses in all pools'
    },
    {
      title: 'Active Leases',
      value: '487',
      status: 'online' as const,
      description: '47.6% utilization'
    },
    {
      title: 'Available Addresses',
      value: '537',
      status: 'online' as const,
      description: '52.4% available'
    },
    {
      title: 'Expired Leases',
      value: '12',
      status: 'warning' as const,
      description: 'Require cleanup'
    },
    {
      title: 'Network Scopes',
      value: '8',
      status: 'online' as const,
      description: 'Configured subnets'
    }
  ];

  return (
    <div>
      <h2 style={{ marginBottom: '2rem', color: '#1e293b' }}>Dashboard</h2>
      
      <div className="dashboard-grid">
        {dashboardData.map((item, index) => (
          <DashboardCard
            key={index}
            title={item.title}
            value={item.value}
            status={item.status}
            description={item.description}
          />
        ))}
      </div>

      <div className="dashboard-card">
        <h3>Recent Activity</h3>
        <div style={{ fontSize: '0.875rem' }}>
          <p>• 192.168.1.100 lease assigned to Device-A123 (2 minutes ago)</p>
          <p>• 192.168.1.101 lease renewed for Device-B456 (5 minutes ago)</p>
          <p>• 192.168.1.102 lease expired for Device-C789 (10 minutes ago)</p>
          <p>• Network scope 192.168.2.0/24 added (1 hour ago)</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;