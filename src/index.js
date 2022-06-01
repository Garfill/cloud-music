import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './app.scss';

// iconfont
import 'icon'
import { HashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <HashRouter>
      <App />
    </HashRouter>
  </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
