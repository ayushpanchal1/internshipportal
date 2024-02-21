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