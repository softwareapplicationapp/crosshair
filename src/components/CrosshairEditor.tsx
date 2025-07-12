import React from 'react';
import { useCrosshair } from '../context/CrosshairContext';
import { Palette, Eye, Zap, Target, Settings } from 'lucide-react';

export const CrosshairEditor: React.FC = () => {
  const { config, updateConfig } = useCrosshair();

  const colorPresets = [
    '#00ff00', '#ff0000', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
    '#ffffff', '#ffa500', '#ff69b4', '#32cd32', '#8a2be2', '#dc143c'
  ];

  const shapeOptions = [
    { value: 'cross', label: 'Cross' },
    { value: 'plus', label: 'Plus' },
    { value: 'dot', label: 'Dot' },
    { value: 'circle', label: 'Circle' },
    { value: 'square', label: 'Square' },
  ];

  return (
    <div className="grid-2">
      {/* Color & Appearance */}
      <div className="control-panel">
        <div className="panel-header">
          <Palette className="panel-icon" />
          <h3 className="panel-title">Color & Appearance</h3>
        </div>
        
        <div className="control-group">
          <label className="control-label">Primary Color</label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
            <input
              type="color"
              value={config.color}
              onChange={(e) => updateConfig({ color: e.target.value })}
              className="color-input"
            />
            <input
              type="text"
              value={config.color}
              onChange={(e) => updateConfig({ color: e.target.value })}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '13px'
              }}
            />
          </div>
          
          <div className="grid-3" style={{ gap: '8px' }}>
            {colorPresets.map((color) => (
              <button
                key={color}
                onClick={() => updateConfig({ color })}
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: color,
                  border: config.color === color ? '2px solid #f97316' : '2px solid #333',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              />
            ))}
          </div>
        </div>

        <div className="control-group">
          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={config.hasOutline}
              onChange={(e) => updateConfig({ hasOutline: e.target.checked })}
              className="checkbox"
            />
            <label className="control-label" style={{ margin: 0 }}>Enable Outline</label>
          </div>
          {config.hasOutline && (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '12px' }}>
              <input
                type="color"
                value={config.outlineColor}
                onChange={(e) => updateConfig({ outlineColor: e.target.value })}
                className="color-input"
              />
              <input
                type="text"
                value={config.outlineColor}
                onChange={(e) => updateConfig({ outlineColor: e.target.value })}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  background: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '13px'
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Shape & Structure */}
      <div className="control-panel">
        <div className="panel-header">
          <Target className="panel-icon" />
          <h3 className="panel-title">Shape & Structure</h3>
        </div>
        
        <div className="control-group">
          <label className="control-label">Shape</label>
          <select
            value={config.shape}
            onChange={(e) => updateConfig({ shape: e.target.value as any })}
            className="select-input"
          >
            {shapeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">Thickness: {config.thickness}px</label>
          <div className="slider-container">
            <input
              type="range"
              min="1"
              max="10"
              value={config.thickness}
              onChange={(e) => updateConfig({ thickness: parseInt(e.target.value) })}
              className="slider"
            />
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">Length: {config.length}px</label>
          <div className="slider-container">
            <input
              type="range"
              min="1"
              max="50"
              value={config.length}
              onChange={(e) => updateConfig({ length: parseInt(e.target.value) })}
              className="slider"
            />
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">Gap: {config.gap}px</label>
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="20"
              value={config.gap}
              onChange={(e) => updateConfig({ gap: parseInt(e.target.value) })}
              className="slider"
            />
          </div>
        </div>
      </div>

      {/* Visual Effects */}
      <div className="control-panel">
        <div className="panel-header">
          <Eye className="panel-icon" />
          <h3 className="panel-title">Visual Effects</h3>
        </div>
        
        <div className="control-group">
          <label className="control-label">Opacity: {config.opacity}%</label>
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="100"
              value={config.opacity}
              onChange={(e) => updateConfig({ opacity: parseInt(e.target.value) })}
              className="slider"
            />
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">Scale: {config.scale}x</label>
          <div className="slider-container">
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={config.scale}
              onChange={(e) => updateConfig({ scale: parseFloat(e.target.value) })}
              className="slider"
            />
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">Rotation: {config.rotation}°</label>
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="360"
              value={config.rotation}
              onChange={(e) => updateConfig({ rotation: parseInt(e.target.value) })}
              className="slider"
            />
          </div>
        </div>
      </div>

      {/* Advanced Features */}
      <div className="control-panel">
        <div className="panel-header">
          <Zap className="panel-icon" />
          <h3 className="panel-title">Advanced Features</h3>
        </div>
        
        <div className="control-group">
          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={config.showDot}
              onChange={(e) => updateConfig({ showDot: e.target.checked })}
              className="checkbox"
            />
            <label className="control-label" style={{ margin: 0 }}>Center Dot</label>
          </div>
          {config.showDot && (
            <div style={{ marginTop: '12px' }}>
              <label className="control-label">Dot Size: {config.dotSize}px</label>
              <div className="slider-container">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={config.dotSize}
                  onChange={(e) => updateConfig({ dotSize: parseInt(e.target.value) })}
                  className="slider"
                />
              </div>
            </div>
          )}
        </div>

        <div className="control-group">
          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={config.animated}
              onChange={(e) => updateConfig({ animated: e.target.checked })}
              className="checkbox"
            />
            <label className="control-label" style={{ margin: 0 }}>Animated</label>
          </div>
          {config.animated && (
            <div style={{ marginTop: '12px' }}>
              <label className="control-label">Speed: {config.animationSpeed}x</label>
              <div className="slider-container">
                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={config.animationSpeed}
                  onChange={(e) => updateConfig({ animationSpeed: parseFloat(e.target.value) })}
                  className="slider"
                />
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: '24px' }}>
          <button className="btn btn-primary" style={{ width: '100%' }}>
            <Settings size={16} />
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};