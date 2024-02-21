import React, { createContext, useContext, useState } from 'react';

// Create a context for the user's role
const RoleContext = createContext();

// Custom hook to access the role context
export const useRole = () => useContext(RoleContext);

// Provider to manage the user's role
export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState('');

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};