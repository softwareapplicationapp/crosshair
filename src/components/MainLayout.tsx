import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { CrosshairEditor } from './CrosshairEditor';
import { CommunityDesigns } from './CommunityDesigns';
import { KeybindSettings } from './KeybindSettings';
import { ShareCrosshair } from './ShareCrosshair';
import { PositionSettings } from './PositionSettings';
import { Settings } from './Settings';
import { PixiPreview } from './PixiPreview';

type ActiveTab = 'editor' | 'community' | 'keybinds' | 'share' | 'position' | 'settings';

const tabContent = {
  editor: {
    title: 'Build your perfect crosshair',
    subtitle: 'Customize every aspect of your crosshair to match your playstyle',
    component: CrosshairEditor
  },
  community: {
    title: 'Discover designs from the community',
    subtitle: 'Browse and download crosshairs created by other players',
    component: CommunityDesigns
  },
  keybinds: {
    title: 'Create keybinds to match your style',
    subtitle: 'Configure keyboard shortcuts for quick crosshair actions',
    component: KeybindSettings
  },
  share: {
    title: 'Share your crosshair',
    subtitle: 'Export your crosshair configuration to share with others',
    component: ShareCrosshair
  },
  position: {
    title: 'Adjust crosshair position and size',
    subtitle: 'Fine-tune the placement and scaling of your crosshair',
    component: PositionSettings
  },
  settings: {
    title: 'Application settings',
    subtitle: 'Configure general application preferences',
    component: Settings
  }
};

export const MainLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('editor');

  const CurrentComponent = tabContent[activeTab].component;
  const { title, subtitle } = tabContent[activeTab];

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="main-content">
        <div className="content-header fade-in">
          <h1 className="content-title">{title}</h1>
          <p className="content-subtitle">{subtitle}</p>
        </div>
        
        <div className="content-body slide-in">
          <CurrentComponent />
        </div>
      </div>
      
      <PixiPreview />
    </div>
  );
};