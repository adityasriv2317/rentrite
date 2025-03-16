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
      {/* Chatbot Toggle Button */}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40"
          >
            <div className="bg-white w-screen h-screen p-6 md:p-8 lg:p-10 rounded-lg shadow-2xl relative">
              {/* Header */}
              <div className="flex justify-between items-center border-b pb-3">
                <h4 className="text-lg font-semibold">Chat with AI</h4>
                <button
                  onClick={() => setChatOpen(false)}
                  className="text-gray-600 hover:text-gray-800 text-xl"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="h-[80vh] overflow-y-auto p-2 text-gray-700">
                AI Chat Interface Here...
              </div>

              {/* Input Area */}
              <div className="flex items-center mt-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="ml-3 text-blue-500 cursor-pointer hover:text-blue-700"
                >
                  <FaPaperPlane size={22} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
