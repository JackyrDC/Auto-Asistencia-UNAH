import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
console.log(import.meta.env.VITE_USERS_API_URL);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);