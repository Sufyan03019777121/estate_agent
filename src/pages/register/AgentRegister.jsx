import React, { useState } from "react";
import { Form, Input, Button, Typography, message, Card } from "antd";
import { registerAgent } from "../login/api";
import { useNavigate, Link } from "react-router-dom";

const { Title } = Typography;

export default function AgentRegister() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await registerAgent(values);
      message.success("Registration successful! Please wait for admin verification.");
      navigate("/login");
    } catch (err) {
      message.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card style={{ width: 400, padding: 20 }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Agent Registration
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Register
          </Button>
          <div style={{ textAlign: "center", marginTop: 10 }}>
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
