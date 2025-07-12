import React from 'react';
import { useCrosshair } from '../context/CrosshairContext';
import { Download, Eye, Star, Users, TrendingUp, Clock } from 'lucide-react';

export const CommunityDesigns: React.FC = () => {
  const { updateConfig } = useCrosshair();

  const communityDesigns = [
    {
      id: 'cs-classic',
      name: 'CS Classic',
      author: 'ProPlayer',
      downloads: 1250,
      rating: 4.8,
      trending: true,
      tags: ['competitive', 'fps', 'classic'],
      config: {
        id: 'cs-classic',
        name: 'CS Classic',
        color: '#00ff00',
        outlineColor: '#000000',
        hasOutline: true,
        shape: 'cross' as const,
        thickness: 2,
        length: 12,
        gap: 3,
        opacity: 100,
        blur: 0,
        position: { x: 50, y: 50 },
        scale: 1,
        rotation: 0,
        showDot: true,
        dotSize: 2,
        animated: false,
        animationSpeed: 1,
      }
    },
    {
      id: 'valorant-red',
      name: 'Valorant Red',
      author: 'RadiantAce',
      downloads: 890,
      rating: 4.6,
      trending: false,
      tags: ['valorant', 'red', 'tactical'],
      config: {
        id: 'valorant-red',
        name: 'Valorant Red',
        color: '#ff0000',
        outlineColor: '#000000',
        hasOutline: true,
        shape: 'cross' as const,
        thickness: 3,
        length: 8,
        gap: 2,
        opacity: 90,
        blur: 0,
        position: { x: 50, y: 50 },
        scale: 1,
        rotation: 0,
        showDot: false,
        dotSize: 2,
        animated: false,
        animationSpeed: 1,
      }
    },
    {
      id: 'apex-dot',
      name: 'Apex Dot',
      author: 'PredatorMain',
      downloads: 2100,
      rating: 4.9,
      trending: true,
      tags: ['apex', 'minimalist', 'dot'],
      config: {
        id: 'apex-dot',
        name: 'Apex Dot',
        color: '#ffffff',
        outlineColor: '#000000',
        hasOutline: true,
        shape: 'dot' as const,
        thickness: 4,
        length: 8,
        gap: 2,
        opacity: 100,
        blur: 0,
        position: { x: 50, y: 50 },
        scale: 1,
        rotation: 0,
        showDot: false,
        dotSize: 2,
        animated: false,
        animationSpeed: 1,
      }
    },
    {
      id: 'rainbow-animated',
      name: 'Rainbow Pulse',
      author: 'AestheticGamer',
      downloads: 567,
      rating: 4.2,
      trending: false,
      tags: ['animated', 'colorful', 'pulse'],
      config: {
        id: 'rainbow-animated',
        name: 'Rainbow Pulse',
        color: '#ff00ff',
        outlineColor: '#000000',
        hasOutline: true,
        shape: 'plus' as const,
        thickness: 2,
        length: 10,
        gap: 4,
        opacity: 80,
        blur: 0,
        position: { x: 50, y: 50 },
        scale: 1,
        rotation: 0,
        showDot: true,
        dotSize: 3,
        animated: true,
        animationSpeed: 2,
      }
    },
    {
      id: 'minimal-circle',
      name: 'Minimal Circle',
      author: 'MinimalDesign',
      downloads: 1800,
      rating: 4.7,
      trending: true,
      tags: ['minimal', 'circle', 'clean'],
      config: {
        id: 'minimal-circle',
        name: 'Minimal Circle',
        color: '#00ffff',
        outlineColor: '#000000',
        hasOutline: false,
        shape: 'circle' as const,
        thickness: 1,
        length: 15,
        gap: 0,
        opacity: 70,
        blur: 0,
        position: { x: 50, y: 50 },
        scale: 1,
        rotation: 0,
        showDot: false,
        dotSize: 2,
        animated: false,
        animationSpeed: 1,
      }
    },
    {
      id: 'tactical-square',
      name: 'Tactical Square',
      author: 'TacticalShooter',
      downloads: 923,
      rating: 4.5,
      trending: false,
      tags: ['tactical', 'square', 'military'],
      config: {
        id: 'tactical-square',
        name: 'Tactical Square',
        color: '#ffa500',
        outlineColor: '#000000',
        hasOutline: true,
        shape: 'square' as const,
        thickness: 2,
        length: 12,
        gap: 0,
        opacity: 85,
        blur: 0,
        position: { x: 50, y: 50 },
        scale: 1,
        rotation: 45,
        showDot: true,
        dotSize: 1,
        animated: false,
        animationSpeed: 1,
      }
    }
  ];

  const applyDesign = (design: typeof communityDesigns[0]) => {
    updateConfig(design.config);
  };

  const renderCrosshairPreview = (config: typeof communityDesigns[0]['config']) => {
    const { color, shape, thickness, length, showDot, dotSize, hasOutline, outlineColor } = config;
    
    const style = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '48px',
      height: '48px',
      position: 'relative' as const,
    };

    if (shape === 'dot') {
      return (
        <div style={style}>
          <div
            style={{
              width: `${Math.max(thickness * 2, 8)}px`,
              height: `${Math.max(thickness * 2, 8)}px`,
              backgroundColor: color,
              borderRadius: '50%',
              border: hasOutline ? `1px solid ${outlineColor}` : 'none',
            }}
          />
        </div>
      );
    }

    if (shape === 'circle') {
      return (
        <div style={style}>
          <div
            style={{
              width: `${Math.max(length, 16)}px`,
              height: `${Math.max(length, 16)}px`,
              border: `${Math.max(thickness, 2)}px solid ${color}`,
              borderRadius: '50%',
              backgroundColor: 'transparent',
              boxShadow: hasOutline ? `0 0 0 1px ${outlineColor}` : 'none',
            }}
          />
        </div>
      );
    }

    if (shape === 'square') {
      return (
        <div style={style}>
          <div
            style={{
              width: `${Math.max(length, 16)}px`,
              height: `${Math.max(length, 16)}px`,
              border: `${Math.max(thickness, 2)}px solid ${color}`,
              backgroundColor: 'transparent',
              transform: config.rotation ? `rotate(${config.rotation}deg)` : 'none',
              boxShadow: hasOutline ? `0 0 0 1px ${outlineColor}` : 'none',
            }}
          />
        </div>
      );
    }

    // Cross and Plus shapes
    return (
      <div style={style}>
        <div style={{ position: 'relative' }}>
          {/* Horizontal line */}
          <div
            style={{
              position: 'absolute',
              backgroundColor: color,
              width: `${Math.max(length, 12)}px`,
              height: `${Math.max(thickness, 2)}px`,
              left: `${-Math.max(length, 12)/2}px`,
              top: `${-Math.max(thickness, 2)/2}px`,
              boxShadow: hasOutline ? `0 0 0 1px ${outlineColor}` : 'none',
            }}
          />
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              backgroundColor: color,
              width: `${Math.max(thickness, 2)}px`,
              height: `${Math.max(length, 12)}px`,
              left: `${-Math.max(thickness, 2)/2}px`,
              top: `${-Math.max(length, 12)/2}px`,
              boxShadow: hasOutline ? `0 0 0 1px ${outlineColor}` : 'none',
            }}
          />
          {/* Center dot */}
          {showDot && (
            <div
              style={{
                position: 'absolute',
                width: `${Math.max(dotSize, 2)}px`,
                height: `${Math.max(dotSize, 2)}px`,
                backgroundColor: color,
                borderRadius: '50%',
                left: `${-Math.max(dotSize, 2)/2}px`,
                top: `${-Math.max(dotSize, 2)/2}px`,
                boxShadow: hasOutline ? `0 0 0 1px ${outlineColor}` : 'none',
              }}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
      {communityDesigns.map((design) => (
        <div key={design.id} className="community-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {design.name}
                {design.trending && (
                  <span style={{ 
                    background: 'linear-gradient(45deg, #f97316, #fbbf24)', 
                    color: '#000', 
                    fontSize: '10px', 
                    padding: '2px 6px', 
                    borderRadius: '4px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px'
                  }}>
                    <TrendingUp size={10} />
                    HOT
                  </span>
                )}
              </h3>
              <p style={{ fontSize: '13px', color: '#999' }}>by {design.author}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24' }}>
              <Star size={14} fill="currentColor" />
              <span style={{ fontSize: '14px', fontWeight: '600' }}>{design.rating}</span>
            </div>
          </div>
          
          <div style={{ 
            background: '#0a0a0a', 
            borderRadius: '8px', 
            padding: '20px', 
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80px',
            border: '1px solid #333'
          }}>
            {renderCrosshairPreview(design.config)}
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
            {design.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: 'rgba(249, 115, 22, 0.1)',
                  color: '#f97316',
                  fontSize: '11px',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  border: '1px solid rgba(249, 115, 22, 0.2)'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', fontSize: '12px', color: '#666' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Download size={12} />
              <span>{design.downloads.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} />
              <span>Updated recently</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => applyDesign(design)}
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              <Download size={14} />
              Apply
            </button>
            <button
              className="btn btn-secondary"
              style={{ padding: '12px' }}
            >
              <Eye size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};