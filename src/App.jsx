import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Navigation Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public/Guest Pages
import Home from './pages/Home';
import Showroom from './pages/Showroom';
import Booking from './pages/Booking';
import Reviews from './pages/Reviews';

// Dashboards and Auth Gate
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AuthGate from './pages/AuthGate';

function AppContent() {
  const { currentUser } = useAuth();

  // 📡 Live state array shared directly between Admin and User Dashboards
  const [rentals, setRentals] = useState([
    {
      id: 'B-9021',
      user: 'Shaik Mohammad Hafizulla',
      car: 'CyberTrack Horizon',
      status: 'Pending',
      date: 'Today',
      reason: 'Awaiting security matrix evaluation and driver documentation clearance terminal verification.',
      feedback: 'Your profile validation score is solid! Please upload a clear photo of your driver\'s license inside our terminal to automatically bypass the verification hold.'
    },
    {
      id: 'B-4811',
      user: 'Sarah Connor',
      car: 'Veloce Roadster S',
      status: 'Pending',
      date: 'Yesterday',
      reason: 'Vehicle asset undergoing scheduled telemetry calibration.',
      feedback: 'Standby. Your vehicle assignment will proceed immediately following physical diagnostics.'
    },
  ]);

  // 🔄 State modifier updates the status from Admin, immediately changing the view for the User
  const handleRentalStatusChange = (id, newStatus) => {
    setRentals(prevRentals =>
      prevRentals.map(rental =>
        rental.id === id ? { ...rental, status: newStatus } : rental
      )
    );
  };

  // 🔒 GUARD GATEWAY: If user is not logged in, show the AuthGate page exclusively
  if (!currentUser) {
    return <AuthGate />;
  }

  // 🔓 APP UNLOCKED: Render full application with interactive path arrays once signed in
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col justify-between selection:bg-cyber-teal selection:text-black">
      <div className="w-full">
        {/* Fixed position animated header */}
        <Navbar />

        {/* Main page layout mount container */}
        <main className="w-full min-h-screen">
          <Routes>
            {/* Standard Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/showroom" element={<Showroom />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/reviews" element={<Reviews />} />

            {/* Interactive Client Panel (Receives state array data) */}
            <Route
              path="/dashboard"
              element={<UserDashboard rentals={rentals} />}
            />

            {/* System Admin Dashboard (Receives array data and updater function) */}
            <Route
              path="/admin"
              element={
                <AdminDashboard
                  rentals={rentals}
                  onStatusChange={handleRentalStatusChange}
                />
              }
            />

            {/* Error Catch-All Safe Fallback Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

// Global top-level Providers wrapper
export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}