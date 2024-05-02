import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorHandlerWrapper from './ErrorHandler/ErrorHandlerWrapper';
import Home from './pages/Home/Home';
import TimeCarousel from './pages/TimeCarousel/TimeCarousel';

// Manage routing
function App() {
  return (
    <Router>
      <ErrorHandlerWrapper>
        <Routes>
          <Route path='/' default element={<Home />} />
          <Route path='/image/:uuid' default element={<TimeCarousel />} />
        </Routes>
      </ErrorHandlerWrapper>
    </Router>
  );
}

export default App;
