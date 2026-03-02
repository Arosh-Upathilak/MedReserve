import React,{  createContext, useEffect, useState } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [token , setToken] = useState(null);
    const [authStep, setAuthStep] = useState("login");
    useEffect(()=>{
        const storedToken = localStorage.getItem('token');
       if(storedToken)
            setToken(storedToken)
    },[])


    return(
        <AuthContext.Provider value = {{token,authStep, setAuthStep}} >
            {children}
        </AuthContext.Provider>
    )
 }