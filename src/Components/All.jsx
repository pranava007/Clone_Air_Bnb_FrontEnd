import React from "react";
import { useSelector } from "react-redux";
import Cart from "./Cart";

const All = () => {
  const { properties } = useSelector((state) => state.properties);
  const { bookingInfo } = useSelector((state) => state.bookingInfo);

  console.log("Trending properties", properties);
  console.log("Booking Info", bookingInfo); // Log to see the current structure

  // Check if bookingInfo is defined and an array
  if (!bookingInfo || !Array.isArray(bookingInfo)) {
    console.error("bookingInfo is not an array or is undefined:", bookingInfo);
    return (
      <>
        <div className="container">
          <div className="row justify-content-center">
            {/* Handle empty or invalid bookingInfo gracefully */}
            {properties.map((element, index) => (
              <Cart key={index} element={element} index={index} />
            ))}
          </div>
        </div>
      </>
    );
  }

  // If bookingInfo is properly defined as an array, proceed with filtering
  const bookedPropertyIds = bookingInfo
    .filter((info) => info.status === "confirmed") // Filter for booked statuses
    .map((info) => info.propertyId); // Extract booked property IDs

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
