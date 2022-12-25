import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { store } from './services/store/store';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <Provider store={store}>
    <BrowserRouter basename={'/react-burger'}>
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
