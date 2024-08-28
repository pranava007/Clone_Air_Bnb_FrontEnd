import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Navbar, Nav } from "react-bootstrap";
import { Carousel } from "react-bootstrap";

import "@fortawesome/fontawesome-free/css/all.min.css";

import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchPropertiesSuccess } from "../Redux/Slice/PropertySlice";
import { filterSuccess } from "../Redux/Slice/FilterSlice";

const Filterpage = () => {
  const [showGuests, setShowGuests] = useState(false);
  const [properties, setProperties] = useState([]);
  const [fileout, setFilterout] = useState("");
  const navigate = useNavigate();

  const dispath = useDispatch();

  const initialValues = {
    place: "",
    checkIn: "",
    checkOut: "",
    guests: {
      Adults: 1,
      child: 0,
      pet: 0,
    },
  };

  const validationSchema = Yup.object({
    place: Yup.string().required("Place is required"),
    checkIn: Yup.date().required("Check-in date is required").nullable(),
    checkOut: Yup.date()
      .required("Check-out date is required")
      .nullable()
      .min(Yup.ref("checkIn"), "Check-out date must be after check-in date"),
    guests: Yup.object({
      Adults: Yup.number()
        .min(1, "At least one adult is required")
        .required("Number of adults is required"),
      child: Yup.number()
        .min(0, "Number of children cannot be negative")
        .required("Number of children is required"),
      pet: Yup.number()
        .min(0, "Number of pets cannot be negative")
        .required("Number of pets is required"),
    }),
  });

  const placeOptions = [
    "Europe",
    "United Kingdom",
    "Southeast Asia",
    "Thailand",
    "United States",
  ];

  const categories = [
    { name: "Trending", icon: "fas fa-fire" },
    { name: "Countryside", icon: "fas fa-tree" },
    { name: "Islands", icon: "fas fa-umbrella-beach" },
    { name: "Containers", icon: "fas fa-box" },
    { name: "Camping", icon: "fas fa-campground" },
    { name: "Amazing Pools", icon: "fas fa-swimmer" },
    { name: "Beachfront", icon: "fas fa-water" },
    { name: "Amazing Views", icon: "fas fa-mountain" },
    // { name: "Farmas", icon: "fas fa-tractor" }, // 'Farmas' seems like a typo for 'Farmers'
    { name: "Cabins", icon: "fas fa-home" },
    { name: "Luxe", icon: "fas fa-crown" },
    { name: "Rooms", icon: "fas fa-bed" },
    { name: "Earth Homes", icon: "fas fa-globe-americas" },
    { name: "National Parks", icon: "fas fa-tree" }, // Same as Countryside for simplicity
    { name: "Historical Homes", icon: "fas fa-landmark" },
    // { name: "Off-the-grid", icon: "fas fa-solar-panel" },
    { name: "Mansion", icon: "fas fa-home" },
    { name: "New", icon: "fas fa-star" },
    { name: "Top of the World", icon: "fas fa-globe" },
    { name: "Top Cities", icon: "fas fa-city" },
    { name: "Play", icon: "fas fa-gamepad" },
    { name: "Houseboats", icon: "fas fa-ship" },
    { name: "Lake", icon: "fas fa-water" }, // Same as Beachfront for simplicity
    { name: "Tiny Homes", icon: "fas fa-home" }, // Same as Cabins for simplicity
    { name: "Design", icon: "fas fa-pencil-ruler" },
    // { name: "A-frames", icon: "fas fa-building" },
    { name: "Golfing", icon: "fas fa-golf-ball" },
    // { name: "Bed & Breakfast", icon: "fas fa-bed" }, // Same as Rooms for simplicity
    { name: "Hanoks", icon: "fas fa-home" }, // Use a similar home icon for Hanoks
    { name: "Skiing", icon: "fas fa-skiing" },
    { name: "Cycladic Homes", icon: "fas fa-home" }, // Use a similar home icon for Cycladic Homes
    // { name: "Chef's Kitchens", icon: "fas fa-utensils" },
    { name: "Windmill", icon: "fas fa-wind" },
    { name: "Cases Particulares", icon: "fas fa-home" }, // Use a similar home icon for Cases Particulares
    { name: "Minsus", icon: "fas fa-home" }, // Use a similar home icon for Minsus
    { name: "Roykans", icon: "fas fa-home" }, // Use a similar home icon for Roykans
    // { name: "Shepherd's Huts", icon: "fas fa-home" }, // Use a similar home icon for Shepherd's Huts
    { name: "Desert", icon: "fas fa-sun" },
    { name: "Yurts", icon: "fas fa-home" }, // Use a similar home icon for Yurts
    // { name: "Ski-in/out", icon: "fas fa-skiing" }, // Same as Skiing for simplicity
    { name: "Adapted", icon: "fas fa-adjust" },
    { name: "Creative Space", icon: "fas fa-lightbulb" },
    { name: "Dammusi", icon: "fas fa-home" }, // Use a similar home icon for Dammusi
    { name: "Riads", icon: "fas fa-home" }, // Use a similar home icon for Riads
    { name: "Trulli", icon: "fas fa-home" }, // Use a similar home icon for Trulli
  ];

  //   Get All Data for Property

  useEffect(() => {
    getproperty();
  }, []);
  const getproperty = async () => {
    try {
      const responce = await axios.get(
        `http://localhost:5000/api/property/getproperty`
      );
      setProperties(responce.data.result);
      dispath(fetchPropertiesSuccess(responce.data.result));
    } catch (error) {
      console.log(error);
    }
  };
  console.log(properties);

  const handleSubmit = (values) => {
    setFilterout(values); // store the filter values in the state

    const filteredProperties = properties.filter((property) => {
      console.log("filproresult", property);

      // Example comparisons (adjust as necessary):
      const matchPlace = property.location.includes(values.place);

      const checkInDate = new Date(values.checkIn);
      const checkOutDate = new Date(values.checkOut);
      const availability = property.availability[0];
      const isAvailable =
        checkInDate >= new Date(availability.startDate) &&
        checkOutDate <= new Date(availability.endDate);

      return matchPlace && isAvailable;
    });

    console.log("Sclice Filter PROPERTY :", filteredProperties);
    dispath(filterSuccess(filteredProperties));
    navigate("/datalist");
  };

  return (
    <div className="container textfamily ">
      <div className="d-flex justify-content-center mb-3 ">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className=" ">
              <div className="d-flex align-items-center gap-3 bor bg-white shadow rounded">
                <div className="">
                  <label htmlFor="place" className="form-label">
                    Where
                  </label>
                  <Field as="select" name="place" className="form-select  ">
                    <option value="" label="Where are you going?" />
                    {placeOptions.map((option, index) => (
                      <option key={index} value={option} label={option} />
                    ))}
                  </Field>
                  {/* <ErrorMessage
                    name="place"
                    component="div"
                    className="text-danger"
                  /> */}
                </div>

                <div className="d-flex align-items-center gap-2">
                  <div className="date-field">
                    <label htmlFor="checkIn" className="form-label">
                      Check-in
                    </label>
                    <Field
                      type="date"
                      name="checkIn"
                      className="form-control heigh"
                    />
                    {/* <ErrorMessage
                      name="checkIn"
                      component="div"
                      className="text-danger"
                    /> */}
                  </div>

                  <div className="date-field">
                    <label htmlFor="checkOut" className="form-label">
                      Check-out
                    </label>
                    <Field
                      type="date"
                      name="checkOut"
                      className="form-control heigh"
                    />
                    {/* <ErrorMessage
                      name="checkOut"
                      component="div"
                      className="text-danger"
                    /> */}
                  </div>
                </div>

                <div className=" w-25 ">
                  <label className="form-label  ">who</label>
                  <div className="dropdown ">
                    <button
                      className="btn btn-light dropdown-toggle "
                      type="button"
                      id="guestsDropdown"
                      aria-expanded={showGuests}
                      onClick={() => setShowGuests(!showGuests)}
                    >
                      {`Add Gust`}{" "}
                      {/* {`Guests: ${values.guests.Adults} Adults, ${values.guests.child} Children, ${values.guests.pet} Pets`} */}
                    </button>
                    <ul
                      className={`dropdown-menu ${showGuests ? "show" : ""}`}
                      aria-labelledby="guestsDropdown"
                    >
                      {["Adults", "child", "pet"].map((type) => (
                        <li
                          key={type}
                          className="dropdown-item d-flex align-items-center"
                        >
                          <span className="me-2" style={{ minWidth: "120px" }}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setFieldValue(
                                `guests.${type}`,
                                Math.max(values.guests[type] - 1, 0)
                              )
                            }
                            className="btn btn-outline-secondary btn-sm me-2"
                          >
                            -
                          </button>
                          <Field
                            type="number"
                            name={`guests.${type}`}
                            className="form-control text-center"
                            style={{ width: "60px" }}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setFieldValue(
                                `guests.${type}`,
                                values.guests[type] + 1
                              )
                            }
                            className="btn btn-outline-secondary btn-sm ms-2"
                          >
                            +
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* <ErrorMessage
                    name="guests.Adults"
                    component="div"
                    className="text-danger"
                  />
                  <ErrorMessage
                    name="guests.child"
                    component="div"
                    className="text-danger"
                  />
                  <ErrorMessage
                    name="guests.pet"
                    component="div"
                    className="text-danger"
                  /> */}
                </div>

                <div className="">
                  <button
                    type="submit"
                    className="btn  mb-3 mt-5 bgco rounded-pill"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <hr />

      {/* nav bar Start */}

      <Nav className="navbar navbar-expand-lg text-black bg-light borderr">
        <div className="container-fluid">
          <div className="scrolling-navbar d-flex flex-row overflow-auto">
            {categories.map((category, index) => (
              <Nav.Item key={index} className="nav-item text-center">
                <Link
                  to={`/${category.name.replace(/\s+/g, "").toLowerCase()}`}
                  className="nav-link text-black"
                  style={{ textDecoration: "none" }}
                >
                  <i className={`${category.icon} text-black`}></i> <br />
                  {category.name}
                </Link>
              </Nav.Item>
            ))}
          </div>
        </div>
      </Nav>

      <br />

      {/* nav bar End */}

      {/* properdy Start */}
    </div>
  );
};

export default Filterpage;
