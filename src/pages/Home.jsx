import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Home() {
  const navigate = useNavigate();
  const [showTopBtn, setShowTopBtn] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-[Inter]">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-center h-screen bg-gradient-to-t from-blue-800 to-blue-600 text-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto not-md:pt-0 p-6"
        >
          <h1 className="text-5xl font-extrabold leading-tight font-[Poppins]">
            Rent Agreements Made Simple
          </h1>
          <p className="mt-4 text-lg font-light">
            Create, manage, and sign rental agreements online - fast, secure,
            and hassle-free.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gray-100 text-blue-600 cursor-pointer font-bold rounded-lg shadow-lg hover:bg-white transition"
              onClick={() => navigate("/register")}
            >
              {user ? "Dashboard" : "Get Started"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border border-white text-white font-bold cursor-pointer rounded-lg shadow-lg hover:bg-white hover:text-blue-600 transition"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 bg-white">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-10 font-[Poppins]"
        >
          Why Choose RentRite?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Legally Compliant",
              description:
                "Generate agreements that are legally valid and accepted across India.",
              icon: "📝",
            },
            {
              title: "E-Signature Ready",
              description:
                "Digitally sign agreements and share them instantly with tenants or landlords.",
              icon: "✍️",
            },
            {
              title: "Instant Processing",
              description:
                "No more paperwork! Create agreements in minutes with our seamless platform.",
              icon: "⚡",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
              }}
              className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-all"
            >
              <span className="text-4xl">{feature.icon}</span>
              <h3 className="text-xl font-bold mt-3 font-[Poppins]">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2 font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-8 bg-gray-50">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-10 font-[Poppins]"
        >
          What Our Users Say
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Amit Kumar",
              feedback:
                "RentRite saved me so much time! I created and signed my rental agreement in minutes.",
              avatar: "🧑‍💼",
            },
            {
              name: "Priya Sharma",
              feedback:
                "The platform is easy to use and legally compliant. I highly recommend it!",
              avatar: "👩‍💼",
            },
          ].map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
              }}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-all"
            >
              <span className="text-4xl">{review.avatar}</span>
              <h3 className="text-lg font-bold mt-3 font-[Poppins]">
                {review.name}
              </h3>
              <p className="text-gray-600 mt-2 font-light">
                "{review.feedback}"
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold font-[Poppins]"
        >
          Ready to Simplify Your Rental Process?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg font-light"
        >
          Sign up now and create your first rental agreement in minutes!
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-200 transition"
        >
          Start Now
        </motion.button>
      </section>

      {/* Go to Top Button */}
      {showTopBtn && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-5 right-5 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FaArrowUp size={20} />
        </motion.button>
      )}
    </div>
  );
}

export default Home;
