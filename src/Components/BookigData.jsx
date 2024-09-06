import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { bookingInfoSuccess } from '../Redux/Slice/BookingSlice'



const BookigData = async() => {
    const dispatch = useDispatch()

    try {

        const data = await axios.get('https://clone-air-bnb-backend.onrender.com/api/bookings/bookings')
        dispatch(bookingInfoSuccess(data))
   
    } catch (error) {
     console.log(error);
        
    }

  return (
    <div>BookigData</div>
  )
}

export default BookigData