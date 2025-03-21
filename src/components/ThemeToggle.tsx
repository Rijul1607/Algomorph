
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Toggle } from '@/components/ui/toggle';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Toggle 
      variant="outline"
      aria-label="Toggle theme"
      className="p-2"
      pressed={theme === 'dark'}
      onPressedChange={toggleTheme}
    >
      {theme === 'dark' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Toggle>
  );
}
