import React from "react";
import { useSelector } from "react-redux";
import Cart from "./Cart";

const All = () => {
  const { properties } = useSelector((state) => state.properties);
  const { bookingInfo } = useSelector((state) => state.bookingInfo);
  // console.log( 'Trending', properties);
  // console.log( 'bookinginfo', bookingInfo);
  // console.log( 'bookinginfo', bookingInfo.bookings.status === "confirmed");

  const confirmedBookings = bookingInfo.bookings.filter(
    (booking) => booking.status === "confirmed"
  );

  // console.log("Trending", properties[0]._id);
  // console.log("confirm book", confirmedBookings[0].propertyId._id);

  // Assuming confirmedBookings is already filtered for "confirmed" bookings
  const confirmedPropertyIds = confirmedBookings.map(
    (booking) => booking.propertyId._id
  );

  const filteredProperties = properties.filter(
    (property) => !confirmedPropertyIds.includes(property._id)
  );

  // console.log('Filtered Properties:', filteredProperties);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          {/* Using map to render each property as a card */}
          {filteredProperties.map((element, index) => {
            return <Cart element={element} index={index} />;
          })}
        </div>
      </div>
    </>
  );
};

export default All;
