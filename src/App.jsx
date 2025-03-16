import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";

import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RentalAgreement from "./pages/RentalAgreements";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile, { ProfileProvider } from "./pages/Profile";
import LawyerDashboard from "./pages/LawyerDB";
import LawyerLogin from "./pages/LawyerLogin";
import LawyerRegister from "./pages/LawyerRegister";

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/agreements"
                element={
                  <ProtectedRoute>
                    <RentalAgreement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* lawyer routes */}
              <Route path="/lawyer/login" element={<LawyerLogin />} />
              <Route path="/lawyer/register" element={<LawyerRegister />} />
              <Route path="/lawyer" element={<LawyerDashboard />} />
            </Routes>
          </MainLayout>
        </Router>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
