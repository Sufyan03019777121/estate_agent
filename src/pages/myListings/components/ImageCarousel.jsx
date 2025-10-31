// src/components/ImageCarousel.jsx
import React from "react";
import { Carousel, Tag } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { API_BASE } from "../api/propertyAPI";

export default function ImageCarousel({ images }) {
  return images?.length ? (
    <Carousel
      prevArrow={<LeftOutlined />}
      nextArrow={<RightOutlined />}
      autoplay
      style={{ width: "120px" }}
    >
      {images.map((img, i) => (
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
  );
}
