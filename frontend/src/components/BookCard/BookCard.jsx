import React from "react";
import { Link } from "react-router-dom";

// The BookCard component is used to display a single book's details
const BookCard = ({ data }) => {
  return (
    // The Link component is used to make the entire card clickable, redirecting to the individual book page
    <Link
      to={`/book/${data._id}`} // Dynamically generating the URL using the book's unique ID
      className="block bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300 p-6 group"
    >
      {/* Image section for displaying the book's cover */}
      <div className="rounded-xl overflow-hidden relative">
        <img
          src={data.url} // Book cover image URL
          alt={data.title} // Book title for accessibility
          className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-110" // Image styles with hover effect
        />
        {/* Overlay gradient for image, making it darker for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 group-hover:opacity-60"></div>
      </div>
      
      {/* Book title with hover effect for color change */}
      <h2 className="mt-4 text-lg font-bold text-white truncate group-hover:text-yellow-400 text-center">
        {data.title} {/* Display the book title */}
      </h2>

      {/* Book author name with smaller font */}
      <p className="mt-2 text-gray-400 text-sm text-center">
        By {data.author} {/* Display the author's name */}
      </p>

      {/* Price section */}
      <p className="mt-3 text-yellow-500 font-bold text-lg text-center">
        {data.price.toFixed(2)} {/* Display the book price formatted to two decimal places */}
      </p>

      {/* Add to Cart button */}
      <div className="mt-4 flex justify-center">
        <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-2 rounded-full text-sm font-medium shadow-lg transform transition-all duration-300 hover:scale-105">
          Add to Cart {/* Button text */}
        </button>
      </div>
    </Link>
  );
};