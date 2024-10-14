import { Box, Button, Flex, IconButton, Spacer, Text, useDisclosure, VStack, Collapse } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, HamburgerIcon } from '@chakra-ui/icons';
import LanguageModel from './Language';
import CartModel from './CartModel';
import Notifications from './Notifications';
import SignUp from './SignUp';
import SearchBox from './SearchBox';
import { FaCartShopping } from "react-icons/fa6";
import { useAuth } from '../contextApi/AuthConetxt'; // Adjust the path

const Navbar = () => {
    const { isOpen, onToggle } = useDisclosure();
    const { user, logout } = useAuth(); // Get user and logout function from context

    return (
        <Flex
            m={2}
            alignItems="center"
            bg="white" // Maintain background color
            borderRadius="lg"
            boxShadow="md"
            p={3}
            position="relative" // Positioning for the dropdown
        >
            <Box fontSize={{ base: '20px', md: '25px' }} m={{ base: 2, md: 3 }} color={'green'} fontWeight={'bold'}>
                <Link to={'/'}>GROUPON</Link>
            </Box>
            <Spacer />
            <Box width={{ base: '100%', md: '50%' }} border={'1px solid grey'} borderRadius={'30px'}>
                <Flex p={2}>
                    <Box flex="1">
                        <SearchBox />
                    </Box>
                    <IconButton
                        colorScheme="green"
                        aria-label="Search database"
                        bg={'green'}
                        borderRadius="20"
                        icon={<SearchIcon />}
                    />
                </Flex>
            </Box>
            <Spacer />
            <IconButton
                icon={<HamburgerIcon />}
                aria-label="Open Menu"
                onClick={onToggle} // Ensure this calls the toggle function
                display={{ base: 'block', md: 'none' }} // Show only on mobile
                colorScheme="green"
                variant="outline"
                borderRadius="full"
            />
            <Collapse in={isOpen} animateOpacity>
                <VStack
                    bg="white"
                    position="absolute"
                    top="60px"
                    right="10px"
                    boxShadow="lg"
                    borderRadius="lg"
                    spacing={4}
                    p={4}
                    zIndex={1}
                    width="200px" // Fixed width for dropdown
                >
                    <Link to={'/wishlist'}>
                        <Text color="green" _hover={{ color: 'green.500' }}>Wishlist</Text>
                    </Link>
                    <CartModel />
                    <Notifications />
                    <SignUp />
                    <LanguageModel />
                </VStack>
            </Collapse>
            <Flex fontSize={'2xl'} m={2} display={{ base: 'none', md: 'flex' }}>
                <Box mr={4} fontSize={'larger'}>
                    <Link to={'/wishlist'}>♡</Link>
                </Box>
                <Link to={'/cart'}>
                    <Button colorScheme="green">
                        <FaCartShopping />
                    </Button>
                </Link>
                <Notifications />
                <Link to={'/signin'}>
                    <Button
                        borderRadius={'20'}
                        border={'1px solid gray'}
                        ml={4}
                        colorScheme="green"
                        onClick={user ? logout : null} // Call logout on click if user is logged in
                    >
                        {user ? "LogOut ➡️" : "👤 Sign In"}
                    </Button>
                </Link>
            </Flex>
        </Flex>
    );
};

export default Navbar;
