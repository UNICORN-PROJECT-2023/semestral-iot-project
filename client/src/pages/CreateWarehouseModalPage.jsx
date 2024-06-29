import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Stack } from '@mui/material';
import { motion } from "framer-motion";
import styled, { useTheme } from 'styled-components';

const StyledWrapper = styled.div`
    display: flex;
    justify-content: center; // Aligns children (button) to the right
    width: 100%; // Ensures the wrapper takes full width of its container
    margin-bottom: 20px; // Adds some spacing below the button
    
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
        background-image: linear-gradient(to right, ${props => props.theme.buttonBackground} 30%, ${props => props.theme.textColor} 50%, ${props => props.theme.buttonBackground} 100%);
    }
`;

const CreateWarehouseModalPage = (props) => {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        iotId: '',
        minTemperature: '',
        maxTemperature: '',
        alertDuration: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <StyledWrapper>
                <button className={"btn btn-1"} onClick={props.onOpen}>
                    Add Warehouse
                </button>
            </StyledWrapper>
            <Modal
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: theme.inputBackgroundColor, color: theme.textColor, border: '2px solid #000', boxShadow: 24, p: 4 }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add New Warehouse
                    </Typography>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <TextField
                            label="Warehouse Name"
                            variant="outlined"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            InputLabelProps={{
                                style: { color: theme.inputTextColor }
                            }}
                            InputProps={{
                                style: { color: theme.inputTextColor, backgroundColor: theme.inputBackgroundColor }
                            }}
                        />
                        <TextField
                            label="IoT ID"
                            variant="outlined"
                            name="iotId"
                            value={formData.iotId}
                            onChange={handleChange}
                            InputLabelProps={{
                                style: { color: theme.inputTextColor }
                            }}
                            InputProps={{
                                style: { color: theme.inputTextColor, backgroundColor: theme.inputBackgroundColor }
                            }}
                        />
                        <TextField
                            type="number"
                            label="Minimum Temperature"
                            variant="outlined"
                            name="minTemperature"
                            value={formData.minTemperature}
                            onChange={handleChange}
                            InputLabelProps={{
                                style: { color: theme.inputTextColor }
                            }}
                            InputProps={{
                                style: { color: theme.inputTextColor, backgroundColor: theme.inputBackgroundColor }
                            }}
                        />
                        <TextField
                            type="number"
                            label="Maximum Temperature"
                            variant="outlined"
                            name="maxTemperature"
                            value={formData.maxTemperature}
                            onChange={handleChange}
                            InputLabelProps={{
                                style: { color: theme.inputTextColor }
                            }}
                            InputProps={{
                                style: { color: theme.inputTextColor, backgroundColor: theme.inputBackgroundColor }
                            }}
                        />
                        <TextField
                            type="number"
                            label="Alert Duration (minutes)"
                            variant="outlined"
                            name="alertDuration"
                            value={formData.alertDuration}
                            onChange={handleChange}
                            InputLabelProps={{
                                style: { color: theme.inputTextColor }
                            }}
                            InputProps={{
                                style: { color: theme.inputTextColor, backgroundColor: theme.inputBackgroundColor }
                            }}
                        />
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => props.onSubmit(formData)}
                        >
                            Submit
                        </motion.button>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
};

export default CreateWarehouseModalPage;
