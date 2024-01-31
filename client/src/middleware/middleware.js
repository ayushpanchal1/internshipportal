//doesn't work

import { NextResponse } from 'next/server'
// import { useContext } from 'react';
// import UserContext from '../context/userContext';
import { getCookie } from "../helper/cookieHelper";
 
export function middleware() {
  const token = getCookie('token');
 
  if (!token) {
    return NextResponse.redirect(new URL('/login', "localhost:3000"))
  }
}