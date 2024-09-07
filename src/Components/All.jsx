import React from "react";
import { useSelector } from "react-redux";
import Cart from "./Cart";

const All = () => {
  const { properties } = useSelector((state) => state.properties);
  const { bookingInfo } = useSelector((state) => state.bookingInfo);

  console.log("Trending properties", properties);
  console.log("Booking Info", bookingInfo); // Log bookingInfo to check its structure

  // Check if bookingInfo is an object and not an array
  if (typeof bookingInfo !== "object" || Array.isArray(bookingInfo)) {
    console.error("bookingInfo is not an object or is an array:", bookingInfo);
    return null; // Return early if bookingInfo is not in the expected format
  }

  // Extract booking details if bookingInfo is an object
  const bookedPropertyIds = Object.values(bookingInfo)
    .filter((info) => info.status === "booked") // Adjust condition based on your actual data structure
    .map((info) => info.propertyId);

  // Filter properties that are not booked
  const availableProperties = properties.filter(
    (property) => !bookedPropertyIds.includes(property._id)
  );

  console.log("Available properties", availableProperties);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          {/* Render only available (not booked) properties */}
          {availableProperties.map((element, index) => (
            <Cart key={index} element={element} index={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default All;
