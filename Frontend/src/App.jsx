import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard";

function App (){
   const token = localStorage.getItem("token");
  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/signup" element={token ? <Navigate to="/dashboard" /> : <Signup />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App;