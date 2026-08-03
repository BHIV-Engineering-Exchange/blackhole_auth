import axios from "axios";

const apiBase = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(
  /\/$/,
  ""
);

const API = axios.create({
  baseURL: `${apiBase}/api`
});

export default API;