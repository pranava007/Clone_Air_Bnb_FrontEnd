import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();

  // Formik initial values
  const initialValues = {
    password: '',
  };

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
  });

  const handleSubmit = async (values) => { 
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/reset-password/${id}/${token}`, values);
      alert('Reset Successfully');
      navigate('/login'); // Navigate to login or another page after success
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Response error:', error.response.data);
        alert('Error: ' + error.response.data.message);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Request error:', error.request);
        alert('No response from server.');
      } else {
        // Something else caused the error
        console.error('Error:', error.message);
        alert('An error occurred: ' + error.message);
      }
    }
 
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-bg-gradient'>
      <div className='bg-white p-3 rounded w-28'>
        <h4>Reset Password</h4>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
         
            <Form>
              <div className='mb-3'>
                <label htmlFor="password"><strong>New Password</strong></label>
                <Field
                  type="password"
                  name="password"
                  className='form-control rounded-1'
                  placeholder='Enter your Password'
                  id='password'
                />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
              <button type='submit' className='btn colo w-100 rounded-3'>
               Update Password
              </button>
            </Form>
      
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
