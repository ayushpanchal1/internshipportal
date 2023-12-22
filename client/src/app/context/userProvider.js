"use client";
import React, { useState } from "react";
import UserContext from "./userContext";


const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  
 
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
