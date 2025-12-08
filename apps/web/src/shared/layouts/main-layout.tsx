import React from "react";
import Navbar from "../components/navbar/navbar";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar/>
      <main>{children}</main>
      <footer></footer>
    </>
  );
};

export default MainLayout;
