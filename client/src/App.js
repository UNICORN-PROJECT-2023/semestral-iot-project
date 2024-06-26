import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './screens/HomeScreen';
import Register from './screens/RegisterScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Login from './screens/LoginScreen';
import Warehouses from "./screens/WarehousesScreen";
import ScrollToTop from './components/ScrollToTop';
import './App.css';
import WarehouseDetailScreen from "./screens/WarehouseDetailScreen";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { useState, useEffect } from "react";
import styled from 'styled-components';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const AppWrapper = styled.div`
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColor};
    min-height: 100vh;
`;

function App() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Retrieve the theme preference from localStorage
        const savedTheme = localStorage.getItem('isDarkMode');
        return savedTheme ? JSON.parse(savedTheme) : true; // Default to dark mode if no preference is found
    });

    const theme = isDarkMode ? darkTheme : lightTheme;

    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        // Save the theme preference to localStorage
        localStorage.setItem('isDarkMode', JSON.stringify(newTheme));
    };

    useEffect(() => {
        // Update the body background color based on the theme
        document.body.style.backgroundColor = theme.backgroundColor;
    }, [theme]);

    function isLoggedIn() {
        return localStorage.getItem('token') ? true : false;
    }

    return (
        <div className="App">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <AppWrapper>
                            <Navbar toggleTheme={toggleTheme} />
                            <ScrollToTop />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/warehouses" element={<Warehouses />} />
                                <Route path="/warehouses/:warehouseId"
                                    element={<WarehouseDetailScreen />} /> {/* New route for warehouse details */}
                                <Route path="/login" element={isLoggedIn() ? <Navigate to="/profile" /> : <Login />} />
                                <Route path="/register"
                                    element={isLoggedIn() ? <Navigate to="/profile" /> : <Register />} />
                                {/*<Route path="/profile" element={!isLoggedIn() ? <Navigate to="/login" /> : <Profile />}/>*/}
                                {/*<Route path="/Article/:id" element={<ArticleDetailScreen />} />*/}
                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        </AppWrapper>
                    </LocalizationProvider>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
