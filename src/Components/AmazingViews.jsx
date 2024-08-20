import React from "react";
import { useSelector } from "react-redux";
import Filterpage from "./Filterpage";
import Cart from './Cart'

const AmazingViews = () => {
  const { properties } = useSelector((state) => state.properties);
  // console.log( 'Trending', properties);

  const filterlist = properties.filter(
    (item) => item.category === "AmazingViews"
  );
  // console.log('filter test',filterlist);

  return (
    <>
      <Filterpage />
      <div className="container">
        <div className="row justify-content-center">
          {/* Using map to render each property as a card */}
          {filterlist.map((element, index) => {
            return <Cart element={element} index={index} />;
          })}
        </div>
      </div>
    </>
  );
};

export default AmazingViews;
