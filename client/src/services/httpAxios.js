import axios from "axios";

const BACKEND_ADDRESS = process.env.REACT_APP_BACKEND_ADDRESS

export const httpAxios = axios.create({
  baseURL: BACKEND_ADDRESS,
  withCredentials: "true",
});

