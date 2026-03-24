import { useState } from 'react';
import { Search, Download, AlertTriangle } from 'lucide-react';
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

const sourceData = [
  { name: '小程序直接访问', value: 45, color: '#3b82f6' },
  { name: '微信分享', value: 30, color: '#10b981' },
  { name: '公众号文章', value: 15, color: '#8b5cf6' },
  { name: '其他渠道', value: 10, color: '#f59e0b' },
];

const userTypeData = [
  { name: '已绑定设备', value: 35.2, color: '#3b82f6' },
  { name: '未绑定设备', value: 64.8, color: '#e5e7eb' },
];

const purchaseData = [
  { name: '已购买代餐', value: 23.8, color: '#10b981' },
  { name: '未购买代餐', value: 76.2, color: '#e5e7eb' },
];

const errorData = [
  { id: 'error-1', time: '2026-03-17 14:23:15', page: '/pages/payment/index', type: '网络超时', count: 3, rate: '0.02%' },
  { id: 'error-2', time: '2026-03-17 13:45:32', page: '/pages/questionnaire/index', type: '数据格式错误', count: 5, rate: '0.03%' },
  { id: 'error-3', time: '2026-03-17 12:18:42', page: '/pages/device/bind', type: '授权失败', count: 12, rate: '0.15%' },
  { id: 'error-4', time: '2026-03-17 11:05:28', page: '/pages/home/index', type: '接口异常', count: 2, rate: '0.01%' },
];

export default function DataAnalysis() {
  const [activeTab, setActiveTab] = useState<'funnel' | 'behavior' | 'error'>('funnel');
  const [selectedFunnel, setSelectedFunnel] = useState('导诊流程');
  const [timeRange, setTimeRange] = useState('近7日');

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="font-semibold text-gray-900">数据分析</h1>
        <p className="text-sm text-gray-500 mt-1">深度分析用户行为和业务转化数据</p>
      </div>

      {/* 全局筛选栏 */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">时间范围</label>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>今日</option>
              <option>近7日</option>
              <option>近30日</option>
              <option>自定义</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">埋点类型</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>全部类型</option>
              <option>用户行为</option>
              <option>核心流程</option>
              <option>功能使用</option>
              <option>业务转化</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">用户分群</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>全部用户</option>
              <option>绑定设备用户</option>
              <option>购买代餐用户</option>
              <option>仅完成导诊用户</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="flex items-center gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('funnel')}
          className={`px-4 py-2 font-medium transition-all ${
            activeTab === 'funnel'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          漏斗分析
        </button>
        <button
          onClick={() => setActiveTab('behavior')}
          className={`px-4 py-2 font-medium transition-all ${
            activeTab === 'behavior'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          用户行为分析
        </button>
        <button
          onClick={() => setActiveTab('error')}
          className={`px-4 py-2 font-medium transition-all ${
            activeTab === 'error'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          异常监控
        </button>
      </div>

      {/* 漏斗分析 Tab */}
      {activeTab === 'funnel' && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            {Object.keys(funnelData).map((funnel) => (
              <button
                key={funnel}
                onClick={() => setSelectedFunnel(funnel)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  selectedFunnel === funnel
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {funnel}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">节点名称</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">访问人数</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">转化人数</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">转化率</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">流失人数</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">流失率</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {funnelData[selectedFunnel as keyof typeof funnelData].map((step) => (
                    <tr key={step.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{step.step}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right">{step.visitors.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right">{step.converted.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-green-600 text-right font-medium">{step.rate}%</td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right">{step.lost.toLocaleString()}</td>
                      <td className={`px-6 py-4 text-sm text-right font-medium ${
                        step.lostRate > 40 ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {step.lostRate > 40 && <AlertTriangle className="w-4 h-4 inline mr-1" />}
                        {step.lostRate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 用户行为分析 Tab */}
      {activeTab === 'behavior' && (
        <div className="space-y-6">
          {/* 留存趋势 */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-4">用户活跃与留存趋势</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={retentionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip />
                <Legend />
                <Line key="line-dau" type="monotone" dataKey="dau" stroke="#3b82f6" name="日活" strokeWidth={2} />
                <Line key="line-day1" type="monotone" dataKey="day1" stroke="#10b981" name="次日留存率" strokeWidth={2} />
                <Line key="line-day7" type="monotone" dataKey="day7" stroke="#8b5cf6" name="7日留存率" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 页面排行 */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-4">页面访问排行 TOP 8</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pageRankData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="page" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip />
                <Legend />
                <Bar key="bar-pv" dataKey="pv" fill="#3b82f6" name="PV" />
                <Bar key="bar-uv" dataKey="uv" fill="#10b981" name="UV" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 用户分布饼图 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-4 text-center">用户来源分布</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-4 text-center">设备绑定占比</h3>
              <ResponsiveContainer width="100%" height={200}>
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

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-4 text-center">代餐购买占比</h3>
              <ResponsiveContainer width="100%" height={200}>
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
      )}

      {/* 异常监控 Tab */}
      {activeTab === 'error' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>全部异常类型</option>
                <option>埋点上报异常</option>
                <option>页面加载失败</option>
                <option>设备同步失败</option>
                <option>支付失败</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4" />
              导出异常日志
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">异常时间</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">页面路径</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">错误类型</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">发生次数</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">异常率</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {errorData.map((error) => (
                    <tr key={error.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{error.time}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono text-xs">{error.page}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {error.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right">{error.count}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right">{error.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}