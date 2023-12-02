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
import InsertEmployee from "./module/Employee/InsertEmployee";
import ListOrder from "./module/Order/ListOrder";
import InsertOrder from "./module/Order/InsertOrder";
import ReportOrderDaily from "./module/Order/Report";
import ListProduct from "./module/Product/ListProduct";
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
          <Route path="/insert-employee" element={<InsertEmployee />} />
          <Route path="/list-employee" element={<ListEmployee />} />
          <Route path="/list-order" element={<ListOrder />} />
          <Route path="/insert-order" element={<InsertOrder />} />
          <Route path="/order/report-daily" element={<ReportOrderDaily />} />
          <Route path="/list-product" element={<ListProduct />} />
        </Routes>
      </ResponsiveDrawer>

      <footer>Our footer</footer>
    </BrowserRouter>
  );
}

export default App;
