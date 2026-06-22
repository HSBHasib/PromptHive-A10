import { LuCheck, LuMessageSquare } from "react-icons/lu";
import { BsFillBarChartLineFill } from "react-icons/bs";

const PaymentInfoSection = () => {
  return (
    <div className="flex flex-col gap-4">
      <span className="bg-stone-300 text-stone-700 px-3 py-1 rounded-full text-xs font-bold w-fit uppercase tracking-wider">
        Premium Access
      </span>
      <h1 className="text-4xl font-bold text-stone-800 leading-tight">
        Unlock the Full Potential of AI Creativity
      </h1>
      <p className="text-stone-600 text-lg">
        Join thousands of elite prompt engineers and get instant access to our most powerful, verified prompt libraries.
      </p>

      <ul className="flex flex-col gap-4 mt-4">
        <li className="flex gap-4">
          <LuCheck className="text-stone-600 mt-1" />
          <div>
            <h4 className="font-bold text-stone-800">Unlimited Premium Access</h4>
            <p className="text-sm text-stone-500">Instantly unlock every private, high-performance prompt in our marketplace.</p>
          </div>
        </li>
        <li className="flex gap-4">
          <LuMessageSquare className="text-stone-600 mt-1" />
          <div>
            <h4 className="font-bold text-stone-800">Direct Creator Support</h4>
            <p className="text-sm text-stone-500">Get priority assistance and custom prompt tuning from top-tier engineers.</p>
          </div>
        </li>
        <li className="flex gap-4">
          <BsFillBarChartLineFill className="text-stone-600 mt-1" />
          <div>
            <h4 className="font-bold text-stone-800">Advanced Analytical Insights</h4>
            <p className="text-sm text-stone-500">Deep-dive data on prompt performance, versioning, and execution efficiency.</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default PaymentInfoSection;
