// src/components/ListingTable.jsx
import React from "react";
import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ImageCarousel from "./ImageCarousel";

export default function ListingTable({ listings, onEdit, onDelete }) {
  const columns = [
    {
      title: "Images",
      dataIndex: "images",
      render: (imgs) => <ImageCarousel images={imgs} />,
    },
    { title: "Title", dataIndex: "title", width: 150 },
    { title: "Category", dataIndex: "category", width: 120 },
    { title: "Furnished", dataIndex: "furnished", width: 120 },
    { title: "Area", dataIndex: "area", width: 80 },
    { title: "Bedrooms", dataIndex: "bedrooms", width: 100 },
    { title: "Bathrooms", dataIndex: "bathrooms", width: 100 },
    {
      title: "Price",
      dataIndex: "price",
      render: (p) => (p ? `Rs ${p.toLocaleString()}` : "-"),
      width: 120,
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space>
          <Button onClick={() => onEdit(record)} icon={<EditOutlined />} />
          <Button
            onClick={() => onDelete(record._id)}
            danger
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
      width: 150,
    },
  ];

  return (
    <Table
      dataSource={listings.map((l) => ({ key: l._id, ...l }))}
      columns={columns}
      scroll={{ x: "max-content" }}
      pagination={{ pageSize: 5 }}
    />
  );
}
