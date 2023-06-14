import React, {Suspense} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Login from './components/views/Login'
import Layout from './components/Layout/Layout';


function App() {
  return (
    <Router>
      <Suspense fallback={<p>Cargando...</p>}>
        <Routes>
          <Route exact path='/' name='Login' Component={() => <Login />} />
          <Route exact path='/app' name='Layout' Component={() => <Layout />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
