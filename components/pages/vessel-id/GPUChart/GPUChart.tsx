// libs
import { useQuery } from "@apollo/client";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// assets
import { getGpuLogHistory } from "@/graphql/gpu/getGpuLogHistory";
import { IGpuLogHistory, IntervalValue } from "@/graphql/types/gpuLogHistory";
import { useEffect } from "react";
import { onGpuLogHistoryChange } from "@/graphql/gpu/onGpuLogHistoryChange";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const getOptions = (title: string, chartLabels: (string | null)[]) => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 1,
      },
    },
    scales: {
      x: {
        offset: true,
        border: {
          color: "#A4A4A4",
        },
        ticks: {
          color: "#F7F7F7",
          font: {
            size: 11,
          },
          padding: 5,
          callback: (value: string | number, index: number) => {
            // to avoid overlapping the first label
            const otherLabels = chartLabels.filter((l) => l !== chartLabels[index] && l !== null);
            if (index === 0 && otherLabels.length > 1 && chartLabels[chartLabels.length - 1] === null) {
              return null;
            }
            return chartLabels[index];
          },
        },
        grid: {
          drawOnChartArea: false,
          color: "#A4A4A4",
        },
      },

      y: {
        min: 0,
        max: 100,
        offset: true,
        border: {
          color: "#A4A4A4",
        },
        grid: {
          drawOnChartArea: false,
          color: "#A4A4A4",
        },
        ticks: {
          color: "#F7F7F7",
          font: {
            size: 11,
          },
          padding: 5,
          stepSize: 20,
          count: 5,
          callback: (value: number | string) => `${value}%`,
        },
      },
    },
    plugins: {
      legeng: {
        position: "top",
      },
      title: {
        display: true,
        text: `GPU ${title} Usage`,
        color: "#F6F6F6",
        font: {
          size: 16,
          weight: "700",
        },
      },
    },
  };
};

const getTimeLabel = (timestamp: string, interval: IntervalValue) => {
  const date = new Date(timestamp);

  if (interval === "seven_day") {
    return `${date.getDate()}/${date.getMonth() + 1}`;
  }
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
};

interface IChart {
  gpuId: string;
  interval: IntervalValue;
}

export const GPUChart = ({ gpuId, interval }: IChart) => {
  const { data, subscribeToMore, loading } = useQuery<{ gpu_log_history: IGpuLogHistory }>(getGpuLogHistory, {
    variables: {
      gpu_id: gpuId,
      interval,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: onGpuLogHistoryChange,
      variables: { gpu_id: gpuId, interval },
      updateQuery: (prev, { subscriptionData }) => {
        return { gpu_log_history: subscriptionData?.data?.gpu_log_history ?? prev };
      },
    });

    return () => unsubscribe();
  }, [gpuId, interval, subscribeToMore]);

  const timestamps = data?.gpu_log_history?.timestamp?.map((data) => getTimeLabel(data, interval));

  // replace duplicate timestamp data
  const reversedTimestamps = [...(timestamps ?? [])].reverse();

  const chartLabels = reversedTimestamps
    ?.map((timestamp, index) => {
      if (!reversedTimestamps?.includes(timestamp, index + 1)) {
        return timestamp;
      }
      return null;
    })
    .reverse();

  if (loading) {
    return <div className="border border-[#686868] rounded h-[292px] flex justify-center items-center">Loading...</div>;
  }

  if (!data || data?.gpu_log_history === null) {
    return null;
  }

  return (
    <div className="border border-[#686868] rounded p-5 pt-6 h-[292px]">
      <Line
        options={getOptions(data?.gpu_log_history?.name ?? "", chartLabels)}
        data={{
          labels: timestamps ?? [],
          datasets: [
            {
              label: "Util percent",
              data: data?.gpu_log_history?.util_percent ?? [],
              backgroundColor: "#88E207",
              borderColor: "#88E207",
            },
            {
              label: "Memory util percent",
              data: data?.gpu_log_history?.memory_util_percent ?? [],
              backgroundColor: "#FFC36A",
              borderColor: "#FFC36A",
            },
          ],
        }}
      />
    </div>
  );
};
