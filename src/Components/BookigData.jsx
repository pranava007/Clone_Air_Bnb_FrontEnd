import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { bookingInfoSuccess } from '../Redux/Slice/BookingSlice';

const BookigData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get('https://clone-air-bnb-backend.onrender.com/api/bookings/bookings');
        dispatch(bookingInfoSuccess(response.data));
        console.log('log data', response.data);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchBookingData();
  }, [dispatch]);

  return <div>Booking data is being fetched...</div>;
};

export default BookigData;
