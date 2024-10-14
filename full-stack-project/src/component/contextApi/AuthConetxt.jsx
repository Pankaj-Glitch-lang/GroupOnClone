import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the Auth Context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Login function
    const login = async (userData) => {
        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                email: userData.email,
                password: userData.password,
            });
                
            console.log('Login Response:', response.data); // Log the response data
            setUser(response.data.user); // Set user info from the response
            setToken(response.data.token); // Set the token

            // Save user and token to local storage
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
            return response.data; // Return response for further actions
        } catch (error) {
            console.error('Error during login:', error); // Log for debugging
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    };

    // Example register function in AuthContext
    const register = async (userData) => {
        try {
            const response = await axios.post('http://localhost:8080/auth/register', userData);
            setUser(response.data.user);
            setToken(response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
            return response.data; // Return response for further actions
        } catch (error) {
            console.error('Error during registration:', error); // Log for debugging
            throw new Error(error.response?.data?.message || 'Registration failed');
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    // Load token from localStorage on app load
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        let parsedUser = null;

        if (savedUser) {
            try {
                parsedUser = JSON.parse(savedUser);
                setUser(parsedUser); // Set user if parsed successfully
            } catch (error) {
                console.error('Failed to parse user from localStorage', error);
                localStorage.removeItem('user'); // Remove invalid entry if parsing fails
            }
        }

        if (savedToken) {
            setToken(savedToken); // Set token directly
        }

        console.log('Loaded user from localStorage:', parsedUser);
        console.log('Loaded token from localStorage:', savedToken);
    }, []);

    // Debugging: log user state updates
    useEffect(() => {
        console.log('User state updated:', user);
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the Auth Context
export const useAuth = () => useContext(AuthContext);
