import React from "react";
import { useSelector } from "react-redux";
import Filterpage from "./Filterpage";
import Cart from "./Cart";

const Trending = () => {
  // Use safe defaults and handle potential undefined values
  const properties = useSelector((state) => state.properties?.properties || []);
  const bookingInfo = useSelector((state) => state.bookingInfo?.bookingInfo || { bookings: [] });

  console.log("bookingInfo",bookingInfo);
  

  // Ensure bookingInfo.bookings is an array and filter confirmed bookings
  const confirmedBookings = Array.isArray(bookingInfo.bookings)
    ? bookingInfo.bookings.filter((booking) => booking.status === "confirmed")
    : [];

  // Extract property IDs of confirmed bookings, ensuring propertyId exists
  const confirmedPropertyIds = confirmedBookings
    .map((booking) => booking.propertyId?._id)
    .filter((id) => id); // Filter out undefined or null IDs

  // Filter properties with 'Trending' category and exclude confirmed bookings
  const filterlist = properties.filter(
    (property) =>
      property.category === "Trending" &&
      !confirmedPropertyIds.includes(property._id)
  );

  return (
    <>
      <Filterpage />

      <div className="container">
        <div className="row justify-content-center">
          {/* Using map to render each property as a card */}
          {filterlist.map((element) => (
            <Cart key={element._id} element={element} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Trending;
