import { httpAxios } from './httpAxios';

export async function loginTeacher(requestBody, navigate, signIn) {
  try {
    const response = await httpAxios.post('/api/teacherlogin', requestBody);

    const data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      signIn({
        token: data.token,
        expiresIn: 3600,
        tokenType: 'Bearer',
        authState: { email: requestBody.email, session: 'admin' },
      });
      localStorage.setItem('SessionInfo', 'admin');
      localStorage.setItem('SessionEmail', requestBody.email);
      navigate('/teacher/TeacherDashboard');
    }
  } catch (error) {
    alert(`Teacher Log in credentials are incorrect! Sign up if you do not have an account! ${error}`);
  }
}

export async function getMyNotifsTeacher(setNotifs) {
  try {
    const response = await httpAxios.get('/api/teachergetmynotifs');
    var data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      if (Array.isArray(data)) {
        // `data` is an array, you can safely call reverse on it
        data.reverse();
      }
      setNotifs(data)
    }
  } catch (error) {
    alert(`Error fetching teachermynotifs! ${error}`);
  }
}

export async function delMyNotifsTeacher(setNotifs, getMyNotifsTeacher, delnotifid) {
  try {
    const response = await httpAxios.post('/api/teacherdelmynotifs', ({ _id: delnotifid }));
    var data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      getMyNotifsTeacher(setNotifs)
    }
  } catch (error) {
    alert(`Error while deleting teachermynotif! ${error}`);
  }
}

export async function postNotifTeacher(requestBody) {
  try {
    const response = await httpAxios.post('/api/teacherpostnotif', requestBody);
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

export async function getAllStudentsForTeacher(setAllUser) {
  try {
    const response = await httpAxios.post('/api/teacherfetchstudents');
    var data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      setAllUser(data);
    }
  } catch (error) {
    alert(`Error fetching all students! ${error}`);
  }
}

export async function getAStudentforTeacher(setUserData, setInterns, searchquery) {
  try {
    const response = await httpAxios.post('/api/teacherfetchastudent', ({ searchquery: searchquery }));
    var data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      
      const data1 = data.student
      setUserData(data1)

      const data2 = data.interns
      
      if (Array.isArray(data2)) {
        // `data` is an array, you can safely call reverse on it
        data2.reverse();
      }
      setInterns(data2)
    }
  } catch (error) {
    alert(`Error while fetching a student's profile! ${error}`);
  }
}