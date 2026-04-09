import { useState } from 'react';
import { Download, X } from 'lucide-react';

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
  const [selectedLog, setSelectedLog] = useState<(typeof logsData)[number] | null>(null);

  return (
    <div className="space-y-6 rounded-[30px] border border-slate-200/80 bg-slate-50/90 p-5 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-semibold text-gray-900">操作日志</h1>
          <p className="mt-1 text-sm text-gray-500">查询所有后台操作记录，全程留痕可追溯</p>
        </div>
        <button className="flex h-9 items-center gap-2 rounded bg-[#526FEA] px-4 text-sm font-normal text-white transition-colors hover:bg-[#425ED8]">
          <Download className="h-4 w-4" />
          导出日志
        </button>
      </div>

      <div className="rounded-lg bg-white px-5 py-5">
        <div className="flex flex-wrap items-center gap-4 xl:flex-nowrap">
          <select className="h-9 min-w-[180px] flex-1 rounded border border-[#DEE0E3] bg-white px-3 text-sm font-normal leading-6 text-[#172C50] focus:outline-none">
            <option>全部操作人员</option>
            <option>张三</option>
            <option>李四</option>
            <option>王五</option>
            <option>赵六</option>
          </select>
          <select className="h-9 min-w-[180px] flex-1 rounded border border-[#DEE0E3] bg-white px-3 text-sm font-normal leading-6 text-[#172C50] focus:outline-none">
            <option>全部模块</option>
            <option>首页</option>
            <option>数据埋点</option>
            <option>代餐服务</option>
            <option>订单管理</option>
            <option>用户管理</option>
            <option>系统设置</option>
          </select>
          <select className="h-9 min-w-[180px] flex-1 rounded border border-[#DEE0E3] bg-white px-3 text-sm font-normal leading-6 text-[#172C50] focus:outline-none">
            <option>全部操作类型</option>
            <option>新增</option>
            <option>编辑</option>
            <option>删除</option>
            <option>发货</option>
            <option>审核</option>
            <option>登录</option>
            <option>导出</option>
          </select>
          <select className="h-9 min-w-[180px] flex-1 rounded border border-[#DEE0E3] bg-white px-3 text-sm font-normal leading-6 text-[#172C50] focus:outline-none">
            <option>全部结果</option>
            <option>成功</option>
            <option>失败</option>
          </select>
          <select className="h-9 min-w-[180px] flex-1 rounded border border-[#DEE0E3] bg-white px-3 text-sm font-normal leading-6 text-[#172C50] focus:outline-none">
            <option>今日</option>
            <option>近7日</option>
            <option>近30日</option>
            <option>自定义</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="overflow-x-auto rounded-lg border border-[#F0F0F0]">
          <table className="w-full min-w-[1280px] border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#FAFBFC]">
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">操作时间</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">操作人员</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">所属角色</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">操作IP</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">操作模块</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">操作页面</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">操作内容</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">结果</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">详情</th>
              </tr>
            </thead>
            <tbody>
              {logsData.map((log, index) => (
                <tr key={log.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FCFDFE]'}>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm text-[#172C50]">{log.time}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm font-medium text-[#172C50]">{log.operator}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      {log.role}
                    </span>
                  </td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 font-mono text-sm text-[#54585F]">{log.ip}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm text-[#172C50]">{log.module}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm text-[#54585F]">{log.page}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm text-[#172C50]">{log.action}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        log.result === '成功' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {log.result}
                    </span>
                  </td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    <button
                      onClick={() => setSelectedLog(log)}
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

      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="font-semibold text-gray-900">操作详情</h2>
                <p className="mt-1 text-xs text-gray-500">查看完整操作上下文与参数信息</p>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-3 text-sm font-medium text-[#172C50]">操作信息</div>
                  <div className="space-y-2 text-sm text-[#54585F]">
                    <div className="flex items-center justify-between">
                      <span>操作时间</span>
                      <span>{selectedLog.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>操作人员</span>
                      <span>{selectedLog.operator}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>所属角色</span>
                      <span>{selectedLog.role}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>操作结果</span>
                      <span>{selectedLog.result}</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-3 text-sm font-medium text-[#172C50]">访问上下文</div>
                  <div className="space-y-2 text-sm text-[#54585F]">
                    <div className="flex items-center justify-between">
                      <span>操作IP</span>
                      <span className="font-mono">{selectedLog.ip}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>操作模块</span>
                      <span>{selectedLog.module}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>操作页面</span>
                      <span>{selectedLog.page}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <div className="mb-3 text-sm font-medium text-[#172C50]">操作内容</div>
                <p className="text-sm text-[#54585F]">{selectedLog.action}</p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-[#0F172A] p-4">
                <div className="mb-3 text-sm font-medium text-white">操作参数（JSON）</div>
                <pre className="overflow-x-auto text-xs leading-6 text-slate-200">{JSON.stringify({
                  id: selectedLog.id,
                  operator: selectedLog.operator,
                  role: selectedLog.role,
                  ip: selectedLog.ip,
                  module: selectedLog.module,
                  page: selectedLog.page,
                  action: selectedLog.action,
                  result: selectedLog.result,
                  time: selectedLog.time,
                }, null, 2)}</pre>
              </div>
            </div>

            <div className="flex justify-end border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                onClick={() => setSelectedLog(null)}
                className="rounded-lg bg-[#526FEA] px-4 py-2 text-sm text-white transition-colors hover:bg-[#425ED8]"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h3 className="mb-2 font-medium text-blue-900">日志说明</h3>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• 所有后台操作行为全程留痕，精确到秒</li>
          <li>• 点击详情可查看完整操作参数（JSON格式）</li>
          <li>• 记录操作前后数据变化，用于精确还原操作行为</li>
          <li>• 支持导出为Excel，用于后台安全审计和问题排查</li>
        </ul>
      </div>
    </div>
  );
}
