import React, { useState, useEffect } from 'react';
import { Typography, Container, Box } from '@mui/material';
import ApiService from "../services/apiService";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CreateWarehouseModal from './CreateWarehouseModal'; // Import the new component

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 60px);
    padding-top: 60px;
    background-color: #0D1117;

    @media (max-width: 768px) {
        padding: 60px 2rem 0;
    }
`;

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
        <StyledWrapper>
            <Container>
                <CreateWarehouseModal apiService={apiService} refreshWarehouses={fetchWarehouseData} />
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Warehouses
                </Typography>
                {warehouses.map((wh) => (
                    <Box key={wh.id} sx={{ padding: 2, marginBottom: 1, border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer' }}>
                        <Link to={`/warehouses/${wh.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant="body1">
                                Name: Warehouse-{wh.id}, Temperature Range: {wh.temperatureMin} - {wh.temperatureMax}°C,
                                Alert Min Duration: {wh.allertMinDuration} minutes
                            </Typography>
                        </Link>
                    </Box>
                ))}
            </Container>
        </StyledWrapper>
    );
};

export default WarehousesScreen;
