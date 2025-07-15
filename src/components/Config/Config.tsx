import React, { useState } from 'react';

interface ConfigSection {
  title: string;
  settings: ConfigSetting[];
}

interface ConfigSetting {
  key: string;
  label: string;
  value: string;
  type: 'text' | 'number' | 'boolean' | 'select';
  options?: string[];
  description: string;
}

const Config: React.FC = () => {
  const [configData, setConfigData] = useState<ConfigSection[]>([
    {
      title: 'Global DHCP Settings',
      settings: [
        {
          key: 'default_lease_time',
          label: 'Default Lease Time (hours)',
          value: '24',
          type: 'number',
          description: 'Default lease duration for new IP assignments'
        },
        {
          key: 'max_lease_time',
          label: 'Maximum Lease Time (hours)',
          value: '168',
          type: 'number',
          description: 'Maximum allowed lease duration'
        },
        {
          key: 'authoritative',
          label: 'Authoritative Server',
          value: 'true',
          type: 'boolean',
          description: 'Act as the authoritative DHCP server for configured subnets'
        },
        {
          key: 'log_level',
          label: 'Log Level',
          value: 'info',
          type: 'select',
          options: ['debug', 'info', 'warning', 'error'],
          description: 'Logging verbosity level'
        }
      ]
    },
    {
      title: 'Network Configuration',
      settings: [
        {
          key: 'dns_update',
          label: 'DNS Update',
          value: 'true',
          type: 'boolean',
          description: 'Enable automatic DNS record updates'
        },
        {
          key: 'primary_dns',
          label: 'Primary DNS Server',
          value: '8.8.8.8',
          type: 'text',
          description: 'Primary DNS server for client configuration'
        },
        {
          key: 'secondary_dns',
          label: 'Secondary DNS Server',
          value: '8.8.4.4',
          type: 'text',
          description: 'Secondary DNS server for client configuration'
        },
        {
          key: 'domain_name',
          label: 'Domain Name',
          value: 'local.domain',
          type: 'text',
          description: 'Default domain name for clients'
        }
      ]
    },
    {
      title: 'Security Settings',
      settings: [
        {
          key: 'ping_check',
          label: 'Ping Check',
          value: 'true',
          type: 'boolean',
          description: 'Ping IP addresses before assigning to detect conflicts'
        },
        {
          key: 'ping_timeout',
          label: 'Ping Timeout (seconds)',
          value: '1',
          type: 'number',
          description: 'Timeout for ping checks'
        },
        {
          key: 'decline_threshold',
          label: 'Decline Threshold',
          value: '3',
          type: 'number',
          description: 'Number of declines before marking address as abandoned'
        },
        {
          key: 'conflict_detection',
          label: 'Conflict Detection',
          value: 'true',
          type: 'boolean',
          description: 'Enable IP address conflict detection'
        }
      ]
    }
  ]);

  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (sectionIndex: number, settingKey: string, value: string) => {
    setConfigData(prev => {
      const newData = [...prev];
      const setting = newData[sectionIndex].settings.find(s => s.key === settingKey);
      if (setting) {
        setting.value = value;
        setHasChanges(true);
      }
      return newData;
    });
  };

  const handleSave = () => {
    // Simulate saving configuration
    setTimeout(() => {
      setHasChanges(false);
      alert('Configuration saved successfully!');
    }, 1000);
  };

  const handleReset = () => {
    // Reset to default values (simplified)
    setHasChanges(false);
  };

  const renderSetting = (setting: ConfigSetting, sectionIndex: number) => {
    const handleChange = (value: string) => {
      handleSettingChange(sectionIndex, setting.key, value);
    };

    switch (setting.type) {
      case 'boolean':
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              id={setting.key}
              checked={setting.value === 'true'}
              onChange={(e) => handleChange(e.target.checked ? 'true' : 'false')}
              style={{ marginRight: '0.5rem' }}
            />
            <label htmlFor={setting.key} style={{ cursor: 'pointer' }}>
              {setting.label}
            </label>
          </div>
        );
      case 'select':
        return (
          <div>
            <label className="form-label" htmlFor={setting.key}>
              {setting.label}
            </label>
            <select
              id={setting.key}
              className="form-select"
              value={setting.value}
              onChange={(e) => handleChange(e.target.value)}
            >
              {setting.options?.map(option => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>
        );
      case 'number':
        return (
          <div>
            <label className="form-label" htmlFor={setting.key}>
              {setting.label}
            </label>
            <input
              type="number"
              id={setting.key}
              className="form-input"
              value={setting.value}
              onChange={(e) => handleChange(e.target.value)}
              min="0"
            />
          </div>
        );
      default:
        return (
          <div>
            <label className="form-label" htmlFor={setting.key}>
              {setting.label}
            </label>
            <input
              type="text"
              id={setting.key}
              className="form-input"
              value={setting.value}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
        );
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0, color: '#1e293b' }}>DHCP Configuration</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={!hasChanges}
          >
            Reset Changes
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={!hasChanges}
          >
            Save Configuration
          </button>
        </div>
      </div>

      {hasChanges && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#fef3c7',
          color: '#92400e',
          borderRadius: '6px',
          marginBottom: '2rem',
          border: '1px solid #fbbf24'
        }}>
          <strong>Warning:</strong> You have unsaved changes. Remember to save your configuration.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {configData.map((section, sectionIndex) => (
          <div key={section.title} className="dashboard-card">
            <h3 style={{ marginBottom: '1.5rem' }}>{section.title}</h3>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {section.settings.map((setting) => (
                <div key={setting.key} style={{ display: 'grid', gap: '0.5rem' }}>
                  {renderSetting(setting, sectionIndex)}
                  <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                    {setting.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-card" style={{ marginTop: '2rem' }}>
        <h3>Configuration Management</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button className="btn btn-secondary">
              Export Configuration
            </button>
            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
              Download current configuration as JSON
            </span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button className="btn btn-secondary">
              Import Configuration
            </button>
            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
              Upload and apply configuration file
            </span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button className="btn btn-secondary">
              Restart DHCP Service
            </button>
            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
              Restart the DHCP service to apply changes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Config;