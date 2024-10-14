import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar2 = () => {
  return (

    <Flex justifyContent={'space-around'} color='blackAlpha.720' pb={5} boxShadow={'md'}>
        <Link to={'/beauty-and-spas'} >🥀Beauty & Spas</Link>
        <Link to={'/things-to-do'} >🎯Things to do</Link>
        <Link  to={'/gifts'} >🎁Gifts</ Link>
        <Link to={'/auto-and-home'} >🏡Auto & Home</Link>
        <Link to={'/food-and-drink'} >🍽️Food & Drink</Link>
        <Link to={'/local'} >📍Local</Link>
        <Link to={'/travel'} >✈Travel</Link>
        <Link to={'/goods'} >🛍️Goods</Link>
        <Link to={'/coupons'} >🎟️Coupons</Link>








    </Flex>
  )
}

export default Navbar2