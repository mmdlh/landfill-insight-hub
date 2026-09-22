import { Link, useRouterState } from "@tanstack/react-router";
import { AlarmClock, Droplets, FlaskConical, Gauge, Settings, Waves } from "lucide-react";
import type { ReactNode } from "react";
import facilityBackground from "@/assets/leachate-facility-bg.jpg";

const nav = [
  { to: "/" as const, label: "总览驾驶舱", icon: Gauge },
  { to: "/water-quality" as const, label: "水质监测", icon: FlaskConical },
  { to: "/collection" as const, label: "渗沥液收集", icon: Droplets },
  { to: "/process" as const, label: "处理工艺", icon: Waves },
  { to: "/equipment" as const, label: "设备运维", icon: Settings },
  { to: "/alerts" as const, label: "预警管理", icon: AlarmClock },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return (
    <div className="dashboard-bg min-h-screen text-foreground">
      <img src={facilityBackground} alt="生态环绕的渗沥液处理设施" width={1920} height={1088} className="fixed inset-0 -z-20 h-full w-full object-cover opacity-30" />
      <div className="fixed inset-0 -z-10 bg-background/76 backdrop-blur-[2px]" />
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 lg:px-6">
        <div className="glass-panel mx-auto grid h-[74px] max-w-[1500px] grid-cols-[1fr_auto_1fr] items-center px-3 sm:px-5">
          <nav className="flex justify-start gap-1.5">
            {nav.slice(0, 3).map((item) => <NavIcon key={item.to} {...item} active={pathname === item.to} />)}
          </nav>
          <div className="px-2 text-center">
            <h1 className="font-display text-[clamp(14px,2.1vw,25px)] font-bold text-primary">垃圾填埋场渗沥液智慧平台</h1>
            <p className="hidden text-[10px] text-muted-foreground sm:block">LEACHATE SMART ENVIRONMENTAL PLATFORM</p>
          </div>
          <nav className="flex justify-end gap-1.5">
            {nav.slice(3).map((item) => <NavIcon key={item.to} {...item} active={pathname === item.to} />)}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-[1500px] px-3 pb-8 pt-[104px] lg:px-6">{children}</main>
    </div>
  );
}

function NavIcon({ to, label, icon: Icon, active }: (typeof nav)[number] & { active: boolean }) {
  return (
    <Link to={to} title={label} aria-label={label} className={`nav-icon group ${active ? "nav-icon-active" : ""}`}>
      <Icon className="size-4" strokeWidth={1.8} />
      <span className="pointer-events-none absolute top-[calc(100%+9px)] hidden whitespace-nowrap rounded bg-foreground px-2 py-1 text-[10px] text-background shadow-lg group-hover:block">{label}</span>
    </Link>
  );
}

export function PageHeader({ eyebrow, title, description, status = "12 个站点在线" }: { eyebrow: string; title: string; description: string; status?: string }) {
  return (
    <section className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div><p className="text-[10px] font-semibold uppercase text-primary">{eyebrow}</p><h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">{title}</h2><p className="mt-1 max-w-2xl text-xs text-muted-foreground">{description}</p></div>
      <div className="glass-pill"><span className="status-dot bg-success" />{status}<span className="font-mono text-muted-foreground">实时更新</span></div>
    </section>
  );
}

export function Panel({ title, subtitle, children, className = "", action }: { title: string; subtitle?: string; children: ReactNode; className?: string; action?: ReactNode }) {
  return <section className={`glass-card ${className}`}><div className="mb-3 flex items-start justify-between gap-3"><div><h3 className="font-display text-sm font-semibold">{title}</h3>{subtitle && <p className="mt-0.5 text-[10px] text-muted-foreground">{subtitle}</p>}</div>{action}</div>{children}</section>;
}

export function StatCard({ label, value, unit, trend, tone = "primary", icon: Icon }: { label: string; value: string; unit?: string; trend: string; tone?: "primary" | "success" | "warning" | "danger"; icon?: typeof Gauge }) {
  return <article className="glass-card stat-card"><div className="flex items-center justify-between"><span className="text-[11px] text-muted-foreground">{label}</span>{Icon && <Icon className={`size-4 text-${tone}`} />}</div><p className="data-number mt-2">{value}<span className="ml-1 text-xs font-medium text-muted-foreground">{unit}</span></p><p className={`mt-1 text-[10px] font-medium text-${tone}`}>{trend}</p></article>;
}

export function StatusBadge({ children, tone = "success" }: { children: ReactNode; tone?: "success" | "warning" | "danger" | "primary" }) {
  return <span className={`status-badge status-${tone}`}><span className={`status-dot bg-${tone}`} />{children}</span>;
}