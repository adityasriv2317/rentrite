import { createContext, useState, useEffect, useContext } from "react";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = async (name, email, password) => {
    // TODO: Replace this with API call
    return new Promise((resolve, reject) => {
      if (email === "test@example.com") {
        reject(new Error("Email already exists"));
      } else {
        resolve({ name, email });
      }
    });
  };

  // Login function (Mock API call)
  const login = async (email, password) => {
    // TODO: Replace with API call
    return new Promise((resolve, reject) => {
      if (email === "user@example.com" && password === "password123") {
        resolve({ email });
      } else {
        reject(new Error("Invalid email or password"));
      }
    });
  };
  
  // Logout function
  const logout = async () => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      resolve();
    });
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook for Auth
export function useAuth() {
  return useContext(AuthContext);
}
