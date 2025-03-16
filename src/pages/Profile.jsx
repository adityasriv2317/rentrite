import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaEdit, FaSave, FaSpinner, FaCamera } from "react-icons/fa";
import Chatbot from "../components/Chatbot";

// Profile Context
const ProfileContext = createContext();
const API_URL = "https://rentify-fm53.onrender.com/users/update/";
const profileAPI = "https://rentify-fm53.onrender.com/users/findByEmail/";
const imgURL = "https://rentify-fm53.onrender.com/users/uploadPhoto/";

// Profile Provider
export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    adhaarNum: "",
    panCardNum: "",
    profilePhoto: "",
  });

  const updateProfile = async (updatedData, image) => {
    const email = profile.email;
    try {
      const response = await axios.put(`${API_URL}${email}`, updatedData);
      if (response.status === 200) {
        setProfile(updatedData);
        console.log("Profile updated successfully");
      }
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
    }

    const formData = new FormData();
    formData.append("file", image);
    const userName = profile.name;
    try {
      const response = await axios.post(`${imgURL}${userName}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        setProfile(updatedData);
        console.log("Profile updated - -successfully");
      }
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [profilePhoto, setprofilePhoto] = useState(
    profile.profilePhoto || "https://via.placeholder.com/150"
  );

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const storedUser = localStorage.getItem("user"); // Get user object from local storage
      if (!storedUser) {
        console.error("No user found in local storage");
        setLoading(false);
        return;
      }

      const { email } = JSON.parse(storedUser); // Parse the user object and get the email
      if (!email) {
        console.error("No email found in user object");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${profileAPI}${email}`);
        setProfile(response.data);
      } catch (error) {
        console.error(
          "Error fetching profile:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    setFormData(profile);
    setprofilePhoto(profile.profilePhoto || "https://via.placeholder.com/150");
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setSaving(true);
    await updateProfile({ ...formData, profilePhoto });
    setEditing(false);
    setSaving(false);
  };

  const handleprofilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setprofilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateCompletion = () => {
    const fields = [
      "name",
      "email",
      "age",
      "gender",
      "adhaarNum",
      "panCardNum",
    ];
    const filledFields = fields.filter((field) => profile[field]);
    return (filledFields.length / fields.length).toFixed(3) * 100;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-4xl" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-10"
    >
      <h1 className="text-3xl font-bold text-center mb-6">My Profile</h1>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <img
            src={profilePhoto}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
          />
          {editing && (
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer">
              <FaCamera />
              <input
                type="file"
                accept="image/*"
                onChange={handleprofilePhotoChange}
                className="hidden"
              />
            </label>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Personal Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!editing}
              className="w-full border p-2 rounded focus:outline-none"
            />
          </div>
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
          <div>
            <label className="block text-gray-700 font-medium">
              Adhaar Number
            </label>
            <input
              type="text"
              name="adhaarNum"
              value={formData.adhaarNum}
              onChange={handleChange}
              disabled={!editing}
              className="w-full border p-2 rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              PAN Number
            </label>
            <input
              type="text"
              name="panCardNum"
              value={formData.panCardNum}
              onChange={handleChange}
              disabled={!editing}
              className="w-full border p-2 rounded focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        {editing ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
            disabled={saving}
          >
            {saving ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              <FaSave className="mr-2" />
            )}
            {saving ? "Saving..." : "Save"}
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

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Profile Completion
        </h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${calculateCompletion()}%` }}
          ></div>
        </div>
        <p className="text-gray-600 mt-2 text-center">
          {calculateCompletion()}% Complete
        </p>
      </div>
      <Chatbot />
    </motion.div>
  );
}

export default Profile;
