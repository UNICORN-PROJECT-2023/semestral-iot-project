import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Stack, Snackbar, Alert } from '@mui/material';
import { motion } from "framer-motion";
import styled from "styled-components";

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
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 20px;

    button {
        color: #fff;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: 1rem;
        letter-spacing: 1px;
        font-weight: bold;
        cursor: ${props => props.disabled ? '' : 'pointer'};
        background-image: linear-gradient(${props => props.disabled ? '#d3d3d3' : '#5c5c5c'}, ${props => props.disabled ? '#a8a8a8' : 'rgba(0,0,0,0.18)'});
    }
`;

const EditWarehouseModal = ({ apiService, warehouseId, initialData, onUpdated }) => {
    const [open, setOpen] = useState(false);
    const initialState = {
        minTemperature: initialData.minTemperature,
        maxTemperature: initialData.maxTemperature,
        alertDuration: initialData.alertDuration
    };
    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setFormData(formData);
        setError('');
        setOpen(false);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: parseFloat(value) || '' }));
    };

    const validateData = () => {
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
        if (validateData()) {
            try {
                await apiService.put(`/warehouse/${warehouseId}`, formData);
                onUpdated();
                setFormData(formData);
                handleClose();
            } catch (error) {
                console.error('Error updating warehouse:', error);
                setError('Failed to update warehouse. Please try again.');
            }
        }
    };

    return (
        <>
            <StyledWrapper>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleOpen}
                >
                    Edit configuration
                </motion.button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-title" variant="h6" component="h2">
                            Edit Warehouse Details
                        </Typography>
                        <Stack spacing={2} sx={{ mt: 2 }}>
                            <TextField
                                label="Minimum Temperature"
                                variant="outlined"
                                name="minTemperature"
                                type="number"
                                value={formData.minTemperature}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Maximum Temperature"
                                variant="outlined"
                                name="maxTemperature"
                                type="number"
                                value={formData.maxTemperature}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Alert Duration (minutes)"
                                variant="outlined"
                                name="alertDuration"
                                type="number"
                                value={formData.alertDuration}
                                onChange={handleChange}
                            />
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleSubmit}
                            >
                                Save Changes
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

export default EditWarehouseModal;
