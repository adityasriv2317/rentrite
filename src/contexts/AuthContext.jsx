import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Create Auth Context
const AuthContext = createContext();

// API URL
const API_URL = "https://rentify-fm53.onrender.com";

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);

  // Signup function
  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, { name, email, password });
      const newUser = response.data;
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser)); // Save user in localStorage
      return newUser;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Signup failed.");
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, { email, password });
      const loggedInUser = response.data;
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser)); // Save user in localStorage
      return loggedInUser;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Invalid email or password.");
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Clear user from storage
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook for Auth
export function useAuth() {
  return useContext(AuthContext);
}
