import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const funnelData = {
  '授权流程': [
    { id: 'funnel-step-1-1', step: '打开授权页', visitors: 10000, converted: 9200, rate: 92, lost: 800, lostRate: 8 },
    { id: 'funnel-step-1-2', step: '点击微信授权', visitors: 9200, converted: 8930, rate: 97.1, lost: 270, lostRate: 2.9 },
    { id: 'funnel-step-1-3', step: '授权成功', visitors: 8930, converted: 8680, rate: 97.2, lost: 250, lostRate: 2.8 },
    { id: 'funnel-step-1-4', step: '进入首页', visitors: 8680, converted: 0, rate: 0, lost: 0, lostRate: 0 },
  ],
  '有问必答': [
    { id: 'funnel-step-2-1', step: '点击有问必答入口（自动进入对话页）', visitors: 8540, converted: 3630, rate: 42.5, lost: 4910, lostRate: 57.5 },
    { id: 'funnel-step-2-2', step: '发送首条消息', visitors: 3630, converted: 2890, rate: 79.6, lost: 740, lostRate: 20.4 },
    { id: 'funnel-step-2-3', step: '获得AI回复', visitors: 2890, converted: 2310, rate: 79.9, lost: 580, lostRate: 20.1 },
    { id: 'funnel-step-2-4', step: '进行多轮对话(≥3轮)', visitors: 2310, converted: 0, rate: 0, lost: 0, lostRate: 0 },
  ],
  '健康评估': [
    { id: 'funnel-step-3-1', step: '点击健康评估入口（自动进入对话页+推送BMI卡片）', visitors: 8540, converted: 2450, rate: 28.7, lost: 6090, lostRate: 71.3 },
    { id: 'funnel-step-3-2', step: 'BMI正常→自动推送上传报告卡片', visitors: 980, converted: 640, rate: 65.3, lost: 340, lostRate: 34.7 },
    { id: 'funnel-step-3-3', step: 'BMI正常→点击上传报告', visitors: 640, converted: 640, rate: 100, lost: 0, lostRate: 0 },
    { id: 'funnel-step-3-4', step: '报告正常→自动推送结论', visitors: 380, converted: 0, rate: 0, lost: 0, lostRate: 0 },
    { id: 'funnel-step-3-5', step: '报告异常→自动推送预约挂号卡片', visitors: 260, converted: 165, rate: 63.5, lost: 95, lostRate: 36.5 },
    { id: 'funnel-step-3-6', step: '报告异常→点击预约挂号', visitors: 165, converted: 0, rate: 0, lost: 0, lostRate: 0 },
    { id: 'funnel-step-3-7', step: 'BMI异常→自动推送预约挂号卡片', visitors: 1470, converted: 820, rate: 55.8, lost: 650, lostRate: 44.2 },
    { id: 'funnel-step-3-8', step: 'BMI异常→点击预约挂号', visitors: 820, converted: 0, rate: 0, lost: 0, lostRate: 0 },
  ],
  '预约挂号': [
    { id: 'funnel-step-4-1', step: '点击预约挂号入口（自动进入对话页+推送挂号卡片）', visitors: 8540, converted: 1570, rate: 18.4, lost: 6970, lostRate: 81.6 },
    { id: 'funnel-step-4-2', step: '点击体重管理中心门诊', visitors: 890, converted: 0, rate: 0, lost: 0, lostRate: 0 },
    { id: 'funnel-step-4-3', step: '点击邵逸夫互联网医院', visitors: 680, converted: 0, rate: 0, lost: 0, lostRate: 0 },
  ],
  '减重预测': [
    { id: 'funnel-step-5-1', step: '点击减重预测入口（自动进入对话页+推送预测卡片）', visitors: 8540, converted: 890, rate: 10.4, lost: 7650, lostRate: 89.6 },
    { id: 'funnel-step-5-2', step: '点击开始预测', visitors: 890, converted: 0, rate: 0, lost: 0, lostRate: 0 },
  ],
  '体重健康管理服务包': [
    { id: 'funnel-step-6-1', step: '点击服务包入口（自动进入对话页+推送服务包卡片）', visitors: 680, converted: 680, rate: 100, lost: 0, lostRate: 0 },
  ],
};

const retentionData = [
  { date: '04/22', dau: 1050, day1: 60.2, day7: 35.8 },
  { date: '04/23', dau: 1120, day1: 61.5, day7: 36.2 },
  { date: '04/24', dau: 1180, day1: 62.1, day7: 37.0 },
  { date: '04/25', dau: 1095, day1: 61.8, day7: 37.4 },
  { date: '04/26', dau: 1230, day1: 62.8, day7: 37.9 },
  { date: '04/27', dau: 1210, day1: 62.0, day7: 38.0 },
  { date: '04/28', dau: 1286, day1: 62.4, day7: 38.2 },
];

const pageRankData = [
  { page: '首页', pv: 28600, uv: 8540 },
  { page: '有问必答', pv: 18200, uv: 3630 },
  { page: '健康评估', pv: 9800, uv: 2450 },
  { page: '预约挂号', pv: 6300, uv: 1570 },
  { page: '减重预测', pv: 4500, uv: 890 },
  { page: '体重服务包', pv: 3200, uv: 680 },
];

const moduleUsageData = [
  { name: '有问必答', value: 42.5, color: '#3b82f6' },
  { name: '健康评估', value: 28.7, color: '#8b5cf6' },
  { name: '预约挂号', value: 18.4, color: '#10b981' },
  { name: '减重预测', value: 7.1, color: '#f59e0b' },
  { name: '体重服务包', value: 3.3, color: '#ef4444' },
];

const timeDistData = [
  { name: '上午 6-12时', value: 28.5, color: '#3b82f6' },
  { name: '下午 12-18时', value: 35.2, color: '#10b981' },
  { name: '晚间 18-24时', value: 30.8, color: '#8b5cf6' },
  { name: '深夜 0-6时', value: 5.5, color: '#94a3b8' },
];

const surfaceClassName = 'rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.18)]';
const quickRangeOptions = ['今日', '近7日', '近30日'] as const;
const tabTextClassName = 'relative px-2 pb-3 text-sm font-medium leading-5 transition-colors';

export default function DataAnalysis() {
  const [activeTab, setActiveTab] = useState<'funnel' | 'behavior'>('funnel');
  const [selectedFunnel, setSelectedFunnel] = useState('授权流程');
  const [timeRange, setTimeRange] = useState<(typeof quickRangeOptions)[number]>('近7日');

  const handleResetFilters = () => {
    setTimeRange('近7日');
  };

  return (
    <div className="space-y-6 rounded-[30px] border border-slate-200/80 bg-slate-50/90 p-5 md:p-6">
      <div className="rounded-lg bg-white px-5 py-5">
        <div className="flex flex-wrap items-center gap-4 xl:flex-nowrap">
          <label className="flex h-9 min-w-[280px] flex-1 items-center rounded border border-[#DEE0E3] bg-white px-3">
            <span className="mr-3 shrink-0 text-sm font-normal leading-6 text-[#172C50]">时间范围</span>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as (typeof quickRangeOptions)[number])}
              className="w-full bg-transparent text-sm font-normal leading-6 text-[#172C50] focus:outline-none"
            >
              {quickRangeOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>

          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={handleResetFilters}
              className="h-9 w-20 rounded border border-[#526FEA] bg-white text-sm font-normal text-[#526FEA] transition-colors hover:bg-[#F5F7FF]"
            >
              重置
            </button>
            <button className="h-9 w-20 rounded bg-[#526FEA] text-sm font-normal text-white transition-colors hover:bg-[#425ed8]">
              查询
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white px-5 pt-4 shadow-sm">
        <div className="flex items-end gap-8 border-b border-[#F0F0F0]">
          <button
            onClick={() => setActiveTab('funnel')}
            className={`${tabTextClassName} ${
              activeTab === 'funnel' ? 'text-[#3F66FC] after:absolute after:inset-x-0 after:bottom-[-1px] after:border-b-2 after:border-[#3F66FC]' : 'text-[#54585F] hover:text-[#3F66FC]'
            }`}
          >
            漏斗分析
          </button>
          <button
            onClick={() => setActiveTab('behavior')}
            className={`${tabTextClassName} ${
              activeTab === 'behavior' ? 'text-[#3F66FC] after:absolute after:inset-x-0 after:bottom-[-1px] after:border-b-2 after:border-[#3F66FC]' : 'text-[#54585F] hover:text-[#3F66FC]'
            }`}
          >
            用户行为分析
          </button>
        </div>
      </div>

      {activeTab === 'funnel' && (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="px-5 pt-4">
              <div className="flex flex-wrap items-end gap-8 border-b border-[#F0F0F0]">
                {Object.keys(funnelData).map((funnel) => (
                  <button
                    key={funnel}
                    onClick={() => setSelectedFunnel(funnel)}
                    className={`${tabTextClassName} ${
                      selectedFunnel === funnel ? 'text-[#3F66FC] after:absolute after:inset-x-0 after:bottom-[-1px] after:border-b-2 after:border-[#3F66FC]' : 'text-[#54585F] hover:text-[#3F66FC]'
                    }`}
                  >
                    {funnel}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-transparent px-5 py-5">
              <div className="flex flex-col gap-1 pb-4">
                <h3 className="text-base font-medium text-[#172C50]">{selectedFunnel}明细</h3>
                <p className="text-sm text-[#7C8798]">按节点查看访问、转化与流失表现</p>
              </div>

              <div className="overflow-x-auto rounded-lg border border-[#F0F0F0]">
                <table className="w-full min-w-[720px] border-separate border-spacing-0">
                  <thead>
                    <tr className="bg-[#FAFBFC]">
                      <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">节点名称</th>
                      <th className="border-b border-[#F0F0F0] px-6 py-3 text-right text-sm font-medium text-[#54585F]">访问人数</th>
                      <th className="border-b border-[#F0F0F0] px-6 py-3 text-right text-sm font-medium text-[#54585F]">转化人数</th>
                      <th className="border-b border-[#F0F0F0] px-6 py-3 text-right text-sm font-medium text-[#54585F]">转化率</th>
                      <th className="border-b border-[#F0F0F0] px-6 py-3 text-right text-sm font-medium text-[#54585F]">流失人数</th>
                      <th className="border-b border-[#F0F0F0] px-6 py-3 text-right text-sm font-medium text-[#54585F]">流失率</th>
                    </tr>
                  </thead>
                  <tbody>
                    {funnelData[selectedFunnel as keyof typeof funnelData].map((step, index) => (
                      <tr key={step.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FCFDFE]'}>
                        <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm font-medium text-[#172C50]">{step.step}</td>
                        <td className="border-b border-[#F5F6F7] px-6 py-4 text-right text-sm text-[#172C50]">{step.visitors.toLocaleString()}</td>
                        <td className="border-b border-[#F5F6F7] px-6 py-4 text-right text-sm text-[#172C50]">{step.converted.toLocaleString()}</td>
                        <td className="border-b border-[#F5F6F7] px-6 py-4 text-right text-sm font-medium text-[#3F66FC]">{step.rate}%</td>
                        <td className="border-b border-[#F5F6F7] px-6 py-4 text-right text-sm text-[#172C50]">{step.lost.toLocaleString()}</td>
                        <td className="border-b border-[#F5F6F7] px-6 py-4 text-right text-sm font-medium">
                          <span className={`inline-flex items-center justify-end gap-1 ${step.lostRate > 40 ? 'text-[#F04438]' : 'text-[#54585F]'}`}>
                            {step.lostRate > 40 && <AlertTriangle className="h-4 w-4" />}
                            {step.lostRate}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'behavior' && (
        <div className="space-y-6">
          <div className={`${surfaceClassName} p-6`}>
            <h3 className="text-base font-semibold text-slate-900">用户活跃与留存趋势</h3>
            <p className="mt-1 text-sm text-slate-500">同步观察活跃规模与留存表现变化</p>
            <div className="mt-5 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={retentionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Legend />
                  <Line key="line-dau" type="monotone" dataKey="dau" stroke="#3b82f6" name="日活" strokeWidth={2.5} />
                  <Line key="line-day1" type="monotone" dataKey="day1" stroke="#10b981" name="次日留存率" strokeWidth={2.5} />
                  <Line key="line-day7" type="monotone" dataKey="day7" stroke="#8b5cf6" name="7日留存率" strokeWidth={2.5} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={`${surfaceClassName} p-6`}>
            <h3 className="text-base font-semibold text-slate-900">页面访问排行</h3>
            <p className="mt-1 text-sm text-slate-500">各页面 PV / UV 对比（授权页、首页、5 个功能模块对话页）</p>
            <div className="mt-5 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pageRankData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="page" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Legend />
                  <Bar key="bar-pv" dataKey="pv" fill="#3b82f6" name="PV" radius={[8, 8, 0, 0]} />
                  <Bar key="bar-uv" dataKey="uv" fill="#10b981" name="UV" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className={`${surfaceClassName} p-6`}>
              <h3 className="text-center text-base font-semibold text-slate-900">功能模块使用分布</h3>
              <p className="mt-1 text-center text-sm text-slate-500">首页 5 个功能模块的点击占比</p>
              <div className="mt-5 h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={moduleUsageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {moduleUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={`${surfaceClassName} p-6`}>
              <h3 className="text-center text-base font-semibold text-slate-900">用户活跃时段分布</h3>
              <p className="mt-1 text-center text-sm text-slate-500">不同时段用户活跃占比</p>
              <div className="mt-5 h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={timeDistData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {timeDistData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
