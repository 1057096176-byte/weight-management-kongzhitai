import {
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  AlertTriangle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 模拟数据
const metricsData = [
  // 代餐业务 - 暂时隐藏，代码保留
  // { id: 'metric-1', label: '今日订单数', value: '328', change: '+12.5%', trend: 'up', type: '代餐业务' },
  // { id: 'metric-2', label: '待发货订单数', value: '45', change: '-8.2%', trend: 'down', type: '代餐业务', alert: true },
  // { id: 'metric-3', label: '今日销售额', value: '¥52,360', change: '+15.3%', trend: 'up', type: '代餐业务' },
  // { id: 'metric-4', label: '平均客单价', value: '¥159.6', change: '+2.5%', trend: 'up', type: '代餐业务' },
  { id: 'metric-5', label: '今日新增绑定数', value: '156', change: '+18.6%', trend: 'up', type: '设备业务' },
  { id: 'metric-6', label: '设备绑定总量', value: '12,845', change: '+5.2%', trend: 'up', type: '设备业务' },
  { id: 'metric-7', label: '数据同步成功率', value: '97.8%', change: '+0.5%', trend: 'up', type: '设备业务' },
  { id: 'metric-8', label: '异常绑定数', value: '23', change: '-12.3%', trend: 'down', type: '设备业务', alert: true },
  { id: 'metric-9', label: '今日DAU', value: '8,542', change: '+9.7%', trend: 'up', type: '用户活跃' },
  { id: 'metric-10', label: '导诊完成率', value: '78.5%', change: '+3.2%', trend: 'up', type: '用户活跃' },
  { id: 'metric-11', label: '方案开启率', value: '65.3%', change: '-1.8%', trend: 'down', type: '用户活跃' },
  { id: 'metric-12', label: '核心流程流失率', value: '34.7%', change: '+1.8%', trend: 'up', type: '用户活跃', alert: true },
];

const chartData = [
  { date: '03/11', devices: 120, users: 7200 },
  { date: '03/12', devices: 135, users: 7500 },
  { date: '03/13', devices: 142, users: 7800 },
  { date: '03/14', devices: 158, users: 8100 },
  { date: '03/15', devices: 148, users: 7900 },
  { date: '03/16', devices: 165, users: 8300 },
  { date: '03/17', devices: 156, users: 8542 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="font-semibold text-gray-900">控制台首页</h1>
        <p className="text-sm text-gray-500 mt-1">欢迎回来，快速查看平台运营状态</p>
      </div>

      {/* 核心指标卡片区 */}
      <div>
        <h2 className="font-medium text-gray-900 mb-4">核心业务指标</h2>

        {/* 代餐业务 - 暂时隐藏，代码保留 */}
        {/* <div className="mb-6">
          <h3 className="text-sm text-gray-600 mb-3">代餐业务</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {metricsData.filter((metric) => metric.type === '代餐业务').map((metric) => (
              <div
                key={metric.id}
                className={`bg-white rounded-xl p-5 border-2 transition-all hover:shadow-md ${
                  metric.alert ? 'border-red-200 bg-red-50' : 'border-gray-100'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    {metric.label}
                    {metric.alert && <AlertTriangle className="w-4 h-4 text-red-500" />}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">{metric.value}</div>
                    <div className={`flex items-center gap-1 text-sm ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span>{metric.change}</span>
                    </div>
                  </div>
                  <ShoppingCart className="w-8 h-8 text-blue-200" />
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* 设备业务 */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-600 mb-3">设备业务</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {metricsData.filter((metric) => metric.type === '设备业务').map((metric) => (
              <div
                key={metric.id}
                className={`bg-white rounded-xl p-5 border-2 transition-all hover:shadow-md ${
                  metric.alert ? 'border-red-200 bg-red-50' : 'border-gray-100'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    {metric.label}
                    {metric.alert && <AlertTriangle className="w-4 h-4 text-red-500" />}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">{metric.value}</div>
                    <div className={`flex items-center gap-1 text-sm ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span>{metric.change}</span>
                    </div>
                  </div>
                  <Activity className="w-8 h-8 text-green-200" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 用户活跃 */}
        <div>
          <h3 className="text-sm text-gray-600 mb-3">用户活跃</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {metricsData.filter((metric) => metric.type === '用户活跃').map((metric) => (
              <div
                key={metric.id}
                className={`bg-white rounded-xl p-5 border-2 transition-all hover:shadow-md ${
                  metric.alert ? 'border-red-200 bg-red-50' : 'border-gray-100'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    {metric.label}
                    {metric.alert && <AlertTriangle className="w-4 h-4 text-red-500" />}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">{metric.value}</div>
                    <div className={`flex items-center gap-1 text-sm ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span>{metric.change}</span>
                    </div>
                  </div>
                  <Users className="w-8 h-8 text-purple-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 趋势折线图区 */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-medium text-gray-900">近7日业务趋势</h2>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg">近7日</button>
            <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">近30日</button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip />
            <Legend />
            {/* 订单量 - 暂时隐藏，代码保留 */}
            {/* <Line key="line-orders" type="monotone" dataKey="orders" stroke="#3b82f6" name="订单量" strokeWidth={2} /> */}
            <Line key="line-devices" type="monotone" dataKey="devices" stroke="#10b981" name="设备绑定量" strokeWidth={2} />
            <Line key="line-users" type="monotone" dataKey="users" stroke="#8b5cf6" name="用户活跃量" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
