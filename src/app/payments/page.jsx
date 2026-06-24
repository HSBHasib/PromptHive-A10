import CheckoutForm from '@/components/paymentsContent/CheckoutForm'
import PaymentInfoSection from '@/components/paymentsContent/PaymentInfoSection'
import React from 'react'

const Payments = async () => {
  return (
    <div className="min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <PaymentInfoSection />        
        <CheckoutForm />
      </div>
    </div>
  )
}

export default Payments