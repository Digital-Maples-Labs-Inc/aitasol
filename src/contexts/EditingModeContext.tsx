/**
 * Editing Mode Context
 * Manages the editing mode state (inline vs backend)
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type EditingMode = 'inline' | 'backend';

interface EditingModeContextType {
  mode: EditingMode;
  setMode: (mode: EditingMode) => void;
  isInlineMode: boolean;
}

const EditingModeContext = createContext<EditingModeContextType | undefined>(undefined);

export const useEditingMode = () => {
  const context = useContext(EditingModeContext);
  if (context === undefined) {
    throw new Error('useEditingMode must be used within an EditingModeProvider');
  }
  return context;
};

interface EditingModeProviderProps {
  children: ReactNode;
}

export const EditingModeProvider: React.FC<EditingModeProviderProps> = ({ children }) => {
  // Initialize mode based on current path
  const getInitialMode = (): EditingMode => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path.startsWith('/admin') ? 'backend' : 'inline';
    }
    return 'inline';
  };

  const [mode, setMode] = useState<EditingMode>(getInitialMode());

  // Update mode when path changes
  React.useEffect(() => {
    const handleLocationChange = () => {
      if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        const newMode = path.startsWith('/admin') ? 'backend' : 'inline';
        if (mode !== newMode) {
          setMode(newMode);
        }
      }
    };

    // Listen for popstate events (browser back/forward)
    window.addEventListener('popstate', handleLocationChange);
    
    // Check on mount
    handleLocationChange();
    
    // Check periodically for programmatic navigation (like window.location.href)
    const interval = setInterval(handleLocationChange, 200);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      clearInterval(interval);
    };
  }, [mode]);

  const value: EditingModeContextType = {
    mode,
    setMode,
    isInlineMode: mode === 'inline',
  };

  return (
    <EditingModeContext.Provider value={value}>
      {children}
    </EditingModeContext.Provider>
  );
};

