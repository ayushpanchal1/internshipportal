import { httpAxios } from "../helper/httpHelper";
import { getCookie } from "../helper/cookieHelper";



export async function currentUser() {
  try {
    let userData = localStorage.getItem('userData');

    if (!userData) {
      const token = getCookie('token');
      if (!token) {
        throw new Error('Token is missing');
      }

      const response = await httpAxios.get('/api/current-user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      userData = JSON.stringify(response.data);
      localStorage.setItem('userData', userData);
    }

    return JSON.parse(userData);
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
    //no useremail is returned in response, this is no need
    // const { userEmail } = result.data; // Assuming the response includes the user's email
    // localStorage.setItem('userEmail', userEmail); // Set userEmail in localStorage
    return result.data;
  } catch (error) {
    throw new Error(error.response.data.error || error.message);
  }
}
export async function teacherSignup(userData) {
  try {
    console.log("The user data is : ",userData);
    const result = await httpAxios.post('/api/teachersignup', userData);
    return result.data;
  } catch (error) {
    throw new Error(error.response.data.error || error.message);
  }
}

export async function teacherLogin(loginData) {
  try {
    const result = await httpAxios.post('/api/teacherlogin', loginData);
    
    //no need for any of this - ayush
    // const { token, userRole, userEmail } = result.data;

    // if (!token || !userRole || !userEmail) {
    //   throw new Error('Token, user role, or email is missing');
    // }

    // localStorage.setItem('token', token);
    // localStorage.setItem('userRole', userRole);
    // localStorage.setItem('userEmail', userEmail);

    return result.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
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
    const response = await httpAxios.get('/api/userlogout'); // Change to GET method
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || error.message);
  }
}

export async function getMyRequests(email, approvalstatus = 0) {
  try {
    const token = getCookie('token');
    if (!token || !email) {
      throw new Error('Token or email is missing');
    }

    // Validate approvalstatus
    if (isNaN(approvalstatus) || approvalstatus < 0 || approvalstatus > 2) {
      throw new Error('Invalid approval status');
    }

    const response = await httpAxios.post(
      '/api/getmyrequests',
      {
        email: email,
        approvalstatus: approvalstatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Set other necessary headers
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
}
