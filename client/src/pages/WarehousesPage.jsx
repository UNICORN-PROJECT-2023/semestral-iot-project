import React, { useState } from 'react';
import { Typography, Container, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CreateWarehouseModalScreen from '../screens/CreateWarehouseModalScreen';
import DeleteIcon from '@mui/icons-material/Delete';

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

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;

    .detail-button {
        margin-right: 8px; // Adjust this value to control the space between the buttons
    }
`;

const WarehousesPage = ({ warehouses, refreshWarehouses, apiService }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    const handleDeleteClick = (warehouse) => {
        setSelectedWarehouse(warehouse);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setSelectedWarehouse(null);
    };

    const handleDeleteConfirm = async () => {
        try {
            await apiService.delete(`/warehouse/${selectedWarehouse.id}`);
            refreshWarehouses();
            handleDialogClose();
        } catch (error) {
            console.error('Error deleting warehouse:', error);
        }
    };

    return (
        <StyledWrapper>
            <Container>
                <CreateWarehouseModalScreen apiService={apiService} refreshWarehouses={refreshWarehouses} />
                <Typography variant="h4" sx={{ mb: 4 }}>
                    Warehouses
                </Typography>
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
                                    <ButtonWrapper>
                                        <Link to={`/warehouses/${wh.id}`} style={{ textDecoration: 'none' }}>
                                            <motion.button className="detail-button" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                                Detail
                                            </motion.button>
                                        </Link>
                                        <motion.button className="delete-button" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleDeleteClick(wh)} aria-label="delete" sx={{ color: 'white' }}>
                                            <DeleteIcon />
                                        </motion.button>
                                    </ButtonWrapper>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>

            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete Warehouse-{selectedWarehouse?.id}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </StyledWrapper>
    );
};

export default WarehousesPage;
