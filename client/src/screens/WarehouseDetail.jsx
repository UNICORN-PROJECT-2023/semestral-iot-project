import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import ApiService from "../services/apiService";
import styled from "styled-components";
import EditWarehouseModal from "./EditWarehouseModal";

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 60px);
    padding-top: 140px;
    background-color: #0D1117;

    @media (max-width: 768px) {
        padding: 60px 2rem 0;
    }
`;

const WarehouseDetail = () => {
    const apiService = new ApiService();
    const { warehouseId } = useParams();
    const [records, setRecords] = useState([]);
    const [warehouse, setWarehouse] = useState(null);

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

    // Method to refresh the warehouse details after update
    const handleUpdate = () => {
        fetchWarehouseDetails();
    };

    return (
        <StyledWrapper>
            <Container>
                {warehouse && (
                    <>
                        <Typography variant="h4" sx={{ mb: 2 }}>
                            Warehouse-{warehouse.id}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Min Temperature: {warehouse.temperatureMin}°C
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Max Temperature: {warehouse.temperatureMax}°C
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Alert Min Duration: {warehouse.allertMinDuration} minutes
                        </Typography>
                        <EditWarehouseModal
                            apiService={apiService}
                            warehouseId={warehouseId}
                            initialData={{
                                minTemperature: warehouse.temperatureMin,
                                maxTemperature: warehouse.temperatureMax,
                                alertDuration: warehouse.allertMinDuration
                            }}
                            onUpdated={handleUpdate}
                        />
                    </>
                )}

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Date</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Temperature (°C)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.map((record) => (
                            <TableRow key={record.id}>
                                <TableCell sx={{ color: 'white' }}>{new Date(record.date).toLocaleString()}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{record.temperature}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>
        </StyledWrapper>
    );
};

export default WarehouseDetail;
