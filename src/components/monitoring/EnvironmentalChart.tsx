import { useEffect, useRef } from "react";
import type { EChartsCoreOption } from "echarts";

interface EnvironmentalChartProps {
  option: EChartsCoreOption;
  className?: string;
}

export function EnvironmentalChart({ option, className = "h-64" }: EnvironmentalChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = chartRef.current;
    if (!node) return;
    let chart: import("echarts").ECharts | undefined;
    let cancelled = false;

    void import("echarts").then((echarts) => {
      if (cancelled) return;
      chart = echarts.init(node, undefined, { renderer: "canvas" });
      chart.setOption(option, { notMerge: true });
    });

    const observer = new ResizeObserver(() => chart?.resize());
    observer.observe(node);
    return () => {
      cancelled = true;
      observer.disconnect();
      chart?.dispose();
    };
  }, [option]);

  return <div ref={chartRef} className={`w-full ${className}`} role="img" aria-label="环境监测数据图表" />;
}