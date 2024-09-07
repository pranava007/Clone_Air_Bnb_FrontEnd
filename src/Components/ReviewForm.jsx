// ReviewForm.jsx
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';

const ReviewForm = ({ propertyId , userId }) => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('/api/reviews', {
        userId,
        propertyId,
        rating: values.rating,
        comment: values.comment,
      });
      console.log('Review submitted:', response.data);
      resetForm();
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        userId: '',
        rating: '',
        comment: '',
      }}
      validate={values => {
        const errors = {};
        if (!values.userId) {
          errors.userId = 'Required';
        }
        if (!values.rating) {
          errors.rating = 'Required';
        } else if (isNaN(values.rating) || values.rating < 1 || values.rating > 5) {
          errors.rating = 'Rating must be a number between 1 and 5';
        }
        if (!values.comment) {
          errors.comment = 'Required';
        }
        return errors;
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
        
          <div>
            <label htmlFor="rating">Rating (1-5)</label>
            <Field type="number" name="rating" min="1" max="5" />
            <ErrorMessage name="rating" component="div" />
          </div>
          <div>
            <label htmlFor="comment">Comment</label>
            <Field as="textarea" name="comment" />
            <ErrorMessage name="comment" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit Review
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ReviewForm;
