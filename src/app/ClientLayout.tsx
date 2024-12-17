// src/app/ClientLayout.tsx
"use client"; // This makes it a client component to use hooks

import { usePathname } from "next/navigation"; // Hook to get the current route
import Header from "./components/Header/Header";

import Footer from "./components/Footer/Footer";
import { Layout } from "antd";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current route

  // Exclude Header, Navbar, and Footer on the login page
  const excludeRoutes = ["/login"];
  const shouldExcludeLayout = excludeRoutes.includes(pathname);

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh", // Ensure the layout fills the entire viewport height
          display: "flex",
          flexDirection: "column", // Flex column layout
        }}
      >
        {/* Conditionally render Header, Navbar, and Footer */}
        {!shouldExcludeLayout && <Header />}
        {/* {!shouldExcludeLayout && <Slider />} */}
        {/* {!shouldExcludeLayout && <Navbar />} */}
        {children}
        {!shouldExcludeLayout && <Footer />}
      </Layout>
    </>
  );
}
