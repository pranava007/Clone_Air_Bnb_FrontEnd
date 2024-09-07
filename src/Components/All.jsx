import React from "react";
import { useSelector } from "react-redux";
import Cart from "./Cart";

const All = () => {
  const { properties } = useSelector((state) => state.properties);
  const { bookingInfo } = useSelector((state) => state.bookingInfo);

  console.log("Trending properties", properties);
  console.log("Booking Info", bookingInfo); // Should show an empty array if there are no bookings

  // Check if bookingInfo is an array and handle the empty array case
  if (!Array.isArray(bookingInfo)) {
    console.error("bookingInfo is not an array:", bookingInfo);
    return null; // Return early if bookingInfo is not in the expected format
  }

  // If bookingInfo is empty, all properties are available
  const bookedPropertyIds = bookingInfo
    .filter((info) => info.status === "booked") // This will be skipped if bookingInfo is empty
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
