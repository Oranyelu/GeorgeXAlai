import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { session, logout } = useAuth();

  return (
    <header className="bg-[#135B3A] text-white p-4 shadow-md flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        George X Alai
      </Link>

      <div className="flex items-center space-x-6">
        {session && (
          <Link
            to="/profile"
            className="text-sm text-white hover:underline"
          >
            Profile
          </Link>
        )}

        {session ? (
          <button
            onClick={logout}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-sm"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/auth"
            className="bg-[#A37E2C] text-white px-4 py-2 rounded hover:bg-[#8a5b1f] text-sm"
          >
            Login/Signup
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
