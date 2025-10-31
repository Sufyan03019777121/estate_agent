// src/components/EditListingModal.jsx
import React from "react";
import { Modal, Form, Input, InputNumber, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function EditListingModal({
  open,
  form,
  fileList,
  setFileList,
  onCancel,
  onSave,
}) {
  return (
    <Modal
      title="Edit Property"
      open={open}
      onOk={onSave}
      onCancel={onCancel}
      width={700}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Category" name="category" rules={[{ required: true }]}>
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
  );
}
