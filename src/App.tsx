// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/index';
import Contractors from './pages/contractors/index';
import Suppliers from './pages/suppliers/index';
import Login from './pages/login/index';
import Header from './components/Header/Header';


const App = () => {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contractors" element={<Contractors />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
