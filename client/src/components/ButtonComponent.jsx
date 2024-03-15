import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledButton = styled(motion.button)`
  border: none;
  padding: 1rem 2rem;
  margin: 0.2rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  letter-spacing: 1px;
  font-weight: bold;
  cursor: pointer;
`;

export default function Button(props) {
    return (
        <StyledButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={props.onClick}
            style={{ 
                color: props.txtColor, 
                backgroundColor: props.bgColor, 
                padding: props.padding 
            }}
        >
            {props.text}
        </StyledButton>
    );
}

