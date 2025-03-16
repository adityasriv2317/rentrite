import { useState } from "react";

function Agreements() {
  // Dummy agreement data (Replace with API call later)
  const [agreements, setAgreements] = useState([
    { id: 1, title: "Rental Agreement - Apartment A", status: "Signed" },
    { id: 2, title: "Lease Agreement - Office Space", status: "Pending" },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Agreements</h1>

      {/* New Agreement Button */}
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-4">
        + New Agreement
      </button>

      {/* Agreement List */}
      <div className="bg-white shadow-md rounded-lg p-4">
        {agreements.length > 0 ? (
          agreements.map((agreement) => (
            <div key={agreement.id} className="border-b py-3 flex justify-between">
              <p className="text-gray-700">{agreement.title}</p>
              <span className={`px-3 py-1 rounded-md ${agreement.status === "Signed" ? "bg-green-500 text-white" : "bg-yellow-500 text-black"}`}>
                {agreement.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No agreements found.</p>
        )}
      </div>
    </div>
  );
}

export default Agreements;
