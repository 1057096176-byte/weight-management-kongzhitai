import { useState } from 'react';
import { Truck, Package, AlertTriangle, X } from 'lucide-react';

const shippingData = [
  {
    id: 'SHP001',
    orderNo: 'ORD20260317001',
    userName: '张**',
    packageName: '轻盈周包',
    logistics: '顺丰速运',
    trackingNo: 'SF1234567890',
    shippingTime: '2026-03-17 11:30:25',
    operator: '李四',
    status: '运输中',
    timeline: [
      { id: 1, time: '2026-03-17 18:20', content: '快件已到达华南转运中心，正在分拣', current: true },
      { id: 2, time: '2026-03-17 14:10', content: '快件已从深圳南山网点发出', current: false },
      { id: 3, time: '2026-03-17 11:35', content: '商家已通知快递揽收', current: false },
    ],
  },
  {
    id: 'SHP002',
    orderNo: 'ORD20260316015',
    userName: '王**',
    packageName: '定制营养包',
    logistics: '中通快递',
    trackingNo: 'ZTO9876543210',
    shippingTime: '2026-03-16 15:20:18',
    operator: '张三',
    status: '已签收',
    timeline: [
      { id: 1, time: '2026-03-18 09:15', content: '快件已签收，签收人：本人', current: true },
      { id: 2, time: '2026-03-17 13:48', content: '快件正在派送途中，请保持电话畅通', current: false },
      { id: 3, time: '2026-03-16 19:26', content: '快件已到达上海浦东分拨中心', current: false },
      { id: 4, time: '2026-03-16 15:28', content: '商家已通知快递揽收', current: false },
    ],
  },
  {
    id: 'SHP003',
    orderNo: 'ORD20260316008',
    userName: '赵**',
    packageName: '轻盈周包',
    logistics: '申通快递',
    trackingNo: 'STO1122334455',
    shippingTime: '2026-03-16 12:45:33',
    operator: '王五',
    status: '运输中',
    timeline: [
      { id: 1, time: '2026-03-17 16:05', content: '快件离开杭州转运中心，发往目的地网点', current: true },
      { id: 2, time: '2026-03-17 08:40', content: '快件已到达杭州转运中心', current: false },
      { id: 3, time: '2026-03-16 18:12', content: '快件已从嘉兴网点发出', current: false },
      { id: 4, time: '2026-03-16 12:52', content: '商家已通知快递揽收', current: false },
    ],
  },
];

const summaryData = {
  todayShipped: 45,
  monthShipped: 328,
  overdueCount: 3,
};

export default function ShippingRecords() {
  const [trackingRecord, setTrackingRecord] = useState<(typeof shippingData)[number] | null>(null);
  const [detailRecord, setDetailRecord] = useState<(typeof shippingData)[number] | null>(null);

  return (
    <div className="space-y-6 rounded-[30px] border border-slate-200/80 bg-slate-50/90 p-5 md:p-6">
      <div>
        <h1 className="font-semibold text-gray-900">发货记录</h1>
        <p className="mt-1 text-sm text-gray-500">查看发货操作记录和物流状态</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-gray-600">今日发货量</span>
            <Package className="h-8 w-8 text-blue-200" />
          </div>
          <div className="font-semibold text-gray-900">{summaryData.todayShipped} 件</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-gray-600">本月发货量</span>
            <Truck className="h-8 w-8 text-green-200" />
          </div>
          <div className="font-semibold text-gray-900">{summaryData.monthShipped} 件</div>
        </div>
        <div className="rounded-xl border-2 border-orange-200 bg-orange-50 p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-gray-600">超时未签收</span>
            <AlertTriangle className="h-8 w-8 text-orange-400" />
          </div>
          <div className="font-semibold text-orange-600">{summaryData.overdueCount} 件</div>
        </div>
      </div>

      <div className="rounded-lg bg-white px-5 py-5">
        <div className="flex flex-wrap items-center gap-4 xl:flex-nowrap">
          <select className="h-9 min-w-[220px] flex-1 rounded border border-[#DEE0E3] bg-white px-3 text-sm font-normal leading-6 text-[#172C50] focus:outline-none">
            <option>全部快递公司</option>
            <option>顺丰速运</option>
            <option>中通快递</option>
            <option>申通快递</option>
            <option>圆通速递</option>
          </select>
          <input
            type="text"
            placeholder="快递单号"
            className="h-9 min-w-[220px] flex-1 rounded border border-[#DEE0E3] bg-white px-3 text-sm font-normal leading-6 text-[#172C50] placeholder:text-[#9AA4B2] focus:outline-none"
          />
          <select className="h-9 min-w-[220px] flex-1 rounded border border-[#DEE0E3] bg-white px-3 text-sm font-normal leading-6 text-[#172C50] focus:outline-none">
            <option>今日</option>
            <option>近7日</option>
            <option>近30日</option>
            <option>自定义</option>
          </select>
          <select className="h-9 min-w-[220px] flex-1 rounded border border-[#DEE0E3] bg-white px-3 text-sm font-normal leading-6 text-[#172C50] focus:outline-none">
            <option>全部状态</option>
            <option>运输中</option>
            <option>已签收</option>
            <option>派送中</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="overflow-x-auto rounded-lg border border-[#F0F0F0]">
          <table className="w-full min-w-[1280px] border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#FAFBFC]">
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">发货记录ID</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">关联订单号</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">用户</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">商品名称</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">快递公司</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">快递单号</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">发货时间</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">发货操作人</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">物流状态</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">操作</th>
              </tr>
            </thead>
            <tbody>
              {shippingData.map((record, index) => (
                <tr key={record.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FCFDFE]'}>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm text-[#172C50]">{record.id}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 font-mono text-sm text-[#172C50]">{record.orderNo}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm text-[#172C50]">{record.userName}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm text-[#54585F]">{record.packageName}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm text-[#172C50]">{record.logistics}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 font-mono text-sm text-[#172C50]">{record.trackingNo}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm text-[#54585F]">{record.shippingTime}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm text-[#54585F]">{record.operator}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        record.status === '已签收' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setTrackingRecord(record)}
                        className="rounded px-3 py-1 text-xs font-medium text-[#3F66FC] transition-colors hover:bg-[#F5F7FF]"
                      >
                        物流轨迹
                      </button>
                      <button
                        onClick={() => setDetailRecord(record)}
                        className="rounded px-3 py-1 text-xs font-medium text-[#54585F] transition-colors hover:bg-[#F5F7FF]"
                      >
                        订单详情
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {trackingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-xl rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="font-semibold text-gray-900">物流轨迹</h2>
                <p className="mt-1 text-xs text-gray-500">{trackingRecord.logistics} · {trackingRecord.trackingNo}</p>
              </div>
              <button
                onClick={() => setTrackingRecord(null)}
                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4 p-6">
              {trackingRecord.timeline.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className={`mt-1 h-2.5 w-2.5 rounded-full ${item.current ? 'bg-[#526FEA]' : 'bg-gray-300'}`}></span>
                    {item.id !== trackingRecord.timeline.length && <span className="mt-2 h-full w-px bg-gray-200"></span>}
                  </div>
                  <div className="pb-5">
                    <div className={`text-sm ${item.current ? 'font-medium text-[#172C50]' : 'text-[#54585F]'}`}>{item.content}</div>
                    <div className="mt-1 text-xs text-[#7C8798]">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                onClick={() => setTrackingRecord(null)}
                className="rounded-lg bg-[#526FEA] px-4 py-2 text-sm text-white transition-colors hover:bg-[#425ED8]"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {detailRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-xl rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="font-semibold text-gray-900">订单详情</h2>
                <p className="mt-1 text-xs text-gray-500">查看发货关联订单与物流摘要</p>
              </div>
              <button
                onClick={() => setDetailRecord(null)}
                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="mb-3 text-sm font-medium text-[#172C50]">基础信息</div>
                <div className="space-y-2 text-sm text-[#54585F]">
                  <div className="flex items-center justify-between">
                    <span>订单号</span>
                    <span className="font-mono text-[#172C50]">{detailRecord.orderNo}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>用户</span>
                    <span>{detailRecord.userName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>商品</span>
                    <span>{detailRecord.packageName}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="mb-3 text-sm font-medium text-[#172C50]">发货信息</div>
                <div className="space-y-2 text-sm text-[#54585F]">
                  <div className="flex items-center justify-between">
                    <span>快递公司</span>
                    <span>{detailRecord.logistics}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>快递单号</span>
                    <span className="font-mono text-[#172C50]">{detailRecord.trackingNo}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>物流状态</span>
                    <span>{detailRecord.status}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>发货时间</span>
                    <span>{detailRecord.shippingTime}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                onClick={() => setDetailRecord(null)}
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
