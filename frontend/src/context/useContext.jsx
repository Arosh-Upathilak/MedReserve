import React, { createContext, useState } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authStep, setAuthStep] = useState("login");
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });


    return (
        <AuthContext.Provider value={{ token, authStep, setAuthStep }} >
            {children}
        </AuthContext.Provider>
    )
}