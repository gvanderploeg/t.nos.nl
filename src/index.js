import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

/*
http://crossorigin.me/http://feeds.nos.nl/nosnieuwsalgemeen
*/

ReactDOM.render(
  <App source="http://crossorigin.me/http://feeds.nos.nl/nosnieuwsalgemeen"/>,
  document.getElementById('root')
);
