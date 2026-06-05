// context/ThemeContext.jsx
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Global state for all bookings
    const [bookingRequests, setBookingRequests] = useState([
        { id: 'TX-001', carName: 'CyberTrack Horizon', status: 'Pending', userName: 'Haffiz', pickupDate: '2026-06-10' }
    ]);

    // Track the logged-in user
    const [currentUser, setCurrentUser] = useState({ name: 'Haffiz', role: 'Operator' });

    return (
        <ThemeContext.Provider value={{ bookingRequests, setBookingRequests, currentUser, setCurrentUser }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);