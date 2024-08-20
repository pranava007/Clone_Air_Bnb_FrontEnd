import React from "react";
import { useSelector } from "react-redux";

const DashbordProfile = () => {
  const { currentuser } = useSelector((state) => state.user);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-12 col-lg-6 text-center">
          <div className="card shadow-sm">
            <img
              src="https://cdn-icons-png.flaticon.com/512/10337/10337609.png"
              alt=""
              className="card-img-top rounded-circle mx-auto mt-3"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">{currentuser.rest.username}</h5>
              <p className="card-text">{currentuser.rest.email}</p>
              <a href="#" className="btn rounded-pill colo w-100">
                View Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashbordProfile;
