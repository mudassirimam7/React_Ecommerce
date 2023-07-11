import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "../Routers/PrivateRouting";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Home from "../screens/Home";
import AddProduct from "../screens/AddProduct";
import ProductDetail from "../screens/ProductDetail";
import EditProduct from "../screens/Edit";
import Cart from "../screens/Cart";
import Checkout from "../screens/Checkout";

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} exact />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route exact path="/product/:id" element={<ProductDetail />} />
          <Route exact path="/products/:id/edit" element={<EditProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout  />} />
        </Route>
        <Route path="/register-user" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
