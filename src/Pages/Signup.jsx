import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
const Signup = () => {

    // const [formData,setFormData] = useState({})
    // const [loading,setLoading] = useState(false)
    // const [errorMessage,setErrorMessage] = useState(null)
    const navigate = useNavigate()

    const initialValues = {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: '', // Added role field
    }
    
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        firstname: Yup.string().required('Firstname is required'),
        lastname: Yup.string().required('Lastname is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().required('Password is required'),
        role: Yup.string().oneOf(['user', 'host'], 'Invalid role').required('Role is required'), // Added validation for role
    })
    


    const handlesubmit = async(values)=>{
       try {
        await axios.post(`https://clone-air-bnb-backend.onrender.com/api/auth/registerUser`,values)
        alert('Registration successful!' );
        navigate('/signin')
        
       } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
        
       }
    }




  return (
   <>
   <div className='container mt-3  textfamily rounded-3'>
    <div className='row justify-content-center min-vh-100 ' >
      <div className='col-md-4 ' >
        <div className='card  ' >
            <div className='card-body ' >
                <h3 className='text-center mb-4 sidebartext'>SignUp</h3>
                {/* form start */}

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlesubmit} >
        
                    
                   
                   
                    <Form className='row g-3'>

                    <div className='col-md-12'>
                            <label htmlFor="role">Role:</label>
                            <Field as="select" name="role" className="form-control rounded-pill mb-3">
                            <option value="">Select Role</option>
                            <option value="user">User</option>
                            <option value="host">Host</option>
                            </Field>
                            <ErrorMessage name='role' component='p' className='colorr' />
                            </div>



                        <div className='col-md-12'>
                        <label htmlFor="title">Username:</label>
                        <Field type='text' className="form-control rounded-pill mb-3" name='username' placeholder='Enter Your Username' />
                        <ErrorMessage name='username' component='p' className='colorr' />
                        </div>

                        <div className='col-md-12'>
                        <label htmlFor="title">Firstname:</label>
                        <Field type='text' className="form-control rounded-pill mb-3" name='firstname' placeholder='Enter Your Firstname' />
                        <ErrorMessage name='firstname' component='p' className='colorr' />
                        </div>

                        <div className='col-md-12'>
                        <label htmlFor="title">Lastname:</label>
                        <Field type='text' className="form-control rounded-pill mb-3" name='lastname' placeholder='Enter Your Lastname' />
                        <ErrorMessage name='lastname' component='p' className='colorr' />
                        </div>

                        

                       

                        <div className='col-md-12'>
                        <label htmlFor="title">Email:</label>
                        <Field type='text' className="form-control rounded-pill mb-3" name='email' placeholder='Enter Your Email' />
                        <ErrorMessage name='email' component='p' className='colorr' />
                        </div>

                        <div className='col-md-12'>
                        <label htmlFor="title">Password:</label>
                        <Field type='text' className="form-control rounded-pill mb-3" name='password' placeholder='Enter Your Password' />
                        <ErrorMessage name='password' component='p' className='colorr' />
                        </div>

                        <div className='col-md-12'>
                        <button type='submit' className='btn colo w-100 rounded-pill'>Sign Up</button>
                        </div>


                    </Form>
                </Formik>

            </div>

        </div>
      </div>
    </div>
   </div>
   
   </>
  )
}

export default Signup