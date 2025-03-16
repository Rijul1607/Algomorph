
import React from 'react';
import { Button } from "@/components/ui/button";
import { Code, Github, Moon, Search, Sun } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarTrigger } from "@/components/ui/sidebar";

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode }) => {
  const isMobile = useIsMobile();

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-4 md:px-6 glass-morphism sticky top-0 z-10">
      <div className="flex items-center gap-2">
        {isMobile && <SidebarTrigger />}
        <div className="flex items-center gap-2 animate-fade-in">
          <Code className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-medium">CodeVision</h1>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="hover-lift">
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hover-lift" onClick={toggleTheme}>
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button variant="outline" size="sm" className="gap-2 hidden md:flex hover-lift">
          <Github className="h-4 w-4" />
          <span>Star</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
