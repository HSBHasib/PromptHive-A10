import Footer from "@/components/homePage/footer/Footer";
import Navbar from "@/components/homePage/navbar/Navbar";
import React from "react";

const PromptDetailsLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PromptDetailsLayout;
