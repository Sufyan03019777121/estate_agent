import React from "react";
import { Table, Button, Typography } from "antd";

const { Title } = Typography;

export default function Inquiries() {
  const data = [
    { key: 1, user: "Ali", property: "5 Marla House", message: "Need details", status: "New" },
    { key: 2, user: "Sara", property: "Shop in Karachi", message: "Is it available?", status: "Responded" },
  ];

  return (
    <>
      <Title level={2}>📩 Inquiries</Title>
      <Table
        dataSource={data}
        columns={[
          { title: "User", dataIndex: "user" },
          { title: "Property", dataIndex: "property" },
          { title: "Message", dataIndex: "message" },
          { title: "Status", dataIndex: "status" },
          {
            title: "Action",
            render: () => <Button type="primary">Reply</Button>,
          },
        ]}
      />
    </>
  );
}
