import { useState } from 'react';
import { Plus, Edit, Shield, X } from 'lucide-react';

const rolesData = [
  {
    id: 1,
    name: '超级管理员',
    description: '拥有全部权限，含审核、账号管理权限',
    userCount: 2,
    isPreset: true,
    createdAt: '2026-01-01',
  },
  {
    id: 2,
    name: '运营人员',
    description: '数据查看 + 代餐服务包维护 + 价格维护 + 订单查询',
    userCount: 5,
    isPreset: true,
    createdAt: '2026-01-01',
  },
  {
    id: 3,
    name: '客服人员',
    description: '订单查询 + 发货操作 + 售后处理 + 用户查询',
    userCount: 8,
    isPreset: true,
    createdAt: '2026-01-01',
  },
  {
    id: 4,
    name: '数据分析师',
    description: '仅数据埋点模块全权限 + 只读其他模块数据',
    userCount: 3,
    isPreset: true,
    createdAt: '2026-01-01',
  },
];

export default function RoleManagement() {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-gray-900">角色管理</h1>
          <p className="text-sm text-gray-500 mt-1">配置角色权限，控制后台访问范围</p>
        </div>
        <button
          onClick={() => setShowDrawer(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          新增角色
        </button>
      </div>

      {/* 角色列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rolesData.map((role) => (
          <div key={role.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  role.isPreset ? 'bg-blue-100' : 'bg-purple-100'
                }`}>
                  <Shield className={`w-6 h-6 ${role.isPreset ? 'text-blue-600' : 'text-purple-600'}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{role.name}</h3>
                    {role.isPreset && (
                      <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">预设</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{role.userCount} 个用户</p>
                </div>
              </div>
              {!role.isPreset && (
                <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-4">{role.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>创建时间：{role.createdAt}</span>
              {role.isPreset && <span className="text-orange-600">不可删除</span>}
            </div>
          </div>
        ))}
      </div>

      {/* 新增/编辑角色抽屉 */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowDrawer(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-2xl bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">新增角色</h2>
              <button
                onClick={() => setShowDrawer(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    角色名称 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="输入角色名称"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">角色描述</label>
                  <textarea
                    rows={3}
                    placeholder="输入角色描述"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">权限配置</label>
                  <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                    {[
                      { id: 'perm-module-1', module: '代餐服务', permissions: [
                        { id: 'perm-1-1', name: '查看' },
                        { id: 'perm-1-2', name: '新增' },
                        { id: 'perm-1-3', name: '编辑' },
                        { id: 'perm-1-4', name: '删除' },
                        { id: 'perm-1-5', name: '审核' },
                      ] },
                      { id: 'perm-module-2', module: '订单管理', permissions: [
                        { id: 'perm-2-1', name: '查看' },
                        { id: 'perm-2-2', name: '发货' },
                        { id: 'perm-2-3', name: '售后' },
                      ] },
                      { id: 'perm-module-3', module: '用户管理', permissions: [
                        { id: 'perm-3-1', name: '查看' },
                        { id: 'perm-3-2', name: '编辑' },
                        { id: 'perm-3-3', name: '删除' },
                      ] },
                      { id: 'perm-module-4', module: '系统设置', permissions: [
                        { id: 'perm-4-1', name: '查看' },
                        { id: 'perm-4-2', name: '编辑' },
                      ] },
                    ].map((item) => (
                      <div key={item.id} className="pb-3 border-b border-gray-100 last:border-b-0">
                        <div className="font-medium text-sm text-gray-900 mb-2">{item.module}</div>
                        <div className="flex flex-wrap gap-2">
                          {item.permissions.map((perm) => (
                            <label key={perm.id} className="flex items-center gap-2">
                              <input type="checkbox" className="rounded border-gray-300" />
                              <span className="text-sm text-gray-700">{perm.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowDrawer(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
              >
                取消
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                保存角色
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}