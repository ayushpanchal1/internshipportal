import axios from "axios";

export const httpAxios = axios.create({
  baseURL: "http://localhost:1337",
  withCredentials: "true",
});

