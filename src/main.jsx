import { Toaster } from "react-hot-toast"; // Use Toaster instead of ToastContainer
import { AuthProvider } from "./context/AuthContext";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import TributeForm from "./components/TributeForm";
import TributeView from "./components/TributeView";
import PDFExport from "./components/PDFExport";
import TributeRoom from "./components/TributeRoom";
import PaymentForm from "./components/PaymentForm";
import Dashboard from "./components/Dashboard";
import LoginSignup from "./components/LoginSignup";
import PrivateRoute from "./components/PrivateRoute";
import UserProfile from "./components/UserProfile";
import "./index.css";
import Profile from "./components/Profile";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster position="top-center" />{" "}
      {/* Use Toaster for toast notifications */}
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth" element={<LoginSignup />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/tribute-form"
            element={
              <PrivateRoute>
                <TributeForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/pay"
            element={
              <PrivateRoute>
                <PaymentForm />
              </PrivateRoute>
            }
          />
          <Route path="/tribute/:id" element={<TributeView />} />
          <Route path="/room/:id" element={<TributeRoom />} />
          <Route path="/export/:id" element={<PDFExport />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
