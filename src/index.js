import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadFacebookSDK } from './facebook';

// Replace 'your-app-id' with your Facebook App ID and 'vX.X' with the API version
loadFacebookSDK('434287805628862', 'v11.0');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
  // <React.StrictMode>
    
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
