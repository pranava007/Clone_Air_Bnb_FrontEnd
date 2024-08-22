import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';

const BookingCard = () => {
    const [showGuests, setShowGuests] = useState(false);
    // const {} = use

  const initialValues = {
    checkIn: '',
    checkOut: '',
    guests: {
        Adults: 1,
        child: 0,
        pet: 0,
      },
    pricePerNight: 5000,
    cleaningFee: 800,
    serviceFee: 1500,
  };

  const calculateTotal = (values) => {
    const { checkIn, checkOut, pricePerNight, cleaningFee, serviceFee } = values;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const total = nights * pricePerNight + cleaningFee + serviceFee;
    return total;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log('Form values:', values);
      }}
    >
      {({ values,setFieldValue }) => (
        <Form>
          <div className="">
            <div className="card shadow p-3 mb-5 bg-white rounded">
              <div className="card-body">
                <h5 className="card-title">₹{values.pricePerNight} <span className="text-muted">per night</span></h5>
                <h6 className="card-subtitle mb-3">₹{values.pricePerNight} per night</h6>

                <div className="mb-3">
                  <label className="form-label">Check-in</label>
                  <Field type="date" name="checkIn" className="form-control" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Checkout</label>
                  <Field type="date" name="checkOut" className="form-control" />
                </div>

                <div className="mb-3">
                <div className=" w-25 ">
                  <label className="form-label  ">who</label>
                  <div className="dropdown ">
                    <button
                      className="btn btn-light dropdown-toggle "
                      type="button"
                      id="guestsDropdown"
                      aria-expanded={showGuests}
                      onClick={() => setShowGuests(!showGuests)}
                    >
                      {`Add Gust`}{" "}
                      {/* {`Guests: ${values.guests.Adults} Adults, ${values.guests.child} Children, ${values.guests.pet} Pets`} */}
                    </button>
                    <ul
                      className={`dropdown-menu ${showGuests ? "show" : ""}`}
                      aria-labelledby="guestsDropdown"
                    >
                      {["Adults", "child", "pet"].map((type) => (
                        <li
                          key={type}
                          className="dropdown-item d-flex align-items-center"
                        >
                          <span className="me-2" style={{ minWidth: "120px" }}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setFieldValue(
                                `guests.${type}`,
                                Math.max(values.guests[type] - 1, 0)
                              )
                            }
                            className="btn btn-outline-secondary btn-sm me-2"
                          >
                            -
                          </button>
                          <Field
                            type="number"
                            name={`guests.${type}`}
                            className="form-control text-center"
                            style={{ width: "60px" }}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setFieldValue(
                                `guests.${type}`,
                                values.guests[type] + 1
                              )
                            }
                            className="btn btn-outline-secondary btn-sm ms-2"
                          >
                            +
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                
                </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3">Reserve</button>
                <p className="text-muted text-center">You won't be charged yet</p>

                <hr />

                <div className="d-flex justify-content-between">
                  <p>₹{values.pricePerNight} x {Math.ceil((new Date(values.checkOut) - new Date(values.checkIn)) / (1000 * 60 * 60 * 24))} nights</p>
                  <p>₹{values.pricePerNight * Math.ceil((new Date(values.checkOut) - new Date(values.checkIn)) / (1000 * 60 * 60 * 24))}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Cleaning fee</p>
                  <p>₹{values.cleaningFee}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Service fee</p>
                  <p>₹{values.serviceFee}</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p><strong>Total</strong></p>
                  <p><strong>₹{calculateTotal(values)}</strong></p>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BookingCard;
