import { httpAxios } from './httpAxios';

export async function logout(navigate, signOut) {
  try {
    const response = await httpAxios.get('/api/userlogout'); // Change to GET method
    const data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      signOut();
      localStorage.removeItem('SessionInfo');
      localStorage.removeItem('SessionEmail');
      navigate("/student/StudentLogin");
    }

  } catch (error) {
    alert(`Error while logging out! ${error}`);
  }
}

export async function getUserData(setUserData) {
  try {
    const response = await httpAxios.get('/api/current-user');
    var data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      setUserData(data);
    }
  } catch (error) {
    alert(`Error fetching userdata! ${error}`);
  }
}

export async function getAnnouncements(setAnnouncements) {
  try {
    const response = await httpAxios.get('/api/getannouncements');
    var data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      if (Array.isArray(data)) {
        // `data` is an array, you can safely call reverse on it
        data.reverse();
      }
      setAnnouncements(data)
    }
  } catch (error) {
    alert(`Error fetching userdata! ${error}`);
  }
}

export async function downloadRequest(DownloadReqId) {
  try {
    const response = await httpAxios.post('/api/downloadrequest', { id: DownloadReqId }, { responseType: 'arraybuffer' });
    console.log(response.data);
    if (response.status === 200) {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'document.pdf';
      link.click();
    } else {
      throw new Error('Failed to download request');
    }
  } catch (error) {
    alert(`Error while downloading pdf! ${error}`);
  }
}

export async function uploadProfilePicture(formData) {
  try {
    const response = await httpAxios.post('/api/uploadprofilepicture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Set the content type for FormData
      }
    });
    var data = response.data;
    if (response.status === 200) {
      alert (data.status)
    } else {
      throw new Error('Failed to upload profile picture');
    }
  } catch (error) {
    alert(`Error while uploading profile picture! ${error}`);
  }
}

export async function deleteProfilePicture() {
  try {
    const response = await httpAxios.get('/api/deleteprofilepicture');
    var data = response.data;
    if (data.error) {
      throw new Error(data.error);
    } else {
      alert('Profile Picture Deleted!')
    }
  } catch (error) {
    alert(`Error while deleting profile picture! ${error}`);
  }
}


export async function generateOTP(requestBody) {
  try {
    const response = await httpAxios.post('/api/generateotp', requestBody);
    var data = response.data;

    if (data.error) {
      throw new Error(data.error);
    }
  } catch (error) {
    alert(`Error generating otp! ${error}`);
  }
}