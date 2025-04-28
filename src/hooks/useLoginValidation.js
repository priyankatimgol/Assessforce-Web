import { useState } from 'react';

const useLoginValidation = () => {
  const [errors, setErrors] = useState({ email: '', password: '' });

  const setError = (field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const validateEmail = (email) => {
    if (email === '') {
      setError('email', 'Email is required.');
      return false;
    }
    setError('email', '');
    return true;
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!password) {
      setError('password', 'Password is required');
      return false;
    } else if (!passwordRegex.test(password)) {
      setError(
        'password',
        'Password must be at least 8 characters long, with 1 uppercase letter, 1 lowercase letter, and 1 symbol'
      );
      return false;
    }
    setError('password', '');
    return true;
  };

  return { errors, validateEmail, validatePassword };
};

export default useLoginValidation;
