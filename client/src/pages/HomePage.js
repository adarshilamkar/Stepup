import React from 'react'
import { useAuth } from '../components/context/auth'

const HomePage = () => {
    const [auth]=useAuth();
  return (
    <div>
      <pre>
        {JSON.stringify(auth)}
      </pre>
    </div>
  )
}

export default HomePage
