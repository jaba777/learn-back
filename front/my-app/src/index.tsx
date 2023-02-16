import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import {AuthContextProvider} from './auth/AuthContext';
 
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <AuthContextProvider>
    <Router>
      <App />
    </Router>
  </AuthContextProvider>
  </React.StrictMode>
);

