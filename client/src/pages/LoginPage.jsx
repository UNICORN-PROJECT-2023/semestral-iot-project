import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.backgroundColor};
    min-height: 100svh;
    max-width: 700px;
    font-size: 1.5rem;
    margin: 0 auto;
    color: ${props => props.theme.textColor};

    @media (max-width: 768px) {
        margin: 0 1rem;
    }

    input {
        padding: 1rem;
        margin-bottom: 1rem;
        border: 2px solid ${props => props.theme.textColor};
        border-radius: 5px;
        font-size: 1rem;
        width: 65%;
        color: ${props => props.theme.inputTextColor};
        background-color: ${props => props.theme.inputBackgroundColor};

        &:focus {
            outline: none;
            border: 2px solid #b78fd6;
        }
    }

    h1 {
        padding: 1rem;
        background: -webkit-linear-gradient(${props => props.theme.buttonBackground}, ${props => props.theme.textColor}, ${props => props.theme.buttonBackground});
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 1000;
    }

    .btn {
        margin: 2rem;
        border: none;
        padding: 1rem 3.5rem;
        text-align: center;
        text-transform: uppercase;
        transition: 0.5s;
        background-size: 200% auto;
        color: ${props => props.theme.buttonTextColor};
        border-radius: 0.5rem;
        font-weight: 700;
        letter-spacing: 2px;
    }

    .btn:hover {
        background-position: right center; /* change the direction of the change here */
    }

    .btn-1 {
        background-image: linear-gradient(to right, ${props => props.theme.buttonBackground} 0%, ${props => props.theme.textColor} 50%, ${props => props.theme.buttonBackground} 100%);
    }

    p {
        color: ${props => props.theme.textColor};
        font-size: 1.2rem;
    }

    a {
        color: ${props => props.theme.textColor};
    }
`;

function LoginPage(props) {
  return (
    <StyledWrapper disabled={!props.isFormValid}>
      <h1>{props.title}</h1>
      <input
        ref={props.emailInput}
        type="email"
        name='email'
        placeholder="Email"
        onChange={props.onInputChange}
      />
      <input
        ref={props.passwordInput}
        type="password"
        name='password'
        placeholder="Password"
        onChange={props.onInputChange}
      />
      {props.error && <p style={{ color: '#D2122E', fontWeight: '1000' }}>{String(props.error)}</p>}
      <p>If you dont have an account <Link to="/register" style={{ textDecoration: 'none', color: "#6c7482" }}>Register here</Link></p>
      {props.isFormValid ? (
        <button className="btn btn-1"
          onClick={props.onButtonClick}
        >
          Login
        </button>
      ) : (
        <button className="btn btn-1" disabled>Login</button>
      )}
    </StyledWrapper>
  );
}
export default LoginPage;