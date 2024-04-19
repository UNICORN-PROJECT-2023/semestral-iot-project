import React, { useState, useEffect } from 'react';
import {Typography, Container, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box} from '@mui/material';
import { motion } from 'framer-motion';
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

    button {
        color: #fff;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: 1rem;
        letter-spacing: 1px;
        font-weight: bold;
        cursor: ${props => props.disabled ? '' : 'pointer'};
        background-image: linear-gradient(${props => props.disabled ? '#d3d3d3' : '#5c5c5c'}, ${props => props.disabled ? '#a8a8a8' : 'rgba(0,0,0,0.18)'});
    }
    
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
                <Typography variant="h4" sx={{ mb: 4 }}>
                    Warehouses
                </Typography>
                {/*<Paper sx={{ width: '100%', overflow: 'hidden' }}>*/}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'white'}}>Name</TableCell>
                                <TableCell sx={{ color: 'white'}}>Min Temperature (°C)</TableCell>
                                <TableCell sx={{ color: 'white'}}>Max Temperature (°C)</TableCell>
                                <TableCell sx={{ color: 'white'}}>Alert Duration (min)</TableCell>
                                <TableCell sx={{ color: 'white'}}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {warehouses.map((wh) => (
                                <TableRow key={wh.id}>
                                    <TableCell sx={{ color: 'white'}}>Warehouse-{wh.id}</TableCell>
                                    <TableCell sx={{ color: 'white'}}>{wh.temperatureMin}</TableCell>
                                    <TableCell sx={{ color: 'white'}}>{wh.temperatureMax}</TableCell>
                                    <TableCell sx={{ color: 'white'}}>{wh.allertMinDuration}</TableCell>
                                    <TableCell sx={{ color: 'white'}}>
                                        <Link to={`/warehouses/${wh.id}`} style={{ textDecoration: 'none' }}>
                                            {/*<Typography sx={{ cursor: 'pointer', color: 'primary.main' }}>*/}
                                            {/*    Detail*/}
                                            {/*</Typography>*/}
                                            <motion.button whileHover={{scale: 1.1}}
                                                           whileTap={{scale: 0.9}}
                                            >
                                                Detail
                                            </motion.button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                {/*</Paper>*/}
            </Container>
        </StyledWrapper>
    );
};

export default WarehousesScreen;
