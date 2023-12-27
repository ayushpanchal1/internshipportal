"use client";
import React, { useState,useEffect } from "react";
import UserContext from "./userContext";
import { currentUser } from "../services/userService";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Use null instead of undefined
  
  useEffect(() => {
    async function load() {
      try {
        const tempUser = await currentUser();
        console.log(tempUser);
        setUser(tempUser); // Set the user directly without spreading
      } catch (error) {
        console.log(error);
        // Handle errors here, setUser(null) or other appropriate action
        setUser(null); // For example, setting user state to null on error
      }
    }
    
    load(); // Invoke the load function
  }, []); // Empty dependency array to run only once on mount
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
