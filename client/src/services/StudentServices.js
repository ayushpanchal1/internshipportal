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
    alert(`Log in credentials are incorrect! Sign up if you do not have an account! ${error}`);
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

