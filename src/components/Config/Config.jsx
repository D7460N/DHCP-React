import React, { useState } from 'react';

const Config = () => {
  const [config, setConfig] = useState({
    server: {
      enabled: true,
      port: 67,
      interface: 'eth0',
      authoritative: true,
      ddnsUpdates: false,
      logLevel: 'info'
    },
    global: {
      defaultLeaseTime: 86400, // 24 hours in seconds
      maxLeaseTime: 604800, // 7 days in seconds
      domainName: 'example.com',
      domainNameServers: ['8.8.8.8', '8.8.4.4'],
      ntpServers: ['pool.ntp.org'],
      timeOffset: 0
    },
    failover: {
      enabled: false,
      mode: 'primary',
      peerAddress: '',
      peerPort: 647,
      maxResponseDelay: 30,
      maxUnackedUpdates: 10
    }
  });

  const [activeTab, setActiveTab] = useState('server');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleConfigChange = (section, field, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleArrayChange = (section, field, index, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].map((item, i) => i === index ? value : item)
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleAddArrayItem = (section, field) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...prev[section][field], '']
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleRemoveArrayItem = (section, field, index) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].filter((_, i) => i !== index)
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving configuration:', config);
    setHasUnsavedChanges(false);
    alert('Configuration saved successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all changes?')) {
      // Reset to original values
      setHasUnsavedChanges(false);
      window.location.reload();
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} days`;
    if (hours > 0) return `${hours} hours`;
    return `${Math.floor(seconds / 60)} minutes`;
  };

  return (
    <div className="config">
      <div className="config-header">
        <h1>DHCP Configuration</h1>
        <p className="config-subtitle">Manage global DHCP server settings and options</p>
        {hasUnsavedChanges && (
          <div className="unsaved-changes-notice">
            ⚠️ You have unsaved changes
          </div>
        )}
      </div>

      <div className="config-tabs">
        <button 
          className={`tab-button ${activeTab === 'server' ? 'active' : ''}`}
          onClick={() => setActiveTab('server')}
        >
          Server Settings
        </button>
        <button 
          className={`tab-button ${activeTab === 'global' ? 'active' : ''}`}
          onClick={() => setActiveTab('global')}
        >
          Global Options
        </button>
        <button 
          className={`tab-button ${activeTab === 'failover' ? 'active' : ''}`}
          onClick={() => setActiveTab('failover')}
        >
          Failover
        </button>
      </div>

      <div className="config-content">
        {activeTab === 'server' && (
          <div className="config-section">
            <h2>Server Settings</h2>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={config.server.enabled}
                  onChange={(e) => handleConfigChange('server', 'enabled', e.target.checked)}
                />
                Enable DHCP Server
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="port">Server Port</label>
              <input 
                type="number" 
                id="port"
                value={config.server.port}
                onChange={(e) => handleConfigChange('server', 'port', parseInt(e.target.value))}
                min="1"
                max="65535"
              />
            </div>

            <div className="form-group">
              <label htmlFor="interface">Network Interface</label>
              <select 
                id="interface"
                value={config.server.interface}
                onChange={(e) => handleConfigChange('server', 'interface', e.target.value)}
              >
                <option value="eth0">eth0</option>
                <option value="eth1">eth1</option>
                <option value="wlan0">wlan0</option>
                <option value="all">All Interfaces</option>
              </select>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={config.server.authoritative}
                  onChange={(e) => handleConfigChange('server', 'authoritative', e.target.checked)}
                />
                Authoritative Server
              </label>
              <p className="form-help">
                If enabled, this server will respond authoritatively to DHCP requests
              </p>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={config.server.ddnsUpdates}
                  onChange={(e) => handleConfigChange('server', 'ddnsUpdates', e.target.checked)}
                />
                Enable Dynamic DNS Updates
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="logLevel">Log Level</label>
              <select 
                id="logLevel"
                value={config.server.logLevel}
                onChange={(e) => handleConfigChange('server', 'logLevel', e.target.value)}
              >
                <option value="error">Error</option>
                <option value="warn">Warning</option>
                <option value="info">Info</option>
                <option value="debug">Debug</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'global' && (
          <div className="config-section">
            <h2>Global Options</h2>
            
            <div className="form-group">
              <label htmlFor="defaultLeaseTime">Default Lease Time</label>
              <input 
                type="number" 
                id="defaultLeaseTime"
                value={config.global.defaultLeaseTime}
                onChange={(e) => handleConfigChange('global', 'defaultLeaseTime', parseInt(e.target.value))}
                min="300"
              />
              <p className="form-help">
                Current: {formatTime(config.global.defaultLeaseTime)}
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="maxLeaseTime">Maximum Lease Time</label>
              <input 
                type="number" 
                id="maxLeaseTime"
                value={config.global.maxLeaseTime}
                onChange={(e) => handleConfigChange('global', 'maxLeaseTime', parseInt(e.target.value))}
                min="300"
              />
              <p className="form-help">
                Current: {formatTime(config.global.maxLeaseTime)}
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="domainName">Domain Name</label>
              <input 
                type="text" 
                id="domainName"
                value={config.global.domainName}
                onChange={(e) => handleConfigChange('global', 'domainName', e.target.value)}
                placeholder="example.com"
              />
            </div>

            <div className="form-group">
              <label>DNS Servers</label>
              {config.global.domainNameServers.map((server, index) => (
                <div key={index} className="array-input">
                  <input 
                    type="text" 
                    value={server}
                    onChange={(e) => handleArrayChange('global', 'domainNameServers', index, e.target.value)}
                    placeholder="8.8.8.8"
                  />
                  {config.global.domainNameServers.length > 1 && (
                    <button 
                      type="button" 
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemoveArrayItem('global', 'domainNameServers', index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button 
                type="button" 
                className="btn btn-sm btn-secondary"
                onClick={() => handleAddArrayItem('global', 'domainNameServers')}
              >
                Add DNS Server
              </button>
            </div>

            <div className="form-group">
              <label>NTP Servers</label>
              {config.global.ntpServers.map((server, index) => (
                <div key={index} className="array-input">
                  <input 
                    type="text" 
                    value={server}
                    onChange={(e) => handleArrayChange('global', 'ntpServers', index, e.target.value)}
                    placeholder="pool.ntp.org"
                  />
                  {config.global.ntpServers.length > 1 && (
                    <button 
                      type="button" 
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemoveArrayItem('global', 'ntpServers', index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button 
                type="button" 
                className="btn btn-sm btn-secondary"
                onClick={() => handleAddArrayItem('global', 'ntpServers')}
              >
                Add NTP Server
              </button>
            </div>

            <div className="form-group">
              <label htmlFor="timeOffset">Time Offset (seconds)</label>
              <input 
                type="number" 
                id="timeOffset"
                value={config.global.timeOffset}
                onChange={(e) => handleConfigChange('global', 'timeOffset', parseInt(e.target.value))}
              />
            </div>
          </div>
        )}

        {activeTab === 'failover' && (
          <div className="config-section">
            <h2>Failover Configuration</h2>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={config.failover.enabled}
                  onChange={(e) => handleConfigChange('failover', 'enabled', e.target.checked)}
                />
                Enable Failover
              </label>
            </div>

            {config.failover.enabled && (
              <>
                <div className="form-group">
                  <label htmlFor="failoverMode">Failover Mode</label>
                  <select 
                    id="failoverMode"
                    value={config.failover.mode}
                    onChange={(e) => handleConfigChange('failover', 'mode', e.target.value)}
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="peerAddress">Peer Address</label>
                  <input 
                    type="text" 
                    id="peerAddress"
                    value={config.failover.peerAddress}
                    onChange={(e) => handleConfigChange('failover', 'peerAddress', e.target.value)}
                    placeholder="192.168.1.10"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="peerPort">Peer Port</label>
                  <input 
                    type="number" 
                    id="peerPort"
                    value={config.failover.peerPort}
                    onChange={(e) => handleConfigChange('failover', 'peerPort', parseInt(e.target.value))}
                    min="1"
                    max="65535"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="maxResponseDelay">Max Response Delay (seconds)</label>
                  <input 
                    type="number" 
                    id="maxResponseDelay"
                    value={config.failover.maxResponseDelay}
                    onChange={(e) => handleConfigChange('failover', 'maxResponseDelay', parseInt(e.target.value))}
                    min="1"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="maxUnackedUpdates">Max Unacked Updates</label>
                  <input 
                    type="number" 
                    id="maxUnackedUpdates"
                    value={config.failover.maxUnackedUpdates}
                    onChange={(e) => handleConfigChange('failover', 'maxUnackedUpdates', parseInt(e.target.value))}
                    min="1"
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="config-actions">
        <button 
          className="btn btn-secondary"
          onClick={handleReset}
          disabled={!hasUnsavedChanges}
        >
          Reset Changes
        </button>
        <button 
          className="btn btn-primary"
          onClick={handleSave}
          disabled={!hasUnsavedChanges}
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
};

export default Config;