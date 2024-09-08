import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Grate from "../Components/Grate";
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import BookingCard from "../Components/BookingCard";
import ReviewForm from "../Components/ReviewForm";

const CartDetails = ({ items }) => {
  console.log('item', items);

  // Fetching reviews from Redux state
  const { reviwe } = useSelector((state) => state.reviwe);
  console.log("reviwe", reviwe);

  const { index } = useParams();
  const element = items[index];
  console.log("element check:", element);
  console.log("property element id:", element?._id);

  const rating = 5.0;
  const reviews = 7;
  const isGuestFavourite = true;

  const { currentuser } = useSelector((state) => state.user);
  console.log(currentuser);

  const userId = currentuser?.rest?._id;

  // Check if reviews and element are available before accessing
  const ReviweproducteId = reviwe[index]?.propertyId?._id;
  console.log('ReviweproducteId', ReviweproducteId);

  // Ensure host details are correctly matched
  const hostDetails =
    currentuser?.rest?._id && element.hostId && currentuser?.rest?._id === element.hostId
      ? currentuser
      : null;

  console.log("hostDetails:", hostDetails);

  // Filter reviews for the current property
  const filteredReviews = reviwe.filter((review) => review.propertyId._id === element._id);

  return (
    <div className="container mt-4">
      <h2>{element?.title || "Loading..."}</h2>

      {/* Image Section */}
      <div className="row mb-2">
        {/* Big Image */}
        <div className="col-md-8">
          {element?.images && element.images.length > 0 ? (
            <img
              src={element.images[0]}
              alt={element.title || "Property Image"}
              className="d-block w-100"
              style={{ height: "350px", objectFit: "cover", borderRadius: "20px" }}
            />
          ) : (
            <img
              src="https://via.placeholder.com/400x245"
              alt="Placeholder"
              className="d-block w-100"
              style={{ height: "350px", objectFit: "cover", borderRadius: "20px" }}
            />
          )}
        </div>

        {/* Small Images */}
        <div className="col-md-4">
          <div className="row g-1">
            {element?.images && element.images.length > 1 ? (
              element.images.slice(1).map((image, imgIndex) => (
                <div className="col-6" key={imgIndex}>
                  <img
                    src={image}
                    alt={element.title || "Property Image"}
                    className="w-100"
                    style={{ height: "175px", objectFit: "cover", borderRadius: "20px" }}
                  />
                </div>
              ))
            ) : (
              <div className="col-12">
                <img
                  src="https://via.placeholder.com/400x245"
                  alt="Placeholder"
                  className="w-100"
                  style={{ height: "175px", objectFit: "cover", borderRadius: "20px" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <hr />

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <h2>{element?.sub_title || "Loading..."}</h2>
            <p>Rating & Review</p>
            {hostDetails && (
              <>
                <strong>Host:</strong> <p>{hostDetails.rest.firstname} {hostDetails.rest.lastname}</p>
              </>
            )}

            <hr />

            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="fas fa-star text-warning"></i> Top 5% of homes
                </h5>
                <p className="card-text">
                  This home is highly ranked based on ratings, reviews, and reliability.
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="mb-0">
                      <i className="fas fa-door-open"></i> Self check-in
                    </p>
                    <p className="mb-0">
                      <i className="fas fa-calendar-check"></i> Free cancellation before 3 Sep
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <p>{element?.description || "Loading..."}</p>

            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title">Property Details</h5>
                <p className="card-text">Details about the property are displayed below:</p>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <div className="border rounded p-3">
                      <h6>Bedroom 1</h6>
                      <p><i className="fas fa-bed"></i> 1 double bed</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="border rounded p-3">
                      <h6>Bedroom 2</h6>
                      <p><i className="fas fa-bed"></i> 1 double bed</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="border rounded p-3">
                      <h6>Living Room</h6>
                      <p><i className="fas fa-couch"></i> 1 sofa bed</p>
                    </div>
                  </div>
                </div>

                <p className="mt-3"><i className="fas fa-calendar-check"></i> Free cancellation</p>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-6 col-lg-4">
                <div className="card border-primary mb-3">
                  <div className="card-header bg-primary text-white">
                    <h5 className="card-title">What This Place Offers</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled">
                      <li><i className="fas fa-mountain"></i> Mountain view</li>
                      <li><i className="fas fa-wifi"></i> Wifi – 47 Mbps</li>
                      <li><i className="fas fa-car"></i> Free parking on premises</li>
                      <li><i className="fas fa-bath"></i> Bath</li>
                      <li><i className="fas fa-leaf"></i> Shared back garden – Not fully fenced</li>
                      <li><i className="fas fa-fire"></i> Firepit</li>
                      <li><i className="fas fa-fridge"></i> Fridge</li>
                      <li><i className="fas fa-microwave"></i> Microwave</li>
                      <li className="text-danger"><i className="fas fa-exclamation-triangle"></i> Unavailable: Carbon monoxide alarm</li>
                      <li className="text-danger"><i className="fas fa-exclamation-triangle"></i> Unavailable: Smoke alarm</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="col-md-4">
            {/* Booking Card Component */}
            <BookingCard index={index} />
          </div>

        </div>
      </div>

      <div className="container mt-5 text-center">
        <Grate 
          rating={rating} 
          reviews={reviews} 
          isGuestFavourite={isGuestFavourite}
        />
      </div>

      <hr />

      {/* Review Section */}
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Overall Rating</Card.Title>
          <Row className="align-items-center">
            <Col className="text-center">
              <FontAwesomeIcon icon={faStar} className="text-warning" />
              <p>5 stars, 100% of reviews</p>
              <h5>5</h5>
            </Col>
            {/* Add more rating columns if needed */}
          </Row>
          <Row className="mt-4">
            <Col>
              <h6>
                <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
                Cleanliness
              </h6>
              <p>Rated 5.0 out of 5 stars</p>
            </Col>
            {/* Add more categories if needed */}
          </Row>
        </Card.Body>
      </Card>

      {/* Customer Reviews Section */}
      <div className="container mt-4">
        <h3>Customer Reviews</h3>
        <div className="row">
          {filteredReviews.map((review, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    {review.userId.username} 
                    <span className="ms-2">
                      <FontAwesomeIcon icon={faStar} className="text-warning" />
                      {` Rating: ${review.rating} stars`}
                    </span>
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">{review.date}</h6>
                  <p className="card-text">{review.comment}</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">Host: {review.host} ({review.stayDuration})</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Form for Current User */}
      <ReviewForm userId={userId} element={element} />

    </div>
  );
};

export default CartDetails;
