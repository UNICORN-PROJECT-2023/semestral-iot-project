import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Box, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import styled, { useTheme } from 'styled-components';
import EditWarehouseModalScreen from "../screens/EditWarehouseModalScreen";
import Graph from "../components/Graph";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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

const WarehouseDetailPage = ({ warehouse, records, viewMode, toggleViewMode, handleUpdate, apiService, warehouseId, dateFrom, setDateFrom, dateTo, setDateTo, interval, setInterval }) => {
    const theme = useTheme();

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
                </Box>
                {viewMode === 'table' ? (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'inherit', fontWeight: 'bold', fontSize: '1.1rem' }}>Date</TableCell>
                                <TableCell sx={{ color: 'inherit', fontWeight: 'bold', fontSize: '1.1rem' }}>Temperature (°C)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {records.map((record, index) => (
                                <TableRow key={index}>
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
