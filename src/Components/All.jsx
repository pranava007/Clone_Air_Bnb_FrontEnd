import React from "react";
import { useSelector } from "react-redux";
import Cart from "./Cart";

const All = () => {
  const { properties } = useSelector((state) => state.properties);
  const { bookingInfo } = useSelector((state) => state.bookingInfo);

  console.log("Trending properties", properties);
  console.log("Booking Info", bookingInfo); // Debug log to see the current structure

  // Ensure bookingInfo is defined and is an array; if not, default to an empty array
  const validBookingInfo = Array.isArray(bookingInfo) ? bookingInfo : [];

  // Extract booked property IDs from validBookingInfo
  const bookedPropertyIds = validBookingInfo
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
