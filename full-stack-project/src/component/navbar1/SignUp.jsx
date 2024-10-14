import React, { useState, useEffect } from 'react';
import {
    Button, Modal, ModalBody, ModalCloseButton, ModalContent,
    ModalFooter, ModalHeader, ModalOverlay, Text, Flex, Input, Checkbox,
    useDisclosure
} from "@chakra-ui/react";
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa';
import { useAuth } from '../contextApi/AuthConetxt'; // Adjust the path

const SignUp = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
    const [isAlreadyNotRegistered, setIsAlreadyNotRegistered] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { login, register, user } = useAuth(); // Use auth context

    useEffect(() => {
        if (user) {
            console.log('User logged in:', user); // Log the user when it's updated
        }
    }, [user]);

    const handleAlreadyRegistered = () => {
        setIsAlreadyRegistered(true);
        setIsAlreadyNotRegistered(false);
    };

    const handleNewRegister = () => {
        setIsAlreadyNotRegistered(true);
        setIsAlreadyRegistered(false);
    };

    const handleSubmit = async () => {
        try {
            console.log('Email:', email);
            console.log('Password:', password);

            if (isAlreadyNotRegistered) {
                const userData = { name, email, password };
                console.log('Registering:', userData);
                await register(userData);
            } else {
                const userData = { email, password };
                console.log('Logging in:', userData);
                await login(userData);
            }

            alert('Operation successful!');
            onClose();
        } catch (error) {
            console.error('Error during operation:', error); // Log error details
            alert('An error occurred: ' + error.message);
        }
    };

    return (
        <>
            <Button borderRadius={'20'} border={'1px solid gray'} onClick={onOpen} ml={4}>
                👤 Sign In
            </Button>
            <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
                <ModalOverlay />
                <ModalContent p={5} borderRadius={'30'}>
                    <ModalHeader>
                        <Flex>
                            <Button onClick={handleAlreadyRegistered} bg={'none'}>I have an account</Button>
                            <Text fontSize={'2xl'} color={'grey'} fontWeight={'light'}> |</Text>
                            <Button onClick={handleNewRegister} bg={'none'}>I'm a new customer</Button>
                        </Flex>
                        <hr />
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody justifyContent={'center'} textAlign={'center'} width={'-moz-min-content'}>
                        <Button m={5} fontSize={'large'} pr={10} pl={10} border={'1px'} borderRadius={'20'} leftIcon={<FaFacebook color="#1877F2" />} colorScheme='white' color={'blackAlpha'} variant='solid' w={'90%'}>
                            Continue with Facebook
                        </Button>
                        <Button fontSize={'large'} pr={10} pl={10} border={'1px'} borderRadius={'20'} leftIcon={<FaGoogle color="RGB(219, 68, 55)" />} colorScheme='white' color={'blackAlpha'} w={'90%'} variant='solid'>
                            Continue with Google
                        </Button>
                        <Button m={5} fontSize={'large'} pr={10} pl={10} border={'1px'} borderRadius={'20'} leftIcon={<FaApple color="#000000" />} colorScheme='white' w={'90%'} color={'blackAlpha'} variant='solid'>
                            Continue with Apple
                        </Button>

                        <Text textAlign={'center'} fontSize={'medium'}>
                            {isAlreadyNotRegistered ? "Or sign up with email" : "Or sign in with email"}
                        </Text>
                        {isAlreadyNotRegistered && <Input placeholder='Name' m={2} value={name} onChange={(e) => setName(e.target.value)} />}
                        <Input m={2} placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input m={2} placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Flex justifyContent={'space-between'}>
                            <Checkbox m={2}>Remember me</Checkbox>
                            <Text m={2}>forgot_password</Text>
                        </Flex>
                    </ModalBody>
                    <ModalFooter justifyContent={'center'} w={'100%'}>
                        <Button variant='ghost' color={'white'} bg={'green'} w={'90%'} onClick={handleSubmit}>
                            {isAlreadyNotRegistered ? "Sign Up" : "Sign In"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default SignUp;
