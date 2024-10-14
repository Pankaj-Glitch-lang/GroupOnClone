import { Box, Button, Text, Flex, Image, Input, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useCart } from '../contextApi/CartContext'; // Assuming you have a CartContext

const CartPage = () => {
    const { cartItems, products, removeFromCart, bulkUpdateCart } = useCart(); // Access products from context

    const totalPrice = cartItems.reduce((acc, item) => {
        const product = products[item.productId]; // Get the product details from products object
        if (product) {
            return acc + (product.price * item.quantity); // Calculate total price
        } else {
            console.warn(`Product not found for ID: ${item.productId}`); // Debugging output
            return acc; // If product is not found, do not add to total
        }
    }, 0); 

    const [loading, setLoading] = useState(false);
    const toast = useToast();
    
    const handleBulkUpdate = async () => {
        setLoading(true);
        try {
            const itemsToUpdate = cartItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity + 1 // Example of increasing quantity
            }));
            await bulkUpdateCart(itemsToUpdate); // Call the bulk update function from context
            toast({
                title: "Cart Updated",
                description: "Your cart has been updated successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Bulk update failed", error);
            toast({
                title: "Update Failed",
                description: "There was an issue updating your cart.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box p={10}>
            <Text fontSize="3xl" fontWeight="bold" mb={5}>
                Your Shopping Cart
            </Text>
            
            {cartItems.length === 0 ? (
                <Text fontSize="xl" textAlign="center">
                    Your cart is empty. 🛒
                </Text>
            ) : (
                <>
                    {cartItems.map((item) => {
                        const product = products[item.productId]; // Get the product details
                        return (
                            <Flex 
                                key={item._id} 
                                justifyContent="space-between" 
                                alignItems="center" 
                                mb={5} 
                                p={5} 
                                borderWidth="1px" 
                                borderRadius="lg"
                            >
                                <Image 
                                    src={product?.image || '/path/to/default/image.jpg'}
                                    alt={product?.title || 'Product Image'}
                                    boxSize="100px"
                                    objectFit="cover"
                                    mr={5}
                                    borderRadius="md"
                                />
                                <Box flex="1">
                                    <Text fontSize="lg">
                                        {product?.title || 'Product Title'}
                                    </Text>
                                    <Text fontSize="md" color="gray.500">
                                        Quantity: {item.quantity}
                                    </Text>
                                    <Text fontSize="md" color="gray.500">
                                        Price: ${(product ? product.price * item.quantity : 0).toFixed(2)}
                                    </Text>
                                    <Input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => {
                                            const newQuantity = Math.max(1, parseInt(e.target.value)); // Ensure quantity is at least 1
                                            item.quantity = newQuantity; // Update quantity in cart item
                                        }}
                                        width="100px"
                                        mt={2}
                                    />
                                </Box>
                                <Button onClick={() => removeFromCart(item._id)} colorScheme="red">
                                    Remove
                                </Button>
                            </Flex>
                        );
                    })}
                    <Flex justifyContent="space-between" alignItems="center" mt={5}>
                        <Text fontSize="2xl" fontWeight="bold">
                            Total: ${totalPrice.toFixed(2)}
                        </Text>
                        <Button colorScheme="blue" onClick={handleBulkUpdate} isLoading={loading}>
                            Update Cart
                        </Button>
                    </Flex>
                </>
            )}
        </Box>
    );
};

export default CartPage;
