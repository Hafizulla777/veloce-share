import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // PERSISTENCE ENGINE: Check if Chrome already has a saved token session on boot
    useEffect(() => {
        const storedSession = localStorage.getItem('veloce_session');
        if (storedSession) {
            setCurrentUser(JSON.parse(storedSession));
        }
        setLoading(false);
    }, []);

    const login = (userMatrix) => {
        setCurrentUser(userMatrix);
        localStorage.setItem('veloce_session', JSON.stringify(userMatrix));
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('veloce_session');
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}