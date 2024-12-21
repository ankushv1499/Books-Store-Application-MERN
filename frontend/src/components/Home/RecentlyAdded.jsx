import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";

const RecentlyAdded = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        // Corrected URL with http://
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-recent-books"
        );
        console.log(response.data.data); // Access 'data' from the response object
        setData(response.data.data); // Assuming the response contains the books data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetch();
  }, []);
  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-yellow-100">Recently Added Books</h4>
      <div className="my-8 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-3 gap-4">
        {Data &&
          Data.map((items, i) => (
            <div key={i}>
              <BookCard data={items} />{" "}
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
