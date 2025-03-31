import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import pages
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Warehouses from "./pages/Warehouses";
import Contracts from "./pages/Contracts";
import Contents from "./pages/Contents";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Manage from "./pages/Manage"; // Import the Manage page

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/warehouses" element={<Warehouses />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/contents" element={<Contents />} />
          <Route path="/settings" element={<Dashboard />} />
          <Route path="/manage" element={<Manage />} /> {/* Add the Manage route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

