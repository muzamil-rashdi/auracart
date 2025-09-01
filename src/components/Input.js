import React from 'react';
import { useField } from 'formik';

const Input = ({ label, type = 'text', className = '', ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <input
        {...field}     // ✅ binds value, onChange, onBlur to Formik
        {...props}
        type={type}
        className={`
          w-full px-4 py-2 border rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-primary-500
          ${meta.touched && meta.error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 dark:border-gray-600'
          }
          bg-white dark:bg-gray-700 
          text-gray-900 dark:text-white
          ${className}
        `}
      />
      {meta.touched && meta.error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{meta.error}</p>
      )}
    </div>
  );
};

export default Input;
