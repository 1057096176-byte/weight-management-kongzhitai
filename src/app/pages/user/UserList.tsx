import { useState } from 'react';
import { Search, UserCircle } from 'lucide-react';

const usersData = [
  {
    id: 'U***8765',
    nickname: '张**',
    registerTime: '2026-02-15 10:30',
    lastLogin: '2026-03-17 09:25',
    completedQuestionnaire: true,
    boundDevice: true,
    purchased: true,
    riskLevel: '绿灯',
  },
  {
    id: 'U***3421',
    nickname: '李**',
    registerTime: '2026-02-20 14:15',
    lastLogin: '2026-03-17 08:45',
    completedQuestionnaire: true,
    boundDevice: false,
    purchased: true,
    riskLevel: '黄灯',
  },
  {
    id: 'U***5678',
    nickname: '王**',
    registerTime: '2026-03-01 09:20',
    lastLogin: '2026-03-16 20:30',
    completedQuestionnaire: true,
    boundDevice: true,
    purchased: false,
    riskLevel: '绿灯',
  },
  {
    id: 'U***9012',
    nickname: '赵**',
    registerTime: '2026-03-10 11:45',
    lastLogin: '2026-03-17 07:15',
    completedQuestionnaire: false,
    boundDevice: false,
    purchased: false,
    riskLevel: '-',
  },
];

export default function UserList() {
  const [activeTab, setActiveTab] = useState<'basic' | 'health' | 'orders' | 'devices' | 'behavior'>('basic');

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="font-semibold text-gray-900">用户列表</h1>
        <p className="text-sm text-gray-500 mt-1">查询和管理小程序端用户信息（数据已脱敏）</p>
      </div>

      {/* 筛选区 */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="用户昵称 / 用户ID"
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>全部用户</option>
            <option>已完成导诊</option>
            <option>未完成导诊</option>
          </select>
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>全部用户</option>
            <option>已绑定设备</option>
            <option>未绑定设备</option>
          </select>
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>全部用户</option>
            <option>已购买代餐</option>
            <option>未购买代餐</option>
          </select>
        </div>
      </div>

      {/* 用户列表 */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">用户ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">用户昵称</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">注册时间</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">最近登录</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">完成导诊</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">绑定设备</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">购买代餐</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">风险等级</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {usersData.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">{user.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <UserCircle className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-900">{user.nickname}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.registerTime}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.lastLogin}</td>
                  <td className="px-6 py-4">
                    {user.completedQuestionnaire ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        是
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        否
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.boundDevice ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        是
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        否
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.purchased ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        是
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        否
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.riskLevel !== '-' ? (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.riskLevel === '绿灯' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.riskLevel}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors">
                      查看详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
