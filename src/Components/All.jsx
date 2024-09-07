import React from "react";
import { useSelector } from "react-redux";
import Cart from "./Cart";

const All = () => {
  const { properties } = useSelector((state) => state.properties);
  const { bookingInfo } = useSelector((state) => state.bookingInfo);

  console.log("Trending", properties);
  console.log("Booking Info", bookingInfo); // Log bookingInfo to check its structure

  // Ensure bookingInfo is an array
  if (!Array.isArray(bookingInfo)) {
    console.error("bookingInfo is not an array:", bookingInfo);
    return null; // Return early if bookingInfo is not in the expected format
  }

  // Filter properties that are not booked
  const availableProperties = properties.filter((property) => {
    // Check if bookingInfo contains any entry with propertyId matching the property's _id and status is "booked"
    const isBooked = bookingInfo.some(
      (info) => info.propertyId === property._id && info.status === "booked"
    );
    return !isBooked; // Only include properties that are not booked
  });

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
