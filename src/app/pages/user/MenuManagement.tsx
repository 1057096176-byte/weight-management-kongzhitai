import { Plus, Edit, Power, Trash2 } from 'lucide-react';
import { Fragment } from 'react';

const menuData = [
  {
    id: 1,
    name: '首页',
    icon: '📊',
    path: '/',
    type: '页面',
    sort: 1,
    enabled: true,
    children: [],
  },
  {
    id: 2,
    name: '数据埋点',
    icon: '📈',
    path: '/data',
    type: '目录',
    sort: 2,
    enabled: true,
    children: [
      { id: 21, name: '数据概览', path: '/data/overview', type: '页面', sort: 1, enabled: true },
      { id: 22, name: '数据分析', path: '/data/analysis', type: '页面', sort: 2, enabled: true },
    ],
  },
  {
    id: 3,
    name: '代餐服务',
    icon: '🍱',
    path: '/meal',
    type: '目录',
    sort: 3,
    enabled: true,
    children: [
      { id: 31, name: '服务包维护', path: '/meal/service-package', type: '页面', sort: 1, enabled: true },
      { id: 32, name: '价格维护', path: '/meal/price', type: '页面', sort: 2, enabled: true },
    ],
  },
  {
    id: 4,
    name: '订单管理',
    icon: '🛒',
    path: '/order',
    type: '目录',
    sort: 4,
    enabled: true,
    children: [
      { id: 41, name: '订单记录', path: '/order/records', type: '页面', sort: 1, enabled: true },
      { id: 42, name: '发货记录', path: '/order/shipping', type: '页面', sort: 2, enabled: true },
    ],
  },
];

export default function MenuManagement() {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-gray-900">菜单管理</h1>
          <p className="text-sm text-gray-500 mt-1">配置控制台菜单结构和显示顺序</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          新增菜单
        </button>
      </div>

      {/* 提示信息 */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <p className="text-sm text-orange-800">
          ⚠️ 仅超级管理员可访问此页面。删除菜单前系统将检查是否有角色绑定，如有将提示确认并说明影响范围。
        </p>
      </div>

      {/* 菜单树列表 */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">菜单名称</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">菜单图标</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">路由路径</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">菜单类型</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">排序</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">状态</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {menuData.map((menu) => (
                <Fragment key={menu.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{menu.name}</td>
                    <td className="px-6 py-4 text-lg">{menu.icon}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">{menu.path}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        menu.type === '目录' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {menu.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-right">{menu.sort}</td>
                    <td className="px-6 py-4">
                      {menu.enabled ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          启用
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          禁用
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-gray-600 hover:text-blue-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-600 hover:text-green-600 transition-colors">
                          <Power className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-600 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {menu.children && menu.children.map((child: any) => (
                    <tr key={child.id} className="bg-gray-50 hover:bg-gray-100">
                      <td className="px-6 py-4 text-sm text-gray-900 pl-12">└─ {child.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">-</td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono">{child.path}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {child.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right">{child.sort}</td>
                      <td className="px-6 py-4">
                        {child.enabled ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            启用
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            禁用
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-gray-600 hover:text-blue-600 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-600 hover:text-green-600 transition-colors">
                            <Power className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-600 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 说明文档 */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-medium text-gray-900 mb-3">菜单类型说明</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <span className="font-medium text-purple-600">目录：</span>
            <span>无路由，仅作分组，不可直接访问</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium text-blue-600">页面：</span>
            <span>有实际路由，点击跳转对应页面</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium text-green-600">按钮：</span>
            <span>操作级权限节点，用于角色管理中细粒度权限控制（不在菜单栏显示）</span>
          </div>
        </div>
      </div>
    </div>
  );
}