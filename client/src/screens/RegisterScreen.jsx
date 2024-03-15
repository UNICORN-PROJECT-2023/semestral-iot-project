import React, { useState, useRef } from 'react';
import RegisterPage from '../pages/RegisterPage';
import UserService from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { SHORT_USERNAME, INVALID_EMAIL, INVALID_PASSWORD } from '../constants/errorConstants';
import ValidateUtils from '../utils/ValidateUtils';

function RegisterScreen() {
  const userService = new UserService();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [formValidity, setFormValidity] = useState({
    email: false,
    username: false,
    password: false
  });

  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  function handleInputChange(e) {
    const { name, value } = e.target;

    let isValid = value.trim() !== '';

    if (name === 'email') {
      isValid = ValidateUtils.validateEmail(value);
      setError(isValid ? null : INVALID_EMAIL);
    }

    if (name === 'username') {
      isValid = ValidateUtils.validateUsername(value);
      setError(isValid ? null : SHORT_USERNAME);
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

  async function registerUser(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    try {
      await userService.register(email, username, password);
      navigate('/profile/');
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  }

  const isFormValid = Object.values(formValidity).every((value) => value) && !error;
  const progress = Object.values(formValidity).filter(Boolean).length / Object.keys(formValidity).length;
  
  return (
    <RegisterPage
      title="REGISTER"
      error={error}
      onButtonClick={registerUser}
      emailInput={emailRef}
      usernameInput={usernameRef}
      passwordInput={passwordRef}
      onInputChange={handleInputChange}
      formValidity={formValidity}
      isFormValid={isFormValid}
      progress={progress}
    />
  );
}

export default RegisterScreen;
