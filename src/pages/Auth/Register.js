import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import { register } from "../../api/authService";

const Register = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
    agreeToTerms: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await register(values);
      
      navigate('/login', { 
        state: { 
          message: 'Registration successful! Please login with your credentials.' 
        } 
      });
      
    } catch (err) {
      setErrors({ email: err.message });
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="bg-primary-600 rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
              agreeToTerms: false
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, values, handleChange }) => (
              <Form className="space-y-6">
                <Input
                  label="Full Name"
                  name="name"
                  type="text"
                  autoComplete="name"
                />
                
                <Input
                  label="Email address"
                  name="email"
                  type="email"
                  autoComplete="email"
                />
                
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                />
                
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                />
                
                <div className="flex items-center">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    checked={values.agreeToTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    I agree to the{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                {errors.agreeToTerms && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.agreeToTerms}</p>
                )}
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 text-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <Loader size="sm" />
                      <span className="ml-2">Creating account...</span>
                    </div>
                  ) : (
                    'Create account'
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Your data is protected and never shared with third parties.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;