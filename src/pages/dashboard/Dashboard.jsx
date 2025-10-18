import React from "react";
import { Row, Col, Card, Statistic, Typography } from "antd";
import { HomeOutlined, MailOutlined, CrownOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function Dashboard() {
  return (
    <>
      <Title level={4}>Agent Dashboard</Title>
      <Row gutter={16}>
        <Col span={8}>
          <Card style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
            <Statistic title="Active Listings" value={12} prefix={<HomeOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
            <Statistic title="Pending Inquiries" value={5} prefix={<MailOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
            <Statistic title="Featured Listings" value={2} prefix={<CrownOutlined />} />
          </Card>
        </Col>
      </Row>
    </>
  );
}
