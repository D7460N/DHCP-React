import React, { useState, useEffect } from 'react';

interface DHCPConfig {
  serverName: string;
  domainName: string;
  domainNameServers: string;
  defaultLeaseTime: string;
  maxLeaseTime: string;
  authoritative: boolean;
  logLevel: string;
  logFacility: string;
  ntpServers: string;
  netbiosNameServers: string;
  netbiosNodeType: string;
}

const Config: React.FC = () => {
  const [config, setConfig] = useState<DHCPConfig>({
    serverName: 'dhcp-server-01',
    domainName: 'company.local',
    domainNameServers: '8.8.8.8, 8.8.4.4',
    defaultLeaseTime: '24h',
    maxLeaseTime: '168h',
    authoritative: true,
    logLevel: 'info',
    logFacility: 'local0',
    ntpServers: 'pool.ntp.org',
    netbiosNameServers: '192.168.1.1',
    netbiosNodeType: 'h-node'
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  useEffect(() => {
    // Simulate loading configuration
    const loadConfig = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Configuration is already set in state
      setLoading(false);
    };

    loadConfig();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setConfig(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setConfig(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful save
      setMessage({ type: 'success', text: 'Configuration saved successfully!' });
      
      // Auto-hide success message
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save configuration. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    // Reset to original values
    setConfig({
      serverName: 'dhcp-server-01',
      domainName: 'company.local',
      domainNameServers: '8.8.8.8, 8.8.4.4',
      defaultLeaseTime: '24h',
      maxLeaseTime: '168h',
      authoritative: true,
      logLevel: 'info',
      logFacility: 'local0',
      ntpServers: 'pool.ntp.org',
      netbiosNameServers: '192.168.1.1',
      netbiosNodeType: 'h-node'
    });
    setMessage(null);
  };

  const handleRestartService = async () => {
    setSaving(true);
    setMessage(null);

    try {
      // Simulate service restart
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setMessage({ type: 'success', text: 'DHCP service restarted successfully!' });
      
      // Auto-hide success message
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to restart DHCP service. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const validateConfig = () => {
    const errors: string[] = [];
    
    if (!config.serverName.trim()) {
      errors.push('Server name is required');
    }
    
    if (!config.domainName.trim()) {
      errors.push('Domain name is required');
    }
    
    if (!config.domainNameServers.trim()) {
      errors.push('Domain name servers are required');
    }
    
    return errors;
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" aria-hidden="true"></div>
        <span>Loading configuration...</span>
      </div>
    );
  }

  const validationErrors = validateConfig();

  return (
    <div>
      <h1>DHCP Configuration</h1>
      
      {message && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Server Settings */}
        <div className="config-section">
          <div className="config-form">
            <h3>Server Settings</h3>
            <div className="config-form-row">
              <div className="form-group">
                <label htmlFor="serverName" className="form-label">Server Name</label>
                <input
                  type="text"
                  id="serverName"
                  name="serverName"
                  className="form-input"
                  value={config.serverName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="domainName" className="form-label">Domain Name</label>
                <input
                  type="text"
                  id="domainName"
                  name="domainName"
                  className="form-input"
                  value={config.domainName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="config-form-row">
              <div className="form-group">
                <label htmlFor="domainNameServers" className="form-label">DNS Servers</label>
                <input
                  type="text"
                  id="domainNameServers"
                  name="domainNameServers"
                  className="form-input"
                  value={config.domainNameServers}
                  onChange={handleInputChange}
                  placeholder="8.8.8.8, 8.8.4.4"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="ntpServers" className="form-label">NTP Servers</label>
                <input
                  type="text"
                  id="ntpServers"
                  name="ntpServers"
                  className="form-input"
                  value={config.ntpServers}
                  onChange={handleInputChange}
                  placeholder="pool.ntp.org"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lease Settings */}
        <div className="config-section">
          <div className="config-form">
            <h3>Lease Settings</h3>
            <div className="config-form-row">
              <div className="form-group">
                <label htmlFor="defaultLeaseTime" className="form-label">Default Lease Time</label>
                <select
                  id="defaultLeaseTime"
                  name="defaultLeaseTime"
                  className="form-select"
                  value={config.defaultLeaseTime}
                  onChange={handleInputChange}
                >
                  <option value="1h">1 Hour</option>
                  <option value="12h">12 Hours</option>
                  <option value="24h">24 Hours</option>
                  <option value="48h">48 Hours</option>
                  <option value="168h">7 Days</option>
                  <option value="720h">30 Days</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="maxLeaseTime" className="form-label">Maximum Lease Time</label>
                <select
                  id="maxLeaseTime"
                  name="maxLeaseTime"
                  className="form-select"
                  value={config.maxLeaseTime}
                  onChange={handleInputChange}
                >
                  <option value="24h">24 Hours</option>
                  <option value="48h">48 Hours</option>
                  <option value="168h">7 Days</option>
                  <option value="720h">30 Days</option>
                  <option value="8760h">1 Year</option>
                </select>
              </div>
            </div>
            <div className="config-form-row">
              <div className="form-group">
                <label className="form-label">
                  <input
                    type="checkbox"
                    name="authoritative"
                    checked={config.authoritative}
                    onChange={handleInputChange}
                    style={{ marginRight: '0.5rem' }}
                  />
                  Authoritative Server
                </label>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  Enable if this is the authoritative DHCP server for the network
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NetBIOS Settings */}
        <div className="config-section">
          <div className="config-form">
            <h3>NetBIOS Settings</h3>
            <div className="config-form-row">
              <div className="form-group">
                <label htmlFor="netbiosNameServers" className="form-label">NetBIOS Name Servers</label>
                <input
                  type="text"
                  id="netbiosNameServers"
                  name="netbiosNameServers"
                  className="form-input"
                  value={config.netbiosNameServers}
                  onChange={handleInputChange}
                  placeholder="192.168.1.1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="netbiosNodeType" className="form-label">NetBIOS Node Type</label>
                <select
                  id="netbiosNodeType"
                  name="netbiosNodeType"
                  className="form-select"
                  value={config.netbiosNodeType}
                  onChange={handleInputChange}
                >
                  <option value="b-node">B-Node (Broadcast)</option>
                  <option value="p-node">P-Node (Point-to-Point)</option>
                  <option value="m-node">M-Node (Mixed)</option>
                  <option value="h-node">H-Node (Hybrid)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Logging Settings */}
        <div className="config-section">
          <div className="config-form">
            <h3>Logging Settings</h3>
            <div className="config-form-row">
              <div className="form-group">
                <label htmlFor="logLevel" className="form-label">Log Level</label>
                <select
                  id="logLevel"
                  name="logLevel"
                  className="form-select"
                  value={config.logLevel}
                  onChange={handleInputChange}
                >
                  <option value="debug">Debug</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="logFacility" className="form-label">Log Facility</label>
                <select
                  id="logFacility"
                  name="logFacility"
                  className="form-select"
                  value={config.logFacility}
                  onChange={handleInputChange}
                >
                  <option value="local0">Local0</option>
                  <option value="local1">Local1</option>
                  <option value="local2">Local2</option>
                  <option value="local3">Local3</option>
                  <option value="local4">Local4</option>
                  <option value="local5">Local5</option>
                  <option value="local6">Local6</option>
                  <option value="local7">Local7</option>
                  <option value="daemon">Daemon</option>
                  <option value="syslog">Syslog</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="alert alert-error">
            <strong>Please fix the following errors:</strong>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="config-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving || validationErrors.length > 0}
          >
            {saving ? (
              <>
                <div className="spinner" style={{ width: '1rem', height: '1rem' }} aria-hidden="true"></div>
                Saving...
              </>
            ) : (
              'Save Configuration'
            )}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={saving}
          >
            Reset
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleRestartService}
            disabled={saving}
          >
            {saving ? (
              <>
                <div className="spinner" style={{ width: '1rem', height: '1rem' }} aria-hidden="true"></div>
                Restarting...
              </>
            ) : (
              'Restart Service'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Config;