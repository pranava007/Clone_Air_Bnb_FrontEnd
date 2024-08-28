import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { signOutSuccess } from "../Redux/Slice/UserSlice";

const Header = () => {
  const { currentuser } = useSelector((state) => state.user);
  // console.log(currentuser);
  const dispatch = useDispatch();

  const handelsignout = () => {
    dispatch(signOutSuccess());
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img
              src="https://1000logos.net/wp-content/uploads/2023/01/Airbnb-logo-768x432.png"
              alt="Bootstrap"
              width="110"
              height="60"
            />
          </a>
          <div className="d-flex">
            <div className="dropdown   " arrowIcon={false}>
              <button
                className="btn btn-outline-secondary  dropdown-toggle  rounded-pill "
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  backgroundImage: "none", // Removes the dropdown arrow
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem", // Adds space between icons
                }}
              >
                {/* svg ptofile image */}

                <FaBars className="me-1 " style={{ fontSize: "1.0rem" }} />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>

                {/* svg ptofile image end */}
              </button>

              {currentuser && currentuser ? (
                <ul className="dropdown-menu">
                  <li>
                    <button className="btn btn-outline-success dropdown-item">
                      <p>
                        <strong>{currentuser.rest.username}</strong>
                      </p>
                    </button>
                  </li>

                  <li>
                    <button className="btn btn-outline-success sidebartext dropdown-item">
                      {currentuser.rest.role === "host" ? "Host" : "User"}
                      <Link
                        className=" sidebartext link m-2"
                        to="/dashboard?tab=profile"
                      >
                        Profile
                      </Link>
                    </button>
                  </li>

                  <li>
                    <button className="btn btn-outline-success sidebartext dropdown-item">
                      <Link className="link" to="/create-post">
                        New Post
                      </Link>
                    </button>
                  </li>

                  <li>
                    <button className="btn btn-outline-success  sidebartext dropdown-item">
                      <Link className="link" onClick={handelsignout}>
                        Sgin Out
                      </Link>
                    </button>
                  </li>
                </ul>
              ) : (
                <ul className="dropdown-menu">
                  <li>
                    <button className="btn btn-outline-success sidebartext dropdown-item">
                      <Link className="link" to="./signup">
                        Sign Up
                      </Link>
                    </button>
                  </li>
                  <li>
                    <button className="btn btn-outline-success sidebartext dropdown-item">
                      <Link className="link" to="./signin">
                        Sign In
                      </Link>
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
