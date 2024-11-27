import { jwtDecode } from "jwt-decode";
import React, { useState, createContext, useEffect } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const decodeToken = (jwtToken) => {
        try {
            return jwtDecode(jwtToken);
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            const decodedUser = decodeToken(storedToken);
            setToken(storedToken);
            setUser(decodedUser);
        }
    }, []);

    const login = (value) => {
        localStorage.setItem("token", value.token);
        const decodedUser = decodeToken(value.token);
        setToken(value.token);
        setUser(decodedUser);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
