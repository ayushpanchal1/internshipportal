import axios from 'axios'

import axios from "axios";
export const httpAxios = axios.create({
  baseURL: "http://localhost:1337",
  withCredentials: "true",
});

export async function studentLogin(loginData) {
    try {
      const result = await httpAxios.post('/api/studentlogin', loginData);
      return result.data;
    } catch (error) {
      throw new Error(error.response.data.error || error.message);
    }
  }

     async function loginUser(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:1337/api/studentlogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
            credentials: 'include', // Include cookies in the request
        })

        const data = await response.json()

        if (!data.error) {
            console.log(data)
            signIn({
                token: data.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: { email: Email, session: "user" },
            });
            localStorage.setItem('SessionInfo', 'user');
            localStorage.setItem('SessionEmail', Email);
            // alert("Log in successful")
            navigate("/dashboard")
        } else {
            alert(`Log in credentials are incorrect! Sign up if you do not have an account! ${data.error}`)
        }


    }