import React from "react";
import { Link } from "react-router-dom"; // ✅ Required import
import { useAuth } from "../context/ContextProvider";

const Navbar = () => {
  const {user}=useAuth()
  const handleLogout = () => {
    // For now, just a placeholder
    console.log("User logged out!");
    // Later: clear auth token and navigate to /login
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center shadow-md">
      {/* Brand Name */}
      <div className="text-2xl font-bold">
        <Link to="/">NotesApp</Link> {/* ✅ Correct Link usage */}
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search notes..."
        className="bg-gray-700 px-4 py-2 rounded text-white focus:outline-none"
      />

      {/* Navigation Links */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-300">Username</span>
        {!user?(
        <>
        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
        >
          Signup
        </Link>
        
        </>
        
        ):(
       <>
       <span className="mr-4">{user.name}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
        </>
        )
      }
      </div>
    </nav>
  );
};

export default Navbar;
