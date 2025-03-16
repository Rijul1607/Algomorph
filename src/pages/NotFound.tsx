
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <div className="relative">
          <div className="text-9xl font-bold text-primary/10">404</div>
          <div className="absolute inset-0 flex items-center justify-center text-foreground text-xl font-medium">
            Page not found
          </div>
        </div>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button asChild className="gap-2 hover-lift hover-glow">
          <a href="/">
            <Home className="h-4 w-4" />
            <span>Return Home</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
