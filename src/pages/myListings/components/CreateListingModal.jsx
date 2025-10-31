import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Radio,
  InputNumber,
  Upload,
  Row,
  Col,
  message,
  Button,
} from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import "./CreateListingModal.css"; // 👈 custom style file import

const { TextArea } = Input;

const CreateListingModal = ({ fetchListings, API_BASE }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createForm] = Form.useForm();
  const [createFileList, setCreateFileList] = useState([]);
  const [loadingCreate, setLoadingCreate] = useState(false);

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

      const res = await axios.post(`${API_BASE}/api/agent-properties`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

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

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        className="create-btn"
        onClick={() => setIsCreateModalOpen(true)}
      >
        Create New Listing
      </Button>

      <Modal
        title="🏡 Create New Listing"
        open={isCreateModalOpen}
        onOk={handleCreate}
        onCancel={() => setIsCreateModalOpen(false)}
        width={800}
        okText="Post Now"
        confirmLoading={loadingCreate}
        className="glass-modal"
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
}; 

export default CreateListingModal;
