import { TrendingUp, Users, Activity, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router';

const metrics = [
  { id: 'section-1', category: '用户活跃', items: [
    { id: 'metric-1-1', label: 'DAU', value: '8,542', change: '+9.7%', trend: 'up' },
    { id: 'metric-1-2', label: 'MAU', value: '45,230', change: '+12.3%', trend: 'up' },
    { id: 'metric-1-3', label: '次日留存率', value: '68.5%', change: '+2.1%', trend: 'up' },
    { id: 'metric-1-4', label: '7日留存率', value: '42.8%', change: '+1.5%', trend: 'up' },
  ]},
  { id: 'section-2', category: '核心流程', items: [
    { id: 'metric-2-1', label: '导诊完成率', value: '78.5%', change: '+3.2%', trend: 'up' },
    { id: 'metric-2-2', label: '方案开启率', value: '65.3%', change: '-1.8%', trend: 'down' },
    { id: 'metric-2-3', label: '打卡完成率', value: '52.6%', change: '+4.5%', trend: 'up' },
  ]},
  { id: 'section-3', category: '业务转化', items: [
    { id: 'metric-3-1', label: '代餐套餐购买转化率', value: '23.8%', change: '+2.1%', trend: 'up' },
    { id: 'metric-3-2', label: '设备绑定率', value: '35.2%', change: '+5.6%', trend: 'up' },
  ]},
  { id: 'section-4', category: '异常监控', items: [
    { id: 'metric-4-1', label: '页面加载失败次数', value: '12', change: '-25.0%', trend: 'down' },
    { id: 'metric-4-2', label: '埋点上报异常次数', value: '8', change: '-33.3%', trend: 'down' },
    { id: 'metric-4-3', label: '支付失败次数', value: '15', change: '-12.5%', trend: 'down' },
  ]},
];

const funnels = [
  { id: 'funnel-1', name: '导诊流程漏斗', rate: '78.5%', color: 'blue' },
  { id: 'funnel-2', name: '设备绑定漏斗', rate: '85.3%', color: 'green' },
  { id: 'funnel-3', name: '代餐转化漏斗', rate: '23.8%', color: 'purple' },
  { id: 'funnel-4', name: '打卡流程漏斗', rate: '52.6%', color: 'orange' },
];

const activeData = [
  { date: '02/16', dau: 7200, mau: 42000 },
  { date: '02/23', dau: 7500, mau: 42500 },
  { date: '03/02', dau: 7800, mau: 43200 },
  { date: '03/09', dau: 8100, mau: 44100 },
  { date: '03/16', dau: 8542, mau: 45230 },
];

export default function DataOverview() {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="font-semibold text-gray-900">数据概览</h1>
        <p className="text-sm text-gray-500 mt-1">快速查看核心埋点数据和业务转化指标</p>
      </div>

      {/* 时间维度切换 */}
      <div className="flex items-center gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">今日</button>
        <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">昨日</button>
        <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">近7日</button>
        <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">近30日</button>
      </div>

      {/* 指标汇总卡片区 */}
      {metrics.map((section) => (
        <div key={section.id}>
          <h2 className="font-medium text-gray-900 mb-4">{section.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {section.items.map((metric) => (
              <div key={metric.id} className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm text-gray-600">{metric.label}</span>
                  {section.category === '异常监控' && (
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                  )}
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">{metric.value}</div>
                    <div className={`flex items-center gap-1 text-sm ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendingUp className="w-4 h-4" />
                      <span>{metric.change}</span>
                    </div>
                  </div>
                  {section.category === '用户活跃' && <Users className="w-8 h-8 text-purple-200" />}
                  {section.category === '核心流程' && <Activity className="w-8 h-8 text-blue-200" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* 核心漏斗简览区 */}
      <div>
        <h2 className="font-medium text-gray-900 mb-4">核心漏斗转化</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {funnels.map((funnel) => (
            <Link
              key={funnel.id}
              to="/data/analysis"
              className="bg-white rounded-xl p-5 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="text-sm text-gray-600 mb-2">{funnel.name}</div>
              <div className={`font-semibold mb-3 ${
                funnel.color === 'blue' ? 'text-blue-600' :
                funnel.color === 'green' ? 'text-green-600' :
                funnel.color === 'purple' ? 'text-purple-600' :
                'text-orange-600'
              }`}>
                {funnel.rate}
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
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
              <div className="text-xs text-gray-400 mt-2 group-hover:text-blue-600">点击查看详情 →</div>
            </Link>
          ))}
        </div>
      </div>

      {/* 活跃趋势图 */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-medium text-gray-900">用户活跃趋势</h2>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">日</button>
            <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg">周</button>
            <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">月</button>
            <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg ml-2">导出数据</button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={activeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip />
            <Legend />
            <Line key="line-dau" type="monotone" dataKey="dau" stroke="#8b5cf6" name="DAU" strokeWidth={2} />
            <Line key="line-mau" type="monotone" dataKey="mau" stroke="#3b82f6" name="MAU" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}