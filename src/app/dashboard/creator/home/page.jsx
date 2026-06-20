import ChartsData from "@/components/dashboard/creator/creatorHome/ChartsData";
import { getPrompts } from "@/lib/api/prompts";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const CreatorHome = async () => {
  const user = await getUserSession();
  const userId = user?.id || "";

  const { total, totalCopies, totalBookMarks, data } = await getPrompts(
    `userId=${userId}`,
  );
  const rawChartData = data || [];

  return (
    <div>
      <ChartsData
        total={total || 0}
        totalCopies={totalCopies || 0}
        totalBookMarks={totalBookMarks || 0}
        chartData={rawChartData}
      />
    </div>
  );
};

export default CreatorHome;
