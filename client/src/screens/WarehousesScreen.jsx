import React, { useState, useEffect } from 'react';
import ApiService from "../services/apiService";
import WarehousesPage from '../pages/WarehousesPage';

const WarehousesScreen = () => {
    const apiService = new ApiService();
    const [warehouses, setWarehouses] = useState([]);

    useEffect(() => {
        fetchWarehouseData();
    }, []);

    const fetchWarehouseData = async () => {
        try {
            const response = await apiService.get('/warehouse');
            const json = await response.json();
            setWarehouses(json.body);
        } catch (error) {
            console.error('Error fetching warehouse data:', error);
        }
    };

    return (
        <WarehousesPage warehouses={warehouses} refreshWarehouses={fetchWarehouseData} apiService={apiService} />
    );
};

export default WarehousesScreen;
