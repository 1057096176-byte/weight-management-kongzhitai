import { useState } from 'react';
import { Search, Package, X } from 'lucide-react';

const ordersData = [
  {
    orderNo: 'ORD20260317001',
    userId: 'U***8765',
    userName: '张**',
    packageName: '轻盈周包',
    quantity: 1,
    amount: 199,
    address: '广东省深圳市南山区',
    logistics: '顺丰速运',
    trackingNo: 'SF1234567890',
    status: '已发货',
    createTime: '2026-03-17 10:30:25',
  },
  {
    orderNo: 'ORD20260317002',
    userId: 'U***3421',
    userName: '李**',
    packageName: '活力月包',
    quantity: 2,
    amount: 1798,
    address: '北京市朝阳区',
    logistics: '-',
    trackingNo: '-',
    status: '待发货',
    createTime: '2026-03-17 09:15:42',
  },
  {
    orderNo: 'ORD20260316015',
    userId: 'U***5678',
    userName: '王**',
    packageName: '定制营养包',
    quantity: 1,
    amount: 999,
    address: '上海市浦东新区',
    logistics: '中通快递',
    trackingNo: 'ZTO9876543210',
    status: '已完成',
    createTime: '2026-03-16 14:20:18',
  },
  {
    orderNo: 'ORD20260316008',
    userId: 'U***9012',
    userName: '赵**',
    packageName: '轻盈周包',
    quantity: 1,
    amount: 199,
    address: '浙江省杭州市西湖区',
    logistics: '申通快递',
    trackingNo: 'STO1122334455',
    status: '售后中',
    createTime: '2026-03-16 11:45:33',
  },
];

export default function OrderRecords() {
  const [showShippingDrawer, setShowShippingDrawer] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleShipping = (order: any) => {
    setSelectedOrder(order);
    setShowShippingDrawer(true);
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="font-semibold text-gray-900">订单记录</h1>
        <p className="text-sm text-gray-500 mt-1">查询和管理所有代餐订单</p>
      </div>

      {/* 筛选区 */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="订单号 / 用户昵称"
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>全部状态</option>
            <option>待支付</option>
            <option>待发货</option>
            <option>已发货</option>
            <option>已完成</option>
            <option>售后中</option>
            <option>已关闭</option>
          </select>
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>全部套餐</option>
            <option>周包</option>
            <option>月包</option>
            <option>定制包</option>
          </select>
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>今日</option>
            <option>近7日</option>
            <option>近30日</option>
            <option>自定义</option>
          </select>
        </div>
      </div>

      {/* 订单列表 */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">订单号</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">用户信息</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">商品信息</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">实付金额</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">收货地址</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">物流信息</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">订单状态</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">下单时间</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ordersData.map((order) => (
                <tr key={order.orderNo} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">{order.orderNo}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{order.userName}</div>
                    <div className="text-xs text-gray-500">{order.userId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{order.packageName}</div>
                    <div className="text-xs text-gray-500">数量: {order.quantity}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-right font-semibold">¥{order.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.address}</td>
                  <td className="px-6 py-4">
                    {order.logistics !== '-' ? (
                      <div>
                        <div className="text-sm text-gray-900">{order.logistics}</div>
                        <div className="text-xs text-gray-500 font-mono">{order.trackingNo}</div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === '已发货' ? 'bg-blue-100 text-blue-800' :
                      order.status === '待发货' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === '已完成' ? 'bg-green-100 text-green-800' :
                      order.status === '售后中' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.createTime}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {order.status === '待发货' && (
                        <button
                          onClick={() => handleShipping(order)}
                          className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          发货
                        </button>
                      )}
                      <button className="px-3 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        详情
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 发货抽屉 */}
      {showShippingDrawer && selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowShippingDrawer(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">订单发货</h2>
              <button
                onClick={() => setShowShippingDrawer(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="text-sm text-gray-600 mb-2">订单号：{selectedOrder.orderNo}</div>
                <div className="text-sm text-gray-600 mb-2">商品：{selectedOrder.packageName} x{selectedOrder.quantity}</div>
                <div className="text-sm text-gray-600">收货地址：{selectedOrder.address}</div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    快递公司 <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>选择快递公司</option>
                    <option>顺丰速运</option>
                    <option>中通快递</option>
                    <option>申通快递</option>
                    <option>圆通速递</option>
                    <option>韵达快递</option>
                    <option>邮政EMS</option>
                    <option>自定义...</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    快递单号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="输入或扫描快递单号"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">发货备注（选填）</label>
                  <textarea
                    rows={3}
                    placeholder="填写发货备注"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowShippingDrawer(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
              >
                取消
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Package className="w-4 h-4" />
                确认发货
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
