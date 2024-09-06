import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'



const BookigData = async() => {

    const [Bookingdata,setBookingdata] = useState([])

    try {

        const data = await axios.get('https://clone-air-bnb-backend.onrender.com/api/bookings/getbooking')
        setBookingdata(data)
        console.log(Bookingdata);
        


        
    } catch (error) {
        
    }

  return (
    <div>BookigData</div>
  )
}

export default BookigData