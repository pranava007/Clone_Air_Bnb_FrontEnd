import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { reviweSuccess } from '../Redux/Slice/ReviewSlice'


const CaptureReviewData = async() => {
    const dispatch = useDispatch()

    try {
     
      const responce =   await axios.get('https://clone-air-bnb-backend.onrender.com/api/review/getreviw')
      console.log("capturedata :",responce.data);
      
      dispatch(reviweSuccess(responce.data))

        
    } catch (error) {
        console.log(error);
        
    }
    return(
        <>
        
        </>

    )
}

export default CaptureReviewData