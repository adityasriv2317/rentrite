import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSpinner,
  FaHome,
} from "react-icons/fa";
import { motion } from "framer-motion";

const url = "https://rentify-fm53.onrender.com/users/signup";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(url, {
        "name": name,
        "email": email,
        "password": password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create an account.");
    }

    setLoading(false);
  };

  return (
    <motion.div
      className="min-h-full my-18 flex flex-col justify-center items-center bg-gray-100 p-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Create Your RentRite Account
        </h2>

        {error && (
          <motion.p
            className="text-red-500 text-center mb-4 border border-red-400 p-2 rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name Input */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <div className="flex items-center border rounded p-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>
          </motion.div>

          {/* Email Input */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <div className="flex items-center border rounded p-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
          </motion.div>

          {/* Password Input */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <div className="flex items-center border rounded p-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full focus:outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 ml-2 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 flex items-center justify-center"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? <FaSpinner className="animate-spin mr-2" /> : null}
            {loading ? "Creating account..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>

        <Link
          to="/"
          className="mt-6 text-blue-500 hover:underline text-center flex items-center justify-center"
        >
          <FaHome className="mr-2" /> Back to Home
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default Register;
