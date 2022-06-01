import React from 'react'
import { Outlet } from 'react-router-dom'
function Home() {

  return (
    <div>
      home
      <Outlet></Outlet>
    </div>
  )
}

export default Home
