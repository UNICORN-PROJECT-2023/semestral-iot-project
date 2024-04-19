import React, {useState, useEffect} from 'react';
import {Typography, Container, Box} from '@mui/material';
import ApiService from "../services/apiService";
import styled from 'styled-components';

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

const WarehousesScreen = () => {
    const apiService = new ApiService();
    const [warehouses, setWarehouses] = useState([]);

    // Fetching data from the local API
    useEffect(() => {
        console.log("Fetching warehouse data...");
        fetchWarehouseData();
    }, []);

    async function fetchWarehouseData() {
        try {
            const response = await apiService.get('/warehouse');
            const json = await response.json();
            setWarehouses(json.body);
        } catch (error) {
            console.error('Error fetching warehouse data:', error);
        }
    }

    return (
        <StyledWrapper>
            <Container>
                <Typography variant="h4" sx={{mb: 2}}>
                    Warehouses
                </Typography>
                {warehouses.map((wh) => (
                    <Box key={wh.id} sx={{padding: 2, marginBottom: 1, border: '1px solid #ccc', borderRadius: '5px'}}>
                        <Typography variant="body1">
                            Name: Warehouse-{wh.id}, Temperature Range: {wh.temperatureMin} - {wh.temperatureMax}°C,
                            Alert Min Duration: {wh.allertMinDuration} minutes
                        </Typography>
                    </Box>
                ))}
            </Container>
        </StyledWrapper>
    );
};

export default WarehousesScreen;