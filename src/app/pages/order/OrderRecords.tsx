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
  const [selectedOrder, setSelectedOrder] = useState<(typeof ordersData)[number] | null>(null);
  const [detailOrder, setDetailOrder] = useState<(typeof ordersData)[number] | null>(null);

  const handleShipping = (order: (typeof ordersData)[number]) => {
    setSelectedOrder(order);
    setShowShippingDrawer(true);
  };

  return (
    <div className="space-y-6 rounded-[30px] border border-slate-200/80 bg-slate-50/90 p-5 md:p-6">
      <div>
        <h1 className="font-semibold text-gray-900">订单记录</h1>
        <p className="mt-1 text-sm text-gray-500">查询和管理所有代餐订单</p>
      </div>

      <div className="rounded-lg bg-white px-5 py-5">
        <div className="flex flex-wrap items-center gap-4 xl:flex-nowrap">
          <label className="relative flex h-9 min-w-[280px] flex-1 items-center rounded border border-[#DEE0E3] bg-white px-3">
            <Search className="mr-3 h-4 w-4 shrink-0 text-[#9AA4B2]" />
            <input
              type="text"
              placeholder="订单号 / 用户昵称"
              className="w-full bg-transparent text-sm font-normal leading-6 text-[#172C50] placeholder:text-[#9AA4B2] focus:outline-none"
            />
          </label>
          <select className="h-9 min-w-[220px] flex-1 rounded border border-[#DEE0E3] bg-white px-3 text-sm font-normal leading-6 text-[#172C50] focus:outline-none">
            <option>全部状态</option>
            <option>待支付</option>
            <option>待发货</option>
            <option>已发货</option>
            <option>已完成</option>
            <option>售后中</option>
            <option>已关闭</option>
          </select>
          <select className="h-9 min-w-[220px] flex-1 rounded border border-[#DEE0E3] bg-white px-3 text-sm font-normal leading-6 text-[#172C50] focus:outline-none">
            <option>全部套餐</option>
            <option>周包</option>
            <option>月包</option>
            <option>定制包</option>
          </select>
          <select className="h-9 min-w-[220px] flex-1 rounded border border-[#DEE0E3] bg-white px-3 text-sm font-normal leading-6 text-[#172C50] focus:outline-none">
            <option>今日</option>
            <option>近7日</option>
            <option>近30日</option>
            <option>自定义</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="overflow-x-auto rounded-lg border border-[#F0F0F0]">
          <table className="w-full min-w-[1240px] border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#FAFBFC]">
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">订单号</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">用户信息</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">商品信息</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-right text-sm font-medium text-[#54585F]">实付金额</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">收货地址</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">物流信息</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">订单状态</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">下单时间</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">操作</th>
              </tr>
            </thead>
            <tbody>
              {ordersData.map((order, index) => (
                <tr key={order.orderNo} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FCFDFE]'}>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm font-mono text-[#172C50]">{order.orderNo}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    <div className="text-sm text-[#172C50]">{order.userName}</div>
                    <div className="text-xs text-[#7C8798]">{order.userId}</div>
                  </td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    <div className="text-sm text-[#172C50]">{order.packageName}</div>
                    <div className="text-xs text-[#7C8798]">数量: {order.quantity}</div>
                  </td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-right text-sm font-semibold text-[#172C50]">¥{order.amount}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm text-[#54585F]">{order.address}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    {order.logistics !== '-' ? (
                      <div>
                        <div className="text-sm text-[#172C50]">{order.logistics}</div>
                        <div className="text-xs font-mono text-[#7C8798]">{order.trackingNo}</div>
                      </div>
                    ) : (
                      <span className="text-sm text-[#9AA4B2]">-</span>
                    )}
                  </td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.status === '已发货'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === '待发货'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === '已完成'
                              ? 'bg-green-100 text-green-800'
                              : order.status === '售后中'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm text-[#54585F]">{order.createTime}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    <div className="flex items-center gap-2">
                      {order.status === '待发货' && (
                        <button
                          onClick={() => handleShipping(order)}
                          className="h-8 rounded bg-[#526FEA] px-3 text-xs font-medium text-white transition-colors hover:bg-[#425ED8]"
                        >
                          发货
                        </button>
                      )}
                      <button
                        onClick={() => setDetailOrder(order)}
                        className="rounded px-3 py-1 text-xs font-medium text-[#3F66FC] transition-colors hover:bg-[#F5F7FF]"
                      >
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

      {detailOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="font-semibold text-gray-900">订单详情</h2>
                <p className="mt-1 text-xs text-gray-500">查看订单基础信息、商品和物流状态</p>
              </div>
              <button
                onClick={() => setDetailOrder(null)}
                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 p-6">
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="text-base font-medium text-[#172C50]">{detailOrder.orderNo}</div>
                <div className="mt-1 text-sm text-[#7C8798]">下单时间：{detailOrder.createTime}</div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-3 text-sm font-medium text-[#172C50]">用户信息</div>
                  <div className="space-y-2 text-sm text-[#54585F]">
                    <div className="flex items-center justify-between">
                      <span>用户昵称</span>
                      <span>{detailOrder.userName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>用户ID</span>
                      <span className="font-mono">{detailOrder.userId}</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-3 text-sm font-medium text-[#172C50]">订单状态</div>
                  <div className="space-y-2 text-sm text-[#54585F]">
                    <div className="flex items-center justify-between">
                      <span>当前状态</span>
                      <span>{detailOrder.status}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>实付金额</span>
                      <span className="font-semibold text-[#172C50]">¥{detailOrder.amount}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <div className="mb-3 text-sm font-medium text-[#172C50]">商品与配送</div>
                <div className="grid grid-cols-1 gap-4 text-sm text-[#54585F] md:grid-cols-2">
                  <div>
                    <div>套餐名称：{detailOrder.packageName}</div>
                    <div className="mt-2">购买数量：{detailOrder.quantity}</div>
                  </div>
                  <div>
                    <div>快递公司：{detailOrder.logistics}</div>
                    <div className="mt-2">快递单号：{detailOrder.trackingNo}</div>
                  </div>
                </div>
                <div className="mt-4 border-t border-dashed border-gray-200 pt-4 text-sm text-[#54585F]">
                  收货地址：{detailOrder.address}
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                onClick={() => setDetailOrder(null)}
                className="rounded-lg bg-[#526FEA] px-4 py-2 text-sm text-white transition-colors hover:bg-[#425ED8]"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {showShippingDrawer && selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowShippingDrawer(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 flex w-full max-w-md flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="font-semibold text-gray-900">订单发货</h2>
              <button
                onClick={() => setShowShippingDrawer(false)}
                className="rounded-lg p-2 transition-colors hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-6 rounded-lg bg-gray-50 p-4">
                <div className="mb-2 text-sm text-gray-600">订单号：{selectedOrder.orderNo}</div>
                <div className="mb-2 text-sm text-gray-600">商品：{selectedOrder.packageName} x{selectedOrder.quantity}</div>
                <div className="text-sm text-gray-600">收货地址：{selectedOrder.address}</div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    快递公司 <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    快递单号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="输入或扫描快递单号"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">发货备注（选填）</label>
                  <textarea
                    rows={3}
                    placeholder="填写发货备注"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                onClick={() => setShowShippingDrawer(false)}
                className="rounded-lg px-4 py-2 text-gray-600 transition-colors hover:bg-gray-200"
              >
                取消
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                <Package className="h-4 w-4" />
                确认发货
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
