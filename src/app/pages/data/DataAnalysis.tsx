import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const funnelData = {
  '导诊流程': [
    { id: 'funnel-step-1-1', step: '入口点击', visitors: 10000, converted: 8500, rate: 85, lost: 1500, lostRate: 15 },
    { id: 'funnel-step-1-2', step: '开始问卷', visitors: 8500, converted: 7800, rate: 91.8, lost: 700, lostRate: 8.2 },
    { id: 'funnel-step-1-3', step: '问卷完成', visitors: 7800, converted: 7200, rate: 92.3, lost: 600, lostRate: 7.7 },
    { id: 'funnel-step-1-4', step: '生成方案', visitors: 7200, converted: 6800, rate: 94.4, lost: 400, lostRate: 5.6 },
    { id: 'funnel-step-1-5', step: '方案开启', visitors: 6800, converted: 6530, rate: 96, lost: 270, lostRate: 4 },
  ],
  '设备绑定': [
    { id: 'funnel-step-2-1', step: '绑定入口点击', visitors: 5000, converted: 4500, rate: 90, lost: 500, lostRate: 10 },
    { id: 'funnel-step-2-2', step: '发起授权', visitors: 4500, converted: 4200, rate: 93.3, lost: 300, lostRate: 6.7 },
    { id: 'funnel-step-2-3', step: '授权通过', visitors: 4200, converted: 3900, rate: 92.9, lost: 300, lostRate: 7.1 },
    { id: 'funnel-step-2-4', step: '绑定成功', visitors: 3900, converted: 3700, rate: 94.9, lost: 200, lostRate: 5.1 },
    { id: 'funnel-step-2-5', step: '数据首次同步', visitors: 3700, converted: 3550, rate: 95.9, lost: 150, lostRate: 4.1 },
  ],
  '代餐转化': [
    { id: 'funnel-step-3-1', step: '套餐入口点击', visitors: 8000, converted: 6000, rate: 75, lost: 2000, lostRate: 25 },
    { id: 'funnel-step-3-2', step: '浏览套餐详情', visitors: 6000, converted: 4500, rate: 75, lost: 1500, lostRate: 25 },
    { id: 'funnel-step-3-3', step: '加入购物车', visitors: 4500, converted: 2500, rate: 55.6, lost: 2000, lostRate: 44.4 },
    { id: 'funnel-step-3-4', step: '发起支付', visitors: 2500, converted: 2100, rate: 84, lost: 400, lostRate: 16 },
    { id: 'funnel-step-3-5', step: '支付完成', visitors: 2100, converted: 1900, rate: 90.5, lost: 200, lostRate: 9.5 },
  ],
  '打卡流程': [
    { id: 'funnel-step-4-1', step: '打卡入口点击', visitors: 7000, converted: 5500, rate: 78.6, lost: 1500, lostRate: 21.4 },
    { id: 'funnel-step-4-2', step: '选择打卡方式', visitors: 5500, converted: 4800, rate: 87.3, lost: 700, lostRate: 12.7 },
    { id: 'funnel-step-4-3', step: '提交打卡', visitors: 4800, converted: 4200, rate: 87.5, lost: 600, lostRate: 12.5 },
    { id: 'funnel-step-4-4', step: '打卡完成', visitors: 4200, converted: 3680, rate: 87.6, lost: 520, lostRate: 12.4 },
  ],
};

const retentionData = [
  { date: '03/11', dau: 7200, mau: 42000, day1: 65, day7: 40 },
  { date: '03/12', dau: 7500, mau: 42500, day1: 66, day7: 41 },
  { date: '03/13', dau: 7800, mau: 43200, day1: 67, day7: 41.5 },
  { date: '03/14', dau: 8100, mau: 44100, day1: 68, day7: 42 },
  { date: '03/15', dau: 7900, mau: 44500, day1: 67.5, day7: 42.3 },
  { date: '03/16', dau: 8300, mau: 45000, day1: 68.2, day7: 42.6 },
  { date: '03/17', dau: 8542, mau: 45230, day1: 68.5, day7: 42.8 },
];

const pageRankData = [
  { page: '首页', pv: 45230, uv: 12500 },
  { page: '健康方案', pv: 38400, uv: 10200 },
  { page: '代餐商城', pv: 32100, uv: 8900 },
  { page: '打卡页面', pv: 28600, uv: 7800 },
  { page: '设备绑定', pv: 25300, uv: 6500 },
  { page: '个人中心', pv: 22800, uv: 6200 },
  { page: '订单列表', pv: 19500, uv: 5400 },
  { page: '健康档案', pv: 17200, uv: 4800 },
];

const userTypeData = [
  { name: '已绑定设备', value: 35.2, color: '#3b82f6' },
  { name: '未绑定设备', value: 64.8, color: '#e5e7eb' },
];

const purchaseData = [
  { name: '已购买代餐', value: 23.8, color: '#10b981' },
  { name: '未购买代餐', value: 76.2, color: '#e5e7eb' },
];

const surfaceClassName = 'rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.18)]';
const quickRangeOptions = ['今日', '近7日', '近30日', '自定义'] as const;
const eventTypeOptions = ['全部类型', '用户行为', '核心流程', '功能使用', '业务转化'] as const;
const userSegmentOptions = ['全部用户', '绑定设备用户', '购买代餐用户', '仅完成导诊用户'] as const;
const tabTextClassName = 'relative px-2 pb-3 text-sm font-medium leading-5 transition-colors';

export default function DataAnalysis() {
  const [activeTab, setActiveTab] = useState<'funnel' | 'behavior'>('funnel');
  const [selectedFunnel, setSelectedFunnel] = useState('导诊流程');
  const [timeRange, setTimeRange] = useState<(typeof quickRangeOptions)[number]>('近7日');
  const [eventType, setEventType] = useState<(typeof eventTypeOptions)[number]>('全部类型');
  const [userSegment, setUserSegment] = useState<(typeof userSegmentOptions)[number]>('全部用户');

  const handleResetFilters = () => {
    setTimeRange('近7日');
    setEventType('全部类型');
    setUserSegment('全部用户');
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

          <label className="flex h-9 min-w-[280px] flex-1 items-center rounded border border-[#DEE0E3] bg-white px-3">
            <span className="mr-3 shrink-0 text-sm font-normal leading-6 text-[#172C50]">埋点类型</span>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value as (typeof eventTypeOptions)[number])}
              className="w-full bg-transparent text-sm font-normal leading-6 text-[#172C50] focus:outline-none"
            >
              {eventTypeOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="flex h-9 min-w-[280px] flex-1 items-center rounded border border-[#DEE0E3] bg-white px-3">
            <span className="mr-3 shrink-0 text-sm font-normal leading-6 text-[#172C50]">用户分群</span>
            <select
              value={userSegment}
              onChange={(e) => setUserSegment(e.target.value as (typeof userSegmentOptions)[number])}
              className="w-full bg-transparent text-sm font-normal leading-6 text-[#172C50] focus:outline-none"
            >
              {userSegmentOptions.map((option) => (
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
            <h3 className="text-base font-semibold text-slate-900">页面访问排行 TOP 8</h3>
            <p className="mt-1 text-sm text-slate-500">结合 PV / UV 观察高频访问页面</p>
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
              <h3 className="text-center text-base font-semibold text-slate-900">设备绑定占比</h3>
              <p className="mt-1 text-center text-sm text-slate-500">观察设备绑定用户在整体中的占比</p>
              <div className="mt-5 h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {userTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={`${surfaceClassName} p-6`}>
              <h3 className="text-center text-base font-semibold text-slate-900">代餐购买占比</h3>
              <p className="mt-1 text-center text-sm text-slate-500">查看代餐购买用户在整体中的渗透情况</p>
              <div className="mt-5 h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={purchaseData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {purchaseData.map((entry, index) => (
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
