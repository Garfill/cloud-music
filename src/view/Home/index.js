import Layout from 'layout'
import React from 'react'
import { Outlet } from 'react-router-dom'
function Home() {

  return (
    <Layout>
      <Outlet></Outlet>
    </Layout>
  )
}

export default Home
