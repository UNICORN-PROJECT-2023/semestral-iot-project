import React, { useState, useRef } from 'react';
import LoginPage from '../pages/LoginPage';
import UserService from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { INVALID_PASSWORD, INVALID_EMAIL } from '../constants/errorConstants';
import ValidateUtils from '../utils/ValidateUtils';

function LoginScreen() {
  const userService = new UserService();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [formValidity, setFormValidity] = useState({
    email: false,
    password: false
  });

  const emailRef = useRef();
  const passwordRef = useRef();

  function handleInputChange(e) {
    const { name, value } = e.target;

    let isValid = value.trim() !== '';

    if (name === 'email') {
      isValid = ValidateUtils.validateEmail(value);
      setError(isValid ? null : INVALID_EMAIL);
    }

    if (name === 'password') {
      isValid = ValidateUtils.validatePassword(value);
      setError(isValid ? null : INVALID_PASSWORD);
    }

    setFormValidity((prevState) => ({
      ...prevState,
      [name]: isValid
    }));
  }

  async function loginUser() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      const response = await userService.login(email, password);
      navigate('/profile/');
      window.location.reload();
      console.log(response)
    } catch (error) {
      setError(error.message);
    }
  }

  const isFormValid = Object.values(formValidity).every((value) => value) && !error;
  return (
    <LoginPage
      title="LOGIN"
      buttonText="Login"
      onButtonClick={loginUser}

      emailInput={emailRef}
      passwordInput={passwordRef}
      error={error}
      onInputChange={handleInputChange}
      formValidity={formValidity}
      isFormValid={isFormValid}
    />
  );
}
export default LoginScreen;