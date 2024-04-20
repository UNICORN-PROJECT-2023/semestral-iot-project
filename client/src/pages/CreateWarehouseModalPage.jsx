import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Stack } from '@mui/material';
import { motion } from "framer-motion";
import styled from 'styled-components';

const StyledWrapper = styled.div`
    display: flex;
    justify-content: center; // Aligns children (button) to the right
    width: 100%; // Ensures the wrapper takes full width of its container
    margin-bottom: 20px; // Adds some spacing below the button

    button {
        color: #fff;
        border: none;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        font-size: 1rem;
        letter-spacing: 1px;
        font-weight: bold;
        cursor: ${props => props.disabled ? '' : 'pointer'};
        background-image: linear-gradient(${props => props.disabled ? '#d3d3d3' : '#5c5c5c'}, ${props => props.disabled ? '#a8a8a8' : 'rgba(0,0,0,0.18)'});
    }
`;

const CreateWarehouseModalPage = (props) => {
    const [formData, setFormData] = useState({
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
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={props.onOpen}
                >
                    Create Warehouse
                </motion.button>
            </StyledWrapper>
            <Modal
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add New Warehouse
                    </Typography>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <TextField
                            label="IoT ID"
                            variant="outlined"
                            name="iotId"
                            value={formData.iotId}
                            onChange={handleChange}
                        />
                        <TextField
                            type="number"
                            label="Minimum Temperature"
                            variant="outlined"
                            name="minTemperature"
                            value={formData.minTemperature}
                            onChange={handleChange}
                        />
                        <TextField
                            type="number"
                            label="Maximum Temperature"
                            variant="outlined"
                            name="maxTemperature"
                            value={formData.maxTemperature}
                            onChange={handleChange}
                        />
                        <TextField
                            type="number"
                            label="Alert Duration (minutes)"
                            variant="outlined"
                            name="alertDuration"
                            value={formData.alertDuration}
                            onChange={handleChange}
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
