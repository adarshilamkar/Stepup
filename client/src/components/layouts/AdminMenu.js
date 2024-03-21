import React from 'react'
import {Link} from 'react-router-dom'

const AdminMenu = () => {
  return (
    <div>
      <ul>
        <li><Link to='/dashboard/admin/create-category'>Create Category</Link></li>
        <li><Link to='/dashboard/admin/create-product'>Create Product</Link></li>
        <li><Link to='/dashboard/admin/users'>User</Link></li>
      </ul>
    </div>
  )
}

export default AdminMenu
