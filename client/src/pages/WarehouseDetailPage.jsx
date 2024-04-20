import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import styled from "styled-components";
import EditWarehouseModalScreen from "../screens/EditWarehouseModalScreen";
import Graph from "../components/Graph";
import { motion } from "framer-motion";

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 60px);
    padding-top: 100px;
    background-color: #0D1117;
    margin-bottom: 20px;
    

    button {
        color: #fff;
        border: none;
        padding: 0.1rem 1rem;
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


const WarehouseDetailPage = ({ warehouse, records, viewMode, toggleViewMode, handleUpdate, apiService, warehouseId }) => {
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
                        <div style={{ justifyContent: 'flex-end', display: 'flex', marginTop: '20px' }}>
                            <EditWarehouseModalScreen
                                apiService={apiService}
                                warehouseId={warehouseId}
                                initialData={{
                                    minTemperature: warehouse.temperatureMin,
                                    maxTemperature: warehouse.temperatureMax,
                                    alertDuration: warehouse.allertMinDuration
                                }}
                                onUpdated={handleUpdate}
                            />
                            <motion.button whileHover={{ scale: 1.1 }}
                                           whileTap={{ scale: 0.9 }}
                                           onClick={toggleViewMode}
                                           style={{margin: '20px'}}
                            >
                                {viewMode === 'table' ? 'Show Graph' : 'Show Table'}
                            </motion.button>
                        </div>
                    </>
                )}
                {viewMode === 'table' ? (
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
                ) : (
                    <Graph records={records} minTemperature={warehouse.temperatureMin} maxTemperature={warehouse.temperatureMax} />
                )}
            </Container>
        </StyledWrapper>
    );
};

export default WarehouseDetailPage;
