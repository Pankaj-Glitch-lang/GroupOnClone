import React, { useEffect } from 'react';
import { Box, Text, Flex, Image, Button } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Check if token exists in local storage
    console.log('token', token)
    useEffect(() => {
        if (!token) {
            navigate('/signin'); // Redirect to login page if no token is found
        }
    }, [token, navigate]);

  

    return (
        <Box p={4}>
            <Text fontSize="2xl" fontWeight="bold">Your Wishlist</Text>
            {wishlist.length > 0 ? (
                wishlist.map((item) => (
                    <Flex key={item._id} align="center" borderWidth="1px" borderRadius="lg" p={4} m={2}>
                        <Image src={item.image} alt={item.title} boxSize="100px" borderRadius="md" />
                        <Box ml={4}>
                            <Text fontSize="lg">{item.title}</Text>
                            <Text fontSize="md" color="green.500">${item.price}</Text>
                            <Link to={`/${item._id}`}>
                                <Button mt={2} colorScheme="teal">View Details</Button>
                            </Link>
                        </Box>
                    </Flex>
                ))
            ) : (
                <Text>No items in your wishlist.</Text>
            )}
        </Box>
    );
};

export default Wishlist;
