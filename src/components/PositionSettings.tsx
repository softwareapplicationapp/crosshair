import React, { useState } from 'react';
import { useCrosshair } from '../context/CrosshairContext';
import { Move, RotateCcw, Save, Grid, Target } from 'lucide-react';

export const PositionSettings: React.FC = () => {
  const { config, updateConfig, saveConfig } = useCrosshair();
  const [isDragging, setIsDragging] = useState(false);

  const handlePositionChange = (x: number, y: number) => {
    updateConfig({ position: { x, y } });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    handlePositionChange(Math.max(0, Math.min(100, x)), Math.max(0, Math.min(100, y)));
  };

  const resetPosition = () => {
    updateConfig({ position: { x: 50, y: 50 }, scale: 1, rotation: 0 });
  };

  const savePosition = () => {
    const positionConfig = {
      ...config,
      id: `position_${Date.now()}`,
      name: `Position ${config.position.x.toFixed(0)},${config.position.y.toFixed(0)}`,
    };
    saveConfig(positionConfig);
  };

  const presetPositions = [
    { name: 'Center', x: 50, y: 50, icon: '🎯' },
    { name: 'Top Left', x: 25, y: 25, icon: '↖️' },
    { name: 'Top Right', x: 75, y: 25, icon: '↗️' },
    { name: 'Bottom Left', x: 25, y: 75, icon: '↙️' },
    { name: 'Bottom Right', x: 75, y: 75, icon: '↘️' },
    { name: 'Left Center', x: 25, y: 50, icon: '⬅️' },
    { name: 'Right Center', x: 75, y: 50, icon: '➡️' },
    { name: 'Top Center', x: 50, y: 25, icon: '⬆️' },
    { name: 'Bottom Center', x: 50, y: 75, icon: '⬇️' },
  ];

  return (
    <div className="grid-2">
      <div>
        <div className="control-panel">
          <div className="panel-header">
            <Move className="panel-icon" />
            <h3 className="panel-title">Position Controls</h3>
          </div>
          
          <div className="control-group">
            <label className="control-label">
              Horizontal Position: {config.position.x.toFixed(1)}%
            </label>
            <div className="slider-container">
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={config.position.x}
                onChange={(e) => handlePositionChange(parseFloat(e.target.value), config.position.y)}
                className="slider"
              />
            </div>
          </div>

          <div className="control-group">
            <label className="control-label">
              Vertical Position: {config.position.y.toFixed(1)}%
            </label>
            <div className="slider-container">
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={config.position.y}
                onChange={(e) => handlePositionChange(config.position.x, parseFloat(e.target.value))}
                className="slider"
              />
            </div>
          </div>

          <div className="control-group">
            <label className="control-label">
              Scale: {config.scale.toFixed(1)}x
            </label>
            <div className="slider-container">
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={config.scale}
                onChange={(e) => updateConfig({ scale: parseFloat(e.target.value) })}
                className="slider"
              />
            </div>
          </div>

          <div className="control-group">
            <label className="control-label">
              Rotation: {config.rotation}°
            </label>
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

        <div className="control-panel">
          <div className="panel-header">
            <Grid className="panel-icon" />
            <h3 className="panel-title">Preset Positions</h3>
          </div>
          
          <div className="grid-3">
            {presetPositions.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handlePositionChange(preset.x, preset.y)}
                className="btn btn-secondary"
                style={{ 
                  padding: '12px 8px',
                  fontSize: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span style={{ fontSize: '16px' }}>{preset.icon}</span>
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="control-panel">
          <div className="panel-header">
            <Target className="panel-icon" />
            <h3 className="panel-title">Quick Actions</h3>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={resetPosition}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              <RotateCcw size={16} />
              Reset
            </button>
            <button
              onClick={savePosition}
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              <Save size={16} />
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="control-panel">
        <div className="panel-header">
          <Grid className="panel-icon" />
          <h3 className="panel-title">Interactive Preview</h3>
        </div>
        
        <div 
          style={{
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
            borderRadius: '12px',
            height: '400px',
            position: 'relative',
            overflow: 'hidden',
            cursor: isDragging ? 'grabbing' : 'grab',
            border: '1px solid #333'
          }}
          onMouseMove={handleMouseMove}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          {/* Grid Pattern */}
          <svg 
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1 }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#333" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {/* Center Lines */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '1px',
            background: 'rgba(249, 115, 22, 0.3)',
            transform: 'translateY(-50%)'
          }} />
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'rgba(249, 115, 22, 0.3)',
            transform: 'translateX(-50%)'
          }} />
          
          {/* Crosshair */}
          <div
            style={{
              position: 'absolute',
              left: `${config.position.x}%`,
              top: `${config.position.y}%`,
              transform: `translate(-50%, -50%) scale(${config.scale}) rotate(${config.rotation}deg)`,
              opacity: config.opacity / 100,
              pointerEvents: 'none',
              transition: isDragging ? 'none' : 'all 0.2s ease',
            }}
          >
            {config.shape === 'cross' && (
              <div style={{ position: 'relative' }}>
                {/* Horizontal line */}
                <div
                  style={{
                    position: 'absolute',
                    backgroundColor: config.color,
                    width: `${config.length * 2}px`,
                    height: `${config.thickness}px`,
                    left: `${-config.length}px`,
                    top: `${-config.thickness / 2}px`,
                    boxShadow: config.hasOutline ? `0 0 0 1px ${config.outlineColor}` : 'none',
                  }}
                />
                {/* Vertical line */}
                <div
                  style={{
                    position: 'absolute',
                    backgroundColor: config.color,
                    width: `${config.thickness}px`,
                    height: `${config.length * 2}px`,
                    left: `${-config.thickness / 2}px`,
                    top: `${-config.length}px`,
                    boxShadow: config.hasOutline ? `0 0 0 1px ${config.outlineColor}` : 'none',
                  }}
                />
                {config.showDot && (
                  <div
                    style={{
                      position: 'absolute',
                      width: `${config.dotSize}px`,
                      height: `${config.dotSize}px`,
                      backgroundColor: config.color,
                      borderRadius: '50%',
                      left: `${-config.dotSize / 2}px`,
                      top: `${-config.dotSize / 2}px`,
                      boxShadow: config.hasOutline ? `0 0 0 1px ${config.outlineColor}` : 'none',
                    }}
                  />
                )}
              </div>
            )}
          </div>
          
          {/* Drag Hint */}
          {!isDragging && (
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              padding: '8px 12px',
              background: 'rgba(0, 0, 0, 0.8)',
              borderRadius: '6px',
              fontSize: '12px',
              color: '#999',
              border: '1px solid #333'
            }}>
              Click and drag to position
            </div>
          )}
        </div>
        
        <div style={{ 
          marginTop: '20px', 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '12px', 
          fontSize: '13px' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#999' }}>Position:</span>
            <span style={{ color: '#f97316', fontFamily: 'monospace' }}>
              {config.position.x.toFixed(1)}%, {config.position.y.toFixed(1)}%
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#999' }}>Scale:</span>
            <span style={{ color: '#f97316', fontWeight: '600' }}>{config.scale.toFixed(1)}x</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#999' }}>Rotation:</span>
            <span style={{ color: '#f97316', fontWeight: '600' }}>{config.rotation}°</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#999' }}>Opacity:</span>
            <span style={{ color: '#f97316', fontWeight: '600' }}>{config.opacity}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};