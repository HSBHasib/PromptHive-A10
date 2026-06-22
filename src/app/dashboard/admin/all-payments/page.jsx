import PaymentsContent from "@/components/dashboard/admin/paymentsContent/PaymentsContent";
import { getSubcriptions } from "@/lib/api/subcriptions";
import React from "react";

const AllPayments = async () => {
  const subcriptions = await getSubcriptions();

  return (
    <div className="p-4 w-full max-w-[1600px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#867070]">
          Stripe Premium Payments Details
        </h1>
        <p className="text-sm text-[#917C7C] mt-1">
          Comprehensive database of customer subscription transactions.
        </p>
      </div>

      {subcriptions.length === 0 ? (
        <div className="w-full bg-white/30 rounded-2xl p-10 flex flex-col items-center justify-center shadow-sm">
          <div className="bg-[#f3e7e7] p-4 rounded-full mb-4">
            <span className="text-3xl">📭</span>
          </div>
          <h3 className="text-lg font-bold text-[#867070]">No Payments Found</h3>
          <p className="text-sm text-stone-500 mt-1">
            There are no active subscription payments in the database right now.
          </p>
        </div>
      ) : (
        <PaymentsContent payments={subcriptions} />
      )}
    </div>
  );
};

export default AllPayments;