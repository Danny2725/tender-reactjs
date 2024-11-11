import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/index';
import Contractors from './pages/contractors/index';
import Suppliers from './pages/suppliers/index';
import Register from './pages/register/index';
import Login from './pages/login/index';
import Header from './components/Header/Header';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Header />
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contractors"
              element={
                <ProtectedRoute>
                  <Contractors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/suppliers"
              element={
                <ProtectedRoute>
                  <Suppliers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                  <Register />
              }
            />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
};

export default App;