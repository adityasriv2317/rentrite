import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaEdit, FaSave, FaSpinner, FaCamera } from "react-icons/fa";

// Profile Context
const ProfileContext = createContext();
const API_URL = "https://rentify-fm53.onrender.com/users/update-profile";

// Profile Provider
export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState({
    name: "John Doe",
    age: "30",
    gender: "Male",
    aadhaar: "1234-5678-9012",
    pan: "ABCDE1234F",
    avatar: "", // Profile Picture URL
  });

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
  const { profile, updateProfile } = useProfile();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [avatar, setAvatar] = useState(profile.avatar || "https://via.placeholder.com/150");

  useEffect(() => {
    setFormData(profile);
    setAvatar(profile.avatar || "https://via.placeholder.com/150");
  }, [profile]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile update
  const handleUpdate = async () => {
    setLoading(true);
    await updateProfile({ ...formData, avatar });
    setEditing(false);
    setLoading(false);
  };

  // Handle avatar change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-10"
    >
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
        {/* Avatar Section */}
        <div className="relative">
          <img src={avatar} alt="Profile" className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover" />
          {editing && (
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer">
              <FaCamera />
              <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </label>
          )}
        </div>

        {/* Profile Info */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
          <p className="text-gray-500">{profile.age} years old</p>
          <p className="text-gray-500">{profile.gender}</p>
        </div>
      </div>

      {/* Editable Fields */}
      <div className="mt-6 space-y-4">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border p-2 rounded focus:outline-none"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-gray-700 font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border p-2 rounded focus:outline-none"
          />
        </div>

        {/* Gender */}
        <div>
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
        </div>

        {/* Aadhaar */}
        <div>
          <label className="block text-gray-700 font-medium">Aadhaar Number</label>
          <input
            type="text"
            name="aadhaar"
            value={formData.aadhaar}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border p-2 rounded focus:outline-none"
          />
        </div>

        {/* PAN */}
        <div>
          <label className="block text-gray-700 font-medium">PAN Number</label>
          <input
            type="text"
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border p-2 rounded focus:outline-none"
          />
        </div>
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
