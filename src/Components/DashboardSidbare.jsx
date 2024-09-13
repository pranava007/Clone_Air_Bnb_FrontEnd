import React, { useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../Redux/Slice/UserSlice";

const DashboardSidbare = () => {
  const { currentuser } = useSelector((state) => state.user);
  const location = useLocation();
  const dispath = useDispatch();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const taburl = urlParams.get("tab"); // tab = profile
    if (taburl) {
      setTab(taburl); //profile
    }
  }, [location.search]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlSignOut = () => {
    dispath(signOutSuccess());
    // localStorage.removeItem("Token")
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column flex-md-row">
      {/* Toggle Button for Mobile */}
      <button
        className="btn btn-primary d-md-none mb-3"
        onClick={toggleSidebar}
        style={{ borderRadius: "5px" }} // Rounded corners for the button
      >
        ☰ Menu
      </button>

      {/* Sidebar */}
      <div
        className={`col-md-3 p-0 bg-light ${
          isSidebarOpen ? "d-block" : "d-none"
        } d-md-block`}
        style={{ height: "100vh", width: "100%" }}
      >
        <div className="d-flex flex-column">



        



          <Link className="d-block p-3 sidebartext link">
            {currentuser.rest.role === "host" ? "Host" : "User"}
          </Link>

          <Link to="/home" className="d-block sidebartext p-3 link">
           Home
          </Link> 
          
       

          {currentuser.rest.role === 'host' &&  <Link to="/get-post" className="d-block sidebartext p-3 link">
            All Post
          </Link> }

         

         


        {currentuser.rest.role === 'host' &&   <Link to="/create-post" className="d-block sidebartext p-3 link">
            Create Post
          </Link>}


          <Link
            to=""
            className="d-block p-3 sidebartext link"
            onClick={handlSignOut}
          >
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidbare;
