import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashboardSidbare from '../Components/DashboardSidbare'
import DashbordProfile from '../Components/DashbordProfile'

const Dashboard = () => {

    // const {currentuser}=useSelector((state)=>state.user)
    const location = useLocation() 
    const [tab,setTab]=useState('')
    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search)
      const taburl = urlParams.get('tab') // tab = profile
      if(taburl){
        setTab(taburl) //profile
      }
    },[location.search])


  return (
    <div className="container-fluid min-vh-100 d-flex flex-column flex-md-row">
    {/* Sidebar */}
    <div className="col-12 col-md-2 p-0 bg-light">
      <DashboardSidbare />
    </div>

    {/* Main Content */}
    <div className="col-12 col-md-9 p-4">
      {tab === "profile" && <DashbordProfile />}
    </div>
  </div>
  )
}

export default Dashboard