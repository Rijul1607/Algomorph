
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Check initial theme before rendering
const isDark = localStorage.getItem('theme') === 'dark' || 
  (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

if (isDark) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

createRoot(document.getElementById("root")!).render(<App />);
