import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/views/Login';
import Layout from './components/Layout/Layout';

function App() {
  const [isTokenOk, setIsTokenOk] = useState(true);

  const init = () => {
    if (localStorage.getItem('auth')) {
      setIsTokenOk(true);
    } else {
      setIsTokenOk(false);
    }
  };

  useEffect(init, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={localStorage.getItem('auth') ? <Navigate to="/app" /> : <Login />}
        />
        <Route
          path="/app/*"
          element={
            localStorage.getItem('auth') ? (
              <Layout />
            ) : (
              <Navigate to="/login" replace state={{ from: '/app' }} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
