import React from "react";
import { useSelector } from "react-redux";
import Filterpage from "./Filterpage";
import Cart from "./Cart";

const Towers = () => {
  const { properties } = useSelector((state) => state.properties);
  const { bookingInfo } = useSelector((state) => state.bookingInfo);

  // Get confirmed bookings
  const confirmedBookings = bookingInfo.bookings.filter(
    (booking) => booking.status === "confirmed"
  );

  // Extract property IDs of confirmed bookings
  const confirmedPropertyIds = confirmedBookings.map(
    (booking) => booking.propertyId._id
  );

  // Filter properties with 'Towers' category and exclude confirmed bookings
  const filterlist = properties.filter(
    (property) =>
      property.category === "Towers" &&
      !confirmedPropertyIds.includes(property._id)
  );

  return (
    <>
      <Filterpage />
      <div className="container">
        <div className="row justify-content-center">
          {/* Using map to render each property as a card */}
          {filterlist.map((element, index) => (
            <Cart element={element} index={index} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Towers;
