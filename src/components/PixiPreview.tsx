import React, { useEffect, useRef, useState } from 'react';
import { Application, Graphics, Container } from 'pixi.js';
import { useCrosshair } from '../context/CrosshairContext';
import { Monitor } from 'lucide-react';

export const PixiPreview: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);
  const crosshairRef = useRef<Container | null>(null);
  const { config } = useCrosshair();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize PIXI Application
    const app = new Application({
      width: 360,
      height: 280,
      background: { color: 0x0a0a0a },
      renderer: {
        antialias: true,
        resolution: window.devicePixelRatio || 1,
      },
    });

    appRef.current = app;
    canvasRef.current.appendChild(app.view as HTMLCanvasElement);

    // Create crosshair container
    const crosshairContainer = new Container();
    crosshairContainer.x = app.screen.width / 2;
    crosshairContainer.y = app.screen.height / 2;
    crosshairRef.current = crosshairContainer;
    app.stage.addChild(crosshairContainer);

    // Add background grid effect
    const grid = new Graphics();
    for (let i = 0; i <= app.screen.width; i += 20) {
      grid.lineStyle(1, 0x333333, 0.3);
      grid.moveTo(i, 0);
      grid.lineTo(i, app.screen.height);
    }
    for (let i = 0; i <= app.screen.height; i += 20) {
      grid.lineStyle(1, 0x333333, 0.3);
      grid.moveTo(0, i);
      grid.lineTo(app.screen.width, i);
    }
    app.stage.addChildAt(grid, 0);

    // Add center lines
    const centerLines = new Graphics();
    centerLines.lineStyle(1, 0x555555, 0.5);
    centerLines.moveTo(app.screen.width / 2, 0);
    centerLines.lineTo(app.screen.width / 2, app.screen.height);
    centerLines.moveTo(0, app.screen.height / 2);
    centerLines.lineTo(app.screen.width, app.screen.height / 2);
    app.stage.addChildAt(centerLines, 1);

    return () => {
      // Use the local app variable to ensure we're cleaning up the correct instance
      if (app && app.view && app.view.parentNode) {
        app.view.parentNode.removeChild(app.view);
      }
      if (app) {
        app.destroy();
      }
      appRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!crosshairRef.current) return;

    // Clear previous crosshair
    crosshairRef.current.removeChildren();

    const { color, outlineColor, hasOutline, thickness, length, gap, shape, showDot, dotSize, opacity, scale, rotation } = config;

    // Convert hex color to number
    const colorValue = parseInt(color.replace('#', ''), 16);
    const outlineColorValue = hasOutline ? parseInt(outlineColor.replace('#', ''), 16) : 0x000000;

    // Apply transformations
    crosshairRef.current.scale.set(scale);
    crosshairRef.current.rotation = (rotation * Math.PI) / 180;
    crosshairRef.current.alpha = opacity / 100;

    if (shape === 'dot') {
      const dot = new Graphics();
      if (hasOutline) {
        dot.beginFill(outlineColorValue);
        dot.drawCircle(0, 0, thickness + 1);
      }
      dot.beginFill(colorValue);
      dot.drawCircle(0, 0, thickness);
      dot.endFill();
      crosshairRef.current.addChild(dot);
    } else if (shape === 'circle') {
      const circle = new Graphics();
      if (hasOutline) {
        circle.lineStyle(thickness + 2, outlineColorValue, 1);
        circle.drawCircle(0, 0, length);
      }
      circle.lineStyle(thickness, colorValue, 1);
      circle.drawCircle(0, 0, length);
      crosshairRef.current.addChild(circle);
    } else if (shape === 'square') {
      const square = new Graphics();
      if (hasOutline) {
        square.lineStyle(thickness + 2, outlineColorValue, 1);
        square.drawRect(-length, -length, length * 2, length * 2);
      }
      square.lineStyle(thickness, colorValue, 1);
      square.drawRect(-length, -length, length * 2, length * 2);
      crosshairRef.current.addChild(square);
    } else {
      // Cross and Plus shapes
      const cross = new Graphics();
      
      // Horizontal line
      if (hasOutline) {
        cross.beginFill(outlineColorValue);
        cross.drawRect(-length - gap, -thickness/2 - 1, (length - gap) * 2, thickness + 2);
        cross.drawRect(gap, -thickness/2 - 1, (length - gap) * 2, thickness + 2);
      }
      cross.beginFill(colorValue);
      cross.drawRect(-length - gap, -thickness/2, (length - gap) * 2, thickness);
      cross.drawRect(gap, -thickness/2, (length - gap) * 2, thickness);
      
      // Vertical line
      if (hasOutline) {
        cross.beginFill(outlineColorValue);
        cross.drawRect(-thickness/2 - 1, -length - gap, thickness + 2, (length - gap) * 2);
        cross.drawRect(-thickness/2 - 1, gap, thickness + 2, (length - gap) * 2);
      }
      cross.beginFill(colorValue);
      cross.drawRect(-thickness/2, -length - gap, thickness, (length - gap) * 2);
      cross.drawRect(-thickness/2, gap, thickness, (length - gap) * 2);
      
      cross.endFill();
      crosshairRef.current.addChild(cross);
    }

    // Add center dot if enabled
    if (showDot) {
      const dot = new Graphics();
      if (hasOutline) {
        dot.beginFill(outlineColorValue);
        dot.drawCircle(0, 0, dotSize + 1);
      }
      dot.beginFill(colorValue);
      dot.drawCircle(0, 0, dotSize);
      dot.endFill();
      crosshairRef.current.addChild(dot);
    }
  }, [config]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isFullscreen) {
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    if (isFullscreen) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isFullscreen]);

  if (isFullscreen) {
    return (
      <div className="fullscreen-overlay">
        <div 
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) scale(${config.scale}) rotate(${config.rotation}deg)`,
            opacity: config.opacity / 100,
          }}
        >
          <FullscreenCrosshair config={config} />
        </div>
        <div className="fullscreen-info">
          Press ESC to exit fullscreen • F11 to toggle
        </div>
      </div>
    );
  }

  return (
    <div className="preview-container">
      <div className="preview-header">
        <h3 className="preview-title">Live Preview</h3>
        <button onClick={toggleFullscreen} className="fullscreen-btn">
          <Monitor size={14} />
          Fullscreen
        </button>
      </div>
      <div className="preview-canvas" ref={canvasRef} />
      <div style={{ padding: '16px', borderTop: '1px solid #333', fontSize: '12px', color: '#666' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span>Shape:</span>
          <span style={{ color: '#f97316' }}>{config.shape}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span>Color:</span>
          <span style={{ color: config.color }}>{config.color}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Opacity:</span>
          <span style={{ color: '#f97316' }}>{config.opacity}%</span>
        </div>
      </div>
    </div>
  );
};

const FullscreenCrosshair: React.FC<{ config: any }> = ({ config }) => {
  const { color, outlineColor, hasOutline, thickness, length, gap, shape, showDot, dotSize } = config;

  if (shape === 'dot') {
    return (
      <div
        style={{
          width: `${thickness * 2}px`,
          height: `${thickness * 2}px`,
          backgroundColor: color,
          borderRadius: '50%',
          border: hasOutline ? `1px solid ${outlineColor}` : 'none',
        }}
      />
    );
  }

  if (shape === 'circle') {
    return (
      <div
        style={{
          width: `${length * 2}px`,
          height: `${length * 2}px`,
          border: `${thickness}px solid ${color}`,
          borderRadius: '50%',
          boxShadow: hasOutline ? `0 0 0 1px ${outlineColor}` : 'none',
        }}
      />
    );
  }

  // Cross shape for fullscreen
  return (
    <div style={{ position: 'relative' }}>
      {/* Horizontal line */}
      <div
        style={{
          position: 'absolute',
          width: `${(length - gap) * 2}px`,
          height: `${thickness}px`,
          backgroundColor: color,
          left: `${-length + gap}px`,
          top: `${-thickness / 2}px`,
          boxShadow: hasOutline ? `0 0 0 1px ${outlineColor}` : 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: `${(length - gap) * 2}px`,
          height: `${thickness}px`,
          backgroundColor: color,
          left: `${gap}px`,
          top: `${-thickness / 2}px`,
          boxShadow: hasOutline ? `0 0 0 1px ${outlineColor}` : 'none',
        }}
      />
      
      {/* Vertical line */}
      <div
        style={{
          position: 'absolute',
          width: `${thickness}px`,
          height: `${(length - gap) * 2}px`,
          backgroundColor: color,
          left: `${-thickness / 2}px`,
          top: `${-length + gap}px`,
          boxShadow: hasOutline ? `0 0 0 1px ${outlineColor}` : 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: `${thickness}px`,
          height: `${(length - gap) * 2}px`,
          backgroundColor: color,
          left: `${-thickness / 2}px`,
          top: `${gap}px`,
          boxShadow: hasOutline ? `0 0 0 1px ${outlineColor}` : 'none',
        }}
      />
      
      {/* Center dot */}
      {showDot && (
        <div
          style={{
            position: 'absolute',
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            backgroundColor: color,
            borderRadius: '50%',
            left: `${-dotSize / 2}px`,
            top: `${-dotSize / 2}px`,
            boxShadow: hasOutline ? `0 0 0 1px ${outlineColor}` : 'none',
          }}
        />
      )}
    </div>
  );
};