import React from "react";
import { useSelector } from "react-redux";
import Cart from "./Cart";

const All = () => {
  const { properties = [] } = useSelector((state) => state.properties || {});
  const { bookingInfo = {} } = useSelector((state) => state.bookingInfo || {});

  console.log("bookingInfo",bookingInfo);
  
  const confirmedBookings = bookingInfo.bookings
    ? bookingInfo.bookings.filter((booking) => booking.status === "confirmed")
    : [];

  const confirmedPropertyIds = confirmedBookings.map(
    (booking) => booking.propertyId?._id
  );

  const filteredProperties = properties.filter(
    (property) => !confirmedPropertyIds.includes(property._id)
  );

  return (
    <div className="container">
      <div className="row justify-content-center">
        {/* Using map to render each property as a card */}
        {filteredProperties.map((element, index) => {
          return <Cart key={index} element={element} index={index} />;
        })}
      </div>
    </div>
  );
};

export default All;
