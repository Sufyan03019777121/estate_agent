import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";

// 🔹 API Base URL variable
const API_BASE = "https://estate-backend-kyiz.onrender.com";

export default function AgentLogin({ onLogin }) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        message.error(data.message || "Login failed");
        return;
      }

      switch (data.agent.status) {
        case "Verified":
          onLogin(data.agent);
          message.success("✅ Login successful");
          break;
        case "Pending":
          message.warning("⏳ Your account is pending verification. Please wait for admin approval.");
          break;
        case "Blocked":
          message.error("🚫 Your account has been blocked by admin.");
          break;
        default:
          message.error("❌ Unknown status");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("Server error, try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "100px auto",
        padding: 20,
        border: "1px solid #f0f0f0",
        borderRadius: 8,
        background: "#fff",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Agent Login</h2>
      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item
          label="Email"
          name="Email"
          rules={[{ required: true, message: "Please enter email" }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="Password"
          rules={[{ required: true, message: "Please enter password" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
