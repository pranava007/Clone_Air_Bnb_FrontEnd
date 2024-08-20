import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'


const PrivetRouter = () => {

    const navigate = useNavigate()

    const {currentuser} = useSelector((state)=>state.user)
    return currentuser ? <Outlet />:<navigate to='/signin'/>
}

export default PrivetRouter;