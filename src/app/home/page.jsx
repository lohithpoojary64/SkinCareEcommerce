import React from 'react'
import Navbar from '../Components/Home/Navbar.jsx'
import Header from '../Components/Home/Header.jsx'
import NewArrivals from '../Components/Home/NewArrivals.jsx'
import FlashDeals from '../Components/Home/FlashDeals.jsx';
import Products from '../Components/Home/Products.jsx';
import Footer from '../Components/Home/Footer.jsx';

const Home = () => {
    return (
        <div className='h-screen w-full'>
            <Navbar />
            <Header />
            <Products/>
            <NewArrivals/>
            <FlashDeals/>
            <Footer/>
        </div>
    )
}

export default Home
