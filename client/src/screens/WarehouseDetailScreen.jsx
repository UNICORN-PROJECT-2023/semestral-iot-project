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
    const [dateTo, setDateTo] = useState(new Date().setDate(new Date().getDate() + 1));
    const [interval, setInterval] = useState(1); // Default interval to 1 minute
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        fetchWarehouseDetails();
        fetchRecords();
    }, [warehouseId, dateFrom, dateTo, interval, entriesPerPage, currentPage]);

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
            queryParams.append('offset', (currentPage - 1) * entriesPerPage);
            queryParams.append('length', entriesPerPage);
            queryParams.append('interval', interval);

            const response = await apiService.get(`/warehouse/${warehouseId}/record?${queryParams.toString()}`);
            const json = await response.json();
            setRecords(json.body || []);
            const queryParams2 = new URLSearchParams();
            if (dateFrom) queryParams2.append('from', format(dateFrom, 'yyyy-MM-dd'));
            if (dateTo) queryParams2.append('to', format(dateTo, 'yyyy-MM-dd'));
            queryParams2.append('offset', 0);
            queryParams2.append('length', 99999999);
            queryParams2.append('interval', interval);
            const responseAll = await apiService.get(`/warehouse/${warehouseId}/record?${queryParams2.toString()}`);
            const jsonAll = await responseAll.json();
            setTotalRecords(jsonAll.body.length || 0);  // Ensure this correctly reflects the number of records
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
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalRecords={totalRecords}
        />
    );
};

export default WarehouseDetailScreen;
