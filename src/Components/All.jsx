import React from "react";
import { useSelector } from "react-redux";
import Cart from "./Cart";

const All = () => {
  const { properties } = useSelector((state) => state.properties);
  const { bookingInfo  } = useSelector((state)=>state.bookingInfo)
  console.log( 'Trending', properties);
  console.log( 'Trending', bookingInfo);
  // const {} =  useSelector((state)=>)

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          {/* Using map to render each property as a card */}
          {properties.map((element, index) => {
            return <Cart element={element} index={index} />;
          })}
        </div>
      </div>
    </>
  );
};

export default All;
