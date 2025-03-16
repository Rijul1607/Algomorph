
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import CodeVisualizer from '@/components/CodeVisualizer';
import Header from '@/components/Header';
import { sampleCode } from '@/utils/codeParser';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Initialize theme based on system preference
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <main className="flex-1 overflow-hidden">
          <CodeVisualizer initialCode={sampleCode} />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
