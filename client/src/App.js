import React from 'react'
import {Route,Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Layout from './layouts/Layout'
const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
      </Routes>
    </Layout>
  )
}

export default App
