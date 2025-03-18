import React from 'react'
import Navbar from '../Components/Home/Navbar.jsx'
import Header from '../Components/Home/Header.jsx'
import Products from '../Components/Home/Products.jsx'

const Home = () => {
    return (
        <div className='h-screen w-full'>
            <Navbar />
            <Header />
            <Products/>
        </div>
    )
}

export default Home
