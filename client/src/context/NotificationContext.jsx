import React, { createContext, useState, useContext } from 'react';
import Notification from '../components/Notification';

const NotificationContext = createContext(null);

export const useNotification = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({
        open: false,
        type: 'success', // Other types: 'error', 'info', 'warning'
        message: ''
    });

    const showNotification = (type, message) => {
        setNotification({ open: true, type, message });
    };

    const closeNotification = () => {
        setNotification({ ...notification, open: false });
    };

    return (
        <NotificationContext.Provider value={showNotification}>
            {children}
            <Notification
                open={notification.open}
                type={notification.type}
                message={notification.message}
                onClose={closeNotification}
            />
        </NotificationContext.Provider>
    );
};
