import React, { useState } from 'react';

const Config = () => {
  const [config, setConfig] = useState({
    serverSettings: {
      listenInterface: 'eth0',
      authoritative: true,
      pingCheck: true,
      pingTimeout: 1,
      logLevel: 'info',
      maxLeaseTime: 86400,
      defaultLeaseTime: 43200,
      minLeaseTime: 3600
    },
    globalOptions: {
      domainName: 'example.com',
      domainNameServers: ['192.168.1.1', '8.8.8.8'],
      ntpServers: ['pool.ntp.org'],
      timeOffset: 0,
      broadcastAddress: '192.168.1.255',
      routerOption: '192.168.1.1'
    },
    failoverSettings: {
      enabled: false,
      peerAddress: '',
      peerPort: 647,
      mclt: 3600,
      split: 128,
      loadBalance: 3
    },
    logging: {
      enabled: true,
      facility: 'local0',
      logQueries: false,
      logDdnsUpdates: true
    }
  });

  const [activeTab, setActiveTab] = useState('server');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  const handleInputChange = (section, field, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleArrayChange = (section, field, value) => {
    const arrayValue = value.split(',').map(item => item.trim()).filter(item => item);
    handleInputChange(section, field, arrayValue);
  };

  const handleSave = async () => {
    try {
      setSaveStatus('saving');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setHasUnsavedChanges(false);
      setSaveStatus('saved');
      
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);
    } catch (err) {
      console.error('Error saving configuration:', err);
      setSaveStatus('error');
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all configuration changes?')) {
      // Reset to original values - in a real app, this would fetch from server
      setHasUnsavedChanges(false);
      setSaveStatus('');
    }
  };

  const tabs = [
    { id: 'server', label: 'Server Settings', icon: '🖥️' },
    { id: 'global', label: 'Global Options', icon: '🌐' },
    { id: 'failover', label: 'Failover', icon: '🔄' },
    { id: 'logging', label: 'Logging', icon: '📝' }
  ];

  const renderServerSettings = () => (
    <div className="config-section">
      <h3>Server Settings</h3>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="listenInterface" className="form-label">Listen Interface</label>
          <input
            type="text"
            id="listenInterface"
            value={config.serverSettings.listenInterface}
            onChange={(e) => handleInputChange('serverSettings', 'listenInterface', e.target.value)}
            className="form-input"
            placeholder="e.g., eth0, eth1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="logLevel" className="form-label">Log Level</label>
          <select
            id="logLevel"
            value={config.serverSettings.logLevel}
            onChange={(e) => handleInputChange('serverSettings', 'logLevel', e.target.value)}
            className="form-select"
          >
            <option value="debug">Debug</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="defaultLeaseTime" className="form-label">Default Lease Time (seconds)</label>
          <input
            type="number"
            id="defaultLeaseTime"
            value={config.serverSettings.defaultLeaseTime}
            onChange={(e) => handleInputChange('serverSettings', 'defaultLeaseTime', parseInt(e.target.value))}
            className="form-input"
            min="300"
            max="86400"
          />
        </div>
        <div className="form-group">
          <label htmlFor="maxLeaseTime" className="form-label">Max Lease Time (seconds)</label>
          <input
            type="number"
            id="maxLeaseTime"
            value={config.serverSettings.maxLeaseTime}
            onChange={(e) => handleInputChange('serverSettings', 'maxLeaseTime', parseInt(e.target.value))}
            className="form-input"
            min="300"
            max="604800"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="minLeaseTime" className="form-label">Min Lease Time (seconds)</label>
          <input
            type="number"
            id="minLeaseTime"
            value={config.serverSettings.minLeaseTime}
            onChange={(e) => handleInputChange('serverSettings', 'minLeaseTime', parseInt(e.target.value))}
            className="form-input"
            min="60"
            max="3600"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pingTimeout" className="form-label">Ping Timeout (seconds)</label>
          <input
            type="number"
            id="pingTimeout"
            value={config.serverSettings.pingTimeout}
            onChange={(e) => handleInputChange('serverSettings', 'pingTimeout', parseInt(e.target.value))}
            className="form-input"
            min="1"
            max="10"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            <input
              type="checkbox"
              checked={config.serverSettings.authoritative}
              onChange={(e) => handleInputChange('serverSettings', 'authoritative', e.target.checked)}
              style={{ marginRight: '0.5rem' }}
            />
            Authoritative Server
          </label>
          <small className="text-muted">Server will authoritatively respond to DHCP requests</small>
        </div>
        <div className="form-group">
          <label className="form-label">
            <input
              type="checkbox"
              checked={config.serverSettings.pingCheck}
              onChange={(e) => handleInputChange('serverSettings', 'pingCheck', e.target.checked)}
              style={{ marginRight: '0.5rem' }}
            />
            Ping Check
          </label>
          <small className="text-muted">Ping IP addresses before offering them</small>
        </div>
      </div>
    </div>
  );

  const renderGlobalOptions = () => (
    <div className="config-section">
      <h3>Global Options</h3>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="domainName" className="form-label">Domain Name</label>
          <input
            type="text"
            id="domainName"
            value={config.globalOptions.domainName}
            onChange={(e) => handleInputChange('globalOptions', 'domainName', e.target.value)}
            className="form-input"
            placeholder="e.g., example.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="routerOption" className="form-label">Default Router</label>
          <input
            type="text"
            id="routerOption"
            value={config.globalOptions.routerOption}
            onChange={(e) => handleInputChange('globalOptions', 'routerOption', e.target.value)}
            className="form-input"
            placeholder="e.g., 192.168.1.1"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="domainNameServers" className="form-label">DNS Servers</label>
          <input
            type="text"
            id="domainNameServers"
            value={config.globalOptions.domainNameServers.join(', ')}
            onChange={(e) => handleArrayChange('globalOptions', 'domainNameServers', e.target.value)}
            className="form-input"
            placeholder="e.g., 192.168.1.1, 8.8.8.8"
          />
          <small className="text-muted">Separate multiple DNS servers with commas</small>
        </div>
        <div className="form-group">
          <label htmlFor="ntpServers" className="form-label">NTP Servers</label>
          <input
            type="text"
            id="ntpServers"
            value={config.globalOptions.ntpServers.join(', ')}
            onChange={(e) => handleArrayChange('globalOptions', 'ntpServers', e.target.value)}
            className="form-input"
            placeholder="e.g., pool.ntp.org"
          />
          <small className="text-muted">Separate multiple NTP servers with commas</small>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="broadcastAddress" className="form-label">Broadcast Address</label>
          <input
            type="text"
            id="broadcastAddress"
            value={config.globalOptions.broadcastAddress}
            onChange={(e) => handleInputChange('globalOptions', 'broadcastAddress', e.target.value)}
            className="form-input"
            placeholder="e.g., 192.168.1.255"
          />
        </div>
        <div className="form-group">
          <label htmlFor="timeOffset" className="form-label">Time Offset (seconds)</label>
          <input
            type="number"
            id="timeOffset"
            value={config.globalOptions.timeOffset}
            onChange={(e) => handleInputChange('globalOptions', 'timeOffset', parseInt(e.target.value))}
            className="form-input"
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );

  const renderFailoverSettings = () => (
    <div className="config-section">
      <h3>Failover Settings</h3>
      <div className="form-group">
        <label className="form-label">
          <input
            type="checkbox"
            checked={config.failoverSettings.enabled}
            onChange={(e) => handleInputChange('failoverSettings', 'enabled', e.target.checked)}
            style={{ marginRight: '0.5rem' }}
          />
          Enable Failover
        </label>
        <small className="text-muted">Configure DHCP failover with a peer server</small>
      </div>

      {config.failoverSettings.enabled && (
        <>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="peerAddress" className="form-label">Peer Server Address</label>
              <input
                type="text"
                id="peerAddress"
                value={config.failoverSettings.peerAddress}
                onChange={(e) => handleInputChange('failoverSettings', 'peerAddress', e.target.value)}
                className="form-input"
                placeholder="e.g., 192.168.1.2"
              />
            </div>
            <div className="form-group">
              <label htmlFor="peerPort" className="form-label">Peer Server Port</label>
              <input
                type="number"
                id="peerPort"
                value={config.failoverSettings.peerPort}
                onChange={(e) => handleInputChange('failoverSettings', 'peerPort', parseInt(e.target.value))}
                className="form-input"
                min="1"
                max="65535"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="mclt" className="form-label">MCLT (seconds)</label>
              <input
                type="number"
                id="mclt"
                value={config.failoverSettings.mclt}
                onChange={(e) => handleInputChange('failoverSettings', 'mclt', parseInt(e.target.value))}
                className="form-input"
                min="60"
                max="86400"
              />
              <small className="text-muted">Maximum Client Lead Time</small>
            </div>
            <div className="form-group">
              <label htmlFor="split" className="form-label">Split</label>
              <input
                type="number"
                id="split"
                value={config.failoverSettings.split}
                onChange={(e) => handleInputChange('failoverSettings', 'split', parseInt(e.target.value))}
                className="form-input"
                min="0"
                max="255"
              />
              <small className="text-muted">Load balancing split (0-255)</small>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="loadBalance" className="form-label">Load Balance Max Seconds</label>
            <input
              type="number"
              id="loadBalance"
              value={config.failoverSettings.loadBalance}
              onChange={(e) => handleInputChange('failoverSettings', 'loadBalance', parseInt(e.target.value))}
              className="form-input"
              min="1"
              max="3600"
            />
          </div>
        </>
      )}
    </div>
  );

  const renderLoggingSettings = () => (
    <div className="config-section">
      <h3>Logging Configuration</h3>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            <input
              type="checkbox"
              checked={config.logging.enabled}
              onChange={(e) => handleInputChange('logging', 'enabled', e.target.checked)}
              style={{ marginRight: '0.5rem' }}
            />
            Enable Logging
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="facility" className="form-label">Syslog Facility</label>
          <select
            id="facility"
            value={config.logging.facility}
            onChange={(e) => handleInputChange('logging', 'facility', e.target.value)}
            className="form-select"
            disabled={!config.logging.enabled}
          >
            <option value="local0">local0</option>
            <option value="local1">local1</option>
            <option value="local2">local2</option>
            <option value="local3">local3</option>
            <option value="local4">local4</option>
            <option value="local5">local5</option>
            <option value="local6">local6</option>
            <option value="local7">local7</option>
            <option value="daemon">daemon</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            <input
              type="checkbox"
              checked={config.logging.logQueries}
              onChange={(e) => handleInputChange('logging', 'logQueries', e.target.checked)}
              style={{ marginRight: '0.5rem' }}
              disabled={!config.logging.enabled}
            />
            Log Client Queries
          </label>
          <small className="text-muted">Log all DHCP client requests</small>
        </div>
        <div className="form-group">
          <label className="form-label">
            <input
              type="checkbox"
              checked={config.logging.logDdnsUpdates}
              onChange={(e) => handleInputChange('logging', 'logDdnsUpdates', e.target.checked)}
              style={{ marginRight: '0.5rem' }}
              disabled={!config.logging.enabled}
            />
            Log DDNS Updates
          </label>
          <small className="text-muted">Log Dynamic DNS updates</small>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'server':
        return renderServerSettings();
      case 'global':
        return renderGlobalOptions();
      case 'failover':
        return renderFailoverSettings();
      case 'logging':
        return renderLoggingSettings();
      default:
        return renderServerSettings();
    }
  };

  return (
    <div className="config">
      <div className="dashboard-header">
        <h1>DHCP Configuration</h1>
        <p className="subtitle">Configure DHCP server settings and options</p>
      </div>

      {saveStatus && (
        <div className={`alert ${
          saveStatus === 'saved' ? 'alert-success' : 
          saveStatus === 'error' ? 'alert-danger' : 
          'alert-info'
        }`}>
          {saveStatus === 'saving' && '⏳ Saving configuration...'}
          {saveStatus === 'saved' && '✅ Configuration saved successfully!'}
          {saveStatus === 'error' && '❌ Error saving configuration. Please try again.'}
        </div>
      )}

      <div className="dashboard-card">
        <div className="config-tabs">
          <nav className="tab-nav" role="tablist">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`${tab.id}-panel`}
              >
                <span className="tab-icon" aria-hidden="true">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="tab-content">
            <div
              id={`${activeTab}-panel`}
              role="tabpanel"
              aria-labelledby={`${activeTab}-tab`}
            >
              {renderTabContent()}
            </div>
          </div>
        </div>

        <div className="config-actions">
          <div className="btn-group">
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={!hasUnsavedChanges || saveStatus === 'saving'}
            >
              {saveStatus === 'saving' ? 'Saving...' : 'Save Configuration'}
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleReset}
              disabled={!hasUnsavedChanges}
            >
              Reset Changes
            </button>
          </div>
          {hasUnsavedChanges && (
            <div className="alert alert-warning mt-3">
              You have unsaved changes. Don't forget to save your configuration!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Config;