import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import pages
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Warehouses from './pages/Warehouses';
import Contracts from './pages/Contracts';
import Contents from './pages/Contents';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="sidebar">
          <div className="logo">
            <h2>JWH Solutions</h2>
          </div>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/clients">Clients</Link></li>
            <li><Link to="/warehouses">Warehouses</Link></li>
            <li><Link to="/contracts">Contracts</Link></li>
            <li><Link to="/contents">Contents</Link></li>
          </ul>
        </nav>

        <main className="main-content">
          <header className="top-bar">
            <h1>Warehouse Management System</h1>
            {/* Add user info, logout, etc. */}
          </header>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/warehouses" element={<Warehouses />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/contents" element={<Contents />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;