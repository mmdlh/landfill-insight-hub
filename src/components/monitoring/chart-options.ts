import type { EChartsCoreOption } from "echarts";

const text = "#365363";
const grid = "rgba(14,116,144,.12)";
const teal = "#0e7490";
const cyan = "#14b8a6";
const green = "#22c55e";
const amber = "#f59e0b";
const rose = "#f43f5e";

export const tooltip = {
  trigger: "axis",
  backgroundColor: "rgba(245,252,251,.94)",
  borderColor: "rgba(14,116,144,.25)",
  textStyle: { color: "#0b1220", fontSize: 11 },
};

export function lineOption(labels: string[], series: Array<{ name: string; data: number[] }>): EChartsCoreOption {
  const colors = [teal, amber, green, rose];
  return {
    color: colors,
    tooltip,
    legend: { top: 8, right: 8, textStyle: { color, fontSize: 10 } },
    grid: { left: 42, right: 18, top: 48, bottom: 28 },
    xAxis: { type: "category", data: labels, boundaryGap: false, axisLine: { lineStyle: { color: grid } }, axisLabel: { color: text, fontSize: 10 } },
    yAxis: { type: "value", splitLine: { lineStyle: { color: grid } }, axisLabel: { color: text, fontSize: 10 } },
    series: series.map((item, index) => ({
      ...item,
      type: "line",
      smooth: true,
      showSymbol: false,
      lineStyle: { width: 2.5 },
      areaStyle: index === 0 ? { opacity: 0.12 } : undefined,
    })),
  };
}

export function barOption(labels: string[], values: number[], secondary?: number[]): EChartsCoreOption {
  return {
    color: [teal, green],
    tooltip,
    legend: secondary ? { top: 8, right: 8, textStyle: { color: text, fontSize: 10 }, data: ["处理量", "目标值"] } : undefined,
    grid: { left: 42, right: 18, top: secondary ? 46 : 20, bottom: 30 },
    xAxis: { type: "category", data: labels, axisTick: { show: false }, axisLine: { lineStyle: { color: grid } }, axisLabel: { color: text, fontSize: 10 } },
    yAxis: { type: "value", splitLine: { lineStyle: { color: grid } }, axisLabel: { color: text, fontSize: 10 } },
    series: [
      { name: "处理量", type: "bar", data: values, barMaxWidth: 22, itemStyle: { borderRadius: [4, 4, 0, 0] } },
      ...(secondary ? [{ name: "目标值", type: "line" as const, data: secondary, smooth: true, symbol: "none", lineStyle: { width: 2 } }] : []),
    ],
  };
}

export function pieOption(data: Array<{ name: string; value: number }>): EChartsCoreOption {
  return {
    color: [teal, cyan, green, amber, rose],
    tooltip: { ...tooltip, trigger: "item" },
    legend: { bottom: 0, left: "center", textStyle: { color: text, fontSize: 10 }, itemWidth: 9, itemHeight: 9 },
    series: [{ type: "pie", radius: ["48%", "72%"], center: ["50%", "44%"], padAngle: 3, itemStyle: { borderRadius: 4 }, label: { color: text, fontSize: 10, formatter: "{d}%" }, data }],
  };
}

export function radarOption(values: number[]): EChartsCoreOption {
  return {
    color: [cyan],
    radar: {
      radius: "67%",
      indicator: ["COD", "氨氮", "总磷", "总氮", "SS", "pH"].map((name) => ({ name, max: 100 })),
      splitArea: { areaStyle: { color: ["rgba(14,116,144,.02)", "rgba(14,116,144,.06)"] } },
      splitLine: { lineStyle: { color: grid } },
      axisLine: { lineStyle: { color: grid } },
      axisName: { color: text, fontSize: 10 },
    },
    series: [{ type: "radar", data: [{ value: values, name: "水质健康度", areaStyle: { opacity: 0.24 }, lineStyle: { width: 2 } }], symbolSize: 4 }],
  };
}