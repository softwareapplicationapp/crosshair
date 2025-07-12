import React, { useState, useEffect } from 'react';
import { MainLayout } from './components/MainLayout';
import { CrosshairProvider } from './context/CrosshairContext';
import './styles/global.css';

function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'F11') {
        e.preventDefault();
        setIsFullscreen(!isFullscreen);
      }
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen]);

  if (isFullscreen) {
    return (
      <CrosshairProvider>
        <div className="fullscreen-overlay">
          <div className="fullscreen-crosshair-container">
            <div className="fullscreen-info">
              Press ESC or F11 to exit fullscreen mode
            </div>
          </div>
        </div>
      </CrosshairProvider>
    );
  }

  return (
    <CrosshairProvider>
      <MainLayout />
    </CrosshairProvider>
  );
}

export default App;