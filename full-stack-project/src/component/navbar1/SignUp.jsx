import React, { useState, useEffect } from 'react';
import {
    Button, Flex, Input, Checkbox, Text, Box, Heading, VStack
} from "@chakra-ui/react";
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa';
import { useAuth } from '../contextApi/AuthConetxt'; // Adjust the path
import { useNavigate } from 'react-router-dom';

const SignUpSignIn = () => {
    const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
    const [isAlreadyNotRegistered, setIsAlreadyNotRegistered] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { login, register, user } = useAuth(); // Use auth context
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        if (user) {
            console.log('User logged in:', user); // Log the user when it's updated
            navigate('/'); // Redirect to home page upon login
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
                alert('Registration successful! Please log in now.');
                setIsAlreadyRegistered(true); // Switch to login after registration
                setIsAlreadyNotRegistered(false);
            } else {
                const userData = { email, password };
                console.log('Logging in:', userData);
                await login(userData);
                navigate('/'); // Redirect to home page after successful login
            }

        } catch (error) {
            console.error('Error during operation:', error); // Log error details
            alert('An error occurred: ' + error.message);
        }
    };

    return (
        <Box p={5} maxW="500px" mx="auto">
            <VStack spacing={4} align="stretch">
                <Heading textAlign="center">
                    {isAlreadyNotRegistered ? "Sign Up" : "Sign In"}
                </Heading>
                <Button leftIcon={<FaFacebook />} variant="outline" w="100%">
                    Continue with Facebook
                </Button>
                <Button leftIcon={<FaGoogle />} variant="outline" w="100%">
                    Continue with Google
                </Button>
                <Button leftIcon={<FaApple />} variant="outline" w="100%">
                    Continue with Apple
                </Button>

                <Text textAlign="center">
                    {isAlreadyNotRegistered ? "Or sign up with email" : "Or sign in with email"}
                </Text>

                {isAlreadyNotRegistered && <Input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />}
                <Input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                <Flex justifyContent={'space-between'}>
                    <Checkbox>Remember me</Checkbox>
                    <Text>Forgot Password?</Text>
                </Flex>

                <Button colorScheme="teal" onClick={handleSubmit}>
                    {isAlreadyNotRegistered ? "Sign Up" : "Sign In"}
                </Button>

                {!isAlreadyNotRegistered && (
                    <Button variant="link" onClick={handleAlreadyRegistered}>
                        I have an account
                    </Button>
                )}
                {!isAlreadyRegistered && (
                    <Button variant="link" onClick={handleNewRegister}>
                        I'm a new customer
                    </Button>
                )}
            </VStack>
        </Box>
    );
};

export default SignUpSignIn;
