import React from 'react';
import { Settings as SettingsIcon, Monitor, Zap, Info, Download, Upload } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div style={{ maxWidth: '800px' }}>
      <div className="control-panel">
        <div className="panel-header">
          <Monitor className="panel-icon" />
          <h3 className="panel-title">Display Settings</h3>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>Always on Top</div>
              <div style={{ fontSize: '13px', color: '#999' }}>Keep crosshair above all windows</div>
            </div>
            <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
              <input type="checkbox" style={{ display: 'none' }} defaultChecked />
              <div style={{
                width: '44px',
                height: '24px',
                background: '#f97316',
                borderRadius: '12px',
                position: 'relative',
                transition: 'background 0.2s ease'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  width: '20px',
                  height: '20px',
                  background: '#fff',
                  borderRadius: '50%',
                  transition: 'transform 0.2s ease'
                }} />
              </div>
            </label>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>Auto-hide in Fullscreen</div>
              <div style={{ fontSize: '13px', color: '#999' }}>Hide crosshair when games go fullscreen</div>
            </div>
            <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
              <input type="checkbox" style={{ display: 'none' }} />
              <div style={{
                width: '44px',
                height: '24px',
                background: '#333',
                borderRadius: '12px',
                position: 'relative',
                transition: 'background 0.2s ease'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '2px',
                  left: '2px',
                  width: '20px',
                  height: '20px',
                  background: '#fff',
                  borderRadius: '50%',
                  transition: 'transform 0.2s ease'
                }} />
              </div>
            </label>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>Start with Windows</div>
              <div style={{ fontSize: '13px', color: '#999' }}>Launch automatically on system startup</div>
            </div>
            <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
              <input type="checkbox" style={{ display: 'none' }} />
              <div style={{
                width: '44px',
                height: '24px',
                background: '#333',
                borderRadius: '12px',
                position: 'relative',
                transition: 'background 0.2s ease'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '2px',
                  left: '2px',
                  width: '20px',
                  height: '20px',
                  background: '#fff',
                  borderRadius: '50%',
                  transition: 'transform 0.2s ease'
                }} />
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="control-panel">
        <div className="panel-header">
          <Zap className="panel-icon" />
          <h3 className="panel-title">Performance</h3>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="control-group">
            <label className="control-label">
              Refresh Rate: 60 FPS
            </label>
            <div className="slider-container">
              <input
                type="range"
                min="30"
                max="144"
                defaultValue="60"
                className="slider"
              />
            </div>
            <div style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
              Higher values use more CPU but provide smoother animations
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>Hardware Acceleration</div>
              <div style={{ fontSize: '13px', color: '#999' }}>Use GPU for better performance</div>
            </div>
            <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
              <input type="checkbox" style={{ display: 'none' }} defaultChecked />
              <div style={{
                width: '44px',
                height: '24px',
                background: '#f97316',
                borderRadius: '12px',
                position: 'relative',
                transition: 'background 0.2s ease'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  width: '20px',
                  height: '20px',
                  background: '#fff',
                  borderRadius: '50%',
                  transition: 'transform 0.2s ease'
                }} />
              </div>
            </label>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>Minimize to System Tray</div>
              <div style={{ fontSize: '13px', color: '#999' }}>Hide in system tray when minimized</div>
            </div>
            <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
              <input type="checkbox" style={{ display: 'none' }} defaultChecked />
              <div style={{
                width: '44px',
                height: '24px',
                background: '#f97316',
                borderRadius: '12px',
                position: 'relative',
                transition: 'background 0.2s ease'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  width: '20px',
                  height: '20px',
                  background: '#fff',
                  borderRadius: '50%',
                  transition: 'transform 0.2s ease'
                }} />
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="control-panel">
        <div className="panel-header">
          <SettingsIcon className="panel-icon" />
          <h3 className="panel-title">Import/Export</h3>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ 
            padding: '16px', 
            background: 'rgba(59, 130, 246, 0.1)', 
            borderRadius: '8px', 
            border: '1px solid rgba(59, 130, 246, 0.2)' 
          }}>
            <h4 style={{ color: '#3b82f6', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
              Backup & Restore
            </h4>
            <p style={{ fontSize: '12px', color: '#ccc', marginBottom: '12px', lineHeight: 1.5 }}>
              Export all your crosshair configurations and settings, or import from a backup file.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-secondary" style={{ flex: 1 }}>
                <Upload size={14} />
                Import
              </button>
              <button className="btn btn-secondary" style={{ flex: 1 }}>
                <Download size={14} />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="control-panel">
        <div className="panel-header">
          <Info className="panel-icon" />
          <h3 className="panel-title">About Crosshair+</h3>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#999' }}>Version:</span>
              <span style={{ color: '#f97316', fontWeight: '600' }}>2.1.0</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#999' }}>Build:</span>
              <span>2024.12.15</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#999' }}>Platform:</span>
              <span>Web / Electron</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#999' }}>Engine:</span>
              <span>PixiJS 7.x</span>
            </div>
          </div>
          
          <div style={{ 
            padding: '16px', 
            background: 'rgba(16, 185, 129, 0.1)', 
            borderRadius: '8px', 
            border: '1px solid rgba(16, 185, 129, 0.2)',
            textAlign: 'center'
          }}>
            <h4 style={{ color: '#10b981', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
              ✅ You're up to date!
            </h4>
            <p style={{ fontSize: '12px', color: '#ccc', marginBottom: '12px' }}>
              All features are working correctly.
            </p>
            <button className="btn btn-primary">
              Check for Updates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};