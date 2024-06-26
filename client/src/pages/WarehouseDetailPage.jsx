import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Box, TextField, MenuItem, Select, FormControl, InputLabel, Pagination, IconButton } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import styled, { useTheme } from 'styled-components';
import EditWarehouseModalScreen from "../screens/EditWarehouseModalScreen";
import Graph from "../components/Graph";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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

const ThemedTextField = styled(TextField)`
    & .MuiInputBase-input {
        color: ${props => props.theme.textColor};
    }
    & .MuiInputLabel-root {
        color: ${props => props.theme.textColor};
    }
    & .MuiOutlinedInput-root {
        & fieldset {
            border-color: ${props => props.theme.textColor};
        }
        &:hover fieldset {
            border-color: ${props => props.theme.textColor};
        }
        &.Mui-focused fieldset {
            border-color: ${props => props.theme.textColor};
        }
    }
    & .MuiSvgIcon-root {
        color: ${props => props.theme.textColor};
    }
`;

const ThemedSelect = styled(Select)`
    & .MuiInputBase-input {
        color: ${props => props.theme.textColor};
    }
    & .MuiInputLabel-root {
        color: ${props => props.theme.textColor};
    }
    & .MuiOutlinedInput-root {
        & fieldset {
            border-color: ${props => props.theme.textColor};
        }
        &:hover fieldset {
            border-color: ${props => props.theme.textColor};
        }
        &.Mui-focused fieldset {
            border-color: ${props => props.theme.textColor};
        }
    }
    & .MuiSvgIcon-root {
        color: ${props => props.theme.textColor};
    }
`;

const ThemedPagination = styled(Pagination)`
    & .MuiPaginationItem-root {
        color: ${props => props.theme.textColor};
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

const WarehouseDetailPage = ({ warehouse, records = [], viewMode, toggleViewMode, handleUpdate, apiService, warehouseId, dateFrom, setDateFrom, dateTo, setDateTo, interval, setInterval, entriesPerPage, setEntriesPerPage, currentPage, setCurrentPage, totalRecords }) => {
    const theme = useTheme();

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <StyledWrapper>
            <Container>
                {warehouse && (
                    <>
                        <Typography variant="h4" sx={{ mb: 2 }}>
                            {warehouse.name}
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
                                    name: warehouse.name,
                                    minTemperature: warehouse.temperatureMin,
                                    maxTemperature: warehouse.temperatureMax,
                                    alertDuration: warehouse.allertMinDuration
                                }}
                                onUpdated={handleUpdate}
                            />
                            <button className={'btn btn-1'}
                                onClick={toggleViewMode}
                                style={{ margin: '20px' }}
                            >
                                {viewMode === 'table' ? 'Show Graph' : 'Show Table'}
                            </button>
                        </div>
                    </>
                )}
                <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                    <DatePicker
                        label="Date From"
                        value={dateFrom}
                        onChange={(newValue) => setDateFrom(newValue)}
                        renderInput={(params) => <ThemedTextField {...params} theme={theme} />}
                        components={{
                            OpenPickerIcon: () => <CalendarTodayIcon sx={{ color: theme.textColor }} />
                        }}
                    />
                    <DatePicker
                        label="Date To"
                        value={dateTo}
                        onChange={(newValue) => setDateTo(newValue)}
                        renderInput={(params) => <ThemedTextField {...params} theme={theme} />}
                        components={{
                            OpenPickerIcon: () => <CalendarTodayIcon sx={{ color: theme.textColor }} />
                        }}
                    />
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id="interval-label" sx={{ color: theme.textColor }}>Interval</InputLabel>
                        <ThemedSelect
                            labelId="interval-label"
                            value={interval}
                            onChange={(event) => setInterval(event.target.value)}
                            label="Interval"
                            theme={theme}
                            IconComponent={() => <ArrowDropDownIcon sx={{ color: theme.textColor }} />}
                        >
                            <MenuItem value={1}>Minute</MenuItem>
                            <MenuItem value={60}>Hour</MenuItem>
                            <MenuItem value={1440}>Day</MenuItem>
                        </ThemedSelect>
                    </FormControl>
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id="entries-label" sx={{ color: theme.textColor }}>Page size</InputLabel>
                        <ThemedSelect
                            labelId="entries-label"
                            value={entriesPerPage}
                            onChange={(event) => setEntriesPerPage(event.target.value)}
                            label="Entries"
                            theme={theme}
                            IconComponent={() => <ArrowDropDownIcon sx={{ color: theme.textColor }} />}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </ThemedSelect>
                    </FormControl>
                </Box>
                {viewMode === 'table' ? (
                    <ThemedTable>
                        <TableHead>
                            <TableRow>
                                <ThemedTableCell>Date</ThemedTableCell>
                                <ThemedTableCell>Temperature (°C)</ThemedTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {records.map((record, index) => (
                                <TableRow key={index}>
                                    <ThemedTableCell>{new Date(record.date).toLocaleString()}</ThemedTableCell>
                                    <ThemedTableCell>{record.temperature}</ThemedTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </ThemedTable>
                ) : (
                    <Graph records={records.slice().reverse()} minTemperature={warehouse.temperatureMin} maxTemperature={warehouse.temperatureMax} />
                )}
                {totalRecords > entriesPerPage && (
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            sx={{ color: theme.textColor }}
                        >
                        </IconButton>
                        <ThemedPagination
                            count={Math.ceil(totalRecords / entriesPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            siblingCount={0}
                            boundaryCount={2}
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    color: theme.textColor,
                                },
                                '& .MuiPaginationItem-page.Mui-selected': {
                                    backgroundColor: theme.textColor,
                                    color: theme.backgroundColor,
                                },
                                '& .MuiPaginationItem-ellipsis': {
                                    color: theme.textColor,
                                },
                                '& .MuiPaginationItem-page': {
                                    '&:hover': {
                                        backgroundColor: theme.textColor,
                                        color: theme.backgroundColor,
                                    },
                                },
                            }}
                        />
                        <IconButton
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalRecords / entriesPerPage)))}
                            disabled={currentPage === Math.ceil(totalRecords / entriesPerPage)}
                            sx={{ color: theme.textColor }}
                        >
                        </IconButton>
                    </Box>
                )}
            </Container>
        </StyledWrapper>
    );
};

export default WarehouseDetailPage;
