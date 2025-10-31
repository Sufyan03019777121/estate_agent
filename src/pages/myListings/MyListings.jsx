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
  Select,
  Radio,
  Row,
  Col,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  LeftOutlined,
  RightOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "./myListings.css"

const { Title } = Typography;
const { TextArea } = Input;

const API_BASE = "http://localhost:5000";

export default function MyListings() {
  const [listings, setListings] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editFileList, setEditFileList] = useState([]);
  const [editForm] = Form.useForm();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createForm] = Form.useForm();
  const [createFileList, setCreateFileList] = useState([]);
  const [loadingCreate, setLoadingCreate] = useState(false);

  // ✅ Fetch listings
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

  // ✅ Edit handlers
  const handleEdit = (item) => {
    if (!item) return;
    setEditingItem(item);
    editForm.setFieldsValue(item);
    setEditFileList(
      item.images?.map((img, i) => ({
        uid: i,
        name: img,
        status: "done",
        url: `${API_BASE}/uploads/${img}`,
      })) || []
    );
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingItem?._id) return;

    try {
      const values = await editForm.validateFields();
      if (editFileList.length === 0) {
        message.error("Please upload at least one image");
        return;
      }

      const formData = new FormData();
      Object.keys(values).forEach((key) => formData.append(key, values[key]));

      editFileList.forEach((file) => {
        if (file.originFileObj) formData.append("images", file.originFileObj);
      });

      const existingImages = editFileList
        .filter((file) => !file.originFileObj)
        .map((file) => file.name);

      existingImages.forEach((img) => formData.append("existingImages", img));

      const res = await fetch(
        `${API_BASE}/api/agent-properties/${editingItem._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to update property");
      }

      message.success("✅ Property updated successfully!");
      setIsEditModalOpen(false);
      setEditingItem(null);
      setEditFileList([]);
      fetchListings();
    } catch (err) {
      console.error("Update Error:", err);
      message.error(err.message || "Error updating property");
    }
  };

  // ✅ Delete handler
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

  // ✅ Create New Listing
  const handleCreate = async () => {
    try {
      const values = await createForm.validateFields();
      if (createFileList.length === 0) {
        message.error("Please upload at least one image");
        return;
      }

      setLoadingCreate(true);
      const formData = new FormData();
      Object.keys(values).forEach((key) => formData.append(key, values[key]));
      createFileList.forEach((file) => {
        if (file.originFileObj) formData.append("images", file.originFileObj);
      });

      const res = await axios.post(
        `${API_BASE}/api/agent-properties`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      message.success(res.data.message || "✅ Property created!");
      createForm.resetFields();
      setCreateFileList([]);
      setIsCreateModalOpen(false);
      fetchListings();
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.message || "Failed to create property");
    }
    setLoadingCreate(false);
  };

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
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 16 }}
        onClick={() => setIsCreateModalOpen(true)}
      >
        Add New Listing
      </Button>

      <Table
        dataSource={listings.map((l) => ({ key: l._id, ...l }))}
        columns={columns}
        scroll={{ x: "max-content" }}
        pagination={{ pageSize: 5 }}
      />

      {/* ✅ Edit Modal */}
      <Modal
        title="Edit Property"
        open={isEditModalOpen}
        onOk={handleSaveEdit}
        onCancel={() => setIsEditModalOpen(false)}
        width={700}
      >
        <Form form={editForm} layout="vertical">
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

          <Form.Item label="Images" required>
            <Upload
              listType="picture"
              fileList={editFileList}
              onChange={({ fileList }) => setEditFileList(fileList)}
              beforeUpload={() => false}
              multiple
              maxCount={12}
            >
              <Button icon={<UploadOutlined />}>Select Images</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* ✅ Create Modal */}
      <Modal
        title="Create New Listing"
        open={isCreateModalOpen}
        onOk={handleCreate}
        onCancel={() => setIsCreateModalOpen(false)}
        width={800}
        okText="Post Now"
        confirmLoading={loadingCreate}
      >
        <Form layout="vertical" form={createForm}>
          <Row gutter={[16, 10]}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select"
                  options={[
                    { value: "house", label: "House" },
                    { value: "flat", label: "Flat" },
                    { value: "plot", label: "Plot" },
                    { value: "commercial", label: "Commercial" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="furnished"
                label="Furnished"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value="unfurnished">Unfurnished</Radio>
                  <Radio value="furnished">Furnished</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="bedrooms"
                label="Bedrooms"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select"
                  options={[
                    { value: 1, label: "1" },
                    { value: 2, label: "2" },
                    { value: 3, label: "3" },
                    { value: 4, label: "4+" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="bathrooms"
                label="Bathrooms"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select"
                  options={[
                    { value: 1, label: "1" },
                    { value: 2, label: "2" },
                    { value: 3, label: "3+" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="area"
                label="Area (Marla)"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="price"
                label="Price (Rs)"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} step={1000} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="title"
                label="Ad Title"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true }]}
              >
                <TextArea rows={2} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Upload Images (max 12)">
                <Upload
                  listType="picture-card"
                  fileList={createFileList}
                  onChange={({ fileList }) => setCreateFileList(fileList)}
                  beforeUpload={() => false}
                  multiple
                  maxCount={12}
                >
                  {createFileList.length >= 12 ? null : (
                    <div>
                      <UploadOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
