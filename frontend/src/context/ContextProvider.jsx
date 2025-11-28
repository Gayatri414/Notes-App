// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

// ✅ Use PascalCase for context name (React convention)
const AuthContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  return (
    // ✅ Use the same AuthContext variable here
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};


// ✅ Custom hook to access context
export const useAuth = () => useContext(AuthContext);

export default ContextProvider;
