import React from 'react';
import { Target, Users, Keyboard, Share2, Move, Settings, Crosshair } from 'lucide-react';

type ActiveTab = 'editor' | 'community' | 'keybinds' | 'share' | 'position' | 'settings';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { 
      id: 'editor' as const, 
      icon: Crosshair, 
      label: 'Crosshair Editor', 
      description: 'Customize your crosshair' 
    },
    { 
      id: 'community' as const, 
      icon: Users, 
      label: 'Community Designs', 
      description: 'Browse shared crosshairs' 
    },
    { 
      id: 'keybinds' as const, 
      icon: Keyboard, 
      label: 'Keybinds', 
      description: 'Configure shortcuts' 
    },
    { 
      id: 'share' as const, 
      icon: Share2, 
      label: 'Share', 
      description: 'Export your crosshair' 
    },
    { 
      id: 'position' as const, 
      icon: Move, 
      label: 'Position & Size', 
      description: 'Adjust placement' 
    },
    { 
      id: 'settings' as const, 
      icon: Settings, 
      label: 'Settings', 
      description: 'General settings' 
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title">
          <Target size={24} />
          Crosshair+
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            >
              <Icon className="icon" size={20} />
              <div className="nav-text">
                <div className="nav-label">{item.label}</div>
                <div className="nav-description">{item.description}</div>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};