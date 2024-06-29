import React, { useState } from 'react';
import { useNotification } from "../context/NotificationContext";
import EditWarehouseModalPage from '../pages/EditWarehouseModalPage'; // Presentation component

const EditWarehouseModalScreen = ({ apiService, warehouseId, initialData, onUpdated }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: initialData.name,
        minTemperature: initialData.minTemperature,
        maxTemperature: initialData.maxTemperature,
        alertDuration: initialData.alertDuration
    });
    const [error, setError] = useState('');
    const showNotification = useNotification();

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setFormData(initialData); // Reset to initial data
        setError('');
        setOpen(false);
    }

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: name === 'name' ? value : parseFloat(value) || '' }));
    };

    const validateData = () => {
        if (formData.minTemperature >= formData.maxTemperature) {
            showNotification('error', 'Minimum Temperature must be less than Maximum Temperature.');
            return false;
        }
        if (formData.alertDuration <= 0) {
            showNotification('error', 'Alert Duration must be greater than 0.');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (validateData()) {
            try {
                const response = await apiService.put(`/warehouse/${warehouseId}`, formData);
                if (response.ok) {
                    showNotification('success', 'Warehouse details updated successfully.');
                    onUpdated();
                    handleClose();
                } else {
                    showNotification('error', 'Failed to update warehouse. Please try again.');
                }
            } catch (error) {
                console.error('Error updating warehouse:', error);
                showNotification('error', 'Failed to update warehouse. Please try again.');
            }
        }
    };

    return (
        <EditWarehouseModalPage
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}
            setError={setError}
        />
    );
};

export default EditWarehouseModalScreen;
