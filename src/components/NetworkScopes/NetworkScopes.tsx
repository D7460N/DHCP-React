import React, { useState, useEffect } from 'react';

interface NetworkScope {
  id: string;
  name: string;
  network: string;
  subnetMask: string;
  startRange: string;
  endRange: string;
  gateway: string;
  dnsServers: string[];
  enabled: boolean;
  description: string;
  vlanId?: number;
  reservedIPs: string[];
  exclusions: Array<{
    start: string;
    end: string;
    reason: string;
  }>;
}

const NetworkScopes: React.FC = () => {
  const [scopes, setScopes] = useState<NetworkScope[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedScope, setSelectedScope] = useState<NetworkScope | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const [newScope, setNewScope] = useState({
    name: '',
    network: '',
    subnetMask: '255.255.255.0',
    startRange: '',
    endRange: '',
    gateway: '',
    dnsServers: '',
    description: '',
    vlanId: '',
    enabled: true
  });

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setScopes([
        {
          id: '1',
          name: 'Main Office Network',
          network: '192.168.1.0',
          subnetMask: '255.255.255.0',
          startRange: '192.168.1.100',
          endRange: '192.168.1.200',
          gateway: '192.168.1.1',
          dnsServers: ['8.8.8.8', '8.8.4.4'],
          enabled: true,
          description: 'Primary network for office workstations and devices',
          vlanId: 10,
          reservedIPs: ['192.168.1.10', '192.168.1.11', '192.168.1.12'],
          exclusions: [
            { start: '192.168.1.150', end: '192.168.1.160', reason: 'Reserved for servers' }
          ]
        },
        {
          id: '2',
          name: 'Guest Network',
          network: '192.168.2.0',
          subnetMask: '255.255.255.0',
          startRange: '192.168.2.50',
          endRange: '192.168.2.100',
          gateway: '192.168.2.1',
          dnsServers: ['1.1.1.1', '1.0.0.1'],
          enabled: true,
          description: 'Isolated network for guest access',
          vlanId: 20,
          reservedIPs: [],
          exclusions: []
        },
        {
          id: '3',
          name: 'IoT Network',
          network: '192.168.3.0',
          subnetMask: '255.255.255.0',
          startRange: '192.168.3.10',
          endRange: '192.168.3.50',
          gateway: '192.168.3.1',
          dnsServers: ['192.168.1.1'],
          enabled: true,
          description: 'Network for IoT devices and sensors',
          vlanId: 30,
          reservedIPs: ['192.168.3.5'],
          exclusions: []
        },
        {
          id: '4',
          name: 'Development Network',
          network: '192.168.4.0',
          subnetMask: '255.255.255.0',
          startRange: '192.168.4.20',
          endRange: '192.168.4.100',
          gateway: '192.168.4.1',
          dnsServers: ['8.8.8.8', '8.8.4.4'],
          enabled: false,
          description: 'Development and testing environment',
          vlanId: 40,
          reservedIPs: ['192.168.4.10', '192.168.4.11'],
          exclusions: []
        }
      ]);
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const handleCreateScope = (e: React.FormEvent) => {
    e.preventDefault();
    const dnsArray = newScope.dnsServers.split(',').map(dns => dns.trim()).filter(Boolean);
    
    const scope: NetworkScope = {
      id: Date.now().toString(),
      name: newScope.name,
      network: newScope.network,
      subnetMask: newScope.subnetMask,
      startRange: newScope.startRange,
      endRange: newScope.endRange,
      gateway: newScope.gateway,
      dnsServers: dnsArray,
      enabled: newScope.enabled,
      description: newScope.description,
      vlanId: newScope.vlanId ? parseInt(newScope.vlanId) : undefined,
      reservedIPs: [],
      exclusions: []
    };
    
    setScopes([...scopes, scope]);
    setNewScope({
      name: '',
      network: '',
      subnetMask: '255.255.255.0',
      startRange: '',
      endRange: '',
      gateway: '',
      dnsServers: '',
      description: '',
      vlanId: '',
      enabled: true
    });
    setShowCreateForm(false);
  };

  const handleToggleScope = (scopeId: string) => {
    setScopes(scopes.map(scope => 
      scope.id === scopeId ? { ...scope, enabled: !scope.enabled } : scope
    ));
  };

  const handleDeleteScope = (scopeId: string) => {
    if (window.confirm('Are you sure you want to delete this network scope?')) {
      setScopes(scopes.filter(scope => scope.id !== scopeId));
    }
  };

  const calculateTotalIPs = (start: string, end: string): number => {
    // Simple calculation - would need proper IP range calculation in production
    const startParts = start.split('.').map(Number);
    const endParts = end.split('.').map(Number);
    const startLast = startParts[3];
    const endLast = endParts[3];
    return endLast - startLast + 1;
  };

  const getAvailableIPs = (scope: NetworkScope): number => {
    const total = calculateTotalIPs(scope.startRange, scope.endRange);
    const exclusions = scope.exclusions.reduce((acc, excl) => {
      return acc + calculateTotalIPs(excl.start, excl.end);
    }, 0);
    return total - exclusions - scope.reservedIPs.length;
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner" aria-label="Loading network scopes"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="content-header">
        <h1 className="content-title">Network Scopes</h1>
        <p className="content-subtitle">
          Manage network segments and their DHCP configurations
        </p>
      </div>

      <div className="action-buttons">
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateForm(true)}
        >
          Create New Scope
        </button>
        <button className="btn btn-outline">
          Import Scopes
        </button>
        <button className="btn btn-outline">
          Export Configuration
        </button>
      </div>

      {/* Create Scope Form */}
      {showCreateForm && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Create New Network Scope</h2>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setShowCreateForm(false)}
            >
              Cancel
            </button>
          </div>
          <form onSubmit={handleCreateScope} className="card-content">
            <div className="form-group">
              <label htmlFor="scopeName" className="form-label">Scope Name</label>
              <input
                type="text"
                id="scopeName"
                className="form-input"
                value={newScope.name}
                onChange={(e) => setNewScope({...newScope, name: e.target.value})}
                required
                placeholder="e.g., Main Office Network"
              />
            </div>

            <div className="form-group">
              <label htmlFor="scopeDescription" className="form-label">Description</label>
              <textarea
                id="scopeDescription"
                className="form-textarea"
                value={newScope.description}
                onChange={(e) => setNewScope({...newScope, description: e.target.value})}
                placeholder="Brief description of this network scope"
                rows={2}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="network" className="form-label">Network Address</label>
                <input
                  type="text"
                  id="network"
                  className="form-input"
                  value={newScope.network}
                  onChange={(e) => setNewScope({...newScope, network: e.target.value})}
                  required
                  placeholder="192.168.1.0"
                  pattern="^(\d{1,3}\.){3}\d{1,3}$"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subnetMask" className="form-label">Subnet Mask</label>
                <select
                  id="subnetMask"
                  className="form-select"
                  value={newScope.subnetMask}
                  onChange={(e) => setNewScope({...newScope, subnetMask: e.target.value})}
                >
                  <option value="255.255.255.0">255.255.255.0 (/24)</option>
                  <option value="255.255.254.0">255.255.254.0 (/23)</option>
                  <option value="255.255.252.0">255.255.252.0 (/22)</option>
                  <option value="255.255.248.0">255.255.248.0 (/21)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="vlanId" className="form-label">VLAN ID (Optional)</label>
                <input
                  type="number"
                  id="vlanId"
                  className="form-input"
                  value={newScope.vlanId}
                  onChange={(e) => setNewScope({...newScope, vlanId: e.target.value})}
                  min="1"
                  max="4094"
                  placeholder="10"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="startRange" className="form-label">Start Range</label>
                <input
                  type="text"
                  id="startRange"
                  className="form-input"
                  value={newScope.startRange}
                  onChange={(e) => setNewScope({...newScope, startRange: e.target.value})}
                  required
                  placeholder="192.168.1.100"
                  pattern="^(\d{1,3}\.){3}\d{1,3}$"
                />
              </div>

              <div className="form-group">
                <label htmlFor="endRange" className="form-label">End Range</label>
                <input
                  type="text"
                  id="endRange"
                  className="form-input"
                  value={newScope.endRange}
                  onChange={(e) => setNewScope({...newScope, endRange: e.target.value})}
                  required
                  placeholder="192.168.1.200"
                  pattern="^(\d{1,3}\.){3}\d{1,3}$"
                />
              </div>

              <div className="form-group">
                <label htmlFor="gateway" className="form-label">Gateway</label>
                <input
                  type="text"
                  id="gateway"
                  className="form-input"
                  value={newScope.gateway}
                  onChange={(e) => setNewScope({...newScope, gateway: e.target.value})}
                  required
                  placeholder="192.168.1.1"
                  pattern="^(\d{1,3}\.){3}\d{1,3}$"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="dnsServers" className="form-label">DNS Servers</label>
              <input
                type="text"
                id="dnsServers"
                className="form-input"
                value={newScope.dnsServers}
                onChange={(e) => setNewScope({...newScope, dnsServers: e.target.value})}
                placeholder="8.8.8.8, 8.8.4.4"
              />
              <small style={{ color: '#7f8c8d' }}>Separate multiple DNS servers with commas</small>
            </div>

            <div className="form-group">
              <label className="form-label">
                <input
                  type="checkbox"
                  checked={newScope.enabled}
                  onChange={(e) => setNewScope({...newScope, enabled: e.target.checked})}
                  style={{ marginRight: '0.5rem' }}
                />
                Enable this scope
              </label>
            </div>

            <div className="action-buttons">
              <button type="submit" className="btn btn-primary">
                Create Scope
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Scopes Overview */}
      <div className="dashboard-grid">
        {scopes.map((scope) => (
          <div key={scope.id} className="card">
            <div className="card-header">
              <h3 className="card-title">{scope.name}</h3>
              <div className={`status-indicator ${scope.enabled ? 'online' : 'offline'}`}>
                <span className="status-dot" aria-hidden="true"></span>
                {scope.enabled ? 'Enabled' : 'Disabled'}
              </div>
            </div>
            <div className="card-content">
              <p style={{ color: '#7f8c8d', marginBottom: '1rem' }}>
                {scope.description}
              </p>
              
              <div style={{ marginBottom: '1rem' }}>
                <p><strong>Network:</strong> <span className="ip-address">{scope.network}/{scope.subnetMask}</span></p>
                <p><strong>Range:</strong> <span className="ip-address">{scope.startRange}</span> - <span className="ip-address">{scope.endRange}</span></p>
                <p><strong>Gateway:</strong> <span className="ip-address">{scope.gateway}</span></p>
                {scope.vlanId && <p><strong>VLAN:</strong> {scope.vlanId}</p>}
                <p><strong>DNS:</strong> {scope.dnsServers.map(dns => <span key={dns} className="ip-address" style={{ marginRight: '0.5rem' }}>{dns}</span>)}</p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <p><strong>Available IPs:</strong> {getAvailableIPs(scope)}</p>
                <p><strong>Reserved IPs:</strong> {scope.reservedIPs.length}</p>
                <p><strong>Exclusions:</strong> {scope.exclusions.length}</p>
              </div>

              <div className="action-buttons">
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    setSelectedScope(scope);
                    setShowDetails(true);
                  }}
                >
                  Details
                </button>
                <button 
                  className={`btn btn-sm ${scope.enabled ? 'btn-warning' : 'btn-success'}`}
                  onClick={() => handleToggleScope(scope.id)}
                >
                  {scope.enabled ? 'Disable' : 'Enable'}
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteScope(scope.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scope Details Modal */}
      {showDetails && selectedScope && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '2rem',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2>{selectedScope.name} - Details</h2>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => setShowDetails(false)}
              >
                Close
              </button>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <h3>Network Configuration</h3>
              <table className="table">
                <tbody>
                  <tr>
                    <td><strong>Network Address:</strong></td>
                    <td><span className="ip-address">{selectedScope.network}</span></td>
                  </tr>
                  <tr>
                    <td><strong>Subnet Mask:</strong></td>
                    <td><span className="ip-address">{selectedScope.subnetMask}</span></td>
                  </tr>
                  <tr>
                    <td><strong>DHCP Range:</strong></td>
                    <td><span className="ip-address">{selectedScope.startRange}</span> - <span className="ip-address">{selectedScope.endRange}</span></td>
                  </tr>
                  <tr>
                    <td><strong>Gateway:</strong></td>
                    <td><span className="ip-address">{selectedScope.gateway}</span></td>
                  </tr>
                  <tr>
                    <td><strong>DNS Servers:</strong></td>
                    <td>{selectedScope.dnsServers.join(', ')}</td>
                  </tr>
                  {selectedScope.vlanId && (
                    <tr>
                      <td><strong>VLAN ID:</strong></td>
                      <td>{selectedScope.vlanId}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {selectedScope.reservedIPs.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <h3>Reserved IP Addresses</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedScope.reservedIPs.map(ip => (
                    <span key={ip} className="ip-address">{ip}</span>
                  ))}
                </div>
              </div>
            )}

            {selectedScope.exclusions.length > 0 && (
              <div>
                <h3>Exclusions</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Start</th>
                      <th>End</th>
                      <th>Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedScope.exclusions.map((exclusion, index) => (
                      <tr key={index}>
                        <td><span className="ip-address">{exclusion.start}</span></td>
                        <td><span className="ip-address">{exclusion.end}</span></td>
                        <td>{exclusion.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkScopes;