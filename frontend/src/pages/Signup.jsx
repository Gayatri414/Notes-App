import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // <-- ESSENTIAL FIX

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false); // <-- NEW LOADING STATE

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages
    setLoading(true); // Start loading

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      
      console.log(response.data);
      setSuccess(" Signup successful! Redirecting...");
      setName("");
      setEmail("");
      setPassword("");
      // You might add a redirection here, e.g., navigate('/login');
      
    } catch (error) {
      console.error(error);
      // Use optional chaining for safer access to nested properties
      setErrorMsg(error.response?.data?.message || " Signup failed! Please try again.");
      
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border shadow-lg p-8 w-96 bg-white rounded-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ... Name Input ... */}
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* ... Email Input ... */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* ... Password Input ... */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter password"
              required
            />
          </div>

          {success && <p className="text-green-600 text-center">{success}</p>}
          {errorMsg && <p className="text-red-600 text-center">{errorMsg}</p>}

          <button
            type="submit"
            disabled={loading} // <-- DISABLES BUTTON WHEN LOADING
            className={`w-full font-semibold py-2 rounded-md transition ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' // Grey out button while loading
                : 'bg-teal-600 hover:bg-teal-700 text-white' 
            }`}
          >
            {loading ? "Processing..." : "Sign Up"} {/* <-- CHANGE TEXT WHILE LOADING */}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-teal-600 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;