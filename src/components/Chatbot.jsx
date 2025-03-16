import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaRobot, FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const botApi = "https://rentify-fm53.onrender.com/chat";

const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  if (!user) {
    return null; // Hide the Chatbot if the user is not logged in
  }

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    const userMessage = { sender: "user", text: message };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);
    
    try {
      const response = await axios.post(botApi, {
        query: message,
        region: "India",
      });
      
      const botMessage = { sender: "bot", text: response.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Error fetching response. Please try again." }]);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-8 right-6 z-50">
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="bg-blue-500 hover:bg-blue-700 transition-all ease-in-out text-white cursor-pointer p-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <FaRobot />
        <span>Chatbot</span>
      </button>
      
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
          >
            <div className="bg-white w-full max-w-md h-3/4 p-6 rounded-lg shadow-xl flex flex-col">
              <div className="flex justify-between items-center border-b pb-3">
                <h4 className="text-lg font-semibold">Chat with AI</h4>
                <button
                  onClick={() => setChatOpen(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-2 text-gray-700">
                {messages.map((msg, index) => (
                  <div key={index} className={`p-2 my-1 rounded-lg ${msg.sender === "user" ? "bg-blue-100 self-end" : "bg-gray-200 self-start"}`}>
                    {msg.text}
                  </div>
                ))}
                {loading && <div className="text-gray-500">Typing...</div>}
              </div>
              
              <div className="flex items-center mt-3">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;