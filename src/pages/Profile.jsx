import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaEdit, FaSave, FaSpinner } from "react-icons/fa";

// Create Profile Context
const ProfileContext = createContext();

// API Base URL
const API_URL = "https://rentify-fm53.onrender.com/users/update-profile";

// Profile Provider
export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState({
    name: "John Doe",
    age: "30",
    gender: "Male",
    aadhaar: "1234-5678-9012",
    pan: "ABCDE1234F",
  });

  // Function to update profile
  const updateProfile = async (updatedData) => {
    try {
      const response = await axios.post(API_URL, updatedData);
      if (response.status === 200) {
        setProfile(updatedData);
      }
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

// Custom Hook for Profile Context
export function useProfile() {
  return useContext(ProfileContext);
}

// Profile Component
function Profile() {
  const { profile, setProfile, updateProfile } = useProfile();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(profile);

  // Update form data when profile changes
  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile update
  const handleUpdate = async () => {
    setLoading(true);
    await updateProfile(formData);
    setEditing(false);
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10"
    >
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">Profile</h2>

      <div className="space-y-4">
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border p-2 rounded focus:outline-none"
          />
        </motion.div>

        {/* Age */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label className="block text-gray-700 font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border p-2 rounded focus:outline-none"
          />
        </motion.div>

        {/* Gender */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label className="block text-gray-700 font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border p-2 rounded focus:outline-none"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </motion.div>

        {/* Aadhaar */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label className="block text-gray-700 font-medium">Aadhaar Number</label>
          <input
            type="text"
            name="aadhaar"
            value={formData.aadhaar}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border p-2 rounded focus:outline-none"
          />
        </motion.div>

        {/* PAN */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <label className="block text-gray-700 font-medium">PAN Number</label>
          <input
            type="text"
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border p-2 rounded focus:outline-none"
          />
        </motion.div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-center">
        {editing ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin mr-2" /> : <FaSave className="mr-2" />}
            {loading ? "Saving..." : "Save"}
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          >
            <FaEdit className="mr-2" /> Edit Profile
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

export default Profile;
