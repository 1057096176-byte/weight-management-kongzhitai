import { Download, Search, Eye } from 'lucide-react';

const logsData = [
  {
    id: 1,
    time: '2026-03-17 14:23:15',
    operator: '张三',
    role: '运营人员',
    ip: '192.168.1.100',
    module: '代餐服务',
    page: '价格维护',
    action: '修改套餐价格：原价 199 → 159',
    result: '成功',
  },
  {
    id: 2,
    time: '2026-03-17 13:45:32',
    operator: '李四',
    role: '客服人员',
    ip: '192.168.1.105',
    module: '订单管理',
    page: '订单记录',
    action: '订单发货：ORD20260317001',
    result: '成功',
  },
  {
    id: 3,
    time: '2026-03-17 12:18:42',
    operator: '王五',
    role: '超级管理员',
    ip: '192.168.1.88',
    module: '用户管理',
    page: '角色管理',
    action: '新增角色：区域管理员',
    result: '成功',
  },
  {
    id: 4,
    time: '2026-03-17 11:05:28',
    operator: '赵六',
    role: '运营人员',
    ip: '192.168.1.120',
    module: '代餐服务',
    page: '服务包维护',
    action: '提交审核：健康体重管理套餐',
    result: '成功',
  },
  {
    id: 5,
    time: '2026-03-17 10:30:15',
    operator: '张三',
    role: '运营人员',
    ip: '192.168.1.100',
    module: '系统设置',
    page: '操作日志',
    action: '导出日志数据',
    result: '成功',
  },
  {
    id: 6,
    time: '2026-03-17 09:15:42',
    operator: '李四',
    role: '客服人员',
    ip: '192.168.1.105',
    module: '订单管理',
    page: '订单记录',
    action: '处理售后：同意退款 ORD20260316008',
    result: '成功',
  },
];

export default function OperationLog() {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-gray-900">操作日志</h1>
          <p className="text-sm text-gray-500 mt-1">查询所有后台操作记录，全程留痕可追溯</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4" />
          导出日志
        </button>
      </div>

      {/* 筛选区 */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>全部操作人员</option>
            <option>张三</option>
            <option>李四</option>
            <option>王五</option>
            <option>赵六</option>
          </select>
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>全部模块</option>
            <option>首页</option>
            <option>数据埋点</option>
            <option>代餐服务</option>
            <option>订单管理</option>
            <option>用户管理</option>
            <option>系统设置</option>
          </select>
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>全部操作类型</option>
            <option>新增</option>
            <option>编辑</option>
            <option>删除</option>
            <option>发货</option>
            <option>审核</option>
            <option>登录</option>
            <option>导出</option>
          </select>
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>全部结果</option>
            <option>成功</option>
            <option>失败</option>
          </select>
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>今日</option>
            <option>近7日</option>
            <option>近30日</option>
            <option>自定义</option>
          </select>
        </div>
      </div>

      {/* 日志列表 */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">操作时间</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">操作人员</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">所属角色</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">操作IP</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">操作模块</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">操作页面</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">操作内容</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">结果</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">详情</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {logsData.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{log.time}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{log.operator}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {log.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">{log.ip}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{log.module}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{log.page}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{log.action}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      log.result === '成功' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {log.result}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1 text-gray-600 hover:text-blue-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 说明 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">日志说明</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 所有后台操作行为全程留痕，精确到秒</li>
          <li>• 点击详情可查看完整操作参数（JSON格式）</li>
          <li>• 记录操作前后数据变化，用于精确还原操作行为</li>
          <li>• 支持导出为Excel，用于后台安全审计和问题排查</li>
        </ul>
      </div>
    </div>
  );
}
