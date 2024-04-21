import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from "../services/apiService";
import WarehouseDetailPage from '../pages/WarehouseDetailPage';

const WarehouseDetailScreen = () => {
    const apiService = new ApiService();
    const { warehouseId } = useParams();
    const [records, setRecords] = useState([]);
    const [warehouse, setWarehouse] = useState(null);
    const [viewMode, setViewMode] = useState('table'); // Default view mode

    useEffect(() => {
        fetchWarehouseDetails();
        fetchRecords();
    }, [warehouseId]);

    const fetchWarehouseDetails = async () => {
        try {
            const response = await apiService.get(`/warehouse`);
            const json = await response.json();
            const fetchedWarehouse = json.body.find((wh) => wh.id === parseInt(warehouseId));
            setWarehouse(fetchedWarehouse);
        } catch (error) {
            console.error('Error fetching warehouse details:', error);
        }
    };

    const fetchRecords = async () => {
        try {
            const response = await apiService.get(`/warehouse/${warehouseId}/record`);
            const json = await response.json();
            setRecords(json.body);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    const toggleViewMode = () => {
        setViewMode(prevMode => prevMode === 'table' ? 'graph' : 'table');
    };

    const handleUpdate = () => {
        fetchWarehouseDetails(); // Refresh data after update
    };

    return (
        <WarehouseDetailPage
            warehouse={warehouse}
            records={records}
            viewMode={viewMode}
            toggleViewMode={toggleViewMode}
            handleUpdate={handleUpdate}
            apiService={apiService}
            warehouseId={warehouseId}
        />
    );
};

export default WarehouseDetailScreen;
