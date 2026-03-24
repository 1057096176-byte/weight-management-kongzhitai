import { Truck, Package, AlertTriangle } from 'lucide-react';

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
  },
];

const summaryData = {
  todayShipped: 45,
  monthShipped: 328,
  overdueCount: 3,
};

export default function ShippingRecords() {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="font-semibold text-gray-900">发货记录</h1>
        <p className="text-sm text-gray-500 mt-1">查看发货操作记录和物流状态</p>
      </div>

      {/* 发货数据汇总 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">今日发货量</span>
            <Package className="w-8 h-8 text-blue-200" />
          </div>
          <div className="font-semibold text-gray-900">{summaryData.todayShipped} 件</div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">本月发货量</span>
            <Truck className="w-8 h-8 text-green-200" />
          </div>
          <div className="font-semibold text-gray-900">{summaryData.monthShipped} 件</div>
        </div>
        <div className="bg-white rounded-xl p-5 border-2 border-orange-200 bg-orange-50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">超时未签收</span>
            <AlertTriangle className="w-8 h-8 text-orange-400" />
          </div>
          <div className="font-semibold text-orange-600">{summaryData.overdueCount} 件</div>
        </div>
      </div>

      {/* 筛选区 */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>全部快递公司</option>
            <option>顺丰速运</option>
            <option>中通快递</option>
            <option>申通快递</option>
            <option>圆通速递</option>
          </select>
          <input
            type="text"
            placeholder="快递单号"
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>今日</option>
            <option>近7日</option>
            <option>近30日</option>
            <option>自定义</option>
          </select>
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>全部状态</option>
            <option>运输中</option>
            <option>已签收</option>
            <option>派送中</option>
          </select>
        </div>
      </div>

      {/* 发货记录列表 */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">发货记录ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">关联订单号</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">用户</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">商品名称</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">快递公司</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">快递单号</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">发货时间</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">发货操作人</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">物流状态</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {shippingData.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{record.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">{record.orderNo}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.userName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{record.packageName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.logistics}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">{record.trackingNo}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{record.shippingTime}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{record.operator}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      record.status === '已签收' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        物流轨迹
                      </button>
                      <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded transition-colors">
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
    </div>
  );
}
