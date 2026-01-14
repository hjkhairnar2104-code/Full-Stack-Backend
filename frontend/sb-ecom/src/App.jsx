import Products from "./Components/products/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/home/Home";
import NavBar from "./Components/shared/NavBar";
import About from "./Components/About";
import Contact from "./Components/Contact";
import { Toaster } from "react-hot-toast";
import React from "react";
import Cart from "./Components/cart/Cart";
import LogIn from "./Components/auth/Login";
import PrivateRoute from "./Components/PrivateRoute";
import Register from "./Components/auth/Register";
import Checkout from "./Components/checkout/Checkout";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart"  element={<Cart />} />
        <Route path="/checkout" element={<Checkout />}/>

        <Route path="/" element={<PrivateRoute />}>
            <Route path="/checkout" element={<Checkout />}/>
        </Route>

        <Route path="/" element={<PrivateRoute publicPage />}>
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />}/>
        </Route>



      </Routes>

      <Toaster position="bottom-center" />
    </Router>
  );
}

export default App;
