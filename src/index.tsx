import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/michroma/400.css';

import Theme from './theme';
import Router from './Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Theme>
      <Router/>
    </Theme>
  </React.StrictMode>
);
