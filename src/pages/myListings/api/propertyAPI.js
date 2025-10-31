// src/api/propertyAPI.js
import axios from "axios";

const API_BASE = "https://estate-backend-kyiz.onrender.com";

export const getListings = async () => {
  const res = await axios.get(`${API_BASE}/api/agent-properties`);
  return res.data;
};

export const createListing = async (formData) => {
  return await axios.post(`${API_BASE}/api/agent-properties`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateListing = async (id, formData) => {
  return await axios.put(`${API_BASE}/api/agent-properties/${id}`, formData);
};

export const deleteListing = async (id) => {
  return await axios.delete(`${API_BASE}/api/agent-properties/${id}`);
};

export { API_BASE };
