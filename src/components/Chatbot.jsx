import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaRobot, FaPaperPlane } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  if (!user) {
    return null; // Hide the Chatbot if the user is not logged in
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Message sent:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-8 right-6">
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="bg-blue-500 hover:bg-blue-700 transition-all ease-in-out text-white cursor-pointer p-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <FaRobot />
        <span>Chatbot</span>
      </button>
      {/* Chat Window */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-12 right-6 bg-white w-80 shadow-xl rounded-lg p-4"
          >
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="text-lg font-semibold">Chat with AI</h4>
              <button
                onClick={() => setChatOpen(false)}
                className="text-gray-600 cursor-pointer hover:text-gray-800"
              >
                <FaTimes />
              </button>
            </div>
            <div className="h-40 overflow-y-auto p-2 text-gray-700">
              AI Chat Interface Here...
            </div>
            <div className="flex items-center mt-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 text-blue-500 cursor-pointer hover:text-blue-700"
              >
                <FaPaperPlane size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
