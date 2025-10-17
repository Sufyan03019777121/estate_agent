import React from "react";
import { Card, Button, Row, Col, Typography } from "antd";

const { Title } = Typography;

export default function Upgrade() {
  const plans = [
    { name: "Basic", price: "PKR 2000", desc: "1 Featured Listing" },
    { name: "Pro", price: "PKR 5000", desc: "5 Featured Listings" },
    { name: "Premium", price: "PKR 10,000", desc: "Unlimited Featured Listings" },
  ];

  return (
    <>
      <Title level={2}>⭐ Upgrade / Promotion</Title>
      <Row gutter={16}>
        {plans.map((plan, i) => (
          <Col span={8} key={i}>
            <Card title={plan.name} bordered>
              <p>{plan.desc}</p>
              <h3>{plan.price}</h3>
              <Button type="primary">Buy Now</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
