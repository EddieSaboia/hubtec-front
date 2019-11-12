import React from 'react';
import './App.css';

import Routes from './routes';
import withStoreProvider from './redux/withStoreProvider';

function App() {
  return (
       <div className="container">
        <div className="content">
          <Routes />
        </div>
       </div>
  );
}

export default withStoreProvider(App);
