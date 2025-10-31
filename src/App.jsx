import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout, message } from "antd";

import Dashboard from "./pages/dashboard/Dashboard";
import MyListings from "./pages/myListings/MyListings";
import Inquiries from "./pages/inquiries/Inquiries";
import Upgrade from "./pages/upgrade/Upgrade";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/AgentLogin";

import "./App.css";

const { Content } = Layout;

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [agent, setAgent] = useState(null);

  // 🔹 Load agent from localStorage on mount
  useEffect(() => {
    const storedAgent = localStorage.getItem("agent");
    if (storedAgent) setAgent(JSON.parse(storedAgent));
  }, []);

  // 🔹 Auto logout if status changes to Blocked or Pending
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!agent?._id) return;

      try {
        const res = await fetch(`http://localhost:5000/api/auth/check-status/${agent._id}`);
        if (!res.ok) return; // agar backend error de to ignore

        const data = await res.json();
        if (data.status !== "Verified") {
          // remove agent
          localStorage.removeItem("agent");
          setAgent(null);

          // show message
          if (data.status === "Blocked") {
            message.error("🚫 Your account has been blocked by admin.");
          } else if (data.status === "Pending") {
            message.warning("⏳ Your account is pending verification.");
          }
        }
      } catch (err) {
        console.error("Status check error:", err);
      }
    }, 10); 

    return () => clearInterval(interval);
  }, [agent]);

  const handleLogout = () => {
    localStorage.removeItem("agent");
    setAgent(null);
  };

  const renderPage = () => {
    if (!agent) return <Navigate to="/login" />;

    switch (page) {
      case "myListings":
        return <MyListings />;
      case "inquiries":
        return <Inquiries />;
      case "upgrade":
        return <Upgrade />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <BrowserRouter>
      {!agent ? (
        <Routes>
          <Route path="/login" element={<Login onLogin={setAgent} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <Layout style={{ minHeight: "100vh" }}>
          <Sidebar setPage={setPage} logout={handleLogout} />
          <Layout>
            <Navbar logout={handleLogout} />
            <Content className="custom_content">{renderPage()}</Content>
          </Layout>
        </Layout>
      )}
    </BrowserRouter>
  );
}
