import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  margin: 1rem auto;
  border-radius: 1rem;
  color: #ffffff;
  max-width: 700px;
  padding: 1rem;
  width: 100%;
  border: 3px dashed purple;
  
  
  
  @media (max-width: 768px) {
    margin: 2rem 1rem;
  }

  input, textarea {
    padding: 1rem;
    margin-bottom: 1rem;
    border: 2px solid black;
    border-radius: 5px;
    font-size: 1rem;
    width: 65%;
  
    &:focus {
      outline: none;
      border: 2px solid #5e11b0;
    }
  }
`;

export default function FormComponent({ children }) {
  return (
    <StyledWrapper>
      {children}
    </StyledWrapper>
  );
} 