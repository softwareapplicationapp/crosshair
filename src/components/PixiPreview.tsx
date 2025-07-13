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

  const drawCrosshair = (container: Container, cfg: typeof config) => {
    container.removeChildren();
    console.log('PixiPreview draw: applying config', cfg);

    const { color, outlineColor, hasOutline, thickness, length, gap, shape, showDot, dotSize, opacity, scale, rotation } = cfg;

    const colorValue = parseInt(color.replace('#', ''), 16);
    const outlineColorValue = hasOutline ? parseInt(outlineColor.replace('#', ''), 16) : 0x000000;

    container.scale.set(scale);
    container.rotation = (rotation * Math.PI) / 180;
    container.alpha = opacity / 100;

    if (shape === 'dot') {
      console.log('PixiPreview draw: shape dot');
      const dot = new Graphics();
      if (hasOutline) {
        dot.beginFill(outlineColorValue);
        dot.drawCircle(0, 0, thickness + 1);
      }
      dot.beginFill(colorValue);
      dot.drawCircle(0, 0, thickness);
      dot.endFill();
      container.addChild(dot);
    } else if (shape === 'circle') {
      console.log('PixiPreview draw: shape circle');
      const circle = new Graphics();
      if (hasOutline) {
        circle.lineStyle(thickness + 2, outlineColorValue, 1);
        circle.drawCircle(0, 0, length);
      }
      circle.lineStyle(thickness, colorValue, 1);
      circle.drawCircle(0, 0, length);
      container.addChild(circle);
    } else if (shape === 'square') {
      console.log('PixiPreview draw: shape square');
      const square = new Graphics();
      if (hasOutline) {
        square.lineStyle(thickness + 2, outlineColorValue, 1);
        square.drawRect(-length, -length, length * 2, length * 2);
      }
      square.lineStyle(thickness, colorValue, 1);
      square.drawRect(-length, -length, length * 2, length * 2);
      container.addChild(square);
    } else {
      console.log('PixiPreview draw: shape cross/plus');
      const cross = new Graphics();
      if (hasOutline) {
        cross.beginFill(outlineColorValue);
        cross.drawRect(-length - gap, -thickness / 2 - 1, (length - gap) * 2, thickness + 2);
        cross.drawRect(gap, -thickness / 2 - 1, (length - gap) * 2, thickness + 2);
      }
      cross.beginFill(colorValue);
      cross.drawRect(-length - gap, -thickness / 2, (length - gap) * 2, thickness);
      cross.drawRect(gap, -thickness / 2, (length - gap) * 2, thickness);
      if (hasOutline) {
        cross.beginFill(outlineColorValue);
        cross.drawRect(-thickness / 2 - 1, -length - gap, thickness + 2, (length - gap) * 2);
        cross.drawRect(-thickness / 2 - 1, gap, thickness + 2, (length - gap) * 2);
      }
      cross.beginFill(colorValue);
      cross.drawRect(-thickness / 2, -length - gap, thickness, (length - gap) * 2);
      cross.drawRect(-thickness / 2, gap, thickness, (length - gap) * 2);
      cross.endFill();
      container.addChild(cross);
    }

    if (showDot) {
      console.log('PixiPreview draw: adding center dot');
      const dot = new Graphics();
      if (hasOutline) {
        dot.beginFill(outlineColorValue);
        dot.drawCircle(0, 0, dotSize + 1);
      }
      dot.beginFill(colorValue);
      dot.drawCircle(0, 0, dotSize);
      dot.endFill();
      container.addChild(dot);
    }

    console.log('PixiPreview draw: container now has', container.children.length, 'children');
  };

  useEffect(() => {
    if (!canvasRef.current) {
      console.log('PixiPreview: canvasRef not ready');
      return;
    }
    console.log('PixiPreview: initializing');

    let isMounted = true;
    let app: Application | null = null;
    let appended: HTMLCanvasElement | null = null;

    const init = async () => {
      console.log('PixiPreview init: start');
      let instance: Application;
      const options = {
        width: 360,
        height: 280,
        backgroundColor: 0x0a0a0a,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
      };
      console.log('PixiPreview init options', options);
      if (typeof (Application as any).create === 'function') {
        console.log('PixiPreview init: using Application.create');
        instance = await (Application as any).create(options);
      } else {
        console.log('PixiPreview init: using new Application + init');
        instance = new Application();
        await (instance as any).init(options);
      }

      if (!isMounted) {
        console.log('PixiPreview init: aborted, component unmounted');
        instance.destroy();
        return;
      }

      app = instance;
      appRef.current = instance;
      const element = (instance as any).canvas ?? (instance as any).view;
      if (element) {
        appended = element as HTMLCanvasElement;
        appended.style.display = 'block';
        appended.style.margin = '0 auto';
        appended.style.width = `${options.width}px`;
        appended.style.height = `${options.height}px`;
        canvasRef.current!.appendChild(appended);
        console.log('PixiPreview init: appended element', appended);
        console.log('PixiPreview init: canvas size', appended.width, appended.height);
      }

      // Create crosshair container
      const crosshairContainer = new Container();
      crosshairContainer.x = instance.screen.width / 2;
      crosshairContainer.y = instance.screen.height / 2;
      console.log('PixiPreview init: screen size', instance.screen.width, instance.screen.height);
      crosshairRef.current = crosshairContainer;
      instance.stage.addChild(crosshairContainer);
      console.log('PixiPreview init: crosshair container created', crosshairContainer);

      // Initial draw
      drawCrosshair(crosshairContainer, config);

      // Add background grid effect
      const grid = new Graphics();
      for (let i = 0; i <= instance.screen.width; i += 20) {
        grid.lineStyle(1, 0x333333, 0.3);
        grid.moveTo(i, 0);
        grid.lineTo(i, instance.screen.height);
      }
      for (let i = 0; i <= instance.screen.height; i += 20) {
        grid.lineStyle(1, 0x333333, 0.3);
        grid.moveTo(0, i);
        grid.lineTo(instance.screen.width, i);
      }
      instance.stage.addChildAt(grid, 0);

      // Add center lines
      const centerLines = new Graphics();
      centerLines.lineStyle(1, 0x555555, 0.5);
      centerLines.moveTo(instance.screen.width / 2, 0);
      centerLines.lineTo(instance.screen.width / 2, instance.screen.height);
      centerLines.moveTo(0, instance.screen.height / 2);
      centerLines.lineTo(instance.screen.width, instance.screen.height / 2);
      instance.stage.addChildAt(centerLines, 1);
      console.log('PixiPreview init: grid and center lines added');

    };

    init();

    return () => {
      isMounted = false;
      console.log('PixiPreview cleanup');
      if (app) {
        if (appended && appended.parentNode) {
          appended.parentNode.removeChild(appended);
          console.log('PixiPreview cleanup: element removed');
        }
        app.destroy();
        console.log('PixiPreview cleanup: application destroyed');
      }
      appRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!crosshairRef.current) {
      console.log('PixiPreview draw: crosshairRef not ready');
      return;
    }
    drawCrosshair(crosshairRef.current, config);
  }, [config]);

  const toggleFullscreen = () => {
    const newState = !isFullscreen;
    console.log('PixiPreview: toggle fullscreen ->', newState);
    setIsFullscreen(newState);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isFullscreen) {
      console.log('PixiPreview: escape pressed, exiting fullscreen');
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    if (isFullscreen) {
      console.log('PixiPreview: entering fullscreen');
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
    console.log('PixiPreview: exiting fullscreen');
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
