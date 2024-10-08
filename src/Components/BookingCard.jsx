import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useSelector } from 'react-redux';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const BookingCard = ({ index }) => {
    const [showGuests, setShowGuests] = useState(false);
    const [paymentToken, setPaymentToken] = useState(null);
    const [isBookingSuccess, setIsBookingSuccess] = useState(false);
    const [bookingId, setBookingId] = useState(null); 
    const { properties } = useSelector((state) => state.properties);
    const { currentuser } = useSelector((state) => state.user);

    const price = properties[index]?.pricePerNight || 0; // Default to 0 if not available

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
        if (isNaN(nights) || nights <= 0) return 0; // Check for invalid date range
        const total = nights * pricePerNight + cleaningFee + serviceFee;
        return total;
    };

    const handleBooking = async (values) => {
        const totalPrice = calculateTotal(values);
        console.log("Total Price (Booking):", totalPrice);
        const bookingData = {
            userId: currentuser.rest._id,
            propertyId: properties[index]._id,
            checkInDate: values.checkIn,
            checkOutDate: values.checkOut,
            totalPrice,
        };

        try {
            const response = await axios.post('https://clone-air-bnb-backend.onrender.com/api/bookings/book', bookingData);
            if (response.status === 201) {
                setBookingId(response.data._id); 
                setIsBookingSuccess(true);
                alert('Room booked successfully!');
            }
        } catch (error) {
            console.error('Booking Error:', error);
            alert('Failed to book the room.');
        }
    };

    const handleToken = async (token, values) => {
        setPaymentToken(token);
        if (bookingId) {
            const totalPrice = calculateTotal(values); // Calculate total based on current form values
            console.log("Total Price (Payment):", totalPrice);

            if (totalPrice <= 0) {
                alert('Invalid total price. Please check the booking details.');
                return;
            }

            const totalPriceInCents = Math.round(totalPrice * 100); // Convert to cents

            try {
                const response = await axios.post('https://clone-air-bnb-backend.onrender.com/api/payment/process', {
                    token,
                    bookingId, 
                    userId: currentuser.rest._id,
                    Product: {
                        _id: properties[index]._id,
                        name: properties[index].title,
                        price: totalPrice, // Ensure this is not null
                    },
                    amount: totalPriceInCents,
                });

                if (response.status === 200) {
                    alert('Payment successful! Your booking is confirmed.');
                    setIsBookingSuccess(false); 
                }
            } catch (error) {
                console.error('Payment Error:', error.response?.data?.message || error.message);
                alert('Payment failed. Please try again or contact support.');
            }
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleBooking}>
            {({ values, setFieldValue }) => {
                const nights = Math.ceil((new Date(values.checkOut) - new Date(values.checkIn)) / (1000 * 60 * 60 * 24));
                const totalPrice = calculateTotal(values);

                return (
                    <Form>
                        <div className="card shadow p-3 mb-5 bg-white rounded">
                            <div className="card-body">
                                <h5 className="card-title">₹{values.pricePerNight} <span className="text-muted">per night</span></h5>

                                {/* Date Picker Fields */}
                                <div className="form-group">
                                    <label htmlFor="checkIn">Check-in</label>
                                    <Field type="date" id="checkIn" name="checkIn" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="checkOut">Check-out</label>
                                    <Field type="date" id="checkOut" name="checkOut" className="form-control" />
                                </div>

                                {/* Guests Input */}
                                <div className="form-group">
                                    <label htmlFor="guests.Adults">Adults</label>
                                    <Field type="number" id="guests.Adults" name="guests.Adults" min="1" className="form-control" />
                                    <label htmlFor="guests.child">Children</label>
                                    <Field type="number" id="guests.child" name="guests.child" min="0" className="form-control" />
                                    <label htmlFor="guests.pet">Pets</label>
                                    <Field type="number" id="guests.pet" name="guests.pet" min="0" className="form-control" />
                                </div>

                                <button type="submit" className="btn btn-primary w-100 mb-3">Reserve</button>
                                <p className="text-muted text-center">You won't be charged yet</p>

                                <hr />

                                <div className="d-flex justify-content-between">
                                    <p><strong>Total</strong></p>
                                    <p><strong>₹{totalPrice}</strong></p>
                                </div>

                                {/* Stripe Checkout */}
                                {isBookingSuccess && (
                                    <StripeCheckout
                                        stripeKey={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}
                                        token={(token) => handleToken(token, values)} // Pass form values for correct price calculation
                                        amount={totalPrice * 100} // Stripe expects the amount in cents
                                        currency="INR"
                                        description="Booking Payment"
                                    />
                                )}
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default BookingCard;
