import { TrendingUp, Users, Activity, MousePointerClick, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router';

const metrics = [
  { id: 'section-1', category: '用户活跃', items: [
    { id: 'metric-1-1', label: '日活用户', value: '1,286', change: '+11.3%', trend: 'up' },
    { id: 'metric-1-2', label: '月活用户', value: '8,740', change: '+15.6%', trend: 'up' },
    { id: 'metric-1-3', label: '次日留存率', value: '62.4%', change: '+3.8%', trend: 'up' },
    { id: 'metric-1-4', label: '7日留存率', value: '38.2%', change: '-1.2%', trend: 'down' },
  ]},
  { id: 'section-2', category: '核心流程', items: [
    { id: 'metric-2-1', label: '授权完成率', value: '89.3%', change: '+2.1%', trend: 'up' },
    { id: 'metric-2-2', label: '模块进入率', value: '74.6%', change: '+5.4%', trend: 'up' },
    { id: 'metric-2-3', label: '对话流失率', value: '57.5%', change: '-2.1%', trend: 'down', alert: true },
  ]},
  { id: 'section-3', category: '模块热度', items: [
    { id: 'metric-3-1', label: '有问必答点击率', value: '42.5%', change: '+6.3%', trend: 'up' },
    { id: 'metric-3-2', label: '健康评估点击率', value: '28.7%', change: '+2.8%', trend: 'up' },
    { id: 'metric-3-3', label: '预约挂号点击率', value: '18.4%', change: '-0.9%', trend: 'down' },
    { id: 'metric-3-4', label: '减重预测点击率', value: '10.4%', change: '+1.2%', trend: 'up' },
    { id: 'metric-3-5', label: '健康管理服务包点击率', value: '8.0%', change: '+0.6%', trend: 'up' },
  ]},
];

const funnels = [
  { id: 'funnel-1', name: '授权转化漏斗', rate: '89.3%', color: 'blue' },
  { id: 'funnel-2', name: '有问必答漏斗', rate: '68.1%', color: 'purple' },
  { id: 'funnel-3', name: '健康评估漏斗', rate: '52.4%', color: 'green' },
  { id: 'funnel-4', name: '预约挂号漏斗', rate: '35.6%', color: 'orange' },
  { id: 'funnel-5', name: '减重预测漏斗', rate: '21.6%', color: 'blue' },
  { id: 'funnel-6', name: '服务包转化漏斗', rate: '2.3%', color: 'purple' },
];

const activeData = [
  { date: '04/22', dau: 1050, auth: 1320, usage: 720 },
  { date: '04/23', dau: 1120, auth: 1400, usage: 780 },
  { date: '04/24', dau: 1180, auth: 1480, usage: 830 },
  { date: '04/25', dau: 1095, auth: 1360, usage: 760 },
  { date: '04/26', dau: 1230, auth: 1540, usage: 870 },
  { date: '04/27', dau: 1210, auth: 1510, usage: 850 },
  { date: '04/28', dau: 1286, auth: 1600, usage: 910 },
];

const surfaceClassName = 'rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.18)]';
const sectionAccentMap = {
  用户活跃: {
    icon: Users,
    iconClassName: 'text-violet-300',
  },
  核心流程: {
    icon: Activity,
    iconClassName: 'text-sky-300',
  },
  模块热度: {
    icon: MousePointerClick,
    iconClassName: 'text-emerald-300',
  },
} as const;

export default function DataOverview() {
  return (
    <div className="space-y-6 rounded-[30px] border border-slate-200/80 bg-slate-50/90 p-5 md:p-6">
      <div className="rounded-lg bg-white px-5 py-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-normal leading-6 text-[#172C50]">时间范围</span>
          <button className="h-9 rounded border border-[#526FEA] bg-[#526FEA] px-4 text-sm font-normal text-white transition-colors hover:bg-[#425ed8]">今日</button>
          <button className="h-9 rounded border border-[#DEE0E3] bg-white px-4 text-sm font-normal text-[#172C50] transition-colors hover:bg-[#F8FAFC]">昨日</button>
          <button className="h-9 rounded border border-[#DEE0E3] bg-white px-4 text-sm font-normal text-[#172C50] transition-colors hover:bg-[#F8FAFC]">近7日</button>
          <button className="h-9 rounded border border-[#DEE0E3] bg-white px-4 text-sm font-normal text-[#172C50] transition-colors hover:bg-[#F8FAFC]">近30日</button>
          <button className="ml-auto flex h-9 items-center gap-2 rounded border border-[#526FEA] bg-white px-4 text-sm font-normal text-[#526FEA] transition-colors hover:bg-[#F5F7FF]">
            <Download className="h-4 w-4" />
            导出数据
          </button>
        </div>
      </div>

      {metrics.map((section) => {
        const accent = sectionAccentMap[section.category as keyof typeof sectionAccentMap];
        const SectionIcon = accent.icon;

        return (
          <section key={section.id} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {section.items.map((metric) => (
                <div key={metric.id} className={`${surfaceClassName} p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-28px_rgba(15,23,42,0.26)]`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm text-slate-500">{metric.label}</div>
                      <div className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">{metric.value}</div>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50">
                      <SectionIcon className={`h-6 w-6 ${accent.iconClassName}`} />
                    </div>
                  </div>
                  <div className={`mt-5 inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${
                    metric.trend === 'up'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-rose-50 text-rose-600'
                  }`}>
                    <TrendingUp className={`h-4 w-4 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                    <span>{metric.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {funnels.map((funnel) => (
            <Link
              key={funnel.id}
              to="/data/analysis"
              className={`${surfaceClassName} group p-5 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_22px_48px_-28px_rgba(59,130,246,0.35)]`}
            >
              <div className="text-sm text-slate-500">{funnel.name}</div>
              <div className={`mt-3 text-2xl font-semibold tracking-tight ${
                funnel.color === 'blue' ? 'text-blue-600' :
                funnel.color === 'green' ? 'text-green-600' :
                funnel.color === 'purple' ? 'text-purple-600' :
                'text-orange-600'
              }`}>
                {funnel.rate}
              </div>
              <div className="mt-4 h-2 w-full rounded-full bg-slate-100">
                <div
                  className={`h-2 rounded-full ${
                    funnel.color === 'blue' ? 'bg-blue-600' :
                    funnel.color === 'green' ? 'bg-green-600' :
                    funnel.color === 'purple' ? 'bg-purple-600' :
                    'bg-orange-600'
                  }`}
                  style={{ width: funnel.rate }}
                ></div>
              </div>
              <div className="mt-3 text-xs font-medium tracking-[0.18em] text-slate-400 uppercase transition-colors group-hover:text-blue-600">
                点击查看详情
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={`${surfaceClassName} p-6`}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-end">
          <button className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-white">日</button>
          <button className="rounded-2xl bg-slate-900 px-3 py-1.5 text-sm font-medium text-white shadow-sm">周</button>
          <button className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-white">月</button>
        </div>
        <div className="mt-6 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={activeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Line key="line-dau" type="monotone" dataKey="dau" stroke="#8b5cf6" name="日活用户" strokeWidth={2.5} />
              <Line key="line-auth" type="monotone" dataKey="auth" stroke="#3b82f6" name="授权人数" strokeWidth={2.5} />
              <Line key="line-usage" type="monotone" dataKey="usage" stroke="#10b981" name="使用人数" strokeWidth={2.5} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
