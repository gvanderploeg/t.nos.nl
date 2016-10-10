import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

/*
https://crossorigin.me/http://feeds.nos.nl/nosnieuwsalgemeen
nos-rss.xml
*/

ReactDOM.render(
  <App source="https://crossorigin.me/http://feeds.nos.nl/nosnieuwsalgemeen"/>,
  document.getElementById('root')
);
