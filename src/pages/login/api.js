import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/agent-login",
});

export const registerAgent = (data) => API.post("/register", data);
export const loginAgent = (data) => API.post("/login", data);

