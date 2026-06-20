import StatsCard from "./StatsCard";
import CopiesChart from "./CopiesChart";
import GrowthChart from "./GrowthChart";

const ChartsData = ({ total, totalCopies, totalBookMarks, chartData }) => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="Total Prompts" value={total} />
        <StatsCard title="Total Copies" value={totalCopies} />
        <StatsCard title="Total Bookmarks" value={totalBookMarks} />
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 gap-6">
        <div className="p-6 bg-white/30 border border-[#867070]/20 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-[#403535] mb-6">Total Copies Analytics</h2>
          <CopiesChart data={chartData} />
        </div>
        
        <div className="p-6 bg-white/30 border border-[#867070]/20 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-[#403535] mb-6">Accumulative Growth</h2>
          <GrowthChart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default ChartsData;
