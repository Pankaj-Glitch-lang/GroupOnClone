import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
// Create the Auth Context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Login function
    const login = async (userData) => {
        try {
            // Send login request with email and password
            const response = await axios.post('http://localhost:8080/auth/login', {
                email: userData.email,
                password: userData.password,
            });
    
            // Ensure the response contains both user and token
            if (response.data && response.data.token) {
                const token = response.data.token;
    
                // Decode the token to extract user information (if present in the token)
                const decodedToken = jwtDecode(token);
                console.log('Decoded Token:', decodedToken); // Log decoded token for debugging
    
                // Set user and token in the state
                setUser(decodedToken);  // You can store the decoded token if it has user info
                setToken(token);
    
                // Save the token and decoded user to localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(decodedToken)); // Save decoded token
    
                return response.data; // Return response for further actions
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Error during login:', error);
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
