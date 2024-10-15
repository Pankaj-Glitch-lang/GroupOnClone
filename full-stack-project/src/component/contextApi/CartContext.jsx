import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthConetxt'; // Ensure the correct path for your AuthContext

const CartContext = createContext();

const base_url = import.meta.env.VITE_HOST_URL;


export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState({}); // New state to hold product details
    const { token, user } = useAuth(); // Use the authentication context to get the token and user
    console.log("user",user)
    // Load cart from local storage when the component mounts
    useEffect(() => {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart)); // Parse and set the cart items
        }
    }, []);

    // Fetch the cart from the backend
    const fetchCart = async () => {
        if (!token) return; // Check if token is available
        try {
            const response = await axios.get(`${base_url}/cart`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCartItems(response.data.items || []); // Set cart items or empty array
        } catch (err) {
            console.error('Failed to fetch cart', err);
        }
    };

    useEffect(() => {
        fetchCart(); // Fetch cart when the component mounts
    }, [token]); // Re-fetch when token changes

    // Fetch product details based on product IDs in the cart
    const fetchProductDetails = async (productIds) => {
        try {
            const response = await axios.post(`${base_url}/product/details`, { ids: productIds });
            const productsData = response.data.reduce((acc, product) => {
                acc[product._id] = product; // Store products by ID for easy access
                return acc;
            }, {});
            setProducts(productsData); // Set products state
        } catch (error) {
            console.error("Failed to fetch product details", error);
        }
    };

    // Fetch product details when cart items are fetched
    useEffect(() => {
        if (cartItems.length > 0) {
            const productIds = cartItems.map(item => item.productId); // Extract product IDs
            fetchProductDetails(productIds); // Fetch details for these products
        }
    }, [cartItems]);

    // Function to add items to the cart
    const addToCart = async (item) => {
        if (!token) {
            console.error('User is not logged in');
            return; // Prevent adding if the user is not logged in
        }

        try {
            const response = await axios.post(`${base_url}/cart/add`, 
                { productId: item._id, quantity: 1 }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const updatedCartItems = response.data.items;
            setCartItems(updatedCartItems);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Save updated cart to local storage
        } catch (err) {
            console.error('Failed to add item to cart', err);
        }
    };
    console.log('Current user in CartContext:', user);


    // Function to remove items from the cart
    const removeFromCart = async (productId) => {
        if (!user) {
            console.error('User is not logged in');
            return; // Prevent further execution if the user is not logged in
        }
        console.log('ProductItem', productId);
        console.log(cartItems)
        const token = localStorage.getItem('token');
    
        if (!token) {
            console.error('Token is missing');
            return;
        }
    
        try {
            const response = await axios.post(
                `${base_url}/cart/remove`,
                { productId }, // Only send the productId
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            // Update cart items after removing
            const updatedCartItems = cartItems.filter(item => item.productId !== productId);
            console.log(cartItems)
            setCartItems(updatedCartItems);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            console.log('Item removed:', response.data);
        } catch (error) {
            console.error('Failed to remove item from cart:', error);
        }
    };
    
    return (
        <CartContext.Provider value={{ cartItems, products, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
