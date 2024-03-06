import axios from "axios";

export const httpAxios = axios.create({
  baseURL: "https://internshup-portal-backend.onrender.com",
  withCredentials: "true",
});

