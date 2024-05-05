import React from 'react';
import {Modal, Box, Typography, TextField, Stack, Snackbar, Alert} from '@mui/material';
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
    justify-content: flex-start;
    width: 100%;

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

const EditWarehouseModalPage = ({
                                    open,
                                    handleOpen,
                                    handleClose,
                                    formData,
                                    handleChange,
                                    handleSubmit,
                                    error,
                                    setError
                                }) => {
    return (
        <>
            <StyledWrapper>
                <motion.button
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9}}
                    onClick={handleOpen}
                    style={{margin: '20px'}}
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
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <TextField
                                label="Maximum Temperature"
                                variant="outlined"
                                name="maxTemperature"
                                type="number"
                                value={formData.maxTemperature}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <TextField
                                label="Alert Duration (minutes)"
                                variant="outlined"
                                name="alertDuration"
                                type="number"
                                value={formData.alertDuration}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <motion.button
                                whileHover={{scale: 1.1}}
                                whileTap={{scale: 0.9}}
                                onClick={handleSubmit}
                            >
                                Save Changes
                            </motion.button>
                        </Stack>
                        {error && (
                            <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')}>
                                <Alert onClose={() => setError('')} severity="error" sx={{width: '100%'}}>
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

export default EditWarehouseModalPage;