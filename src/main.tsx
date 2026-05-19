import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"; // 1. Added this import (fixed for React)
import {ThemeProvider} from './context/ThemeContext';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Analytics />
        <SpeedInsights />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
