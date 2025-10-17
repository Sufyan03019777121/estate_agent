import React from "react";
import { Row, Col, Card, Statistic, Typography } from "antd";
import { HomeOutlined, MailOutlined, CrownOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function Dashboard() {
  return (
    <>
      <Title  level={3}> Agent Dashboard</Title>
      <Row gutter={5}>
        <Col span={8}>
          <Card>
            <Statistic title="Active Listings" value={12} prefix={<HomeOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Pending Inquiries" value={5} prefix={<MailOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Featured Listings" value={2} prefix={<CrownOutlined />} />
          </Card>
        </Col>
      </Row>
    </>
  );
}
