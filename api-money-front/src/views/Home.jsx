import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Product from './Product'

const Home = () => {

  return (
    <div className="home">
      <Header />
      <Product />
    </div>
  )
}

export default Home
