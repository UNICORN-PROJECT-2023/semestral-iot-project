import React, { useState } from 'react';
import { Typography, Container, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CreateWarehouseModalScreen from '../screens/CreateWarehouseModalScreen';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNotification} from "../context/NotificationContext";

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 60px);
    padding-top: 60px;
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColor};

    .btn {
        border: none;
        padding: 0.5rem 1rem;
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
        background-position: right center;
    }

    .btn-1 {
        background-image: linear-gradient(to right, ${props => props.theme.buttonBackground} 30%, ${props => props.theme.textColor} 50%, ${props => props.theme.buttonBackground} 100%);
    }

    @media (max-width: 768px) {
        padding: 60px 2rem 0;
    }
`;

const ThemedTable = styled(Table)`
    &.MuiTable-root {
        color: ${props => props.theme.textColor};
    }
`;

const ThemedTableCell = styled(TableCell)`
    &.MuiTableCell-root {
        color: ${props => props.theme.textColor};
        border-bottom: 1px solid ${props => props.theme.borderColor};
    }
`;

const ThemedDialogTitle = styled(DialogTitle)`
    &.MuiDialogTitle-root {
        background-color: ${props => props.theme.backgroundColor};
        color: ${props => props.theme.textColor};
    }
`;

const ThemedDialogContentText = styled(DialogContentText)`
    &.MuiDialogContentText-root {
        color: ${props => props.theme.inputTextColor};
    }
`;

const ThemedButton = styled(Button)`
    &.MuiButton-root {
        color: ${props => props.theme.buttonTextColor};
        background-color: ${props => props.theme.buttonBackground};
        &:hover {
            background-color: ${props => props.theme.buttonBackground};
        }
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;

    .detail-button {
        margin-right: 8px;
    }
`;

const WarehousesPage = ({ warehouses, refreshWarehouses, apiService }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    const showNotification = useNotification();

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
            showNotification('success', `Warehouse-${selectedWarehouse.id} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting warehouse:', error);
            showNotification('error', `Failed to delete Warehouse-${selectedWarehouse.id}.`);
        }
    };

    return (
        <StyledWrapper>
            <Container>
                <CreateWarehouseModalScreen apiService={apiService} refreshWarehouses={refreshWarehouses} />
                <Typography variant="h4" sx={{ mb: 4 }}>
                    Warehouses
                </Typography>
                <ThemedTable>
                    <TableHead>
                        <TableRow>
                            <ThemedTableCell>Name</ThemedTableCell>
                            <ThemedTableCell>Min Temperature (°C)</ThemedTableCell>
                            <ThemedTableCell>Max Temperature (°C)</ThemedTableCell>
                            <ThemedTableCell>Alert Duration (min)</ThemedTableCell>
                            <ThemedTableCell>Actions</ThemedTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {warehouses.map((wh) => (
                            <TableRow key={wh.id}>
                                <ThemedTableCell>{wh.name}</ThemedTableCell>
                                <ThemedTableCell>{wh.temperatureMin}</ThemedTableCell>
                                <ThemedTableCell>{wh.temperatureMax}</ThemedTableCell>
                                <ThemedTableCell>{wh.allertMinDuration}</ThemedTableCell>
                                <ThemedTableCell>
                                    <ButtonWrapper>
                                        <Link to={`/warehouses/${wh.id}`} style={{ textDecoration: 'none' }}>
                                            <button className="btn-1 btn">
                                                Detail
                                            </button>
                                        </Link>
                                        <button className="btn btn-1" onClick={() => handleDeleteClick(wh)} aria-label="delete">
                                            <DeleteIcon />
                                        </button>
                                    </ButtonWrapper>
                                </ThemedTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </ThemedTable>
            </Container>

            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <ThemedDialogTitle id="alert-dialog-title">{"Confirm Deletion"}</ThemedDialogTitle>
                <DialogContent>
                    <ThemedDialogContentText id="alert-dialog-description">
                        Are you sure you want to delete Warehouse-{selectedWarehouse?.id}?
                    </ThemedDialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <ThemedButton onClick={handleDeleteConfirm} color="primary" autoFocus>
                        Delete
                    </ThemedButton>
                </DialogActions>
            </Dialog>
        </StyledWrapper>
    );
};

export default WarehousesPage;
