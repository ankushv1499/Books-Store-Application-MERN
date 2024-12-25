import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr"; // Importing language icon from react-icons
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const ViewBookDetails = () => {
  const { id } = useParams(); // Retrieving the book ID from the URL parameters
  const [Data, setData] = useState([]); // State to store the fetched book data
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  // useEffect to fetch book data when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Making a GET request to the backend API to fetch book details by ID
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-book-by-id/${id}`
        );
        // Setting the fetched book data into state
        setData(response.data.data);
      } catch (error) {
        // Handle error if the API request fails
        console.error("Error fetching data:", error);
      }
    };
    fetchBooks(); // Fetch book data on component mount
  }, []);
  const headers = {
    id: localStorage.getItem("id"), // Get user ID from localStorage
    Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Bearer token for authorization header
    bookid: id,
  };
  const handleFavourite = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-book-to-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };
  const handleCart = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-to-cart",
      {},
      { headers }
    );
    alert(response.data.message)
  };

  return (
    <>
      {/* Rendering the book details only when the data is fetched */}
      {Data && (
        <div className="px-8 py-12 bg-zinc-900 flex flex-col md:flex-row gap-8 items-start">
          {/* Left side: Book image */}
          <div className="bg-zinc-800 rounded p-12 w-full md:w-3/6 lg:3/6 flex  justify-between items-center">
            {" "}
            <div className="bg-zinc-800 flex  justify-around">
              {" "}
              <img
                src={Data.url} // Displaying the book cover image
                alt={Data.title} // Alt text with book title for accessibility
                className="h-[50vh] md:h-[70vh] object-cover rounded shadow-md" // Responsive image styling
              />
              {isLoggedIn === true && role === "user" && (
                <div className="flex md:flex-col ml-6 space-y-4">
                  <button
                    className="bg-white rounded-full text-3xl p-4 text-red-500 hover:bg-red-100 transition duration-300 ease-in-out shadow-lg"
                    aria-label="Add to Favourites"
                    onClick={handleFavourite}
                  >
                    {" "}
                    <FaHeart />
                  </button>
                  <button
                    className="bg-white rounded-full text-3xl p-4 text-blue-500 hover:bg-blue-100 transition duration-300 ease-in-out shadow-lg"
                    aria-label="Add to Cart"
                    onClick={handleCart}
                  >
                    <FaCartShopping />
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex md:flex-col ml-6 space-y-4">
                  <button
                    className="bg-white rounded-full text-3xl p-4 text-red-500 hover:bg-red-100 transition duration-300 ease-in-out shadow-lg"
                    aria-label="Edit"
                  >
                    {" "}
                    <FaRegEdit />
                  </button>
                  <button
                    className="bg-white rounded-full text-3xl p-4 text-blue-500 hover:bg-blue-100 transition duration-300 ease-in-out shadow-lg"
                    aria-label="Add to Cart"
                  >
                    <MdOutlineDelete />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right side: Book details */}
          <div className="p-4 w-full md:w-3/6">
            {/* Book title */}
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {Data.title}
            </h1>

            {/* Book author */}
            <p className="text-zinc-400 mt-1">By {Data.author}</p>

            {/* Book description */}
            <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>

            {/* Language */}
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="me-3 text-xl" /> {/* Language icon */}
              {Data.language}
            </p>

            {/* Price */}
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price: {Data.price}
            </p>
          </div>
        </div>
      )}
      {/* Loading state if data is not yet fetched */}
      {!Data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader /> {/* Displaying loader while data is being fetched */}
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
