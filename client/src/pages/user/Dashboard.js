import React from 'react'
import { useAuth } from '../../components/context/auth'

const Dashboard = () => {
  const [auth,setAuth]=useAuth();
  return (
    <div>
      Hello {`${auth.user?.name}`}
    </div>
  )
}

export default Dashboard
