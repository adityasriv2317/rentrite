function Dashboard() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">My Agreements</h2>
            <p className="text-gray-500 mt-2">View and manage your rental agreements.</p>
          </div>
  
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">New Agreement</h2>
            <p className="text-gray-500 mt-2">Create a new rental agreement quickly.</p>
          </div>
  
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">Profile Settings</h2>
            <p className="text-gray-500 mt-2">Update your personal and contact details.</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default Dashboard;
  