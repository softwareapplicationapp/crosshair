import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CrosshairConfig {
  id: string;
  name: string;
  color: string;
  outlineColor: string;
  hasOutline: boolean;
  shape: 'cross' | 'dot' | 'circle' | 'square' | 'plus' | 'custom';
  thickness: number;
  length: number;
  gap: number;
  opacity: number;
  blur: number;
  position: { x: number; y: number };
  scale: number;
  rotation: number;
  showDot: boolean;
  dotSize: number;
  animated: boolean;
  animationSpeed: number;
}

export interface Keybind {
  id: string;
  name: string;
  key: string;
  action: string;
  enabled: boolean;
}

interface CrosshairContextType {
  config: CrosshairConfig;
  updateConfig: (updates: Partial<CrosshairConfig>) => void;
  keybinds: Keybind[];
  updateKeybind: (id: string, updates: Partial<Keybind>) => void;
  savedConfigs: CrosshairConfig[];
  saveConfig: (config: CrosshairConfig) => void;
  loadConfig: (config: CrosshairConfig) => void;
  deleteConfig: (id: string) => void;
}

const CrosshairContext = createContext<CrosshairContextType | undefined>(undefined);

export const useCrosshair = () => {
  const context = useContext(CrosshairContext);
  if (!context) {
    throw new Error('useCrosshair must be used within a CrosshairProvider');
  }
  return context;
};

const defaultConfig: CrosshairConfig = {
  id: 'default',
  name: 'Default Crosshair',
  color: '#00ff00',
  outlineColor: '#000000',
  hasOutline: true,
  shape: 'cross',
  thickness: 2,
  length: 10,
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
};

const defaultKeybinds: Keybind[] = [
  { id: '1', name: 'Toggle Crosshair', key: 'Alt+C', action: 'toggle', enabled: true },
  { id: '2', name: 'Next Crosshair', key: 'Alt+N', action: 'next', enabled: true },
  { id: '3', name: 'Previous Crosshair', key: 'Alt+P', action: 'previous', enabled: true },
  { id: '4', name: 'Reset Position', key: 'Alt+R', action: 'reset', enabled: true },
];

export const CrosshairProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<CrosshairConfig>(defaultConfig);
  const [keybinds, setKeybinds] = useState<Keybind[]>(defaultKeybinds);
  const [savedConfigs, setSavedConfigs] = useState<CrosshairConfig[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('crosshair-configs');
    if (saved) {
      setSavedConfigs(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('crosshair-configs', JSON.stringify(savedConfigs));
  }, [savedConfigs]);

  const updateConfig = (updates: Partial<CrosshairConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const updateKeybind = (id: string, updates: Partial<Keybind>) => {
    setKeybinds(prev => prev.map(kb => kb.id === id ? { ...kb, ...updates } : kb));
  };

  const saveConfig = (configToSave: CrosshairConfig) => {
    setSavedConfigs(prev => {
      const existing = prev.find(c => c.id === configToSave.id);
      if (existing) {
        return prev.map(c => c.id === configToSave.id ? configToSave : c);
      }
      return [...prev, configToSave];
    });
  };

  const loadConfig = (configToLoad: CrosshairConfig) => {
    setConfig(configToLoad);
  };

  const deleteConfig = (id: string) => {
    setSavedConfigs(prev => prev.filter(c => c.id !== id));
  };

  return (
    <CrosshairContext.Provider value={{
      config,
      updateConfig,
      keybinds,
      updateKeybind,
      savedConfigs,
      saveConfig,
      loadConfig,
      deleteConfig,
    }}>
      {children}
    </CrosshairContext.Provider>
  );
};