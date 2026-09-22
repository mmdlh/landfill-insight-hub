import { Activity, AlertTriangle, BatteryCharging, CircleGauge, Droplets, Factory, Gauge, ShieldCheck, Thermometer, Waves, Wrench } from "lucide-react";
import collectionNetwork from "@/assets/collection-network.jpg";
import { EnvironmentalChart } from "./EnvironmentalChart";
import { barOption, lineOption, pieOption, radarOption } from "./chart-options";
import { PageHeader, Panel, StatCard, StatusBadge } from "./DashboardShell";

const hours = ["00", "04", "08", "12", "16", "20", "24"];
const qualityLine = lineOption(hours, [{ name: "COD", data: [390, 420, 385, 460, 432, 405, 398] }, { name: "氨氮", data: [42, 48, 45, 54, 49, 46, 44] }, { name: "总氮", data: [58, 62, 59, 68, 65, 60, 57] }]);
const flowBar = barOption(["周一", "周二", "周三", "周四", "周五", "周六", "周日"], [1120, 1195, 1080, 1260, 1218, 1310, 1284], [1200, 1200, 1200, 1200, 1200, 1200, 1200]);
const compositionPie = pieOption([{ name: "生化处理", value: 45 }, { name: "膜分离", value: 27 }, { name: "物化处理", value: 18 }, { name: "回流", value: 10 }]);
const qualityRadar = radarOption([86, 78, 92, 83, 89, 96]);
const collectionLine = lineOption(["01时", "05时", "09时", "13时", "17时", "21时"], [{ name: "收集量", data: [36, 32, 44, 58, 72, 51] }, { name: "降雨量", data: [4, 2, 8, 14, 22, 9] }]);
const equipmentBar = barOption(["提升泵", "鼓风机", "MBR", "NF", "RO", "加药"], [128, 186, 242, 158, 274, 96]);
const alertBar = barOption(["水质", "液位", "压力", "温度", "通讯", "能耗"], [8, 12, 5, 7, 3, 4]);
const statusPie = pieOption([{ name: "运行", value: 26 }, { name: "待机", value: 5 }, { name: "检修", value: 2 }, { name: "故障", value: 1 }]);

const stations = [
  ["调节池 A-01", "412", "48.7", "7.21", "246", "正常"],
  ["生化池 B-02", "186", "31.4", "7.08", "238", "正常"],
  ["膜处理 C-03", "52", "9.8", "7.36", "231", "关注"],
  ["排放口 D-04", "28", "3.6", "7.28", "224", "达标"],
];

export function OverviewPage() {
  return <><PageHeader eyebrow="Smart environmental overview" title="全域运行总览" description="汇聚填埋区、收集管网与处理站实时数据，快速识别水质、负荷和设备风险。" />
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><StatCard label="今日处理量" value="1,284" unit="m³" trend="▲ 6.2% 较昨日" tone="success" icon={Droplets}/><StatCard label="COD 出水浓度" value="28.4" unit="mg/L" trend="低于限值 43.2%" icon={Activity}/><StatCard label="设备在线率" value="97.1" unit="%" trend="34 台设备 · 1 台检修" tone="success" icon={Factory}/><StatCard label="待处理预警" value="3" unit="条" trend="其中一级预警 1 条" tone="danger" icon={AlertTriangle}/></div>
    <div className="mt-4 grid grid-cols-12 gap-4"><Panel title="水质指标趋势" subtitle="近 24 小时 · COD / 氨氮 / 总氮" className="col-span-12 lg:col-span-7"><EnvironmentalChart option={qualityLine} className="h-64" /></Panel><Panel title="综合水质健康度" subtitle="对照 GB 16889 指标折算" className="col-span-12 lg:col-span-5"><EnvironmentalChart option={qualityRadar} className="h-64" /></Panel><Panel title="近 7 日处理负荷" subtitle="日处理量与计划目标" className="col-span-12 lg:col-span-5"><EnvironmentalChart option={flowBar} className="h-56" /></Panel><Panel title="工艺处理构成" subtitle="当前流量分配" className="col-span-12 lg:col-span-3"><EnvironmentalChart option={compositionPie} className="h-56" /></Panel><Panel title="关键单元状态" subtitle="主工艺链路" className="col-span-12 lg:col-span-4"><StatusList /></Panel></div>
    <Panel title="实时监测数据" subtitle="各关键监测点最近一次采样" className="mt-4"><MonitoringTable /></Panel></>;
}

export function WaterQualityPage() {
  return <><PageHeader eyebrow="Water quality intelligence" title="水质监测中心" description="进出水指标、排放限值与趋势联动分析，及时定位污染物波动。" status="8 台分析仪在线" />
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-5"><StatCard label="进水 COD" value="4,820" unit="mg/L" trend="▲ 12.4%" tone="warning"/><StatCard label="出水 COD" value="28.4" unit="mg/L" trend="达标" tone="success"/><StatCard label="氨氮 NH₃-N" value="3.6" unit="mg/L" trend="达标" tone="success"/><StatCard label="总氮 TN" value="16.8" unit="mg/L" trend="接近预警线" tone="warning"/><StatCard label="pH 值" value="7.28" trend="稳定" tone="primary"/></div>
    <div className="mt-4 grid grid-cols-12 gap-4"><Panel title="进出水水质趋势" subtitle="24 小时在线分析数据" className="col-span-12 lg:col-span-8"><EnvironmentalChart option={qualityLine} className="h-72" /></Panel><Panel title="六维达标评估" subtitle="越靠外代表健康度越高" className="col-span-12 lg:col-span-4"><EnvironmentalChart option={qualityRadar} className="h-72" /></Panel><Panel title="排放合规率" subtitle="本月 720 个有效样本" className="col-span-12 lg:col-span-4"><ComplianceGauge /></Panel><Panel title="污染物构成" subtitle="进水污染负荷折算" className="col-span-12 lg:col-span-4"><EnvironmentalChart option={compositionPie} className="h-56" /></Panel><Panel title="仪表运行状态" subtitle="自动分析与校准" className="col-span-12 lg:col-span-4"><InstrumentStatus /></Panel></div><Panel title="采样明细" subtitle="在线数据与人工复核结果" className="mt-4"><MonitoringTable /></Panel></>;
}

export function CollectionPage() {
  return <><PageHeader eyebrow="Collection network" title="渗沥液收集调度" description="监控填埋分区、集液井、调节池及输送管网的液位、流量和压力。" status="17 个点位在线" />
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><StatCard label="今日收集量" value="1,346" unit="m³" trend="▲ 8.1%" tone="primary" icon={Droplets}/><StatCard label="调节池液位" value="5.82" unit="m" trend="容量占比 72%" tone="warning" icon={Waves}/><StatCard label="管网压力" value="0.42" unit="MPa" trend="压力稳定" tone="success" icon={Gauge}/><StatCard label="泵站在线率" value="100" unit="%" trend="8 / 8 正常" tone="success" icon={BatteryCharging}/></div>
    <div className="mt-4 grid grid-cols-12 gap-4"><Panel title="收集管网态势" subtitle="青色线路表示当前流向" className="col-span-12 lg:col-span-7"><div className="relative overflow-hidden rounded-md"><img src={collectionNetwork} alt="填埋区渗沥液收集管网俯视图" width={1024} height={1024} loading="lazy" className="h-[410px] w-full object-cover"/><div className="absolute inset-0 bg-primary/10"/><div className="absolute left-[24%] top-[24%]"><StatusBadge>A1 井正常</StatusBadge></div><div className="absolute right-[15%] top-[33%]"><StatusBadge tone="warning">B3 井高液位</StatusBadge></div></div></Panel><div className="col-span-12 grid gap-4 lg:col-span-5"><Panel title="收集量与降雨关联" subtitle="近 24 小时"><EnvironmentalChart option={collectionLine} className="h-52" /></Panel><Panel title="分区液位" subtitle="调节池安全上限 8.0m"><LevelBars /></Panel></div><Panel title="泵站运行记录" subtitle="瞬时流量与电机状态" className="col-span-12"><PumpTable /></Panel></div></>;
}

export function ProcessPage() {
  return <><PageHeader eyebrow="Process control" title="处理工艺监控" description="从预处理、生化反应到膜处理与达标排放，全链路工况实时可视。" status="主工艺链运行正常" />
    <ProcessFlow />
    <div className="mt-4 grid grid-cols-12 gap-4"><Panel title="关键工艺参数" subtitle="实时控制点" className="col-span-12 lg:col-span-4"><MetricRows /></Panel><Panel title="各单元处理负荷" subtitle="负荷率与设计值" className="col-span-12 lg:col-span-5"><EnvironmentalChart option={flowBar} className="h-60" /></Panel><Panel title="处理构成" subtitle="流量分配比例" className="col-span-12 lg:col-span-3"><EnvironmentalChart option={compositionPie} className="h-60" /></Panel><Panel title="工艺运行日志" subtitle="近 4 小时自动控制记录" className="col-span-12"><ProcessTable /></Panel></div></>;
}

export function EquipmentPage() {
  return <><PageHeader eyebrow="Asset operations" title="设备运维中心" description="聚合设备健康、能耗与保养计划，降低关键机组非计划停机风险。" status="34 台设备纳管" />
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><StatCard label="设备在线率" value="97.1" unit="%" trend="33 台在线" tone="success"/><StatCard label="今日能耗" value="1,084" unit="kWh" trend="▼ 4.8%" tone="success"/><StatCard label="待保养设备" value="4" unit="台" trend="7 日内到期" tone="warning"/><StatCard label="平均健康度" value="91.6" unit="分" trend="较上月 +2.1" tone="primary"/></div>
    <div className="mt-4 grid grid-cols-12 gap-4"><Panel title="设备状态分布" subtitle="运行 / 待机 / 检修 / 故障" className="col-span-12 lg:col-span-4"><EnvironmentalChart option={statusPie} className="h-64" /></Panel><Panel title="主要设备能耗" subtitle="今日累计 kWh" className="col-span-12 lg:col-span-5"><EnvironmentalChart option={equipmentBar} className="h-64" /></Panel><Panel title="健康状态" subtitle="关键机组实时诊断" className="col-span-12 lg:col-span-3"><EquipmentHealth /></Panel><Panel title="设备台账与保养计划" subtitle="按风险优先级排序" className="col-span-12"><EquipmentTable /></Panel></div></>;
}

export function AlertsPage() {
  return <><PageHeader eyebrow="Early warning center" title="预警管理中心" description="按等级汇聚水质、液位、压力与设备异常，跟踪确认、处置和复归闭环。" status="3 条预警待处理" />
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><StatCard label="未确认预警" value="3" unit="条" trend="一级预警 1 条" tone="danger"/><StatCard label="今日已处置" value="18" unit="条" trend="复归率 94.7%" tone="success"/><StatCard label="平均响应" value="4.6" unit="min" trend="▼ 1.2min" tone="success"/><StatCard label="本月告警" value="126" unit="条" trend="同比下降 8.3%" tone="primary"/></div>
    <div className="mt-4 grid grid-cols-12 gap-4"><Panel title="告警类型分布" subtitle="近 30 日" className="col-span-12 lg:col-span-5"><EnvironmentalChart option={alertBar} className="h-60" /></Panel><Panel title="告警等级构成" subtitle="一级 / 二级 / 三级" className="col-span-12 lg:col-span-3"><EnvironmentalChart option={pieOption([{ name: "一级", value: 8 }, { name: "二级", value: 34 }, { name: "三级", value: 84 }])} className="h-60" /></Panel><Panel title="处置效率" subtitle="今日闭环状态" className="col-span-12 lg:col-span-4"><AlertEfficiency /></Panel><Panel title="实时预警事件" subtitle="按风险等级与发生时间排序" className="col-span-12"><AlertTable /></Panel></div></>;
}

function StatusList() { return <div className="space-y-3">{[["预处理 / 格栅", "运行中", "success"], ["生化处理 / MBR", "运行中", "success"], ["深度处理 / RO", "待检", "warning"], ["达标排放", "正常", "primary"]].map(([a,b,c])=><div key={a} className="flex items-center justify-between border-b border-border/60 pb-2 text-xs"><span>{a}</span><StatusBadge tone={c as "success"|"warning"|"primary"}>{b}</StatusBadge></div>)}</div> }
function MonitoringTable() { return <DataTable headers={["监测点", "COD mg/L", "NH₃-N mg/L", "pH", "流量 m³/h", "状态"]} rows={stations} />; }
function InstrumentStatus() { return <div className="space-y-3">{["COD 在线分析仪", "氨氮分析仪", "总磷分析仪", "pH 传感器"].map((x,i)=><div key={x} className="flex items-center justify-between text-xs"><span>{x}</span><StatusBadge tone={i===2?"warning":"success"}>{i===2?"待校准":"在线"}</StatusBadge></div>)}</div> }
function ComplianceGauge() { return <div className="flex h-56 items-center justify-center"><div className="compliance-ring"><div><strong>98.6%</strong><span>综合达标率</span></div></div></div> }
function LevelBars() { return <div className="grid grid-cols-4 gap-3 pt-2">{[["A区",68],["B区",82],["C区",56],["调节池",72]].map(([n,v])=><div key={n} className="text-center"><div className="mx-auto flex h-28 w-9 items-end overflow-hidden rounded border border-primary/25 bg-primary/5"><div className="w-full bg-primary/70" style={{height:`${v}%`}}/></div><p className="mt-1 text-[10px]">{n}</p><p className="font-mono text-xs font-semibold text-primary">{v}%</p></div>)}</div> }
function PumpTable() { return <DataTable headers={["泵站", "瞬时流量", "出口压力", "频率", "累计运行", "状态"]} rows={[["PS-01 提升泵","42.8 m³/h","0.41 MPa","46 Hz","8,214 h","运行"],["PS-02 提升泵","38.6 m³/h","0.39 MPa","43 Hz","7,985 h","运行"],["PS-03 备用泵","0 m³/h","0.02 MPa","0 Hz","3,612 h","待机"]]} /> }
function ProcessFlow() { const items=[["01","格栅预处理","92%"],["02","调节池","86%"],["03","MBR 生化","78%"],["04","NF 纳滤","81%"],["05","RO 反渗透","74%"],["06","达标排放","98.6%"]]; return <Panel title="全流程运行态势" subtitle="实时流向 · 处理能力利用率" className="mt-1"><div className="grid gap-2 md:grid-cols-6">{items.map(([i,n,v],x)=><div key={n} className="process-node"><span>{i}</span><Waves className="size-5 text-primary"/><strong>{n}</strong><small>{v}</small>{x<5&&<i/>}</div>)}</div></Panel> }
function MetricRows() { return <div className="space-y-2">{[["曝气池 DO","3.2 mg/L"],["膜组压力差","18.6 kPa"],["污泥浓度 MLSS","8.4 g/L"],["RO 回收率","76.2%"],["曝气量","42 m³/min"]].map(([a,b])=><div key={a} className="flex items-center justify-between rounded bg-primary/5 px-3 py-2 text-xs"><span className="text-muted-foreground">{a}</span><strong className="font-mono text-primary">{b}</strong></div>)}</div> }
function ProcessTable() { return <DataTable headers={["时间","工艺单元","事件","设定值","实际值","结果"]} rows={[["14:32","MBR-02","曝气自动调节","3.0 mg/L","3.2 mg/L","完成"],["13:48","RO-01","高压泵频率调整","42 Hz","41.8 Hz","完成"],["12:16","调节池","进水阀开度调整","68%","68%","完成"]]} /> }
function EquipmentHealth() { return <div className="space-y-3">{[["RO 高压泵","96"],["MBR 鼓风机","92"],["提升泵 P-101","88"],["加药泵 D-01","73"]].map(([n,v])=><div key={n}><div className="mb-1 flex justify-between text-[10px]"><span>{n}</span><b>{v}分</b></div><div className="h-1.5 rounded bg-muted"><div className="h-full rounded bg-primary" style={{width:`${v}%`}}/></div></div>)}</div> }
function EquipmentTable() { return <DataTable headers={["设备编号","设备名称","累计运行","温度","振动","下次保养","状态"]} rows={[["P-101","进水提升泵","8,214 h","48℃","2.1 mm/s","12 天","正常"],["B-202","MBR 鼓风机","6,486 h","62℃","3.4 mm/s","5 天","关注"],["R-301","RO 高压泵","5,932 h","55℃","2.7 mm/s","28 天","正常"],["D-014","加药泵","3,118 h","44℃","1.8 mm/s","2 天","待保养"]]} /> }
function AlertEfficiency() { return <div className="grid h-60 content-center gap-3"><div className="grid grid-cols-3 gap-2 text-center">{[["4.6","平均响应/min"],["18","已处置/条"],["1","超时/条"]].map(([v,l])=><div key={l} className="rounded bg-primary/5 p-3"><b className="data-number text-xl">{v}</b><p className="text-[9px] text-muted-foreground">{l}</p></div>)}</div><div className="rounded border border-success/20 bg-success/10 p-3 text-center text-xs text-success"><ShieldCheck className="mx-auto mb-1 size-5"/>今日预警闭环率 94.7%</div></div> }
function AlertTable() { return <DataTable headers={["等级","发生时间","预警来源","预警内容","持续时间","负责人","状态"]} rows={[["一级","14:36:18","RO-02","膜前压力持续高于 2.1MPa","12 min","陈工","处理中"],["二级","14:22:06","B区集液井","液位达到 82% 预警线","26 min","李工","已确认"],["三级","13:48:31","TP分析仪","距离校准周期剩余 4 小时","48 min","王工","待处理"]]} /> }
function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) { return <div className="overflow-x-auto"><table className="data-table"><thead><tr>{headers.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((row,i)=><tr key={`${row[0]}-${i}`}>{row.map((cell,j)=><td key={`${cell}-${j}`}>{j===row.length-1?<StatusBadge tone={/正常|达标|运行|完成/.test(cell)?"success":/关注|待|处理中/.test(cell)?"warning":"danger"}>{cell}</StatusBadge>:cell}</td>)}</tr>)}</tbody></table></div> }