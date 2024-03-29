import React, { FC, useState } from "react";

// libs
import cn from "classnames";

// components
import { H5 } from "@/components/common";
import { PerQueueTable, PerUserTable } from "../../hardware";

// assets
import { IQueueUsage, ISessionOverview } from "@/graphql/types/hardware";

interface IUserProps {
  queueUsage: IQueueUsage[];
  sessionsOverview: ISessionOverview[];
}

export const Usage: FC<IUserProps> = ({ queueUsage, sessionsOverview }) => {
  const [showTab, setShowTab] = useState(1);
  return (
    <div className={"flex-1 border border-[#414040] rounded overflow-visible"}>
      <div className="min-w-[490px]">
        <div className="flex items-center justify-between text-center border-b border-[#414040]">
          <H5
            onClick={() => setShowTab(1)}
            classname={cn("!mb-0 w-1/2 p-4 cursor-pointer transition-all hover:bg-[#414040]/40", {
              "bg-[#414040]/40": showTab === 1,
            })}
          >
            Usage per Queue
          </H5>
          <H5
            onClick={() => setShowTab(2)}
            classname={cn("!mb-0 w-1/2 p-4 cursor-pointer transition-all hover:bg-[#414040]/40", {
              "bg-[#414040]/40": showTab === 2,
            })}
          >
            Usage per User
          </H5>
        </div>
        {showTab === 1 && <PerQueueTable queueUsage={queueUsage} />}
        {showTab === 2 && <PerUserTable sessionsOverview={sessionsOverview} />}
      </div>
    </div>
  );
};
