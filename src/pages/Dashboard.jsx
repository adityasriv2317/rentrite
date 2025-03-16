import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import Card from "../components/Card"; // Import LawyerCard component
import Chatbot from "../components/Chatbot";

const API_URL = "https://rentify-fm53.onrender.com/lawyers/list-all";

function Dashboard() {
  const { user } = useAuth();
  const [lawyers, setLawyers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setLawyers(response.data))
      .catch((error) => console.error("Error fetching lawyers:", error));
  }, []);

  const filteredLawyers = lawyers.filter((lawyer) =>
    lawyer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toSentenceCase = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-blue-600 text-center"
      >
        Welcome, {toSentenceCase(user?.name) || "User"}...
      </motion.h2>

      {/* Search Bar */}
      <div className="relative w-full max-w-lg mt-6">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search lawyers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
      </div>

      {/* Lawyers List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full max-w-5xl"
      >
        {filteredLawyers.map((lawyer) => (
          <Card key={lawyer.id} lawyer={lawyer} />
        ))}
      </motion.div>
      <Chatbot />
    </div>
  );
}

export default Dashboard;
