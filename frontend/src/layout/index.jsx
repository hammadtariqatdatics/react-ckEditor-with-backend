import React from "react";
import AppBar from "../components/header/AppBar";
import Footer from "../components/footer/Footer";

const index = ({ children }) => {
  return (
    <>
      <AppBar />
      {children}
      <Footer />
    </>
  );
};

export default index;
