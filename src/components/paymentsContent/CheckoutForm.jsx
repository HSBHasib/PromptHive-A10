import { LiaCheckCircle } from "react-icons/lia";


const CheckoutForm = () => {
  return (
    <div className="bg-[#E5DCDC] p-8 rounded-3xl border border-stone-200 shadow-sm w-full max-w-md">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-xl font-bold text-stone-700">Secure Checkout</h2>
        <div className="text-right">
          <p className="text-2xl font-bold text-stone-800">$5.00</p>
          <p className="text-xs text-stone-500">One-time payment</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-white/40 p-4 rounded-xl text-sm text-stone-600 space-y-2">
          <p className="flex items-center gap-2"><LiaCheckCircle size={16} className="text-green-500" /> Full Access to Private Prompts</p>
          <p className="flex items-center gap-2"><LiaCheckCircle size={16} className="text-green-500" /> Priority Creator Support</p>
          <p className="flex items-center gap-2"><LiaCheckCircle size={16} className="text-green-500" /> Advanced Analytical Insights</p>
        </div>

        <div className="text-center">
          <form action="/api/checkout_sessions" method="POST">
            <section>
              <button type="submit" role="link" className="bg-[#867070]/90 text-white font-bold w-full p-4 rounded-xl mt-4 hover:bg-[#867070] transition shadow-lg">
                Proceed to Secure Payment
              </button>
            </section>
          </form>
        </div>

        <p className="text-[11px] text-stone-500 text-center px-2">
          By clicking pay, you will be redirected to Stripe's secure
          environment.
        </p>
      </div>
    </div>
  );
};

export default CheckoutForm;


