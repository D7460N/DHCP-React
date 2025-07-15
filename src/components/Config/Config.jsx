import { useState } from 'react';

const Config = () => {
  const [config, setConfig] = useState({
    // Server Configuration
    serverName: 'dhcp-server-01',
    serverIP: '192.168.1.1',
    serverPort: '67',
    maxClients: '1000',
    leaseTime: '24',
    renewalTime: '12',
    rebindingTime: '21',
    
    // DNS Configuration
    primaryDNS: '8.8.8.8',
    secondaryDNS: '8.8.4.4',
    domainName: 'local.domain',
    
    // DHCP Options
    routerOption: '192.168.1.1',
    subnetMask: '255.255.255.0',
    broadcastAddress: '192.168.1.255',
    ntpServers: 'pool.ntp.org',
    
    // Security Settings
    enableSecurity: true,
    allowUnknownClients: true,
    requireAuthentication: false,
    
    // Logging
    enableLogging: true,
    logLevel: 'INFO',
    logFile: '/var/log/dhcp/dhcpd.log',
    
    // Advanced Options
    enableDDNS: false,
    ddnsProvider: 'bind',
    enableFailover: false,
    failoverPeer: ''
  });

  const [activeTab, setActiveTab] = useState('server');
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Simulate saving configuration
    console.log('Saving configuration:', config);
    setHasChanges(false);
    alert('Configuration saved successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all changes?')) {
      // Reset to original values - in a real app, this would fetch from server
      setHasChanges(false);
      alert('Configuration reset!');
    }
  };

  const handleRestartService = () => {
    if (window.confirm('Are you sure you want to restart the DHCP service?')) {
      alert('DHCP service restarted successfully!');
    }
  };

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      type="button"
      className={`btn ${isActive ? 'btn-primary' : 'btn-outline-primary'}`}
      onClick={() => onClick(id)}
      aria-selected={isActive}
      role="tab"
    >
      {label}
    </button>
  );

  return (
    <div className="config">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2>DHCP Configuration</h2>
              <p className="text-muted">Manage DHCP server settings and options</p>
            </div>
            <div className="btn-group">
              <button 
                className="btn btn-success"
                onClick={handleSave}
                disabled={!hasChanges}
              >
                Save Changes
              </button>
              <button 
                className="btn btn-secondary"
                onClick={handleReset}
                disabled={!hasChanges}
              >
                Reset
              </button>
              <button 
                className="btn btn-warning"
                onClick={handleRestartService}
              >
                Restart Service
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      {hasChanges && (
        <div className="row mb-3">
          <div className="col-12">
            <div className="alert alert-warning" role="alert">
              <strong>Unsaved Changes:</strong> You have unsaved configuration changes. Don't forget to save them!
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <nav className="nav nav-tabs card-header-tabs" role="tablist">
                <TabButton
                  id="server"
                  label="Server Settings"
                  isActive={activeTab === 'server'}
                  onClick={setActiveTab}
                />
                <TabButton
                  id="dns"
                  label="DNS Settings"
                  isActive={activeTab === 'dns'}
                  onClick={setActiveTab}
                />
                <TabButton
                  id="options"
                  label="DHCP Options"
                  isActive={activeTab === 'options'}
                  onClick={setActiveTab}
                />
                <TabButton
                  id="security"
                  label="Security"
                  isActive={activeTab === 'security'}
                  onClick={setActiveTab}
                />
                <TabButton
                  id="logging"
                  label="Logging"
                  isActive={activeTab === 'logging'}
                  onClick={setActiveTab}
                />
                <TabButton
                  id="advanced"
                  label="Advanced"
                  isActive={activeTab === 'advanced'}
                  onClick={setActiveTab}
                />
              </nav>
            </div>
            <div className="card-body">
              {/* Server Settings Tab */}
              {activeTab === 'server' && (
                <div className="tab-content">
                  <h5 className="mb-3">Server Configuration</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="serverName" className="form-label">Server Name</label>
                        <input
                          type="text"
                          id="serverName"
                          className="form-control"
                          value={config.serverName}
                          onChange={(e) => handleInputChange('serverName', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="serverIP" className="form-label">Server IP Address</label>
                        <input
                          type="text"
                          id="serverIP"
                          className="form-control"
                          value={config.serverIP}
                          onChange={(e) => handleInputChange('serverIP', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="serverPort" className="form-label">Server Port</label>
                        <input
                          type="number"
                          id="serverPort"
                          className="form-control"
                          value={config.serverPort}
                          onChange={(e) => handleInputChange('serverPort', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="maxClients" className="form-label">Maximum Clients</label>
                        <input
                          type="number"
                          id="maxClients"
                          className="form-control"
                          value={config.maxClients}
                          onChange={(e) => handleInputChange('maxClients', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="leaseTime" className="form-label">Default Lease Time (hours)</label>
                        <input
                          type="number"
                          id="leaseTime"
                          className="form-control"
                          value={config.leaseTime}
                          onChange={(e) => handleInputChange('leaseTime', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="renewalTime" className="form-label">Renewal Time (hours)</label>
                        <input
                          type="number"
                          id="renewalTime"
                          className="form-control"
                          value={config.renewalTime}
                          onChange={(e) => handleInputChange('renewalTime', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="rebindingTime" className="form-label">Rebinding Time (hours)</label>
                        <input
                          type="number"
                          id="rebindingTime"
                          className="form-control"
                          value={config.rebindingTime}
                          onChange={(e) => handleInputChange('rebindingTime', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* DNS Settings Tab */}
              {activeTab === 'dns' && (
                <div className="tab-content">
                  <h5 className="mb-3">DNS Configuration</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="primaryDNS" className="form-label">Primary DNS Server</label>
                        <input
                          type="text"
                          id="primaryDNS"
                          className="form-control"
                          value={config.primaryDNS}
                          onChange={(e) => handleInputChange('primaryDNS', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="secondaryDNS" className="form-label">Secondary DNS Server</label>
                        <input
                          type="text"
                          id="secondaryDNS"
                          className="form-control"
                          value={config.secondaryDNS}
                          onChange={(e) => handleInputChange('secondaryDNS', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="domainName" className="form-label">Domain Name</label>
                        <input
                          type="text"
                          id="domainName"
                          className="form-control"
                          value={config.domainName}
                          onChange={(e) => handleInputChange('domainName', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* DHCP Options Tab */}
              {activeTab === 'options' && (
                <div className="tab-content">
                  <h5 className="mb-3">DHCP Options</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="routerOption" className="form-label">Default Router</label>
                        <input
                          type="text"
                          id="routerOption"
                          className="form-control"
                          value={config.routerOption}
                          onChange={(e) => handleInputChange('routerOption', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="subnetMask" className="form-label">Subnet Mask</label>
                        <input
                          type="text"
                          id="subnetMask"
                          className="form-control"
                          value={config.subnetMask}
                          onChange={(e) => handleInputChange('subnetMask', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="broadcastAddress" className="form-label">Broadcast Address</label>
                        <input
                          type="text"
                          id="broadcastAddress"
                          className="form-control"
                          value={config.broadcastAddress}
                          onChange={(e) => handleInputChange('broadcastAddress', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="ntpServers" className="form-label">NTP Servers</label>
                        <input
                          type="text"
                          id="ntpServers"
                          className="form-control"
                          value={config.ntpServers}
                          onChange={(e) => handleInputChange('ntpServers', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="tab-content">
                  <h5 className="mb-3">Security Settings</h5>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            id="enableSecurity"
                            className="form-check-input"
                            checked={config.enableSecurity}
                            onChange={(e) => handleInputChange('enableSecurity', e.target.checked)}
                          />
                          <label htmlFor="enableSecurity" className="form-check-label">
                            Enable Security Features
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            id="allowUnknownClients"
                            className="form-check-input"
                            checked={config.allowUnknownClients}
                            onChange={(e) => handleInputChange('allowUnknownClients', e.target.checked)}
                          />
                          <label htmlFor="allowUnknownClients" className="form-check-label">
                            Allow Unknown Clients
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            id="requireAuthentication"
                            className="form-check-input"
                            checked={config.requireAuthentication}
                            onChange={(e) => handleInputChange('requireAuthentication', e.target.checked)}
                          />
                          <label htmlFor="requireAuthentication" className="form-check-label">
                            Require Client Authentication
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Logging Tab */}
              {activeTab === 'logging' && (
                <div className="tab-content">
                  <h5 className="mb-3">Logging Configuration</h5>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            id="enableLogging"
                            className="form-check-input"
                            checked={config.enableLogging}
                            onChange={(e) => handleInputChange('enableLogging', e.target.checked)}
                          />
                          <label htmlFor="enableLogging" className="form-check-label">
                            Enable Logging
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="logLevel" className="form-label">Log Level</label>
                        <select
                          id="logLevel"
                          className="form-control"
                          value={config.logLevel}
                          onChange={(e) => handleInputChange('logLevel', e.target.value)}
                        >
                          <option value="DEBUG">Debug</option>
                          <option value="INFO">Info</option>
                          <option value="WARNING">Warning</option>
                          <option value="ERROR">Error</option>
                          <option value="CRITICAL">Critical</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="logFile" className="form-label">Log File Path</label>
                        <input
                          type="text"
                          id="logFile"
                          className="form-control"
                          value={config.logFile}
                          onChange={(e) => handleInputChange('logFile', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Advanced Tab */}
              {activeTab === 'advanced' && (
                <div className="tab-content">
                  <h5 className="mb-3">Advanced Options</h5>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            id="enableDDNS"
                            className="form-check-input"
                            checked={config.enableDDNS}
                            onChange={(e) => handleInputChange('enableDDNS', e.target.checked)}
                          />
                          <label htmlFor="enableDDNS" className="form-check-label">
                            Enable Dynamic DNS (DDNS)
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {config.enableDDNS && (
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="ddnsProvider" className="form-label">DDNS Provider</label>
                          <select
                            id="ddnsProvider"
                            className="form-control"
                            value={config.ddnsProvider}
                            onChange={(e) => handleInputChange('ddnsProvider', e.target.value)}
                          >
                            <option value="bind">BIND</option>
                            <option value="windows">Windows DNS</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            id="enableFailover"
                            className="form-check-input"
                            checked={config.enableFailover}
                            onChange={(e) => handleInputChange('enableFailover', e.target.checked)}
                          />
                          <label htmlFor="enableFailover" className="form-check-label">
                            Enable Failover
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {config.enableFailover && (
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="failoverPeer" className="form-label">Failover Peer IP</label>
                          <input
                            type="text"
                            id="failoverPeer"
                            className="form-control"
                            value={config.failoverPeer}
                            onChange={(e) => handleInputChange('failoverPeer', e.target.value)}
                            placeholder="e.g., 192.168.1.2"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Config;