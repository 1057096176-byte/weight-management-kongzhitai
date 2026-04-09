import { useState } from 'react';
import { Search, UserCircle, X } from 'lucide-react';

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
  const [selectedUser, setSelectedUser] = useState<(typeof usersData)[number] | null>(null);

  return (
    <div className="space-y-6 rounded-[30px] border border-slate-200/80 bg-slate-50/90 p-5 md:p-6">
      <div>
        <h1 className="font-semibold text-gray-900">用户列表</h1>
        <p className="mt-1 text-sm text-gray-500">查询和管理小程序端用户信息（数据已脱敏）</p>
      </div>

      <div className="rounded-lg bg-white px-5 py-5">
        <div className="flex flex-wrap items-center gap-4 xl:flex-nowrap">
          <label className="flex h-9 min-w-[280px] flex-1 items-center rounded border border-[#DEE0E3] bg-white px-3">
            <Search className="mr-3 h-4 w-4 shrink-0 text-[#9AA4B2]" />
            <input
              type="text"
              placeholder="用户昵称 / 用户ID"
              className="w-full bg-transparent text-sm font-normal leading-6 text-[#172C50] placeholder:text-[#9AA4B2] focus:outline-none"
            />
          </label>
          <select className="h-9 min-w-[220px] flex-1 rounded border border-[#DEE0E3] bg-white px-3 text-sm font-normal leading-6 text-[#172C50] focus:outline-none">
            <option>全部用户</option>
            <option>已完成导诊</option>
            <option>未完成导诊</option>
          </select>
          <select className="h-9 min-w-[220px] flex-1 rounded border border-[#DEE0E3] bg-white px-3 text-sm font-normal leading-6 text-[#172C50] focus:outline-none">
            <option>全部用户</option>
            <option>已绑定设备</option>
            <option>未绑定设备</option>
          </select>
          <select className="h-9 min-w-[220px] flex-1 rounded border border-[#DEE0E3] bg-white px-3 text-sm font-normal leading-6 text-[#172C50] focus:outline-none">
            <option>全部用户</option>
            <option>已购买代餐</option>
            <option>未购买代餐</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="overflow-x-auto rounded-lg border border-[#F0F0F0]">
          <table className="w-full min-w-[1120px] border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#FAFBFC]">
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">用户ID</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">用户昵称</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">注册时间</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">最近登录</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">完成导诊</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">绑定设备</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">购买代餐</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">风险等级</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">操作</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user, index) => (
                <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FCFDFE]'}>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 font-mono text-sm text-[#172C50]">{user.id}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    <div className="flex items-center gap-2">
                      <UserCircle className="h-5 w-5 text-[#9AA4B2]" />
                      <span className="text-sm text-[#172C50]">{user.nickname}</span>
                    </div>
                  </td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm text-[#54585F]">{user.registerTime}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm text-[#54585F]">{user.lastLogin}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    {user.completedQuestionnaire ? (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">是</span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">否</span>
                    )}
                  </td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    {user.boundDevice ? (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">是</span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">否</span>
                    )}
                  </td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    {user.purchased ? (
                      <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">是</span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">否</span>
                    )}
                  </td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    {user.riskLevel !== '-' ? (
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.riskLevel === '绿灯' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {user.riskLevel}
                      </span>
                    ) : (
                      <span className="text-sm text-[#9AA4B2]">-</span>
                    )}
                  </td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="rounded px-3 py-1 text-xs font-medium text-[#3F66FC] transition-colors hover:bg-[#F5F7FF]"
                    >
                      查看详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-xl rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="font-semibold text-gray-900">用户详情</h2>
                <p className="mt-1 text-xs text-gray-500">查看用户基础信息和业务状态</p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 p-6">
              <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-4">
                <UserCircle className="h-10 w-10 text-[#9AA4B2]" />
                <div>
                  <div className="text-base font-medium text-[#172C50]">{selectedUser.nickname}</div>
                  <div className="text-sm text-[#7C8798]">用户ID：{selectedUser.id}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="text-xs text-gray-500">注册时间</div>
                  <div className="mt-1 text-sm text-[#172C50]">{selectedUser.registerTime}</div>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="text-xs text-gray-500">最近登录</div>
                  <div className="mt-1 text-sm text-[#172C50]">{selectedUser.lastLogin}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-3 text-sm font-medium text-[#172C50]">业务状态</div>
                  <div className="space-y-3 text-sm text-[#54585F]">
                    <div className="flex items-center justify-between">
                      <span>完成导诊</span>
                      <span>{selectedUser.completedQuestionnaire ? '是' : '否'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>绑定设备</span>
                      <span>{selectedUser.boundDevice ? '是' : '否'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>购买代餐</span>
                      <span>{selectedUser.purchased ? '是' : '否'}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-3 text-sm font-medium text-[#172C50]">风险标签</div>
                  {selectedUser.riskLevel !== '-' ? (
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                        selectedUser.riskLevel === '绿灯' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {selectedUser.riskLevel}
                    </span>
                  ) : (
                    <span className="text-sm text-[#9AA4B2]">暂未生成风险等级</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                onClick={() => setSelectedUser(null)}
                className="rounded-lg bg-[#526FEA] px-4 py-2 text-sm text-white transition-colors hover:bg-[#425ED8]"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
