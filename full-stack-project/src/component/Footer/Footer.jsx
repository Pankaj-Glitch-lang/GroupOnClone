import { Box, Button, Flex, Image, Input, Select, Text } from '@chakra-ui/react';
import React from 'react';
import { FaAngleRight, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box bg={'gray.200'} p={{ base: 4, md: 6 }}>

      {/* Top Section */}
      <Flex direction={{ base: 'column', md: 'row' }} gap={10} wrap="wrap" justifyContent="space-between">
        <Box flex="1" minW={{ base: '100%', md: '280px' }}>
          <Text fontWeight={'bold'} mb={2}>
            Groupon sites
          </Text>
          <Select placeholder='🌍 Select Country' bg={'white'} border={'1px'} mb={4}>
            <option>USA</option>
            <option>France</option>
            <option>India</option>
          </Select>
        </Box>

        <Box flex="1" minW={{ base: '100%', md: '280px' }}>
          <Text fontWeight={'bold'} mb={2}>Sign up for the latest deals</Text>
          <Flex gap={3}>
            <Input placeholder='Email Address' bg={'white'} border={'1px'} />
            <Button bg={'green'} leftIcon={<FaAngleRight color='white' />} />
          </Flex>
          <Text mt={2}>By subscribing, I agree to the Terms of Use <br />and have read the Privacy Statement.</Text>
        </Box>

        <Box flex="1" minW={{ base: '100%', md: '280px' }}>
          <Text fontWeight={'bold'} mb={2}>Get the Groupon App</Text>
          <Flex gap={3}>
            <Image src='https://img.grouponcdn.com/sls/3pA72nHCtnUsjckH8KU4GvEKzzt/3p-83x82' w={100} h={100} />
            <Box>
              <Text>⭐⭐⭐⭐⭐</Text>
              <Text>100M+ downloads</Text>
              <Button borderRadius={'20'} bg={'green'} color={'white'}>Get the App</Button>
            </Box>
          </Flex>
        </Box>

        <Box flex="1" minW={{ base: '100%', md: '280px' }}>
          <Text fontWeight={'bold'} mb={2}>Follow us</Text>
          <Flex gap={2}>
            <Link to={'https://www.facebook.com/Groupon/'}><Button bg={''} leftIcon={<FaFacebook />} /></Link>
            <Link to={'https://www.instagram.com/groupon/'}><Button bg={''} leftIcon={<FaInstagram />} /></Link>
            <Link to={'https://x.com/Groupon_UK'}><Button bg={''} leftIcon={<FaTwitter />} /></Link>
            <Link to={'https://www.linkedin.com/company/groupon'}><Button bg={''} leftIcon={<FaLinkedin />} /></Link>
          </Flex>
        </Box>
      </Flex>

      {/* Bottom Section */}
      <Flex direction={{ base: 'column', md: 'row' }} gap={10} mt={5}>
        <Box color={'blackAlpha.800'} flex="1" minW={{ base: '100%', md: '200px' }}>
          <Text fontSize={'lg'} fontWeight={'bold'} mb={2}>Support</Text>
          <Text mb={2}>Help Center</Text>
          <Text mb={2}>Report Infringement</Text>
          <Text mb={2}>Refund Policies</Text>
          <Text mb={2}>Merchant Class Action Settlement Notice</Text>
        </Box>

        {/* Repeat Support Boxes for more sections */}
        {[...Array(3)].map((_, index) => (
          <Box color={'blackAlpha.800'} flex="1" minW={{ base: '100%', md: '200px' }} key={index}>
            <Text fontSize={'lg'} fontWeight={'bold'} mb={2}>Support</Text>
            <Text mb={2}>Help Center</Text>
            <Text mb={2}>Report Infringement</Text>
            <Text mb={2}>Refund Policies</Text>
            <Text mb={2}>Merchant Class Action Settlement Notice</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Footer;
