import LoginContent from '@/components/login/LoginContent'
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react'

const Login = async ({ searchParams }) => {
  const user = await getUserSession();
  const srcParams = await searchParams;
  const redirectTo = srcParams.redirect || "/";

  if(user) {
    redirect(`/`)
  }

  return (
    <div className='min-h-screen'>
      <LoginContent redirectTo={redirectTo} />
    </div>
  )
}

export default Login
