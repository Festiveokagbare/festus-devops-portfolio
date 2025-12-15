// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";

// Public Pages
import Home from "./pages/Home";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import Careers from "./pages/Careers";
import Login from "./pages/Login";
import Register from "./pages/Register";

// User Dashboard Layout + Pages
import DashboardLayout from "./layouts/DashboardLayout";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import Expenses from "./pages/Dashboard/Expenses";
import Savings from "./pages/Dashboard/Savings";
import Profile from "./pages/Dashboard/Profile";
import Settings from "./pages/Dashboard/Settings";

// Admin Page
import AdminDashboard from "./pages/Dashboard/AdminDashboard";

// Route Guards
import PrivateRoute from "./routes/PrivateRoute";
import RoleBasedRoute from "./routes/RoleBasedRoute";

function AppRoutes() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected User Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="savings" element={<Savings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Protected Admin Route */}
        <Route
          path="/admin/dashboard"
          element={
            <RoleBasedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </RoleBasedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}
