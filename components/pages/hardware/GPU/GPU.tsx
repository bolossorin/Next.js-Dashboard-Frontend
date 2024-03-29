import React from "react";
import { useQuery } from "@apollo/client";

// components
import { Title, Overall, Usage } from "../../hardware";

// assets
import { getOverallUsage, getSessionOverview, getQueueUsage } from "@/graphql/hardware";
import { IOverallUsageResponse, IQueueUsageResponse, ISessionOverviewResponse } from "@/graphql/types/hardware";

export const GPU = () => {
  const { data: overallUsageData } = useQuery<IOverallUsageResponse>(getOverallUsage, {
    variables: { compute_type: "gpu" },
  });

  const { data: queueUsageData } = useQuery<IQueueUsageResponse>(getQueueUsage, {
    variables: { compute_type: "gpu" },
  });

  const { data: sessionOverviewData } = useQuery<ISessionOverviewResponse>(getSessionOverview, {
    variables: { compute_type: "gpu" },
  });

  return (
    <div className="flex flex-col w-full 2xl:w-[49%] py-6 px-3 sm:p-7 bg-[#2C2C2C] rounded">
      <Title variant="gpu" />
      <Overall overall={overallUsageData?.overall_usage} />
      <Usage
        queueUsage={queueUsageData?.queue_usage ?? []}
        sessionsOverview={sessionOverviewData?.session_overview ?? []}
      />
    </div>
  );
};
