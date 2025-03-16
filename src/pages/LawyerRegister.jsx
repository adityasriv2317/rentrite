import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const sampleClients = [
  {
    id: 1,
    name: "Client A",
    email: "client.a@example.com",
    phone: "123-456-7890",
    case: "Case 1",
  },
  {
    id: 2,
    name: "Client B",
    email: "client.b@example.com",
    phone: "987-654-3210",
    case: "Case 2",
  },
  {
    id: 3,
    name: "Client C",
    email: "client.c@example.com",
    phone: "555-555-5555",
    case: "Case 3",
  },
];

const upcomingMeetings = [
  {
    id: 1,
    date: "2025-03-20",
    time: "10:00 AM",
    client: "Client A",
    topic: "Discussion on Case 1",
  },
  {
    id: 2,
    date: "2025-03-22",
    time: "02:00 PM",
    client: "Client B",
    topic: "Review of Case 2",
  },
  {
    id: 3,
    date: "2025-03-25",
    time: "11:00 AM",
    client: "Client C",
    topic: "Preparation for Case 3",
  },
];

function LawyerDB() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("lawyerToken");
    if (!token) {
      navigate("/lawyer-login");
    } else {
      const storedClients = JSON.parse(localStorage.getItem("clients")) || sampleClients;
      const storedMeetings = JSON.parse(localStorage.getItem("meetings")) || upcomingMeetings;
      setClients(storedClients);
      setMeetings(storedMeetings);
    }
  }, [navigate]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Lawyer Dashboard</h1>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Managed Clients</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-max bg-white border border-gray-200 text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b border-gray-300">ID</th>
                <th className="py-2 px-4 border-b border-gray-300">Name</th>
                <th className="py-2 px-4 border-b border-gray-300">Email</th>
                <th className="py-2 px-4 border-b border-gray-300">Phone</th>
                <th className="py-2 px-4 border-b border-gray-300">Case</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="text-center">
                  <td className="py-2 px-4 border-b border-gray-300">{client.id}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{client.name}</td>
                  <td className="py-2 px-4 border-b border-gray-300 break-words">{client.email}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{client.phone}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{client.case}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Upcoming Meetings</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-max bg-white border border-gray-200 text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b border-gray-300">ID</th>
                <th className="py-2 px-4 border-b border-gray-300">Date</th>
                <th className="py-2 px-4 border-b border-gray-300">Time</th>
                <th className="py-2 px-4 border-b border-gray-300">Client</th>
                <th className="py-2 px-4 border-b border-gray-300">Topic</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting) => (
                <tr key={meeting.id} className="text-center">
                  <td className="py-2 px-4 border-b border-gray-300">{meeting.id}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{meeting.date}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{meeting.time}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{meeting.client}</td>
                  <td className="py-2 px-4 border-b border-gray-300 break-words">{meeting.topic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}

export default LawyerDB;