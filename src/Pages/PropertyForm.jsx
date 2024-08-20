import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { app } from '../firbase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const PropertyForm = () => {
  const { currentuser } = useSelector((state) => state.user);
  const hostId = currentuser.rest._id;

  const initialValues = {
    title: '',
    sub_title: '',
    description: '',
    location: '',
    pricePerNight: '',
    category: '',
    amenities: [''],
    images: [''],
    availability: [{ startDate: '', endDate: '' }],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    location: Yup.string().required('Required'),
    pricePerNight: Yup.number().required('Required').positive('Must be a positive number'),
    category: Yup.string().required('Required'),
    amenities: Yup.array().of(Yup.string()),
    images: Yup.array().of(Yup.string().url('Must be a valid URL')),
  });

  const categories = [
    'Trending', 'Countryside', 'Islands', 'Containers', 'Camping', 'AmazingPools',
    'Beachfront', 'AmazingViews', 'Farmas', 'Cabins', 'Luxe', 'Rooms', 'EarthHomes',
    'NationalParks', 'HistoricalHomes', 'Offthegrid', 'Mansion', 'New', 'TopoftheWorld',
    'TopCities', 'Tropical', 'Play', 'Houseboats', 'Boats', 'Lake', 'Cave', 'CamperVans',
    'TinyHomes', 'Design', 'Surfing', 'A-frames', 'Golfing', 'Bed&Breakfast', 'Vineyards',
    'Hanoks', 'Skiing', 'CycladicHomes', 'ChefsKitchens', 'Windmill', 'CasesParticulares',
    'Minsus', 'Roykans', 'ShepherdsHuts', 'Towers', 'Desert', 'Yurts', 'Barns', 'Skiinout',
    'Adapted', 'GrandPianos', 'CreativeSpace', 'Dammusi', 'Riads', 'Trulli', 'Beach'
  ];

  // State for image uploading
  const [file, setFile] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageFileUploadError('Please select an image');
        return;
      }
      setImageFileUploadError(null);
      const storage = getStorage(app);
      const filename = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError('Image upload failed');
          setImageFileUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUploadProgress(null);
            setImageFileUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageFileUploadError('Image upload failed');
      setImageFileUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    const propertyData = { ...values, hostId };

    await axios.post('http://localhost:5000/api/property/createProperty', propertyData)
      .then((response) => {
        console.log('Property created:', response.data);
        alert('Successfully added');
        resetForm();
      })
      .catch((error) => {
        console.error('Error creating property:', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Create a Property</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>

            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <Field
                type="text"
                name="title"
                className="form-control"
                id="title"
              />
              <ErrorMessage name="title" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="sub_title" className="form-label">Sub_Title</label>
              <Field
                type="text"
                name="sub_title"
                className="form-control"
                id="sub_title"
              />
              <ErrorMessage name="title" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <Field
                as="textarea"
                name="description"
                className="form-control"
                id="description"
              />
              <ErrorMessage name="description" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="location" className="form-label">Location</label>
              <Field
                type="text"
                name="location"
                className="form-control"
                id="location"
              />
              <ErrorMessage name="location" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="pricePerNight" className="form-label">Price per Night</label>
              <Field
                type="number"
                name="pricePerNight"
                className="form-control"
                id="pricePerNight"
              />
              <ErrorMessage name="pricePerNight" component="div" className="text-danger" />
            </div>

            {/* Category Dropdown */}
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <Field as="select" name="category" className="form-select" id="category">
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="category" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="amenities" className="form-label">Amenities</label>
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
                          onClick={() => push('')}
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
              <label htmlFor="images" className="form-label">Image URLs</label>
              <FieldArray name="images">
                {({ push, remove, form }) => (
                  <div>
                    {form.values.images.map((image, index) => (
                      <div key={index} className="d-flex mb-2">
                        <Field
                          name={`images[${index}]`}
                          className="form-control"
                          placeholder="Image URL"
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
                          onClick={() => push('')}
                        >
                          +
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>
              {/* File input for image upload */}
              <div className="mb-3">
                <label htmlFor="fileUpload" className="form-label">Upload Image</label>
                <input
                  type="file"
                  id="fileUpload"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button type="button" className="btn btn-secondary mt-2" onClick={handleUploadImage}>
                  Upload
                </button>
                {imageFileUploadProgress && (
                  <div className="progress mt-2">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${imageFileUploadProgress}%` }}
                      aria-valuenow={imageFileUploadProgress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {imageFileUploadProgress}%
                    </div>
                  </div>
                )}
                {imageFileUploadError && (
                  <div className="text-danger">{imageFileUploadError}</div>
                )}
              </div>
              <ErrorMessage name="images" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="availability" className="form-label">Availability</label>
              <FieldArray name="availability">
                {({ push, remove, form }) => (
                  <div>
                    {form.values.availability.map((date, index) => (
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
                          onClick={() => push({ startDate: '', endDate: '' })}
                        >
                          +
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>
            </div>

            <button type="submit" className="btn btn-success" disabled={isSubmitting}>
              Create Post
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PropertyForm;
