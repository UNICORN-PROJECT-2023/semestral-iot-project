import React, {useState} from 'react';
import styled from 'styled-components';
import {Button, Modal, Box, Typography, TextField, Stack, Snackbar, Alert} from '@mui/material';
import {motion} from "framer-motion";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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


const CreateWarehouseModal = ({apiService, refreshWarehouses}) => {
    const initialState = {
        iotId: '',
        minTemperature: '',
        maxTemperature: '',
        alertDuration: ''
    };
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState(initialState);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setFormData(initialState);
        setOpen(false);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateData = () => {
        if (!formData.iotId) {
            setError('IoT ID must not be empty.');
            return false;
        }
        if (formData.minTemperature >= formData.maxTemperature) {
            setError('Max Temperature must be greater than Min Temperature.');
            return false;
        }
        if (formData.alertDuration <= 0) {
            setError('Alert Duration must be greater than 0.');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        // Prepare data for submission by converting string values to proper numeric types
        if (validateData()) {
            const dataToSubmit = {
                iotId: formData.iotId,
                minTemperature: parseFloat(formData.minTemperature), // Convert to float
                maxTemperature: parseFloat(formData.maxTemperature), // Convert to float
                alertDuration: parseInt(formData.alertDuration, 10) // Convert to integer
            };

            // Validate the conversions (optional but recommended)
            if (isNaN(dataToSubmit.minTemperature) || isNaN(dataToSubmit.maxTemperature) || isNaN(dataToSubmit.alertDuration)) {
                console.error('Invalid input: Please ensure all fields are filled correctly.');
                return; // Exit the function if validation fails
            }

            try {
                const response = await apiService.post('/warehouse', dataToSubmit);
                console.log(response); // Log or handle the response further
                refreshWarehouses(); // Call to refresh the warehouse list
                handleClose(); // Close the modal after successful submission
            } catch (error) {
                console.error('Failed to create warehouse:', error);
            }
        }
    };


    return (
        <>
            <StyledWrapper>
                <motion.button
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9}}
                    onClick={handleOpen}
                >
                    Create Warehouse
                </motion.button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add New Warehouse
                        </Typography>
                        <Stack spacing={2} sx={{mt: 2}}>
                            <TextField
                                label="Iot ID"
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
                                whileHover={{scale: 1.1}}
                                whileTap={{scale: 0.9}}
                                onClick={handleSubmit}
                            >
                                Submit
                            </motion.button>
                        </Stack>
                        {error && (
                            <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')}>
                                <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
                                    {error}
                                </Alert>
                            </Snackbar>
                        )}
                    </Box>
                </Modal>
            </StyledWrapper>
        </>
    );
};

export default CreateWarehouseModal;
