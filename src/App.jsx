import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Payment from "./pages/Payment";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminEditProduct from "./pages/AdminEditProduct";
import AdminOrders from "./pages/AdminOrders";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/product/:id" element={<ProductDetails />}/>

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />}/>

        <Route path="/myorders" element={<MyOrders />}/>

        <Route path="/payment" element={<Payment />}/>

        <Route path="/admin" element={<AdminDashboard />}/>

        <Route path="/admin/add-product" element={<AdminAddProduct />}/>

        <Route path="/admin/product/:id/edit" element={<AdminEditProduct />}/> 

        <Route path="/admin/orders" element={<AdminOrders />}/> 
        </Routes>
    </>
  );
}

export default App;