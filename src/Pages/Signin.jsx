import React from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { signInStart, signInSuccess, signFailure } from '../Redux/Slice/UserSlice'; // Adjust path as necessary
import { ErrorMessage, Field, Form, Formik } from 'formik';

const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().required('Password is required'),
    })

    const handleSubmit = async (values) => {
        dispatch(signInStart());
        try {
            const response = await axios.post('http://localhost:5000/api/auth/logingUser', values);
            dispatch(signInSuccess(response.data));
            toast.success('Sign in successful!');
            navigate('/dashboard'); // Redirect to a different page after successful sign-in
            // if(response.ok){
                // localStorage.setItem('Token',response.token)
                // dispatch(signInSuccess(data))
            // }
        } catch (error) {
            dispatch(signFailure(error.response?.data?.message || 'Sign in failed'));
            toast.error('Sign in failed. Please try again.');
        }
    }

    return (
        <div className='container mt-3 textfamily rounded-3'>
            <div className='row justify-content-center min-vh-100'>
                <div className='col-md-4'>
                    <div className='card'>
                        <div className='card-body'>
                            <h3 className='text-center mb-4'>Sign In</h3>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                               
                                    <Form className='row g-3'>
                                        <div className='col-md-12'>
                                            <label htmlFor="email">Email:</label>
                                            <Field type='email' className="form-control rounded-pill mb-3" name='email' placeholder='Enter Your Email' />
                                            <ErrorMessage name='email' component='p' className='text-danger' />
                                        </div>

                                        <div className='col-md-12'>
                                            <label htmlFor="password">Password:</label>
                                            <Field type='password' className="form-control rounded-pill mb-3" name='password' placeholder='Enter Your Password' />
                                            <ErrorMessage name='password' component='p' className='text-danger' />
                                        </div>

                                        <div className='col-md-12'>
                                            <button type='submit' className='btn btn-primary colo w-100 rounded-pill'>Sign In</button>
                                        </div>
                                        <p>Don't  Have An Account ? <Link to='/signup' >Sign Up</Link></p>
                                    </Form>
                            
                            </Formik>
                        

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;
