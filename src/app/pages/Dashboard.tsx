import {
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  MousePointerClick,
  AlertTriangle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const metricsData = [
  { id: 'metric-1', label: '今日日活', value: '1,286', change: '+11.3%', trend: 'up', type: '用户活跃' },
  { id: 'metric-2', label: '月活用户', value: '8,740', change: '+15.6%', trend: 'up', type: '用户活跃' },
  { id: 'metric-3', label: '次日留存率', value: '62.4%', change: '+3.8%', trend: 'up', type: '用户活跃' },
  { id: 'metric-4', label: '7日留存率', value: '38.2%', change: '-1.2%', trend: 'down', type: '用户活跃', alert: true },
  { id: 'metric-5', label: '授权完成率', value: '89.3%', change: '+2.1%', trend: 'up', type: '核心流程' },
  { id: 'metric-6', label: '模块进入率', value: '74.6%', change: '+5.4%', trend: 'up', type: '核心流程' },
  { id: 'metric-7', label: '对话完成率', value: '68.1%', change: '+3.7%', trend: 'up', type: '核心流程' },
  { id: 'metric-8', label: '对话流失率', value: '31.9%', change: '-3.7%', trend: 'down', type: '核心流程', alert: true },
  { id: 'metric-9', label: '有问必答点击率', value: '42.5%', change: '+6.3%', trend: 'up', type: '模块热度' },
  { id: 'metric-10', label: '健康评估点击率', value: '28.7%', change: '+2.8%', trend: 'up', type: '模块热度' },
  { id: 'metric-11', label: '预约挂号点击率', value: '18.4%', change: '-0.9%', trend: 'down', type: '模块热度' },
  { id: 'metric-12', label: '减重预测点击率', value: '10.4%', change: '+1.2%', trend: 'up', type: '模块热度' },
  { id: 'metric-13', label: '健康管理服务包点击率', value: '8.0%', change: '+0.6%', trend: 'up', type: '模块热度' },
];

const chartData = [
  { date: '04/22', dau: 1050, auth: 1320, chat: 720 },
  { date: '04/23', dau: 1120, auth: 1400, chat: 780 },
  { date: '04/24', dau: 1180, auth: 1480, chat: 830 },
  { date: '04/25', dau: 1095, auth: 1360, chat: 760 },
  { date: '04/26', dau: 1230, auth: 1540, chat: 870 },
  { date: '04/27', dau: 1210, auth: 1510, chat: 850 },
  { date: '04/28', dau: 1286, auth: 1600, chat: 910 },
];

const typeIconMap = {
  '用户活跃': { icon: Users, className: 'text-purple-200' },
  '核心流程': { icon: Activity, className: 'text-sky-200' },
  '模块热度': { icon: MousePointerClick, className: 'text-emerald-200' },
} as const;

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-semibold text-gray-900">控制台首页</h1>
        <p className="text-sm text-gray-500 mt-1">欢迎回来，快速查看平台运营状态</p>
      </div>

      <div>
        <h2 className="font-medium text-gray-900 mb-4">核心业务指标</h2>

        {(['用户活跃', '核心流程', '模块热度'] as const).map((type) => {
          const typeInfo = typeIconMap[type];
          const TypeIcon = typeInfo.icon;
          return (
            <div key={type} className="mb-6">
              <h3 className="text-sm text-gray-600 mb-3">{type}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {metricsData.filter((m) => m.type === type).map((metric) => (
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
                      <TypeIcon className={`w-8 h-8 ${typeInfo.className}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

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
            <Line key="line-dau" type="monotone" dataKey="dau" stroke="#8b5cf6" name="日活用户" strokeWidth={2} />
            <Line key="line-auth" type="monotone" dataKey="auth" stroke="#3b82f6" name="授权人数" strokeWidth={2} />
            <Line key="line-chat" type="monotone" dataKey="chat" stroke="#10b981" name="对话人数" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
