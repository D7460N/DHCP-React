import React, { useState, useEffect } from 'react';

interface DHCPConfig {
  serverName: string;
  domainName: string;
  defaultLeaseTime: number;
  maxLeaseTime: number;
  authoritative: boolean;
  ddnsUpdates: boolean;
  ddnsUpdateStyle: 'standard' | 'interim' | 'none';
  logLevel: 'debug' | 'info' | 'warning' | 'error';
  bootFile: string;
  nextServer: string;
  globalOptions: {
    [key: string]: string;
  };
}

const Config: React.FC = () => {
  const [config, setConfig] = useState<DHCPConfig>({
    serverName: 'dhcp-server-01',
    domainName: 'company.local',
    defaultLeaseTime: 86400,
    maxLeaseTime: 604800,
    authoritative: true,
    ddnsUpdates: true,
    ddnsUpdateStyle: 'standard',
    logLevel: 'info',
    bootFile: 'pxelinux.0',
    nextServer: '192.168.1.10',
    globalOptions: {
      'domain-name-servers': '8.8.8.8, 8.8.4.4',
      'routers': '192.168.1.1',
      'broadcast-address': '192.168.1.255',
      'netbios-name-servers': '192.168.1.1',
      'netbios-node-type': '8'
    }
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [newOptionKey, setNewOptionKey] = useState('');
  const [newOptionValue, setNewOptionValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleConfigChange = (field: keyof DHCPConfig, value: any) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleOptionChange = (key: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      globalOptions: {
        ...prev.globalOptions,
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const handleAddOption = () => {
    if (newOptionKey && newOptionValue) {
      handleOptionChange(newOptionKey, newOptionValue);
      setNewOptionKey('');
      setNewOptionValue('');
    }
  };

  const handleRemoveOption = (key: string) => {
    setConfig(prev => {
      const newOptions = { ...prev.globalOptions };
      delete newOptions[key];
      return {
        ...prev,
        globalOptions: newOptions
      };
    });
    setHasChanges(true);
  };

  const handleSaveConfig = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    setHasChanges(false);
    
    // Show success message (in a real app, you'd use a toast or notification)
    alert('Configuration saved successfully!');
  };

  const handleRestoreDefaults = () => {
    if (window.confirm('Are you sure you want to restore default settings? This will discard all changes.')) {
      setConfig({
        serverName: 'dhcp-server-01',
        domainName: 'company.local',
        defaultLeaseTime: 86400,
        maxLeaseTime: 604800,
        authoritative: true,
        ddnsUpdates: true,
        ddnsUpdateStyle: 'standard',
        logLevel: 'info',
        bootFile: 'pxelinux.0',
        nextServer: '192.168.1.10',
        globalOptions: {
          'domain-name-servers': '8.8.8.8, 8.8.4.4',
          'routers': '192.168.1.1',
          'broadcast-address': '192.168.1.255',
          'netbios-name-servers': '192.168.1.1',
          'netbios-node-type': '8'
        }
      });
      setHasChanges(false);
    }
  };

  const formatLeaseTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return `${seconds} seconds`;
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner" aria-label="Loading configuration"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="content-header">
        <h1 className="content-title">Configuration</h1>
        <p className="content-subtitle">
          DHCP server settings and global options
        </p>
      </div>

      {hasChanges && (
        <div className="alert alert-warning">
          <strong>Unsaved Changes:</strong> You have unsaved configuration changes. 
          Don't forget to save your changes before leaving this page.
        </div>
      )}

      <div className="action-buttons">
        <button 
          className="btn btn-primary"
          onClick={handleSaveConfig}
          disabled={!hasChanges || isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Configuration'}
        </button>
        <button 
          className="btn btn-outline"
          onClick={handleRestoreDefaults}
          disabled={isSaving}
        >
          Restore Defaults
        </button>
        <button className="btn btn-secondary">
          Export Config
        </button>
        <button className="btn btn-secondary">
          Import Config
        </button>
      </div>

      {/* Server Settings */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Server Settings</h2>
        </div>
        <div className="card-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="serverName" className="form-label">Server Name</label>
              <input
                type="text"
                id="serverName"
                className="form-input"
                value={config.serverName}
                onChange={(e) => handleConfigChange('serverName', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="domainName" className="form-label">Domain Name</label>
              <input
                type="text"
                id="domainName"
                className="form-input"
                value={config.domainName}
                onChange={(e) => handleConfigChange('domainName', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="logLevel" className="form-label">Log Level</label>
              <select
                id="logLevel"
                className="form-select"
                value={config.logLevel}
                onChange={(e) => handleConfigChange('logLevel', e.target.value)}
              >
                <option value="debug">Debug</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Lease Settings */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Lease Settings</h2>
        </div>
        <div className="card-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="defaultLeaseTime" className="form-label">
                Default Lease Time
              </label>
              <select
                id="defaultLeaseTime"
                className="form-select"
                value={config.defaultLeaseTime}
                onChange={(e) => handleConfigChange('defaultLeaseTime', parseInt(e.target.value))}
              >
                <option value={3600}>1 hour</option>
                <option value={14400}>4 hours</option>
                <option value={43200}>12 hours</option>
                <option value={86400}>24 hours</option>
                <option value={172800}>2 days</option>
                <option value={604800}>7 days</option>
              </select>
              <small style={{ color: '#7f8c8d' }}>
                Currently: {formatLeaseTime(config.defaultLeaseTime)}
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="maxLeaseTime" className="form-label">
                Maximum Lease Time
              </label>
              <select
                id="maxLeaseTime"
                className="form-select"
                value={config.maxLeaseTime}
                onChange={(e) => handleConfigChange('maxLeaseTime', parseInt(e.target.value))}
              >
                <option value={86400}>24 hours</option>
                <option value={172800}>2 days</option>
                <option value={604800}>7 days</option>
                <option value={1209600}>14 days</option>
                <option value={2592000}>30 days</option>
              </select>
              <small style={{ color: '#7f8c8d' }}>
                Currently: {formatLeaseTime(config.maxLeaseTime)}
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* DHCP Options */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">DHCP Options</h2>
        </div>
        <div className="card-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div className="form-group">
              <label className="form-label">
                <input
                  type="checkbox"
                  checked={config.authoritative}
                  onChange={(e) => handleConfigChange('authoritative', e.target.checked)}
                  style={{ marginRight: '0.5rem' }}
                />
                Authoritative Server
              </label>
              <small style={{ color: '#7f8c8d', display: 'block' }}>
                Server is authoritative for this network
              </small>
            </div>

            <div className="form-group">
              <label className="form-label">
                <input
                  type="checkbox"
                  checked={config.ddnsUpdates}
                  onChange={(e) => handleConfigChange('ddnsUpdates', e.target.checked)}
                  style={{ marginRight: '0.5rem' }}
                />
                Dynamic DNS Updates
              </label>
              <small style={{ color: '#7f8c8d', display: 'block' }}>
                Enable automatic DNS record updates
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="ddnsUpdateStyle" className="form-label">DDNS Update Style</label>
              <select
                id="ddnsUpdateStyle"
                className="form-select"
                value={config.ddnsUpdateStyle}
                onChange={(e) => handleConfigChange('ddnsUpdateStyle', e.target.value)}
                disabled={!config.ddnsUpdates}
              >
                <option value="standard">Standard</option>
                <option value="interim">Interim</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Boot Options */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Boot Options</h2>
        </div>
        <div className="card-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="bootFile" className="form-label">Boot File</label>
              <input
                type="text"
                id="bootFile"
                className="form-input"
                value={config.bootFile}
                onChange={(e) => handleConfigChange('bootFile', e.target.value)}
                placeholder="e.g., pxelinux.0"
              />
              <small style={{ color: '#7f8c8d' }}>
                PXE boot file for network booting
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="nextServer" className="form-label">Next Server</label>
              <input
                type="text"
                id="nextServer"
                className="form-input"
                value={config.nextServer}
                onChange={(e) => handleConfigChange('nextServer', e.target.value)}
                placeholder="192.168.1.10"
                pattern="^(\d{1,3}\.){3}\d{1,3}$"
              />
              <small style={{ color: '#7f8c8d' }}>
                TFTP server for PXE boot
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Global Options */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Global Options</h2>
        </div>
        <div className="card-content">
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.5rem', alignItems: 'end' }}>
              <div className="form-group">
                <label htmlFor="newOptionKey" className="form-label">Option Name</label>
                <input
                  type="text"
                  id="newOptionKey"
                  className="form-input"
                  value={newOptionKey}
                  onChange={(e) => setNewOptionKey(e.target.value)}
                  placeholder="e.g., time-servers"
                />
              </div>
              <div className="form-group">
                <label htmlFor="newOptionValue" className="form-label">Option Value</label>
                <input
                  type="text"
                  id="newOptionValue"
                  className="form-input"
                  value={newOptionValue}
                  onChange={(e) => setNewOptionValue(e.target.value)}
                  placeholder="e.g., 192.168.1.1"
                />
              </div>
              <button 
                className="btn btn-primary"
                onClick={handleAddOption}
                disabled={!newOptionKey || !newOptionValue}
              >
                Add Option
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {Object.entries(config.globalOptions).map(([key, value]) => (
              <div key={key} style={{ 
                display: 'grid', 
                gridTemplateColumns: '200px 1fr auto', 
                gap: '0.5rem', 
                alignItems: 'center',
                padding: '0.5rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px'
              }}>
                <strong>{key}:</strong>
                <input
                  type="text"
                  className="form-input"
                  value={value}
                  onChange={(e) => handleOptionChange(key, e.target.value)}
                  style={{ margin: 0 }}
                />
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveOption(key)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {Object.keys(config.globalOptions).length === 0 && (
            <div className="alert alert-info">
              No global options configured. Add options using the form above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Config;