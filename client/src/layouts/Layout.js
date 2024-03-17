import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div>
    <Header></Header>
    <div style={{minHeight:"85vh"}}>{children}</div>
      <Footer></Footer>
    </div>
  )
}

export default Layout
