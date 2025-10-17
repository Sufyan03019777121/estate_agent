import React, { useState } from "react";
import { Layout } from "antd";
import NewListing from "./pages/newListing/NewListing";
import MyListings from "./pages/myListings/MyListings";
import Inquiries from "./pages/inquiries/Inquiries";
import Upgrade from "./pages/upgrade/Upgrade";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import "./App.css"


const { Content } = Layout;

export default function App() {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {
      case "newListing": return <NewListing />;
      case "myListings": return <MyListings />;
      case "inquiries": return <Inquiries />;
      case "upgrade": return <Upgrade />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar setPage={setPage} />
      <Layout>
        <Navbar />
        <Content className="custom_content">
          {renderPage()}
        </Content>
      </Layout>
    </Layout>
  );
}
