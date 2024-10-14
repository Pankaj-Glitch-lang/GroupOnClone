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


const Navbar = () => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Flex m={2} alignItems="center">
            <Box
                fontSize={{ base: '20px', md: '25px' }} // Adjust font size for small screens
                m={{ base: 2, md: 3 }} // Adjust margin for small screens
                color={'green'}
                fontWeight={'bold'}
            >
                <Link to={'/'}>GROUPON</Link>
            </Box>

            <Spacer />
            <Box width={{ base: '100%', md: '50%' }} border={'1px solid grey'} borderRadius={'30px'}>
                <Flex p={2}>
                    <Box flex="1" width={'90%'}>
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

            {/* Hamburger Icon for Mobile */}
            <IconButton
                icon={<HamburgerIcon />}
                aria-label="Open Menu"
                onClick={onToggle}
                display={{ base: 'block', md: 'none' }} // Show only on small screens
                colorScheme="green"
            />

            {/* Menu for Mobile */}
            <Collapse in={isOpen}>
                <VStack
                    bg="white"
                    position="absolute"
                    top="60px"
                    right="10px"
                    boxShadow="md"
                    borderRadius="lg"
                    spacing={4}
                    p={4}
                    zIndex={1}
                >
                    <LanguageModel />
                    <Link to={'/wishlist'}><Text>Wishlist</Text></Link>
                    <CartModel />
                    <Notifications />
                    <SignUp />
                </VStack>
            </Collapse>

            {/* Desktop Icons (Hidden on Small Screens) */}
            <Flex fontSize={'2xl'} m={2} display={{ base: 'none', md: 'flex' }}> {/* Show only on larger screens */}
                
                <Box mr={4} fontSize={'larger'}>
                    <Link to={'/wishlist'}>♡</Link>
                </Box>
               <Link to={'cart'}><Button><FaCartShopping/></Button></Link>
                <Notifications />
                <SignUp />
            </Flex>
        </Flex>
    );
};

export default Navbar;
