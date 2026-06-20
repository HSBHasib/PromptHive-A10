const StatsCard = ({ title, value }) => (
  <div className="p-6 bg-white/30 border border-[#867070]/20 rounded-2xl shadow-sm">
    <p className="text-[13px] font-bold text-[#867070] uppercase tracking-wider">{title}</p>
    <h3 className="text-3xl font-bold text-[#403535] mt-2">{value}</h3>
  </div>
);
export default StatsCard;