import { httpAxios } from "../helper/httpHelper";

export async function currentUser() {
  try {
    const response = await httpAxios.get('/api/current');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || error.message);
  }
}
export async function studentSignup(userData) {
  try {
    const result = await httpAxios.post('/api/studentsignup', userData);
    return result.data;
  } catch (error) {
    throw new Error(error.response.data.error || error.message);
  }
}

export async function studentLogin(loginData) {
  try {
    const result = await httpAxios.post('/api/studentlogin', loginData);
    return result.data;
  } catch (error) {
    throw new Error(error.response.data.error || error.message);
  }
}

export async function teacherSignup(userData) {
  try {
    const result = await httpAxios.post('/api/teachersignup', userData);
    return result.data;
  } catch (error) {
    throw new Error(error.response.data.error || error.message);
  }
}

export async function teacherLogin(loginData) {
  try {
    const result = await httpAxios.post('/api/teacherlogin', loginData);
    return result.data;
  } catch (error) {
    throw new Error(error.response.data.error || error.message);
  }
}

export async function testSignup(userData) {
  try {
    const result = await httpAxios.post('/api/testsignup', userData);
    return result.data;
  } catch (error) {
    throw new Error(error.response.data.error || error.message);
  }
}

export async function testLogin(loginData) {
  try {
    const result = await httpAxios.post('/api/testlogin', loginData);
    return result.data;
  } catch (error) {
    throw new Error(error.response.data.error || error.message);
  }
}

export async function addRequest(requestData) {
  try {
    const result = await httpAxios.post('/api/addrequest', requestData);
    return result.data;
  } catch (error) {
    throw new Error(error.response.data.error || error.message);
  }
}

export async function logout() {
  try {
    const response = await httpAxios.post('/api/logout');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || error.message);
  }
}
