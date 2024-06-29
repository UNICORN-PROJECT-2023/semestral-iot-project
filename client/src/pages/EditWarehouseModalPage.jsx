import React from 'react';
import { Modal, Box, Typography, TextField, Stack, Snackbar, Alert } from '@mui/material';
import { motion } from "framer-motion";
import styled, { useTheme } from 'styled-components';

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

    .btn {
        //margin: 2rem;
        border: none;
        padding: 0 1rem;
        text-align: center;
        text-transform: uppercase;
        transition: 0.5s;
        background-size: 200% auto;
        color: ${props => props.theme.buttonTextColor};
        border-radius: 0.5rem;
        font-weight: 700;
        letter-spacing: 2px;
        margin-right: 8px;
    }

    .btn:hover {
        background-position: right center; /* change the direction of the change here */
    }

    .btn-1 {
        background-image: linear-gradient(to right, ${props => props.theme.buttonBackground} 30%, ${props => props.theme.textColor} 50%, ${props => props.theme.buttonBackground} 100%);
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
    const theme = useTheme();
    return (
        <>
            <StyledWrapper>
                <button className={'btn btn-1'}
                    onClick={handleOpen}
                    style={{margin: '20px'}}
                >
                    Edit configuration
                </button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box sx={{ ...style, bgcolor: theme.inputBackgroundColor, color: theme.textColor }}>
                        <Typography id="modal-title" variant="h6" component="h2">
                            Edit Warehouse Details
                        </Typography>
                        <Stack spacing={2} sx={{mt: 2}}>
                            <TextField
                                label="Warehouse Name"
                                variant="outlined"
                                name="name"
                                value={formData.name}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                InputLabelProps={{
                                    style: { color: theme.inputTextColor }
                                }}
                                InputProps={{
                                    style: { color: theme.inputTextColor, backgroundColor: theme.inputBackgroundColor }
                                }}
                            />
                            <TextField
                                label="Minimum Temperature (°C)"
                                variant="outlined"
                                name="minTemperature"
                                type="number"
                                value={formData.minTemperature}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                InputLabelProps={{
                                    style: { color: theme.inputTextColor }
                                }}
                                InputProps={{
                                    style: { color: theme.inputTextColor, backgroundColor: theme.inputBackgroundColor }
                                }}
                            />
                            <TextField
                                label="Maximum Temperature (°C)"
                                variant="outlined"
                                name="maxTemperature"
                                type="number"
                                value={formData.maxTemperature}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                InputLabelProps={{
                                    style: { color: theme.inputTextColor }
                                }}
                                InputProps={{
                                    style: { color: theme.inputTextColor, backgroundColor: theme.inputBackgroundColor }
                                }}
                            />
                            <TextField
                                label="Alert Duration (minutes)"
                                variant="outlined"
                                name="alertDuration"
                                type="number"
                                value={formData.alertDuration}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                InputLabelProps={{
                                    style: { color: theme.inputTextColor }
                                }}
                                InputProps={{
                                    style: { color: theme.inputTextColor, backgroundColor: theme.inputBackgroundColor }
                                }}
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
