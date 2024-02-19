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
