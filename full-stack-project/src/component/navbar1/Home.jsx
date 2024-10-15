import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Text, Box, Image, Grid, Flex } from '@chakra-ui/react';
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from 'react-router-dom';
const base_url = import.meta.env.VITE_HOST_URL;

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const handleClick = (item) => {

    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (!wishlist.some(wishlistItem => wishlistItem._id === item._id)) {
   
      wishlist.push(item);
    
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      alert('Item added to wishlist!'); 
    } else {
      alert('Item is already in the wishlist!');
    }

  }

  useEffect(() => {
    axios.get(`${base_url}/product`)
      .then((res) => {
        console.log('Fetched data:', res.data);  // Check if the data is correct
        setData([...res.data.msg]);  // Spread to ensure it's a new array (state immutability)
      })
      .catch((err) => {
        setError(true);
        console.error('Error fetching data:', err);
      });
  }, []);  // Dependency array empty to run once on mount

  if (error) {
    return <Text color="red.500">Something went wrong while fetching data...</Text>;
  }

  return (
    <>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        gap={6}
        p={4}
      >
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <Box position={'relative'} key={index} borderRadius={5} overflow="hidden">
              <Image
                borderRadius={'10'}
                src={item.image}
                w={'100%'} // Makes the image responsive
                h={{ base: '200px', md: '250px', lg: '250px' }} // Responsive height
                objectFit="cover" // Cover the area without distorting the image
              />
              <Button
                position="absolute"
                onClick={() => handleClick(item)}
                top="10px"
                right="10px"
                bg="white"
                _hover={{ bg: 'red.300' }}
              >
                <MdFavoriteBorder
                  style={{
                    fontSize: '30px',
                    backgroundColor: 'transparent',

                    borderRadius: '50%',
                    padding: '0px'

                  }}
                  className="favorite-icon"  // Custom class for hover effects
                />
              </Button>
              <Text fontSize={{ base: 'sm', md: 'md' }} m={2}>{item.name ? `${item.name}` : ""}</Text>
              <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight={'semibold'}>
                <Link to={`/${item._id}`}>{item.title ? `${item.title}` : ""}</Link>
              </Text>
              <Flex justifyContent={'space-between'} m={2}>
                <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight={'bold'} color={'green'}>
                  ${item.price}
                </Text>
                <Text fontSize={{ base: 'md', md: 'lg' }}>⭐ {item.rating}</Text>
              </Flex>
            </Box>
          ))
        ) : (
          <Text>Loading or no products available.</Text>
        )}
      </Grid>
    </>
  );
};

export default Home;
