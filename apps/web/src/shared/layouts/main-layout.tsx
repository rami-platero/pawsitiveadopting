import React from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "@/shared/components/footer/Footer";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {

  return (
    <>
      <Navbar/>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
