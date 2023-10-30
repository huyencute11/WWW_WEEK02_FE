import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ResponsiveDrawer from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <ResponsiveDrawer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </ResponsiveDrawer>

      <footer>Our footer</footer>
    </BrowserRouter>
  );
}

export default App;
