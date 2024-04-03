import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Layout from "./components/layouts/Layout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Private from "./components/routes/Private";
import AdminRoute from "./components/routes/AdminRoute";
import Products from "./pages/admin/Products";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/user/ProductDetails";
import CartPage from "./pages/CartPage";
import MyOrders from "./pages/user/MyOrders";
import Featured from "./pages/Featured";
import Deals from "./pages/Deals";
import AllUsers from "./pages/admin/AllUsers";
import ManageCategory from "./pages/admin/ManageCategory";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AllOrders from "./pages/admin/AllOrders";
const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route
          path="/product/:id"
          element={<ProductDetails></ProductDetails>}
        ></Route>
        <Route path="/featured" element={<Featured></Featured>}></Route>
        <Route path="/deals" element={<Deals></Deals>}></Route>
        <Route path="/about-dev" element={<About></About>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="/policy" element={<Policy></Policy>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/user" element={<Private></Private>}>
          <Route path="profile" element={<Profile></Profile>}></Route>
          <Route path="orders" element={<MyOrders></MyOrders>}></Route>
          <Route path="cart" element={<CartPage></CartPage>}></Route>
        </Route>
        <Route path="/admin" element={<AdminRoute></AdminRoute>}>
          <Route
            path="dashboard"
            element={<AdminDashboard></AdminDashboard>}
          ></Route>
          <Route path="products" element={<Products></Products>}></Route>
          <Route path="users" element={<AllUsers></AllUsers>}></Route>
          <Route path="orders" element={<AllOrders></AllOrders>}></Route>
          <Route
            path="categories"
            element={<ManageCategory></ManageCategory>}
          ></Route>
        </Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </Layout>
  );
};

export default App;
