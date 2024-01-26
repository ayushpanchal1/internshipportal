import { httpAxios } from '../helper/httpHelper';
import { getCookie } from "../helper/cookieHelper";

// export async function addTask(task) {
//   const result = await httpAxios
//     .post("/api/tasks", task)
//     .then((response) => response.data);
//   return result;
// }

// export async function getTasksOfUser(userId) {
//   const result = await httpAxios
//     .get(`/api/users/${userId}/tasks`)
//     .then((response) => response.data);
//   return result;
// }
// export async function deleteTask(taskId) {
//   const result = await httpAxios
//     .delete(`/api/tasks/${taskId}`)
//     .then((response) => response.data);
//   return result;
// }

export async function addRequest(requestData) {
  try {
    const result = await httpAxios.post('/api/addrequest', requestData);
    return result.data;
  } catch (error) {
    throw new Error(error.response.data.error || error.message);
  }
}


export async function getAllRequestsForStudent(email, approvalStatus = 0) {
  try {
    const token = getCookie('token');
    if (!token || !email) {
      throw new Error('Token or email is missing');
    }

    const response = await httpAxios.post(
      '/api/getmyrequests',
      { email: email, approvalstatus: approvalStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
}
export async function removerequest(requestId) {
  try {
    const response = await httpAxios.post('/api/removerequest', { id: requestId });

    if (response.status === 200) {
      return { status: 'ok' }; // Request successfully deleted
    } else {
      throw new Error('Failed to delete request');
    }
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
}

export async function teacherGetMyRequests() {
  try {
    const response = await httpAxios.get('/api/teachergetmyrequests');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
}

export async function teacherApproveRequest(requestId) {
  try {
    const response = await httpAxios.post('/api/teacherapprove', { id: requestId });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
}

export async function downloadRequest(requestId) {
  try {
    const response = await httpAxios.post('/api/downloadrequest', { id: requestId }, { responseType: 'arraybuffer' });
    if (response.status === 200) {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'document.pdf';
      link.click();

      return { status: 'ok' };
    } else {
      throw new Error('Failed to download request');
    }
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
}
