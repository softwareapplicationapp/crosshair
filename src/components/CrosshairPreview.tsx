import React from 'react';
import { useCrosshair } from '../context/CrosshairContext';

export const CrosshairPreview: React.FC = () => {
  const { config } = useCrosshair();

  const getCrosshairStyle = () => {
    console.log('CrosshairPreview: computing style for', config);
    const baseStyle = {
      position: 'absolute' as const,
      left: `${config.position.x}%`,
      top: `${config.position.y}%`,
      transform: `translate(-50%, -50%) scale(${config.scale}) rotate(${config.rotation}deg)`,
      opacity: config.opacity / 100,
      filter: config.blur > 0 ? `blur(${config.blur}px)` : 'none',
      pointerEvents: 'none' as const,
      transition: config.animated ? 'all 0.3s ease' : 'none',
    };

    return baseStyle;
  };

  const renderCrosshair = () => {
    const { color, outlineColor, hasOutline, thickness, length, gap, shape, showDot, dotSize } = config;
    console.log('CrosshairPreview: render shape', shape);

    if (shape === 'dot') {
      console.log('CrosshairPreview: rendering dot');
      return (
        <div
          className="rounded-full"
          style={{
            width: `${thickness * 2}px`,
            height: `${thickness * 2}px`,
            backgroundColor: color,
            border: hasOutline ? `1px solid ${outlineColor}` : 'none',
          }}
        />
      );
    }

    if (shape === 'circle') {
      console.log('CrosshairPreview: rendering circle');
      return (
        <div
          className="rounded-full border-2"
          style={{
            width: `${length * 2}px`,
            height: `${length * 2}px`,
            borderColor: color,
            borderWidth: `${thickness}px`,
            backgroundColor: 'transparent',
            boxShadow: hasOutline ? `0 0 0 1px ${outlineColor}` : 'none',
          }}
        />
      );
    }

    if (shape === 'square') {
      console.log('CrosshairPreview: rendering square');
      return (
        <div
          className="border-2"
          style={{
            width: `${length * 2}px`,
            height: `${length * 2}px`,
            borderColor: color,
            borderWidth: `${thickness}px`,
            backgroundColor: 'transparent',
            boxShadow: hasOutline ? `0 0 0 1px ${outlineColor}` : 'none',
          }}
        />
      );
    }

    // Cross and Plus shapes
    console.log('CrosshairPreview: rendering cross/plus');
    const lineStyle = {
      position: 'absolute' as const,
      backgroundColor: color,
      boxShadow: hasOutline ? `0 0 0 1px ${outlineColor}` : 'none',
    };

    return (
      <div className="relative">
        {/* Horizontal line */}
        <div
          style={{
            ...lineStyle,
            width: `${length * 2 + gap * 2}px`,
            height: `${thickness}px`,
            left: `${-length - gap}px`,
            top: `${-thickness / 2}px`,
          }}
        />
        {/* Vertical line */}
        <div
          style={{
            ...lineStyle,
            width: `${thickness}px`,
            height: `${length * 2 + gap * 2}px`,
            left: `${-thickness / 2}px`,
            top: `${-length - gap}px`,
          }}
        />
        {/* Gap overlay - horizontal */}
        <div
          style={{
            position: 'absolute',
            width: `${gap * 2}px`,
            height: `${thickness}px`,
            left: `${-gap}px`,
            top: `${-thickness / 2}px`,
            backgroundColor: 'transparent',
          }}
        />
        {/* Gap overlay - vertical */}
        <div
          style={{
            position: 'absolute',
            width: `${thickness}px`,
            height: `${gap * 2}px`,
            left: `${-thickness / 2}px`,
            top: `${-gap}px`,
            backgroundColor: 'transparent',
          }}
        />
        {/* Center dot */}
        {showDot && (
          console.log('CrosshairPreview: rendering center dot'),
          <div
            className="rounded-full"
            style={{
              position: 'absolute',
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              backgroundColor: color,
              left: `${-dotSize / 2}px`,
              top: `${-dotSize / 2}px`,
              boxShadow: hasOutline ? `0 0 0 1px ${outlineColor}` : 'none',
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div style={getCrosshairStyle()}>
      {renderCrosshair()}
    </div>
  );
};