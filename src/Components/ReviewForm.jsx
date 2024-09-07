import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";

const ReviewForm = ({ element, userId }) => {
  console.log("property check:", element._id);
  console.log("userId check:", userId);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "https://clone-air-bnb-backend.onrender.com/api/review/createreview",
        {
          userId,
          propertyId: element._id,
          rating: values.rating,
          comment: values.comment,
        }
      );
      console.log("Review submitted:", response.data);
      resetForm();
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        rating: "",
        comment: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.rating) {
          errors.rating = "Required";
        } else if (
          isNaN(values.rating) ||
          values.rating < 1 ||
          values.rating > 5
        ) {
          errors.rating = "Rating must be a number between 1 and 5";
        }
        if (!values.comment) {
          errors.comment = "Required";
        }
        return errors;
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        // <Form>
        //   <div>
        //     <label htmlFor="rating">Rating (1-5)</label>
        //     <Field type="number" name="rating" min="1" max="5" />
        //     <ErrorMessage name="rating" component="div" />
        //   </div>
        //   <div>
        //     <label htmlFor="comment">Comment</label>
        //     <Field as="textarea" name="comment" />
        //     <ErrorMessage name="comment" component="div" />
        //   </div>
        //   <button type="submit" disabled={isSubmitting}>
        //     Submit Review
        //   </button>
        // </Form>

        
        <Form>
          <div className="mb-3">
            <label htmlFor="rating" className="form-label">
              Rating (1-5)
            </label>
            <Field
              type="number"
              name="rating"
              min="1"
              max="5"
              className="form-control"
              id="rating"
            />
            <ErrorMessage
              name="rating"
              component="div"
              className="text-danger mt-1"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="comment" className="form-label">
              Comment
            </label>
            <Field
              as="textarea"
              name="comment"
              className="form-control"
              id="comment"
              rows="3"
            />
            <ErrorMessage
              name="comment"
              component="div"
              className="text-danger mt-1"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            Submit Review
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ReviewForm;
