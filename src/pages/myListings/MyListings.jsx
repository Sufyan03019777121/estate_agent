import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Button,
  Typography,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  Carousel,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

// 🟩 API Base URL (Render backend)
const API_BASE = "https://estate-backend-kyiz.onrender.com";

export default function MyListings() {
  const [listings, setListings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  // ✅ Fetch all listings
  const fetchListings = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/agent-properties`);
      if (!res.ok) throw new Error("Failed to fetch listings");
      const data = await res.json();
      setListings(data);
    } catch (err) {
      console.error(err);
      message.error("Error fetching listings");
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // ✅ Handle Edit click
  const handleEdit = (item) => {
    if (!item) return;
    setEditingItem(item);
    form.setFieldsValue(item);

    // Prepare file list (existing images)
    setFileList(
      item.images?.map((img, i) => ({
        uid: i,
        name: img,
        status: "done",
        url: `${API_BASE}/uploads/${img}`,
      })) || []
    );

    setIsModalOpen(true);
  };

  // ✅ Handle Save (Update)
  const handleSave = async () => {
    if (!editingItem?._id) return;

    try {
      const values = await form.validateFields();
      if (fileList.length === 0) {
        message.error("Please upload at least one image");
        return;
      }

      const formData = new FormData();

      // Append updated fields
      Object.keys(values).forEach((key) => formData.append(key, values[key]));

      // Append new images
      fileList.forEach((file) => {
        if (file.originFileObj) formData.append("images", file.originFileObj);
      });

      // Append existing images
      const existingImages = fileList
        .filter((file) => !file.originFileObj)
        .map((file) => file.name);

      existingImages.forEach((img) =>
        formData.append("existingImages", img)
      );

      const res = await fetch(`${API_BASE}/api/agent-properties/${editingItem._id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to update property");
      }

      message.success("✅ Property updated successfully!");
      setIsModalOpen(false);
      setEditingItem(null);
      setFileList([]);
      fetchListings();
    } catch (err) {
      console.error("Update Error:", err);
      message.error(err.message || "Error updating property");
    }
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    if (!id) return;
    if (!window.confirm("Are you sure to delete this property?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/agent-properties/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete property");
      message.success("🗑️ Property deleted");
      fetchListings();
    } catch (err) {
      console.error(err);
      message.error(err.message || "Error deleting property");
    }
  };

  // ✅ Table Columns
  const columns = [
    {
      title: "Images",
      dataIndex: "images",
      render: (imgs) =>
        imgs?.length ? (
          <Carousel
            prevArrow={<LeftOutlined />}
            nextArrow={<RightOutlined />}
            autoplay
            style={{ width: "120px" }}
          >
            {imgs.map((img, i) => (
              <img
                key={i}
                src={`${API_BASE}/uploads/${img}`}
                alt={`property-${i}`}
                style={{
                  width: "100px",
                  height: "70px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
            ))}
          </Carousel>
        ) : (
          <Tag>No Image</Tag>
        ),
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
          <Button onClick={() => handleEdit(record)} icon={<EditOutlined />} />
          <Button
            onClick={() => handleDelete(record._id)}
            danger
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
      width: 150,
    },
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <Title level={3}>My Listings</Title>

      <Table
        dataSource={listings.map((l) => ({ key: l._id, ...l }))}
        columns={columns}
        scroll={{ x: "max-content" }}
        pagination={{ pageSize: 5 }}
      />

      {/* ✅ Edit Modal */}
      <Modal
        title="Edit Property"
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Furnished"
            name="furnished"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Area" name="area" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Bedrooms" name="bedrooms">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Bathrooms" name="bathrooms">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <InputNumber min={0} step={1000} style={{ width: "100%" }} />
          </Form.Item>

          {/* ✅ Image Upload */}
          <Form.Item label="Images" required>
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={() => false}
              multiple
              maxCount={12}
            >
              <Button icon={<UploadOutlined />}>Select Images</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
