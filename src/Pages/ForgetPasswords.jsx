import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import 'react-toastify/dist/ReactToastify.css';

const ForgetPasswords = () => {
  const navigate = useNavigate();

  // Formik initial values
  const initialValues = {
    email: '',
  };

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  const handleSubmit = async (values) => {
  try {
     await axios.post("https://clone-air-bnb-backend.onrender.com/api/auth/forget-password", values);
     alert('Email Send ForgetPassword Link')

    
  } catch (error) {
    console.log(error);
    
  }
    
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-bg-gradient'>
      <div className='bg-white p-3 rounded w-28'>
        <h4>Forgot Password</h4>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
        
            <Form>
              <div className='mb-3'>
                <label htmlFor="email"><strong>Email address</strong></label>
                <Field
                  type="email"
                  name="email"
                  className='form-control rounded-1'
                  placeholder='Enter your Email'
                  id='email'
                />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
              <button type='submit' className='btn colo w-100 rounded-1' >
             Send Email
              </button>
            </Form>
     
        </Formik>
      </div>
    </div>
  );
};

export default ForgetPasswords;
