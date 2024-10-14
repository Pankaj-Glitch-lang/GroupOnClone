import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route, Navigate } from 'react-router-dom'
import Wishlist from './component/navbar1/Wishlist'
import Navbar from './component/navbar1/Navbar'
import Home from './component/navbar1/Home'
import BeautyNSpa from './component/navbar2/BeautyNSpa'
import ThingsToDo from './component/navbar2/ThingsToDo'
import Gifts from './component/navbar2/Gifts'
import AutoNHome from './component/navbar2/AutoNHome'
import FoodNDrink from './component/navbar2/FoodNDrink'
import Local from './component/navbar2/Local'
import Travel from './component/navbar2/Travel'
import Goods from './component/navbar2/Goods'
import Coupon from './component/navbar2/Coupon'
import Navbar2 from './component/navbar2/Navbar2'
import DetailsPage from './component/Page/DetailsPage'
import Footer from './component/Footer/Footer'
import CartPage from './component/Page/CartPage'
import { CartProvider } from './component/contextApi/CartContext'
import SignUp from './component/navbar1/SignUp'
import SignUpSignIn from './component/navbar1/SignUp'
import { useAuth } from './component/contextApi/AuthConetxt';


function App() {
  
 const{login}=useAuth();

  return (
    <>
  
      <Navbar/>
     <Navbar2/>
 
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/:id' element={<DetailsPage/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/cart' element={<CartPage/>}/>

        <Route path='/beauty-and-spas' element={<BeautyNSpa/>}/>
        <Route path='/things-to-do' element={<ThingsToDo/>}/>
        <Route path='/gifts' element={<Gifts/>}/>
        <Route path='/auto-and-home' element={<AutoNHome/>}/>
        <Route path='/signin' element={<SignUpSignIn/>}/>
        <Route path='/food-and-drink' element={<FoodNDrink/>}/>
        <Route path='/local' element={<Local/>}/>
        <Route path='/travel' element={<Travel/>}/>
        <Route path='/goods' element={<Goods/>}/>
        <Route path='/coupons' element={<Coupon/>}/>

      </Routes>
     
      <Footer/>
    
      </>
  )
}

export default App
