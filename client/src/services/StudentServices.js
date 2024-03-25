import { toast } from 'react-toastify';
import { httpAxios } from './httpAxios';

export async function loginStudent(requestBody, navigate, signIn) {
  try {
    const response = await httpAxios.post('/api/studentlogin', requestBody);
    const data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      signIn({
        token: data.token,
        expiresIn: 3600,
        tokenType: 'Bearer',
        authState: { email: requestBody.email, session: 'user' },
      });
      localStorage.setItem('SessionInfo', 'user');
      localStorage.setItem('SessionEmail', requestBody.email);
      navigate('/student/StudentDashboard');
    }
  } catch (error) {
    toast.error(`Login credentials are incorrect!`);
  }
}

export async function registerStudent(requestBody, navigate) {
  try {
    const response = await httpAxios.post('/api/studentsignup', requestBody);
    const data = response.data;
    
    if (data.error) {
      throw new Error(data.error);
    } else {
      alert('Sign up complete! Please log in');
      navigate('/student/StudentLogin');
    }
  } catch (error) {
    console.log('Signup request failed:', error);
    alert(`An error occurred while signing up. Please try again later. ${error}`);
  }
}

export async function getMyInternsStudent(setInterns) {
  try {
    const response = await httpAxios.get('/api/studentgetmyinterns');
    var data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      if (Array.isArray(data)) {
        // `data` is an array, you can safely call reverse on it
        data.reverse();
      }
      setInterns(data)
    }
  } catch (error) {
    alert(`Error fetching studentmyinterns! ${error}`);
  }
}

export async function getMyNotificationsStudent(setNotifications) {
  try {
    const response = await httpAxios.get('/api/studentgetmynotifications');
    var data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      if (Array.isArray(data)) {
        // `data` is an array, you can safely call reverse on it
        data.reverse();
      }
      setNotifications(data)
    }
  } catch (error) {
    alert(`Error fetching studentmyinterns! ${error}`);
  }
}

export async function delMyInternsStudent(setInterns, delinternid) {
  try {
    const response = await httpAxios.post('/api/studentdelmyinterns', ({_id: delinternid}));
    var data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      getMyInternsStudent(setInterns)
    }
  } catch (error) {
    alert(`Error while deleting studentmyintern! ${error}`);
  }
}

export async function subCompInternStudent(requestBody) {
  try {
    const response = await httpAxios.post('/api/studentsubcompintern', requestBody);
    const data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      alert("Submitted!")
    }
  } catch (error) {
    alert(`Error occured while posting! ${error}`);
  }
}

export async function addRequestStudent(requestBody) {
  try {
    const response = await httpAxios.post('/api/studentaddrequest', requestBody);
    const data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      alert("Submitted!")
    }
  } catch (error) {
    alert(`Error occured while posting! ${error}`);
  }
}

export async function getMyRequestsStudent(setRequests) {
  try {
    const response = await httpAxios.post('/api/studentgetmyrequests');
    var data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      data = data.requests
      if (Array.isArray(data)) {
        // `data` is an array, you can safely call reverse on it
        data.reverse();
      }
      setRequests(data)
    }
  } catch (error) {
    alert(`Error fetching usermyrequests! ${error}`);
  }
}

export async function removeRequestStudent(setRequests, RemoveReqId) {
  try {
    const response = await httpAxios.post('/api/studentremoverequest', ({id: RemoveReqId}));
    var data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      getMyRequestsStudent(setRequests)
    }
  } catch (error) {
    alert(`Error while removing studentmyrequest! ${error}`);
  }
}