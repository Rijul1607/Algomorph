
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'

// Add class to html element to support dark mode
// Check for user preference or stored theme
const getInitialTheme = (): 'light' | 'dark' => {
  // Check for stored theme preference
  const storedTheme = localStorage.getItem('theme') as 'light' | 'dark';
  if (storedTheme) {
    return storedTheme;
  }
  
  // Check for user preference
  const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return userPrefersDark ? 'dark' : 'light';
};

// Apply theme class to html element
document.documentElement.classList.add(getInitialTheme());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="top-right" closeButton />
    </BrowserRouter>
  </React.StrictMode>,
)
