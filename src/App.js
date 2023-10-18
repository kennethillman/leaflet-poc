// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Map from './pages/Map';

function App() {
  return (
  <Router>
    <div className='poc'>
      <div className='poc-body'>
        <Routes>
          <Route path="/" element={<Map />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
