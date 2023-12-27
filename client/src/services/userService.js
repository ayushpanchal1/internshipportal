import { httpAxios } from "../helper/httpHelper";
import { getCookie } from "../helper/cookieHelper";



export async function currentUser() {
  try {
    const token = getCookie('token'); // Retrieve the token from cookies
    console.log("Token:", token); // Log the token here to check if it's present

    if (!token) {
      throw new Error('Token is missing');
    }

    const response = await httpAxios.get('/api/current-user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
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

// export async function addRequest(requestData) {
//   try {
//     const result = await httpAxios.post('/api/addrequest', requestData);
//     return result.data;
//   } catch (error) {
//     throw new Error(error.response.data.error || error.message);
//   }
// }

export async function logout() {
  try {
    const response = await httpAxios.post('/api/logout');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || error.message);
  }
}
export async function getMyRequest() {
  try {
    const token = getCookie('token'); // Retrieve the token from cookies
    console.log("Token:", token); // Log the token here to check if it's present

    if (!token) {
      throw new Error('Token is missing');
    }

    const response = await httpAxios.get('/api/getmyrequests', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
}