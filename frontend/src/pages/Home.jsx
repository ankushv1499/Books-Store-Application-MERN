import React from 'react'
import Navbar from '../componets/Navbar/Navbar'
import Footer from '../componets/Footer/Footer'
import Hero from '../componets/Home/Hero'
import RecentlyAdded from '../componets/Home/RecentlyAdded'


const Home = () => {
  return (
    <div className='bg-zinc-900 text-white px-10 py-8 '>
    <Hero></Hero>
    <RecentlyAdded></RecentlyAdded>
    </div>
  )
}

export default Home;