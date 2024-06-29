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
    background-color: ${props => props.theme.backgroundColor};
    margin-bottom: 20px;
    color: ${props => props.theme.textColor};

    .btn {
        //margin: 2rem;
        border: none;
        padding: 0 1rem;
        text-align: center;
        text-transform: uppercase;
        transition: 0.5s;
        background-size: 200% auto;
        color: ${props => props.theme.buttonTextColor};
        border-radius: 0.5rem;
        font-weight: 700;
        letter-spacing: 2px;
        margin-right: 8px;
    }

    .btn:hover {
        background-position: right center; /* change the direction of the change here */
    }

    .btn-1 {
        background-image: linear-gradient(to right, ${props => props.theme.buttonBackground} 30%, ${props => props.theme.textColor} 50%, ${props => props.theme.buttonBackground} 100%);
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
                            <button className={'btn btn-1'}
                                           onClick={toggleViewMode}
                                           style={{margin: '20px'}}
                            >
                                {viewMode === 'table' ? 'Show Graph' : 'Show Table'}
                            </button>
                        </div>
                    </>
                )}
                {viewMode === 'table' ? (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'inherit', fontWeight: 'bold', fontSize: '1.1rem' }}>Date</TableCell>
                                <TableCell sx={{ color: 'inherit', fontWeight: 'bold', fontSize: '1.1rem' }}>Temperature (°C)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {records.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell sx={{ color: 'inherit' }}>{new Date(record.date).toLocaleString()}</TableCell>
                                    <TableCell sx={{ color: 'inherit' }}>{record.temperature}</TableCell>
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
