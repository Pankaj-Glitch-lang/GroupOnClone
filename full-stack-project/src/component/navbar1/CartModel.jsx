// CartModel.js
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from '../contextApi/CartContext'; // Import the useCart hook

function CartModel() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const { cartItems, removeFromCart } = useCart(); // Access cart items and remove function from context

    const handleShopping = () => {
        navigate('/');
    };

    return (
        <>
            <Button onClick={onOpen} mr={2}>🛒</Button>
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent p={5}>
                    <ModalHeader fontSize={'larger'}>Your Cart</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody justifyContent={'center'}>
                        {cartItems.length > 0 ? (
                            <div>
                                {cartItems.map((item) => (
                                    <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                        <Text fontSize="lg">
                                            {item.title} - ${item.price}
                                        </Text>
                                        <Button colorScheme="red" onClick={() => removeFromCart(item._id)}>
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                <Text textAlign={'center'} fontSize={'4xl'}>🛒</Text>
                                <Text textAlign={'center'} fontSize={'2xl'}>Your Shopping cart is Empty</Text>
                            </div>
                        )}
                    </ModalBody>
                    <ModalFooter justifyContent={'center'} w={'100%'}>
                        <Button variant='ghost' color={'white'} bg={'green'} w={'90%'} onClick={handleShopping}>
                            Continue Shopping
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CartModel;
