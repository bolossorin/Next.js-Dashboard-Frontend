import React from "react";

// libs
import Link from "next/link";
import cn from "classnames";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";

ChartJS.register(ArcElement);

// components
import { Cell, CelHeader, Row } from "../../vessels";
import { Iteration, State } from "@/components/common";
import { routes } from "@/utility/routes";

// assets
import styles from "./TableExperiments.module.scss";

const headers = ["Name", "Project", "State", "Created", "Iteration"];

const rows: {
  name: string;
  project: string;
  state: string;
  created: string;
  iteration1: number;
  iteration2: number;
}[] = [
  {
    name: "test-merge-v8",
    project: "test",
    state: "Failed",
    created: "24 hours ago",
    iteration1: 200000,
    iteration2: 400000,
  },
  {
    name: "vessel-beta-hgx5_2-shag_gpu3_2",
    project: "baseline_test",
    state: "Stopped",
    created: "1 day ago",
    iteration1: 100000,
    iteration2: 300000,
  },
  {
    name: "flow-modes-test-v",
    project: "seb-playground",
    state: "Running",
    created: "2 days ago",
    iteration1: 2300000,
    iteration2: 4400000,
  },
  {
    name: "flow-modes-test-v6-FS 4",
    project: "finetune-on-sequences yahyah",
    state: "Crashed",
    created: "1 day ago",
    iteration1: 298000,
    iteration2: 300000,
  },
];

const StyledCell = ({ children }: { children: React.ReactNode }) => (
  <Cell classname="!px-6 !py-4 text-ellipsis overflow-hidden whitespace-nowrap max-w-[204px]">{children}</Cell>
);

const StyledCellHeader = ({ children }: { children: React.ReactNode }) => (
  <CelHeader classname="!text-base text-[#F6F6F6] !px-6 !py-4" isSort>
    {children}
  </CelHeader>
);

export const TableExperiments = () => {
  return (
    <div className="mt-6 overflow-auto border border-[#686868] rounded-[4px]">
      <table className={cn("w-full", styles.tableExperiments)}>
        <thead>
          <Row>
            {headers.map((header) => (
              <StyledCellHeader key={header}>{header}</StyledCellHeader>
            ))}
          </Row>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <Row key={index}>
              <StyledCell>
                <Link href={`${routes.vessels}/${row.name}`} legacyBehavior>
                  <a className="underline hover:text-[#F6F6F6]">{row.name}</a>
                </Link>
              </StyledCell>
              <StyledCell>{row.project}</StyledCell>
              <StyledCell>
                <State state={row.state} />
              </StyledCell>
              <StyledCell>{row.created}</StyledCell>
              <StyledCell>
                <Iteration iterCurrent={row.iteration1} iterEnd={row.iteration2} />
              </StyledCell>
            </Row>
          ))}
        </tbody>
      </table>
    </div>
  );
};
