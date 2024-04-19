import React, {useState} from 'react';
import {Modal, Box, Typography, TextField, Button, Stack} from '@mui/material';
import {motion} from "framer-motion";
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
    justify-content: flex-start; // Aligns children (button) to the right
    width: 100%; // Ensures the wrapper takes full width of its container
    margin-bottom: 20px; // Adds some spacing below the button

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

const EditWarehouseModal = ({apiService, warehouseId, initialData, onUpdated}) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        minTemperature: initialData.minTemperature,
        maxTemperature: initialData.maxTemperature,
        alertDuration: initialData.alertDuration
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async () => {
        try {
            const dataToSubmit = {
                minTemperature: parseFloat(formData.minTemperature),
                maxTemperature: parseFloat(formData.maxTemperature),
                alertDuration: parseInt(formData.alertDuration, 10)
            };
            await apiService.put(`/warehouse/${warehouseId}`, dataToSubmit);
            onUpdated(); // Callback to refresh or handle post-update logic
            handleClose();
        } catch (error) {
            console.error('Error updating warehouse:', error);
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
                        <Stack spacing={2} sx={{mt: 2}}>
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
                            <motion.button whileHover={{scale: 1.1}}
                                           whileTap={{scale: 0.9}}
                                           onClick={handleSubmit}
                            >
                                Save Changes
                            </motion.button>
                        </Stack>
                    </Box>
                </Modal>
            </StyledWrapper>
        </>
    );
};

export default EditWarehouseModal;
