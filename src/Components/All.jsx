import React from "react";
import { useSelector } from "react-redux";
import Cart from "./Cart";

const All = () => {
  const { properties } = useSelector((state) => state.properties);
  console.log( 'Trending', properties);
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
