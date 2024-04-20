import React, { useState } from 'react';
import { useNotification } from "../context/NotificationContext";
import CreateWarehouseModalPage from '../pages/CreateWarehouseModalPage'; // The new presentation component

const CreateWarehouseModalScreen = ({ apiService, refreshWarehouses }) => {
    const [open, setOpen] = useState(false);
    const showNotification = useNotification();

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const validateData = (formData) => {
        if (!formData.iotId) {
            showNotification('error', 'IoT ID must not be empty.');
            return false;
        }
        if (formData.minTemperature >= formData.maxTemperature) {
            showNotification('error', 'Max Temperature must be greater than Min Temperature.');
            return false;
        }
        if (formData.alertDuration <= 0) {
            showNotification('error', 'Alert Duration must be greater than 0.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (formData) => {
        // Prepare data for submission by converting string values to proper numeric types
        if (validateData(formData)) {
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
                if (response.status === 201) {
                    showNotification('success', 'Warehouse created successfully.');
                } else {
                    showNotification('error', 'Failed to create warehouse.');
                }
                refreshWarehouses(); // Call to refresh the warehouse list
                handleClose(); // Close the modal after successful submission
            } catch (error) {
                showNotification('error', 'Failed to create warehouse.');
                console.error('Failed to create warehouse:', error);
            }
        }
    };


    return (
        <CreateWarehouseModalPage
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            onSubmit={handleSubmit}
        />
    );
};

export default CreateWarehouseModalScreen;
