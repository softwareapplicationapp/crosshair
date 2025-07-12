import React, { useState } from 'react';
import { useCrosshair } from '../context/CrosshairContext';
import { Share2, Copy, Download, Code, Eye, Upload, Globe } from 'lucide-react';

export const ShareCrosshair: React.FC = () => {
  const { config } = useCrosshair();
  const [shareMethod, setShareMethod] = useState<'workshop' | 'code' | 'export'>('workshop');
  const [copied, setCopied] = useState(false);

  const generateShareCode = () => {
    const encoded = btoa(JSON.stringify(config));
    return `CROSSHAIR_${encoded}`;
  };

  const generateConfigCode = () => {
    return JSON.stringify(config, null, 2);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${config.name.replace(/\s+/g, '_')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const shareOptions = [
    {
      id: 'workshop',
      title: 'Share Workshop',
      description: 'Upload to community workshop',
      icon: Upload,
      color: '#f97316'
    },
    {
      id: 'code',
      title: 'Share Code',
      description: 'Generate shareable code',
      icon: Code,
      color: '#10b981'
    },
    {
      id: 'export',
      title: 'Export File',
      description: 'Download as JSON file',
      icon: Download,
      color: '#3b82f6'
    }
  ];

  return (
    <div className="grid-2">
      <div>
        <div className="control-panel">
          <div className="panel-header">
            <Share2 className="panel-icon" />
            <h3 className="panel-title">Choose Share Method</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {shareOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setShareMethod(option.id as any)}
                  className={`community-card ${shareMethod === option.id ? 'active' : ''}`}
                  style={{
                    padding: '20px',
                    border: shareMethod === option.id ? '2px solid #f97316' : '1px solid #333',
                    background: shareMethod === option.id ? 'rgba(249, 115, 22, 0.1)' : 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div 
                      style={{ 
                        width: '48px', 
                        height: '48px', 
                        background: `linear-gradient(45deg, ${option.color}, ${option.color}aa)`,
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <IconComponent size={24} color="#fff" />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 4px 0', color: '#fff' }}>
                        {option.title}
                      </h4>
                      <p style={{ fontSize: '13px', color: '#999', margin: 0 }}>
                        {option.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {shareMethod === 'workshop' && (
          <div className="control-panel">
            <div className="panel-header">
              <Globe className="panel-icon" />
              <h3 className="panel-title">Upload to Workshop</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="control-group">
                <label className="control-label">Crosshair Name</label>
                <input
                  type="text"
                  defaultValue={config.name}
                  className="select-input"
                  placeholder="My Awesome Crosshair"
                />
              </div>
              
              <div className="control-group">
                <label className="control-label">Description</label>
                <textarea
                  className="select-input"
                  style={{ height: '80px', resize: 'vertical' }}
                  placeholder="Describe your crosshair design, what games it's good for, etc..."
                />
              </div>
              
              <div className="control-group">
                <label className="control-label">Tags</label>
                <input
                  type="text"
                  className="select-input"
                  placeholder="fps, competitive, bright, red"
                />
              </div>
              
              <button className="btn btn-primary" style={{ width: '100%' }}>
                <Upload size={16} />
                Upload to Workshop
              </button>
            </div>
          </div>
        )}

        {shareMethod === 'code' && (
          <div className="control-panel">
            <div className="panel-header">
              <Code className="panel-icon" />
              <h3 className="panel-title">Share Code</h3>
            </div>
            
            <div className="control-group">
              <label className="control-label">Crosshair Code</label>
              <div style={{ position: 'relative' }}>
                <textarea
                  readOnly
                  value={generateShareCode()}
                  className="select-input"
                  style={{ 
                    height: '100px', 
                    fontFamily: 'monospace', 
                    fontSize: '12px',
                    paddingRight: '50px'
                  }}
                />
                <button
                  onClick={() => handleCopy(generateShareCode())}
                  className="btn btn-secondary"
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    padding: '8px',
                    minWidth: 'auto'
                  }}
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
            
            <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <p style={{ fontSize: '13px', color: '#10b981', margin: '0 0 8px 0', fontWeight: '600' }}>
                How to use:
              </p>
              <p style={{ fontSize: '12px', color: '#ccc', margin: 0, lineHeight: 1.5 }}>
                Share this code with others. They can import it using the "Import Code" feature in the community section.
              </p>
            </div>
            
            {copied && (
              <div style={{ 
                padding: '12px', 
                background: 'rgba(16, 185, 129, 0.2)', 
                borderRadius: '8px', 
                color: '#10b981',
                fontSize: '14px',
                fontWeight: '600',
                textAlign: 'center'
              }}>
                ✅ Copied to clipboard!
              </div>
            )}
          </div>
        )}

        {shareMethod === 'export' && (
          <div className="control-panel">
            <div className="panel-header">
              <Download className="panel-icon" />
              <h3 className="panel-title">Export Configuration</h3>
            </div>
            
            <div className="control-group">
              <label className="control-label">Configuration JSON</label>
              <div style={{ position: 'relative' }}>
                <textarea
                  readOnly
                  value={generateConfigCode()}
                  className="select-input"
                  style={{ 
                    height: '200px', 
                    fontFamily: 'monospace', 
                    fontSize: '11px',
                    paddingRight: '50px'
                  }}
                />
                <button
                  onClick={() => handleCopy(generateConfigCode())}
                  className="btn btn-secondary"
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    padding: '8px',
                    minWidth: 'auto'
                  }}
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
            
            <button
              onClick={handleExport}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              <Download size={16} />
              Download JSON File
            </button>
          </div>
        )}
      </div>

      <div className="control-panel">
        <div className="panel-header">
          <Eye className="panel-icon" />
          <h3 className="panel-title">Crosshair Preview</h3>
        </div>
        
        <div style={{ 
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)', 
          borderRadius: '12px', 
          padding: '32px', 
          textAlign: 'center',
          border: '1px solid #333',
          marginBottom: '20px'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#f97316', marginBottom: '8px' }}>
              {config.name}
            </h4>
            <p style={{ color: '#999', fontSize: '14px', margin: 0 }}>
              Your crosshair configuration
            </p>
          </div>
          
          <div style={{ 
            background: '#0a0a0a', 
            borderRadius: '8px', 
            padding: '20px', 
            display: 'inline-block',
            border: '1px solid #333'
          }}>
            <Eye className="panel-icon" style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '12px', color: '#ccc' }}>Live Preview</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#999' }}>Shape:</span>
            <span style={{ color: '#fff', fontWeight: '600', textTransform: 'capitalize' }}>{config.shape}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#999' }}>Color:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div 
                style={{ 
                  width: '16px', 
                  height: '16px', 
                  backgroundColor: config.color,
                  borderRadius: '4px',
                  border: '1px solid #333'
                }} 
              />
              <span style={{ color: '#fff', fontFamily: 'monospace' }}>{config.color}</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#999' }}>Size:</span>
            <span style={{ color: '#fff', fontWeight: '600' }}>{config.length}px</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#999' }}>Opacity:</span>
            <span style={{ color: '#f97316', fontWeight: '600' }}>{config.opacity}%</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#999' }}>Outline:</span>
            <span style={{ color: config.hasOutline ? '#10b981' : '#ef4444', fontWeight: '600' }}>
              {config.hasOutline ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};