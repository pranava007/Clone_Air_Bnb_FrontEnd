import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PreviousPost = () => {
  const { currentuser } = useSelector((state) => state.user);
  const [properties, setProperties] = useState([]);

  // console.log(currentuser.rest._id);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://clone-air-bnb-backend.onrender.com/api/property/getproperty`
      );
      //   setProperties(response.data.result); // Assuming the API returns an array of properties
      const filterproperty = response.data.result.filter(
        (item) => item.hostId === currentuser.rest._id
      );
      setProperties(filterproperty);
      // console.log(filterproperty);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        {/* Using map to render each property as a card */}
        {properties.map((property, index) => (
          <div key={index} className="col-12 col-md-5 mb-4">
            <div className="card shadow-sm">
              {/* Carousel for property images */}
              <div
                id={`carousel${index}`}
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {property.images && property.images.length > 0 ? (
                    property.images.map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className={`carousel-item ${
                          imgIndex === 0 ? "active" : ""
                        }`}
                      >
                        <img
                          src={image}
                          alt={property.title || "Property Image"}
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
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target={`#carousel${index}`}
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <h5 className="card-title">{property.title}</h5>
                    {/* <p className="card-text">{property.description}</p> */}
                  </div>
                  <div className="col-12 col-md-6">
                    <p className="card-text">
                      <strong>Location:</strong> {property.location}
                    </p>
                    <p className="card-text">
                      <strong>categories:</strong> {property.category}
                    </p>
                    <p className="card-text">
                      <strong>Price:</strong> ${property.pricePerNight} per
                      night
                    </p>
                    {/* <p className="card-text"><strong>Amenities:</strong> {property.amenities.join(', ')}</p> */}
                    {/* <p className="card-text"><strong>Booking:</strong> {property.bookings.length}</p> */}
                    {/* <p className="card-text"><strong>Available:</strong> {property.availability.startDate} - {property.availability.endDate}</p> */}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12 d-flex justify-content-between">
                    <button className="btn btn-success">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousPost;
