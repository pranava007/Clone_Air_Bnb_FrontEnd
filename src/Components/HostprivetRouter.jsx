import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate,Outlet } from 'react-router-dom'
const HostprivetRouter = () => {

    const {currentuser}=useSelector((state)=>state.user)
    return currentuser && currentuser.role === 'host' ? (<Outlet/>):(<Navigate to='/signin'/>)
}

export default HostprivetRouter