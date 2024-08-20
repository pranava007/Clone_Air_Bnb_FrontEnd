import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ element, index }) => {
  return (
    <div key={index} className="col-12 col-sm-6 col-lg-3 mb-4">
      <div className="card shadow-sm" style={{ minHeight: "500px", maxHeight: "500px" }}>
        {/* Carousel for element images */}
        <div id={`carousel${index}`} className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {element.images && element.images.length > 0 ? (
              element.images.map((image, imgIndex) => (
                <div
                  key={imgIndex}
                  className={`carousel-item ${imgIndex === 0 ? "active" : ""}`}
                >
                  <img
                    src={image}
                    alt={element.title || "element Image"}
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
            data-bs-target={`#carousel${index}`}
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#carousel${index}`}
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-12">
              <h5 className="card-title">{element.title}</h5>
              {/* <p className="card-text">{element.description}</p> */}
              <p className="card-text">
                {element.availability.startDate} - {element.availability.endDate}
              </p>
              <p className="card-text">₹{element.pricePerNight} per night</p>

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

export default Cart;
