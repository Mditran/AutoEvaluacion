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
          path="/"
          element={isTokenOk ? <Navigate to="/app" /> : <Login />}
        />
        <Route
          path="/app/*"
          element={
            isTokenOk ? (
              <Layout />
            ) : (
              <Navigate to="/" replace state={{ from: '/app' }} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
