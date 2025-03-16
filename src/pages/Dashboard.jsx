import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaRobot, FaTimes } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext"; // Import useAuth hook

function Dashboard() {
  const { user } = useAuth(); // Destructure user from useAuth
  const [lawyers, setLawyers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    // Simulated API call to fetch lawyers
    setTimeout(() => {
      setLawyers([
        { id: 1, name: "John Doe", specialty: "Family Law", location: "New York" },
        { id: 2, name: "Jane Smith", specialty: "Corporate Law", location: "San Francisco" },
        { id: 3, name: "Robert Johnson", specialty: "Criminal Law", location: "Chicago" },
      ]);
    }, 500);
  }, []);

  const filteredLawyers = lawyers.filter((lawyer) =>
    lawyer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-blue-600 text-center"
      >
        Welcome, {user?.name || "User"}!
      </motion.h2>

      {/* Search Bar */}
      <div className="flex justify-center mt-6">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search lawyers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Lawyers List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-3 gap-6 mt-8"
      >
        {filteredLawyers.map((lawyer) => (
          <motion.div
            key={lawyer.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
          >
            <h3 className="text-xl font-semibold">{lawyer.name}</h3>
            <p className="text-gray-600">{lawyer.specialty}</p>
            <p className="text-gray-500">{lawyer.location}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Contact
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* Chatbot Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center gap-2 hover:bg-blue-700"
        onClick={() => setChatOpen(!chatOpen)}
      >
        <FaRobot /> Chat
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-16 right-6 bg-white w-72 shadow-xl rounded-lg p-4"
          >
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="text-lg font-semibold">Chat with AI</h4>
              <button onClick={() => setChatOpen(false)} className="text-gray-600 hover:text-gray-800">
                <FaTimes />
              </button>
            </div>
            <div className="h-40 overflow-y-auto p-2 text-gray-700">AI Chat Interface Here...</div>
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;
