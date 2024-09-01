import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector } from "react-redux";
import { app } from "../firbase"; // Ensure the correct path to your Firebase config
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";

const PropertyForm = () => {

  const { currentuser } = useSelector((state) => state.user);

  const hostId = currentuser.rest._id;

  console.log(hostId);
  

  const initialValues = {
    title: "",
    sub_title: "",
    description: "",
    location: "",
    pricePerNight: "",
    category: "",
    amenities: [""],
    images: [""],
    availability: [{ startDate: "", endDate: "" }],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    sub_title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    pricePerNight: Yup.number()
      .required("Required")
      .positive("Must be a positive number"),
    category: Yup.string().required("Required"),
    amenities: Yup.array().of(Yup.string()),
    images: Yup.array().of(Yup.string().url("Must be a valid URL")),
  });

  const categories = [
    "Trending",
    "Countryside",
    "Islands",
    "Containers",
    "Camping",
    "AmazingPools",
    "Beachfront",
    "AmazingViews",
    "Farmas",
    "Cabins",
    "Luxe",
    "Rooms",
    "EarthHomes",
    "NationalParks",
    "HistoricalHomes",
    "Offthegrid",
    "Mansion",
    "New",
    "TopoftheWorld",
    "TopCities",
    "Tropical",
    "Play",
    "Houseboats",
    "Boats",
    "Lake",
    "Cave",
    "CamperVans",
    "TinyHomes",
    "Design",
    "Surfing",
    "A-frames",
    "Golfing",
    "Bed&Breakfast",
    "Vineyards",
    "Hanoks",
    "Skiing",
    "CycladicHomes",
    "ChefsKitchens",
    "Windmill",
    "CasesParticulares",
    "Minsus",
    "Roykans",
    "ShepherdsHuts",
    "Towers",
    "Desert",
    "Yurts",
    "Barns",
    "Skiinout",
    "Adapted",
    "GrandPianos",
    "CreativeSpace",
    "Dammusi",
    "Riads",
    "Trulli",
    "Beach",
  ];

  const [imageFiles, setImageFiles] = useState([]);
  const [imageUploadProgress, setImageUploadProgress] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  // Handle image upload
  const handleUploadImages = async () => {
    if (imageFiles.length === 0) return [];

    const storage = getStorage(app);
    const uploadedImageUrls = [];

    for (const file of imageFiles) {
      const filename = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageUploadProgress((prev) => ({
              ...prev,
              [filename]: progress.toFixed(0),
            }));
          },
          (error) => {
            setPublishError("Image upload failed");
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              uploadedImageUrls.push(downloadURL);
              resolve();
            });
          }
        );
      });
    }
    return uploadedImageUrls;
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      // Upload images and await their URLs
      const uploadedImageUrls = await handleUploadImages();

      const propertyData = { ...values, hostId, images: uploadedImageUrls };

      const response = await axios.post(
        "https://clone-air-bnb-backend.onrender.com/api/property/createProperty",
        propertyData
      );

      console.log("Property created:", response.data);
      alert("Successfully added");
      resetForm();
      navigate("/");
    } catch (error) {
      handleAxiosError(error); // Custom function to handle error responses
    } finally {
      setSubmitting(false);
    }
  };

  // Custom function to handle Axios errors
  const handleAxiosError = (error) => {
    if (error.response) {
      console.error("Error response:", error.response.data);
      setPublishError(
        `Failed to create property: ${
          error.response.data.message || "Server error"
        }`
      );
    } else if (error.request) {
      console.error("Error request:", error.request);
      setPublishError("No response from the server. Please try again.");
    } else {
      console.error("Error message:", error.message);
      setPublishError(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create a Property</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            {/* Form Fields */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <Field
                type="text"
                name="title"
                className="form-control"
                id="title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="sub_title" className="form-label">
                Sub_Title
              </label>
              <Field
                type="text"
                name="sub_title"
                className="form-control"
                id="sub_title"
              />
              <ErrorMessage
                name="sub_title"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                className="form-control"
                id="description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <Field
                type="text"
                name="location"
                className="form-control"
                id="location"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="pricePerNight" className="form-label">
                Price per Night
              </label>
              <Field
                type="number"
                name="pricePerNight"
                className="form-control"
                id="pricePerNight"
              />
              <ErrorMessage
                name="pricePerNight"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <Field
                as="select"
                name="category"
                className="form-select"
                id="category"
              >
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="amenities" className="form-label">
                Amenities
              </label>
              <FieldArray name="amenities">
                {({ push, remove, form }) => (
                  <div>
                    {form.values.amenities.map((amenity, index) => (
                      <div key={index} className="d-flex mb-2">
                        <Field
                          name={`amenities[${index}]`}
                          className="form-control"
                          placeholder="Amenity"
                        />
                        <button
                          type="button"
                          className="btn btn-danger ms-2"
                          onClick={() => remove(index)}
                        >
                          -
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary ms-2"
                          onClick={() => push("")}
                        >
                          +
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>
            </div>

            <div className="mb-3">
              <label htmlFor="images" className="form-label">
                Image Uploads
              </label>
              <input
                type="file"
                multiple
                onChange={(e) => setImageFiles(Array.from(e.target.files))}
                className="form-control"
              />
              <ErrorMessage
                name="images"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="availability" className="form-label">
                Availability
              </label>
              <FieldArray name="availability">
                {({ push, remove, form }) => (
                  <div>
                    {form.values.availability.map((_, index) => (
                      <div key={index} className="d-flex mb-2">
                        <Field
                          name={`availability[${index}].startDate`}
                          type="date"
                          className="form-control"
                        />
                        <Field
                          name={`availability[${index}].endDate`}
                          type="date"
                          className="form-control ms-2"
                        />
                        <button
                          type="button"
                          className="btn btn-danger ms-2"
                          onClick={() => remove(index)}
                        >
                          -
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary ms-2"
                          onClick={() => push({ startDate: "", endDate: "" })}
                        >
                          +
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            {publishError && (
              <div className="text-danger mt-2">{publishError}</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PropertyForm;
