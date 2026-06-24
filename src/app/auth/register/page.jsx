import RegisterContent from '@/components/register/RegisterContent'
import React from 'react'

const Register = async ({searchParams}) => {
  const srcParams = await searchParams;
  return (
    <div className='min-h-screen'>
      <RegisterContent srcParams={srcParams} />
    </div>
  )
}

export default Register
