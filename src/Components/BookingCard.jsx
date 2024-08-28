import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useSelector } from 'react-redux';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const BookingCard = ({ index }) => {
    const [showGuests, setShowGuests] = useState(false);
    const [paymentToken, setPaymentToken] = useState(null);
    const [isBookingSuccess, setIsBookingSuccess] = useState(false);
    const { properties } = useSelector((state) => state.properties);
    const { currentuser } = useSelector((state) => state.user);
    // console.log(properties[index]);
    
    
    const price = properties[index].pricePerNight;

    const initialValues = {
        checkIn: '',
        checkOut: '',
        guests: {
            Adults: 1,
            child: 0,
            pet: 0,
        },
        pricePerNight: price,
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

    const handleBooking = async (values) => {
        const totalPrice = calculateTotal(values);
        const bookingData = {
            userId: currentuser.rest._id,
            propertyId: properties[index]._id,
            checkInDate: values.checkIn,
            checkOutDate: values.checkOut,
            totalPrice,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/bookings/book', bookingData);
            if (response.status === 201) {
                setIsBookingSuccess(true);
            }
        } catch (error) {
            console.error('Booking Error:', error);
            alert('Failed to book the room.');
        }
    };

    const handleToken = async (token) => {
        setPaymentToken(token);
        if (isBookingSuccess) {
            try {
                const response = await axios.post('http://localhost:5000/api/payment/process', {
                    token,
                    bookingId: properties[index]._id, // or the booking ID returned from the booking response
                    amount: calculateTotal(initialValues),
                });
                if (response.status === 200) {
                    alert('Payment successful!');
                }
            } catch (error) {
                console.error('Payment Error:', error);
                alert('Payment failed.');
            }
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleBooking}
        >
            {({ values, setFieldValue }) => {
                const nights = Math.ceil((new Date(values.checkOut) - new Date(values.checkIn)) / (1000 * 60 * 60 * 24));
                const totalPrice = calculateTotal(values);

                return (
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
                                        <div className="w-25">
                                            <label className="form-label">Who</label>
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-light dropdown-toggle"
                                                    type="button"
                                                    id="guestsDropdown"
                                                    aria-expanded={showGuests}
                                                    onClick={() => setShowGuests(!showGuests)}
                                                >
                                                    {`Add Guests`}
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
                                        <p>₹{values.pricePerNight} x {nights} nights</p>
                                        <p>₹{values.pricePerNight * nights}</p>
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
                                        <p><strong>₹{totalPrice}</strong></p>
                                    </div>

                                    {/* Stripe Checkout */}
                                    {isBookingSuccess && (
                                        <StripeCheckout
                                            stripeKey={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}
                                            token={handleToken}
                                            amount={totalPrice / 100} // Stripe expects the amount in cents
                                            currency="INR"
                                            description="Booking Payment"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default BookingCard;
