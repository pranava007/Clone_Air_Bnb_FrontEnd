import React from "react";
import { useSelector } from "react-redux";
import Cart from "./Cart";

const All = () => {
  const { properties } = useSelector((state) => state.properties);
  const { bookingInfo } = useSelector((state) => state.bookingInfo);

  // Filter properties that are not booked
  const availableProperties = properties.filter((property) => {
    // Assuming each property has a bookingInfo array that defines its status
    const isBooked = bookingInfo.some((info) => info.propertyId === property._id && info.status === "booked");
    return !isBooked; // Only include properties that are not booked
  });

  console.log('Trending', properties);
  console.log('Available properties', availableProperties);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          {/* Render only available (not booked) properties */}
          {availableProperties.map((element, index) => {
            return <Cart key={index} element={element} index={index} />;
          })}
        </div>
      </div>
    </>
  );
};

export default All;
