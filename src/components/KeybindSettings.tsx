import React, { useState } from 'react';
import { useCrosshair } from '../context/CrosshairContext';
import { Keyboard, Plus, X, Settings, Zap } from 'lucide-react';

export const KeybindSettings: React.FC = () => {
  const { keybinds, updateKeybind } = useCrosshair();
  const [editingKeybind, setEditingKeybind] = useState<string | null>(null);
  const [recordingKey, setRecordingKey] = useState(false);

  const handleKeyCapture = (keybindId: string, event: React.KeyboardEvent) => {
    event.preventDefault();
    
    const keys = [];
    if (event.ctrlKey) keys.push('Ctrl');
    if (event.altKey) keys.push('Alt');
    if (event.shiftKey) keys.push('Shift');
    
    if (event.key !== 'Control' && event.key !== 'Alt' && event.key !== 'Shift') {
      keys.push(event.key.toUpperCase());
    }
    
    if (keys.length > 0) {
      updateKeybind(keybindId, { key: keys.join(' + ') });
      setEditingKeybind(null);
      setRecordingKey(false);
    }
  };

  const startRecording = (keybindId: string) => {
    setEditingKeybind(keybindId);
    setRecordingKey(true);
  };

  const actionOptions = [
    { value: 'toggle', label: 'Toggle Crosshair', icon: '👁️' },
    { value: 'next', label: 'Next Crosshair', icon: '⏭️' },
    { value: 'previous', label: 'Previous Crosshair', icon: '⏮️' },
    { value: 'reset', label: 'Reset Position', icon: '🎯' },
    { value: 'save', label: 'Save Current', icon: '💾' },
    { value: 'load', label: 'Load Saved', icon: '📁' },
  ];

  return (
    <div style={{ maxWidth: '800px' }}>
      <div className="control-panel">
        <div className="panel-header">
          <Settings className="panel-icon" />
          <h3 className="panel-title">Global Keybinds</h3>
        </div>
        
        <div style={{ marginBottom: '20px', padding: '16px', background: 'rgba(249, 115, 22, 0.1)', borderRadius: '8px', border: '1px solid rgba(249, 115, 22, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Zap size={16} className="panel-icon" />
            <span style={{ fontWeight: '600', fontSize: '14px' }}>Pro Tip</span>
          </div>
          <p style={{ fontSize: '13px', color: '#ccc', margin: 0 }}>
            These keybinds work globally, even when you're in-game. Click any keybind button and press your desired key combination.
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {keybinds.map((keybind) => (
            <div key={keybind.id} className="control-panel" style={{ margin: 0, padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '18px' }}>
                      {actionOptions.find(opt => opt.value === keybind.action)?.icon || '⚙️'}
                    </span>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: '#fff' }}>
                      {keybind.name}
                    </h4>
                  </div>
                  <select
                    value={keybind.action}
                    onChange={(e) => updateKeybind(keybind.id, { action: e.target.value })}
                    className="select-input"
                    style={{ fontSize: '13px', padding: '8px 12px' }}
                  >
                    {actionOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.icon} {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    onClick={() => startRecording(keybind.id)}
                    onKeyDown={(e) => handleKeyCapture(keybind.id, e)}
                    className={`btn ${editingKeybind === keybind.id ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ 
                      minWidth: '120px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {editingKeybind === keybind.id ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ 
                          width: '8px', 
                          height: '8px', 
                          background: '#f97316', 
                          borderRadius: '50%',
                          animation: 'pulse 1s infinite'
                        }} />
                        Recording...
                      </span>
                    ) : (
                      <span style={{ fontFamily: 'monospace', fontWeight: '600' }}>
                        {keybind.key}
                      </span>
                    )}
                  </button>
                  
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      checked={keybind.enabled}
                      onChange={(e) => updateKeybind(keybind.id, { enabled: e.target.checked })}
                      className="checkbox"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="control-panel">
        <div className="panel-header">
          <Keyboard className="panel-icon" />
          <h3 className="panel-title">Keybind Guide</h3>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '16px', background: '#1a1a1a', borderRadius: '8px', border: '1px solid #333' }}>
            <h4 style={{ color: '#f97316', fontSize: '14px', fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              👁️ Global Toggle
            </h4>
            <p style={{ fontSize: '13px', color: '#ccc', margin: 0, lineHeight: 1.5 }}>
              Quickly show/hide your crosshair overlay. Useful for screenshots or when you want to use the game's default crosshair.
            </p>
          </div>
          
          <div style={{ padding: '16px', background: '#1a1a1a', borderRadius: '8px', border: '1px solid #333' }}>
            <h4 style={{ color: '#f97316', fontSize: '14px', fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ⏭️ Quick Switch
            </h4>
            <p style={{ fontSize: '13px', color: '#ccc', margin: 0, lineHeight: 1.5 }}>
              Cycle through your saved crosshair presets without leaving the game. Perfect for different weapons or situations.
            </p>
          </div>
          
          <div style={{ padding: '16px', background: '#1a1a1a', borderRadius: '8px', border: '1px solid #333' }}>
            <h4 style={{ color: '#f97316', fontSize: '14px', fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🎯 Reset Position
            </h4>
            <p style={{ fontSize: '13px', color: '#ccc', margin: 0, lineHeight: 1.5 }}>
              Instantly center your crosshair if it gets misaligned. Essential for competitive gaming.
            </p>
          </div>
          
          <div style={{ padding: '16px', background: '#1a1a1a', borderRadius: '8px', border: '1px solid #333' }}>
            <h4 style={{ color: '#f97316', fontSize: '14px', fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ⌨️ Custom Keys
            </h4>
            <p style={{ fontSize: '13px', color: '#ccc', margin: 0, lineHeight: 1.5 }}>
              Support for Ctrl, Alt, Shift modifiers plus any key. Works globally across all applications.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};