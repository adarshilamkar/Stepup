import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div className="overflow-hidden">
      <Header></Header>
      <Toaster></Toaster>
      <div style={{ minHeight: "85vh" }}>{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
