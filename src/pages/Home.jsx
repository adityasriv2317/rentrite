import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[80vh]">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to RentRite</h1>
      <p className="text-gray-700 text-lg max-w-lg">
        Simplify your rental agreements with our easy-to-use digital platform. Create, sign, and manage rental documents effortlessly.
      </p>
      <Link
        to="/dashboard"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 transition"
      >
        Get Started
      </Link>
    </div>
  );
}

export default Home;
