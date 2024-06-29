import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from "../services/apiService";
import WarehouseDetailPage from '../pages/WarehouseDetailPage';
import { format } from 'date-fns';

const WarehouseDetailScreen = () => {
    const apiService = new ApiService();
    const { warehouseId } = useParams();
    const [records, setRecords] = useState([]);
    const [warehouse, setWarehouse] = useState(null);
    const [viewMode, setViewMode] = useState('table'); // Default view mode
    const [dateFrom, setDateFrom] = useState(new Date().setMonth(new Date().getMonth() - 4));
    const [dateTo, setDateTo] = useState(new Date());
    const [interval, setInterval] = useState(1); // Default interval to 1 minute

    useEffect(() => {
        fetchWarehouseDetails();
        fetchRecords();
    }, [warehouseId, dateFrom, dateTo, interval]);

    const fetchWarehouseDetails = async () => {
        try {
            const response = await apiService.get(`/warehouse/${warehouseId}`);
            const json = await response.json();
            setWarehouse(json.body);
        } catch (error) {
            console.error('Error fetching warehouse details:', error);
        }
    };

    const fetchRecords = async () => {
        try {
            const queryParams = new URLSearchParams();
            if (dateFrom) queryParams.append('from', format(dateFrom, 'yyyy-MM-dd'));
            if (dateTo) queryParams.append('to', format(dateTo, 'yyyy-MM-dd'));
            queryParams.append('offset', '0');
            queryParams.append('length', '100');
            queryParams.append('interval', interval);

            const response = await apiService.get(`/warehouse/${warehouseId}/record?${queryParams.toString()}`);
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
            dateFrom={dateFrom}
            setDateFrom={setDateFrom}
            dateTo={dateTo}
            setDateTo={setDateTo}
            interval={interval}
            setInterval={setInterval}
        />
    );
};

export default WarehouseDetailScreen;
