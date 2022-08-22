import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/michroma/400.css';

import Theme from './contexts/Theme';
import Settings from './contexts/Settings';
import Router from './Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Settings>
      <Theme>
        <Router/>
      </Theme>
    </Settings>
  </React.StrictMode>
);
