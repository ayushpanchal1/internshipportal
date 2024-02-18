import axios from 'axios'

import axios from "axios";
export const httpAxios = axios.create({
  baseURL: "http://localhost:1337",
  withCredentials: "true",
});

export async function studentLogin(loginData) {
    try {
      const result = await httpAxios.post('/api/studentlogin', loginData);
      // localStorage.setItem('userEmail', userEmail); // Set userEmail in localStorage
      return result.data;
    } catch (error) {
      throw new Error(error.response.data.error || error.message);
    }
  }