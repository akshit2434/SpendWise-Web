// import React from 'react';
// import { createRoot } from 'react-dom/client';

// import App from './App.jsx';

// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);

// root.render(
//   <App />
// );


import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import * as serviceWorkerRegistration from './serviceWorkerRegistration.js';
// import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register the service worker for PWA
serviceWorkerRegistration.register();

// Measure performance in your app, for example: reportWebVitals(console.log)
// reportWebVitals();
