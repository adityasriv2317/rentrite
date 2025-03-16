import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  console.log("ProtectedRoute user:", user); // Add this line for debugging

  return user ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
