import React from "react";
import { LiaCheckCircle } from "react-icons/lia";
import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { addSubcription } from "@/lib/action/subcriptions";

const PaymentSuccessfulPage = async ({ searchParams }) => {
  const { session_id } = await searchParams;
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent"],
  });

  const transactionData = {
    transactionId: session.payment_intent?.id,
    customerName: session.customer_details?.name,
    amountCharged: session.amount_total / 100,
    paymentDate: new Date(session.created * 1000).toLocaleDateString(),
    billingEmail: session.customer_details?.email,
    plan: "pro",
  };

  // Insert Payments Details on MongoDB
  const res = await addSubcription(transactionData);

  return (
    <div className="min-h-[90vh] w-full flex items-center justify-center p-4">
      <div className="bg-white/70 p-6 rounded-3xl shadow-sm border border-stone-200 text-center max-w-sm w-full">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-50 p-3 rounded-full border border-green-100">
            <LiaCheckCircle className="text-green-600 w-10 h-10" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-stone-800 mb-1">
          Payment Successful!
        </h1>
        <p className="text-stone-500 text-sm mb-6">
          You have now unlocked{" "}
          <span className="font-bold text-stone-800">Unlimited Pro Access</span>
          .
        </p>

        {/* Details Box */}
        <div className="bg-[#F6F0F0] rounded-2xl p-4 mb-6 text-left space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-stone-500">Amount Paid</span>
            <span className="text-stone-800 font-bold">
              ${transactionData.amountCharged}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Date</span>
            <span className="text-stone-800 font-medium">
              {transactionData.paymentDate}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Name</span>
            <span className="text-stone-800 font-medium truncate max-w-[120px]">
              {transactionData.customerName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Email</span>
            <span className="text-stone-800 font-medium truncate max-w-[150px]">
              {transactionData.billingEmail}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-stone-200/50">
            <span className="text-stone-500">TXN ID</span>
            <span className="text-stone-800 font-mono font-medium truncate max-w-[100px]">
              {transactionData.transactionId}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col gap-3">
          <Link
            href="/my-profile"
            className="bg-stone-800 text-white text-sm font-bold py-3 px-6 rounded-xl hover:bg-stone-900 transition"
          >
            Explore Premium Prompts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessfulPage;
