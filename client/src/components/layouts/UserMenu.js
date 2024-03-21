import React from 'react'
import { Link } from 'react-router-dom'

const UserMenu = () => {
  return (
    <div>
      <ul>
        <li><Link to='/dashboard/user/profile'>Profile</Link></li>
        <li><Link to='/dashboard/user/orders'>Orders</Link></li>
      </ul>
    </div>
  )
}

export default UserMenu
