import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // ✅ if using React Router

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      console.log(response.data);
      setSuccess("✅ Login successful!");
      setErrorMsg("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || "❌ Login failed!");
      setSuccess("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border shadow-lg p-8 w-96 bg-white rounded-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
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
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-md transition"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-teal-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
