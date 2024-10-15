import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../contextApi/CartContext'; // Use Cart Context
import { useAuth } from '../contextApi/AuthConetxt'; // Adjust the path
const base_url = import.meta.env.VITE_HOST_URL;

const DetailsPage = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [error, setError] = useState(false);
    const { user } = useAuth(); // Use auth context
    const navigate = useNavigate(); // Initialize useNavigate

    const { addToCart } = useCart(); // Use the addToCart function from context

    useEffect(() => {
        if (!user) {
            console.log('User logged in:', user); // Log the user when it's updated
            navigate('/signin'); // Redirect to home page upon login
        }
    }, [user]);

    const fetchDetails = async () => {
        try {
            const response = await axios.get(`${base_url}/product/${id}`);
            setData(response.data.msg);
            setError(false);
        } catch (err) {
            setError(true);
        }
    };

    const handleAddToCart = () => {
        // Use context to add the item to the cart


        const cart = JSON.parse(localStorage.getItem('cart')) || [];


        const itemInCart = cart.find(item => item._id === data._id);
        if (!itemInCart) {

            addToCart(data);

            alert('Item added to cart!');
        } else {
            alert('Item is already in the cart!');
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    if (error) {
        return <Text color="red.500">Something went wrong while fetching details page</Text>;
    }

    return (
        <Flex justifyContent="center">
            <Box m={10} width={'50%'}>
                <Text fontSize={['lg', 'xl', '30px']} m={2} fontWeight="semibold">
                    {data.title || ""}
                </Text>
                <Image
                    borderRadius="10px"
                    src={data.image || 'placeholder-image-url'}
                    alt={data.title || 'Product Image'}
                    w={'100%'}
                    h={['auto', '400px']}
                />
                <Text fontSize={['md', 'lg', 'larger']} m={2}>
                    {data.name || ""}
                </Text>
                <Flex justifyContent="space-between" m={10}>
                    <Text fontSize={30} fontWeight="bold" color="green">
                        ${data.price || 'N/A'}
                    </Text>
                    <Text>
                        ⭐ {data.rating || 'No rating'}
                    </Text>
                </Flex>
                <Text>Description: {data.description}</Text>

                {/* Add to Cart / Buy Now Button */}
                <Button
                    colorScheme="teal"
                    onClick={handleAddToCart}
                    mt={4}

                >
                    Add to Cart
                </Button>
                <Button
                    colorScheme="blue"
                    mt={4}
                    ml={2}
                    onClick={() => alert('Proceed to Checkout')}
                >
                    Buy Now
                </Button>
            </Box>
        </Flex>
    );
}

export default DetailsPage;
