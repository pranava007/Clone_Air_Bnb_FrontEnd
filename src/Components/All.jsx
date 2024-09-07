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
    .filter((info) => info.status === "confirmed" && info.propertyId?._id) // Ensure status is confirmed and propertyId exists
    .map((info) => info.propertyId._id); // Extract the `_id` of the property

  console.log("Booked Property IDs:", bookedPropertyIds); // Debug log booked property IDs

  // Filter properties that are not booked
  const availableProperties = properties.filter((property) => {
    if (!property._id) {
      console.warn("Property missing _id:", property); // Warn if a property is missing an _id
      return false; // Exclude properties without an _id
    }
    return !bookedPropertyIds.includes(property._id); // Filter out booked properties
  });

  console.log("Available properties", availableProperties); // Debug log available properties

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
