"use client"
import React, { useState, useEffect } from "react";
import UserContext from "./userContext";
import { currentUser } from "../services/userService";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const tempUser = await currentUser();
        setUser({ ...tempUser });
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  useEffect(() => {
    // Update user context whenever user state changes
    UserContext.Provider.value = { user, setUser };
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {!isLoading && children}
    </UserContext.Provider>
  );
};

export default UserProvider;