import React from 'react'
import Navbar from './short-components/Navbar'
import SearchArea from './SearchArea'
import Footer from './Footer'
import Category from './Category'
export default function Home() {
  return (
    <div>
        <Navbar></Navbar>
        <SearchArea></SearchArea>
        <Category></Category>
        <Footer></Footer>
    </div>
  )
}
