import React, { useState, useEffect } from 'react';

const Config = () => {
  const [config, setConfig] = useState({
    serverSettings: {
      serverName: '',
      domain: '',
      defaultLeaseTime: '',
      maxLeaseTime: '',
      logLevel: 'info',
      enableLogging: true
    },
    networkSettings: {
      listenInterface: '',
      authoritative: true,
      pingCheck: true,
      pingTimeout: '1',
      conflictDetection: true
    },
    dnsSettings: {
      primaryDNS: '',
      secondaryDNS: '',
      domainName: '',
      domainSearchList: '',
      enableDDNS: false
    },
    advanced: {
      bootpSupport: false,
      relaySupport: false,
      failoverPartner: '',
      loadBalancing: false,
      backupInterval: '3600'
    }
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    // Simulate API call to fetch current configuration
    const fetchConfig = async () => {
      try {
        setTimeout(() => {
          setConfig({
            serverSettings: {
              serverName: 'DHCP-Server-01',
              domain: 'company.local',
              defaultLeaseTime: '86400',
              maxLeaseTime: '604800',
              logLevel: 'info',
              enableLogging: true
            },
            networkSettings: {
              listenInterface: 'eth0',
              authoritative: true,
              pingCheck: true,
              pingTimeout: '1',
              conflictDetection: true
            },
            dnsSettings: {
              primaryDNS: '8.8.8.8',
              secondaryDNS: '8.8.4.4',
              domainName: 'company.local',
              domainSearchList: 'company.local,local',
              enableDDNS: false
            },
            advanced: {
              bootpSupport: false,
              relaySupport: false,
              failoverPartner: '',
              loadBalancing: false,
              backupInterval: '3600'
            }
          });
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching configuration:', error);
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const handleConfigChange = (section, field, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus('');

    try {
      // Simulate API call to save configuration
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSaveStatus('Configuration saved successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('Error saving configuration. Please try again.');
      console.error('Error saving configuration:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRestart = async () => {
    if (window.confirm('Are you sure you want to restart the DHCP server? This will temporarily interrupt service.')) {
      try {
        // Simulate server restart
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSaveStatus('DHCP server restarted successfully!');
        setTimeout(() => setSaveStatus(''), 3000);
      } catch (error) {
        setSaveStatus('Error restarting server. Please try again.');
        console.error('Error restarting server:', error);
      }
    }
  };

  const handleBackup = async () => {
    try {
      // Simulate backup creation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveStatus('Configuration backup created successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('Error creating backup. Please try again.');
      console.error('Error creating backup:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner" aria-hidden="true"></div>
        Loading configuration...
      </div>
    );
  }

  return (
    <div className="config">
      <div className="page-header">
        <h1>Server Configuration</h1>
        <p className="page-description">Manage DHCP server settings and network configuration</p>
        <div className="config-actions">
          <button className="btn btn-secondary" onClick={handleBackup}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
            Backup Config
          </button>
          <button className="btn btn-warning" onClick={handleRestart}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
            Restart Server
          </button>
        </div>
      </div>

      {saveStatus && (
        <div className={`alert ${saveStatus.includes('Error') ? 'alert-error' : 'alert-success'}`}>
          {saveStatus}
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="config-form-grid">
          <div className="config-sections">
            {/* Server Settings */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Server Settings</h2>
              </div>
              <div className="card-content">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="serverName" className="form-label">Server Name</label>
                    <input
                      id="serverName"
                      type="text"
                      className="form-input"
                      value={config.serverSettings.serverName}
                      onChange={(e) => handleConfigChange('serverSettings', 'serverName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="domain" className="form-label">Domain</label>
                    <input
                      id="domain"
                      type="text"
                      className="form-input"
                      value={config.serverSettings.domain}
                      onChange={(e) => handleConfigChange('serverSettings', 'domain', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="defaultLeaseTime" className="form-label">Default Lease Time (seconds)</label>
                    <input
                      id="defaultLeaseTime"
                      type="number"
                      className="form-input"
                      value={config.serverSettings.defaultLeaseTime}
                      onChange={(e) => handleConfigChange('serverSettings', 'defaultLeaseTime', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="maxLeaseTime" className="form-label">Max Lease Time (seconds)</label>
                    <input
                      id="maxLeaseTime"
                      type="number"
                      className="form-input"
                      value={config.serverSettings.maxLeaseTime}
                      onChange={(e) => handleConfigChange('serverSettings', 'maxLeaseTime', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="logLevel" className="form-label">Log Level</label>
                    <select
                      id="logLevel"
                      className="form-select"
                      value={config.serverSettings.logLevel}
                      onChange={(e) => handleConfigChange('serverSettings', 'logLevel', e.target.value)}
                    >
                      <option value="debug">Debug</option>
                      <option value="info">Info</option>
                      <option value="warning">Warning</option>
                      <option value="error">Error</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <input
                        type="checkbox"
                        checked={config.serverSettings.enableLogging}
                        onChange={(e) => handleConfigChange('serverSettings', 'enableLogging', e.target.checked)}
                      />
                      Enable Logging
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Network Settings */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Network Settings</h2>
              </div>
              <div className="card-content">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="listenInterface" className="form-label">Listen Interface</label>
                    <input
                      id="listenInterface"
                      type="text"
                      className="form-input"
                      value={config.networkSettings.listenInterface}
                      onChange={(e) => handleConfigChange('networkSettings', 'listenInterface', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pingTimeout" className="form-label">Ping Timeout (seconds)</label>
                    <input
                      id="pingTimeout"
                      type="number"
                      className="form-input"
                      value={config.networkSettings.pingTimeout}
                      onChange={(e) => handleConfigChange('networkSettings', 'pingTimeout', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <input
                        type="checkbox"
                        checked={config.networkSettings.authoritative}
                        onChange={(e) => handleConfigChange('networkSettings', 'authoritative', e.target.checked)}
                      />
                      Authoritative Server
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <input
                        type="checkbox"
                        checked={config.networkSettings.pingCheck}
                        onChange={(e) => handleConfigChange('networkSettings', 'pingCheck', e.target.checked)}
                      />
                      Enable Ping Check
                    </label>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <input
                        type="checkbox"
                        checked={config.networkSettings.conflictDetection}
                        onChange={(e) => handleConfigChange('networkSettings', 'conflictDetection', e.target.checked)}
                      />
                      IP Conflict Detection
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* DNS Settings */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">DNS Settings</h2>
              </div>
              <div className="card-content">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="primaryDNS" className="form-label">Primary DNS Server</label>
                    <input
                      id="primaryDNS"
                      type="text"
                      className="form-input"
                      value={config.dnsSettings.primaryDNS}
                      onChange={(e) => handleConfigChange('dnsSettings', 'primaryDNS', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="secondaryDNS" className="form-label">Secondary DNS Server</label>
                    <input
                      id="secondaryDNS"
                      type="text"
                      className="form-input"
                      value={config.dnsSettings.secondaryDNS}
                      onChange={(e) => handleConfigChange('dnsSettings', 'secondaryDNS', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="domainName" className="form-label">Domain Name</label>
                    <input
                      id="domainName"
                      type="text"
                      className="form-input"
                      value={config.dnsSettings.domainName}
                      onChange={(e) => handleConfigChange('dnsSettings', 'domainName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="domainSearchList" className="form-label">Domain Search List</label>
                    <input
                      id="domainSearchList"
                      type="text"
                      className="form-input"
                      value={config.dnsSettings.domainSearchList}
                      onChange={(e) => handleConfigChange('dnsSettings', 'domainSearchList', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <input
                        type="checkbox"
                        checked={config.dnsSettings.enableDDNS}
                        onChange={(e) => handleConfigChange('dnsSettings', 'enableDDNS', e.target.checked)}
                      />
                      Enable Dynamic DNS Updates
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Advanced Settings</h2>
              </div>
              <div className="card-content">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="failoverPartner" className="form-label">Failover Partner</label>
                    <input
                      id="failoverPartner"
                      type="text"
                      className="form-input"
                      placeholder="IP address of failover partner"
                      value={config.advanced.failoverPartner}
                      onChange={(e) => handleConfigChange('advanced', 'failoverPartner', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="backupInterval" className="form-label">Backup Interval (seconds)</label>
                    <input
                      id="backupInterval"
                      type="number"
                      className="form-input"
                      value={config.advanced.backupInterval}
                      onChange={(e) => handleConfigChange('advanced', 'backupInterval', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <input
                        type="checkbox"
                        checked={config.advanced.bootpSupport}
                        onChange={(e) => handleConfigChange('advanced', 'bootpSupport', e.target.checked)}
                      />
                      Enable BOOTP Support
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <input
                        type="checkbox"
                        checked={config.advanced.relaySupport}
                        onChange={(e) => handleConfigChange('advanced', 'relaySupport', e.target.checked)}
                      />
                      Enable DHCP Relay
                    </label>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <input
                        type="checkbox"
                        checked={config.advanced.loadBalancing}
                        onChange={(e) => handleConfigChange('advanced', 'loadBalancing', e.target.checked)}
                      />
                      Enable Load Balancing
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Summary */}
          <div className="config-summary">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Configuration Summary</h2>
              </div>
              <div className="card-content">
                <div className="summary-item">
                  <strong>Server:</strong> {config.serverSettings.serverName}
                </div>
                <div className="summary-item">
                  <strong>Domain:</strong> {config.serverSettings.domain}
                </div>
                <div className="summary-item">
                  <strong>Interface:</strong> {config.networkSettings.listenInterface}
                </div>
                <div className="summary-item">
                  <strong>Primary DNS:</strong> {config.dnsSettings.primaryDNS}
                </div>
                <div className="summary-item">
                  <strong>Lease Time:</strong> {config.serverSettings.defaultLeaseTime}s
                </div>
                <div className="summary-item">
                  <strong>Authoritative:</strong> {config.networkSettings.authoritative ? 'Yes' : 'No'}
                </div>
                <div className="summary-item">
                  <strong>Ping Check:</strong> {config.networkSettings.pingCheck ? 'Yes' : 'No'}
                </div>
                <div className="summary-item">
                  <strong>Logging:</strong> {config.serverSettings.enableLogging ? 'Enabled' : 'Disabled'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="config-actions-bottom">
          <button 
            type="submit" 
            className="btn btn-success"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <div className="spinner" aria-hidden="true"></div>
                Saving...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
                </svg>
                Save Configuration
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Config;