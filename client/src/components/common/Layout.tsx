import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContactBar from "@/components/layout/FloatingContactBar";
import Seo from "@/components/common/Seo";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Seo 
        title="Devine Senior Living | Premium Care For Your Loved Ones"
        description="Devine Senior Living offers compassionate senior care services including assisted living, memory care, and rehabilitation in a luxury environment."
      />
      <Header />
      <FloatingContactBar />
      <main className="min-h-screen pt-16">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
