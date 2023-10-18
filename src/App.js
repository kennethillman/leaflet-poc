// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Map from './pages/Map';
import Header from './components/shared/Header';


function App() {
  return (
  <Router>
    <div className='sal saluki'>
      <Header />
      <div className='sal-body'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
