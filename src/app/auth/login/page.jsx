import LoginContent from '@/components/login/LoginContent'
import React from 'react'

const Login = async ({ searchParams }) => {
  const srcParams = await searchParams;
  const redirectTo = srcParams.redirect || "/";

  return (
    <div className='min-h-screen'>
      <LoginContent redirectTo={redirectTo} />
    </div>
  )
}

export default Login
