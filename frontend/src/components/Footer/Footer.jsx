import React from "react";

// Footer component is used to display the footer section of the website
const Footer = () => {
  return (
    // The footer element is styled with background color, text color, and padding
    <footer className="bg-gray-900 text-gray-300 py-3">
      {/* The container for the content of the footer, centered horizontally */}
      <div className="container mx-auto text-center">
        {/* Copyright notice with dynamic year */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Book Store. All rights reserved.
        </p>
        
        {/* Links section for Privacy Policy, Terms of Service, and Contact Us */}
        <div className="mt-2 flex justify-center space-x-4">
          {/* Link to Privacy Policy */}
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-all duration-200"
          >
            Privacy Policy
          </a>
          
          {/* Divider between links */}
          <span className="text-gray-600">|</span>

          {/* Link to Terms of Service */}
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-all duration-200"
          >
            Terms of Service
          </a>

          {/* Divider between links */}
          <span className="text-gray-600">|</span>

          {/* Link to Contact Us */}
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-all duration-200"
          >
            Contact Us
          </a>
        </div>

        {/* Social media icons section */}
        <div className="mt-4 flex justify-center space-x-4">
          {/* Facebook icon link */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-all duration-200"
          >
            <i className="fab fa-facebook-f"></i> {/* Facebook icon */}
          </a>

          {/* Twitter icon link */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-all duration-200"
          >
            <i className="fab fa-twitter"></i> {/* Twitter icon */}
          </a>

          {/* Instagram icon link */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-all duration-200"
          >
            <i className="fab fa-instagram"></i> {/* Instagram icon */}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
