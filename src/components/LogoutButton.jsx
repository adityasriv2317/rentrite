import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
    navigate("/login");
  };

  return (
    <button 
      onClick={handleLogout} 
      className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
      disabled={loading}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}

export default LogoutButton;
