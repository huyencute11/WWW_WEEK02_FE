import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
// import L
import ResponsiveDrawer from "./components/Sidebar";
import ListCustomer from "./module/Customer/ListCustomer";
import InsertCustomer from "./module/Customer/InsertCustomer";
import ListEmployee from "./module/Employee/ListEmployee";

function App() {
  return (
    <BrowserRouter>
      <ResponsiveDrawer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/list-customer" element={<ListCustomer />} />
          <Route path="/insert-customer" element={<InsertCustomer />} />
          <Route path="/list-employee" element={<ListEmployee />} />
        </Routes>
      </ResponsiveDrawer>

      <footer>Our footer</footer>
    </BrowserRouter>
  );
}

export default App;
