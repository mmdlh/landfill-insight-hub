import { createFileRoute } from "@tanstack/react-router";
import { OverviewPage } from "@/components/monitoring/MonitoringPages";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "全域运行总览｜垃圾填埋场渗沥液智慧平台" },
    { name: "description", content: "渗沥液处理、水质、设备和预警一体化智慧环保数据驾驶舱。" },
    { property: "og:title", content: "渗沥液智慧平台·全域总览" },
    { property: "og:description", content: "实时掌握填埋场渗沥液收集、处理和排放状态。" },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: OverviewPage,
});
