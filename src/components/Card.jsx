import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaCommentDots, FaVideo } from "react-icons/fa";

function Card({ lawyer }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <motion.div
        layoutId={lawyer.id}
        animate={{ scale: isExpanded ? 1.03 : 1 }}
        className={`relative bg-white p-6 rounded-2xl shadow-lg transition-all cursor-pointer ${
          isExpanded ? "z-50 shadow-2xl border mx-auto border-blue-400 absolute w-[320px]" : ""
        }`}
      >
        {/* Basic Info */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">{lawyer.name}</h3>
            <p className="text-gray-600">{lawyer.designation}</p>
            <p className="text-gray-500">{lawyer.district}</p>
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 hover:text-blue-700 transition-all"
          >
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 border-t pt-4 text-gray-700"
          >
            <p>
              <strong>Qualification:</strong> {lawyer.qualification}
            </p>
            <p>
              <strong>Age:</strong> {lawyer.age}
            </p>
            {lawyer.gender && (
              <p>
                <strong>Gender:</strong> {lawyer.gender}
              </p>
            )}
            {lawyer.email && (
              <p>
                <strong>Email:</strong> {lawyer.email}
              </p>
            )}
            {lawyer.phone && (
              <p>
                <strong>Phone:</strong> {lawyer.phone}
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-col gap-3 mt-4">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2 transition-all">
                <FaCommentDots /> Contact
              </button>
              <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2 transition-all">
                <FaVideo /> Video Call
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Card;
