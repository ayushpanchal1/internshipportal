import Cookies from 'js-cookie';

// Function to retrieve the token from cookies
export function getCookie(name) {
  return Cookies.get(name);
}
