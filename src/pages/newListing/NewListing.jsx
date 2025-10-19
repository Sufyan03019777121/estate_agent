import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Upload,
  Button,
  Select,
  Radio,
  Row,
  Col,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import "./NewListing.css";

const { TextArea } = Input;

export default function NewListing() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    if (fileList.length === 0) {
      message.error("Please upload at least one image");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("category", values.category);
      formData.append("furnished", values.furnished);
      formData.append("bedrooms", values.bedrooms);
      formData.append("bathrooms", values.bathrooms);
      formData.append("area", values.area);
      formData.append("price", values.price);
      formData.append("title", values.title);
      formData.append("description", values.description);

      // Append images
      fileList.forEach((file) => {
        if (file.originFileObj) formData.append("images", file.originFileObj);
      });

      const res = await axios.post("/api/agent-properties", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success(res.data.message);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || "Failed to post property");
    }
    setLoading(false);
  };

  return (
    <div className="listing-container" style={{ minHeight: "60vh" }}>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        className="listing-form"
      >
        <Row gutter={[16, 10]}>
          {/* Category */}
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select category" }]}
            >
              <Select
                placeholder="Select"
                size="small"
                options={[
                  { value: "house", label: "House" },
                  { value: "flat", label: "Flat" },
                  { value: "plot", label: "Plot" },
                  { value: "commercial", label: "Commercial" },
                ]}
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)", borderRadius: 6 }}
              />
            </Form.Item>
          </Col>

          {/* Furnished */}
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="furnished"
              label="Furnished"
              rules={[{ required: true, message: "Select furnishing state" }]}
            >
              <Radio.Group
                size="small"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)", borderRadius: 6, padding: "4px" }}
              >
                <Radio value="unfurnished">Unfurnished</Radio>
                <Radio value="furnished">Furnished</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          {/* Bedrooms */}
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="bedrooms"
              label="Bedrooms"
              rules={[{ required: true, message: "Select number of bedrooms" }]}
            >
              <Select
                placeholder="Select"
                size="small"
                options={[
                  { value: 1, label: "1" },
                  { value: 2, label: "2" },
                  { value: 3, label: "3" },
                  { value: 4, label: "4+" },
                ]}
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)", borderRadius: 6 }}
              />
            </Form.Item>
          </Col>

          {/* Bathrooms */}
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="bathrooms"
              label="Bathrooms"
              rules={[{ required: true, message: "Select number of bathrooms" }]}
            >
              <Select
                placeholder="Select"
                size="small"
                options={[
                  { value: 1, label: "1" },
                  { value: 2, label: "2" },
                  { value: 3, label: "3+" },
                ]}
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)", borderRadius: 6 }}
              />
            </Form.Item>
          </Col>

          {/* Area */}
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="area"
              label="Area (Marla)"
              rules={[{ required: true, message: "Enter area" }]}
            >
              <InputNumber
                min={0}
                size="small"
                style={{
                  width: "100%",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  borderRadius: 6,
                }}
                placeholder="Area"
              />
            </Form.Item>
          </Col>

          {/* Price */}
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="price"
              label="Price (Rs)"
              rules={[{ required: true, message: "Enter price" }]}
            >
              <InputNumber
                min={0}
                size="small"
                style={{
                  width: "100%",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  borderRadius: 6,
                }}
                placeholder="Price"
              />
            </Form.Item>
          </Col>

          {/* Title */}
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="title"
              label="Ad Title"
              rules={[{ required: true, message: "Enter ad title" }]}
            >
              <Input
                size="small"
                placeholder="Short title"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)", borderRadius: 6 }}
              />
            </Form.Item>
          </Col>

          {/* Description */}
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Enter description" }]}
            >
              <TextArea
                rows={2}
                placeholder="Brief property details"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)", borderRadius: 6 }}
              />
            </Form.Item>
          </Col>

          {/* Upload Images */}
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Upload Images (max 12)">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList)}
                beforeUpload={() => false}
                multiple
                maxCount={12}
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)", borderRadius: 6 }}
              >
                {fileList.length >= 12 ? null : (
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
              <div style={{ fontSize: "12px", color: "#999", marginTop: 4 }}>
                Supported formats: JPG, PNG, WEBP — Max 12 images allowed.
              </div>
            </Form.Item>
          </Col>

          {/* Submit Button */}
          <Col span={24}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="submit-btn"
                loading={loading}
              >
                Post Now
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
