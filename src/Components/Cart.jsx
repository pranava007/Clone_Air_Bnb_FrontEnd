import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Cart = ({ element,index }) => {
  // Destructure element properties
  const {
    title = "Untitled",
    images = [],
    availability = {},
    pricePerNight = "N/A",
  } = element;

  console.log("element :",element);
  

  return (
    <div className="col-12 col-sm-6 col-lg-3 mb-4">
      <div className="card shadow-sm" style={{ minHeight: "500px", maxHeight: "500px" }}>
        {/* Carousel for element images */}
        <div id={`carousel${title}`} className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {images.length > 0 ? (
              images.map((image, imgIndex) => (
                <div
                  key={imgIndex}
                  className={`carousel-item ${imgIndex === 0 ? "active" : ""}`}
                >
                  <img
                    src={image}
                    alt={title}
                    className="d-block w-100"
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                </div>
              ))
            ) : (
              <div className="carousel-item active">
                <img
                  src="https://via.placeholder.com/400x300"
                  alt="Placeholder"
                  className="d-block w-100"
                  style={{ height: "300px", objectFit: "cover" }}
                />
              </div>
            )}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#carousel${title}`}
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#carousel${title}`}
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-12">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">
                {availability.startDate ? availability.startDate : "N/A"} -{" "}
                {availability.endDate ? availability.endDate : "N/A"}
              </p>
              <p className="card-text">₹{pricePerNight} per night</p>

              {/* Link to details page */}
              <Link to={`/cart/${index}`} className="btn btn-primary">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  element: PropTypes.shape({
    title: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    availability: PropTypes.shape({
      startDate: PropTypes.string,
      endDate: PropTypes.string,
    }),
    pricePerNight: PropTypes.number,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Cart;
