import { Box, Flex, Stack, useBreakpointValue, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';


const Navbar2 = () => {
  const spacing = useBreakpointValue({ base: 3, md: 5 });
  const hoverColor = useBreakpointValue({ base: 'gray.300', md: 'gray.200' });

  return (
    <Box bg="teal.500" boxShadow="md" py={4} px={2}>
      <Flex justifyContent="center" wrap="wrap">
        <Stack direction={{ base: 'column', sm: 'row' }} spacing={spacing} align="center">
          {[
            { to: '/beauty-and-spas', label: '🥀 Beauty & Spas' },
            { to: '/things-to-do', label: '🎯 Things to do' },
            { to: '/gifts', label: '🎁 Gifts' },
            { to: '/auto-and-home', label: '🏡 Auto & Home' },
            { to: '/food-and-drink', label: '🍽️ Food & Drink' },
            { to: '/local', label: '📍 Local' },
            { to: '/travel', label: '✈ Travel' },
            { to: '/goods', label: '🛍️ Goods' },
            { to: '/coupons', label: '🎟️ Coupons' },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: 'bold',
                padding: '10px 15px',
                borderRadius: '5px',
                transition: 'background-color 0.3s',
                display: 'flex',
                alignItems: 'center',
              }}
              _hover={{
                backgroundColor: hoverColor,
                color: 'teal.800',
              }}
            >
              <Text>{item.label}</Text>
            </Link>
          ))}
        </Stack>
      </Flex>
    </Box>
  );
};

export default Navbar2;
