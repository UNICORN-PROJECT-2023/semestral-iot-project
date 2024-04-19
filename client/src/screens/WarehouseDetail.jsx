import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Container, Typography, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import ApiService from "../services/apiService";
import styled from "styled-components";


const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 60px); // Assuming Navbar is 60px high
    padding-top: 60px; // Push content down by the height of the Navbar
    background-color: #0D1117; // Optional: Background color

    @media (max-width: 768px) {
        padding: 60px 2rem 0;
    }
`;

const WarehouseDetail = () => {
    const apiService = new ApiService();
    const {warehouseId} = useParams();
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

    return (
        <StyledWrapper>
            <Container>
                {warehouse && (
                    <Typography variant="h4" sx={{mb: 2}}>
                        Warehouse-{warehouse.id}
                    </Typography>
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
