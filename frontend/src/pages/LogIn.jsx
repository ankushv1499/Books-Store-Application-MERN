import React, { useState } from "react";
import { Link } from "react-router-dom"; // For navigation

const LogIn = () => {
  // State to hold form data for username and password
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // State to handle validation errors
  const [error, setError] = useState("");

  // Handle form input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructuring the input field name and value
    setFormData({ ...formData, [name]: value }); // Update the respective field in formData state
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page on submit
    const { username, password } = formData;

    // Validation checks for empty fields
    if (!username || !password) {
      setError("Both fields are required."); // Error if any field is empty
      return;
    }
    // Password length validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError(""); // Clear errors if validation passes
    console.log("Login Successful", formData); // Simulate form submission
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-md">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-yellow-400">Log In</h2>

        {/* Display error if any validation fails */}
        {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        
        <form className="mt-6" onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-gray-400">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 mt-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your username"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-400">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mt-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 mt-4 bg-yellow-400 text-gray-900 rounded font-semibold hover:bg-yellow-500 transition-all duration-300"
          >
            Log In
          </button>
        </form>

        {/* Link to Signup page for users without an account */}
        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-yellow-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
