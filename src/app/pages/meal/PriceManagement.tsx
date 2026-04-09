import { useState } from 'react';
import { Edit, Clock, TrendingUp } from 'lucide-react';

const priceData = [
  {
    id: 'PKG001',
    name: '轻盈周包',
    type: '周包',
    originalPrice: 299,
    currentPrice: 259,
    activityPrice: 199,
    activityPeriod: '2026-03-15 ~ 2026-03-31',
    stock: 850,
    threshold: 100,
    limitPurchase: true,
    lastModified: '2026-03-15 14:20',
  },
  {
    id: 'PKG002',
    name: '活力月包',
    type: '月包',
    originalPrice: 999,
    currentPrice: 899,
    activityPrice: null,
    activityPeriod: '-',
    stock: 1250,
    threshold: 200,
    limitPurchase: false,
    lastModified: '2026-03-12 10:30',
  },
  {
    id: 'PKG003',
    name: '定制营养包',
    type: '定制包',
    originalPrice: 1299,
    currentPrice: 1199,
    activityPrice: 999,
    activityPeriod: '2026-03-10 ~ 2026-03-25',
    stock: 45,
    threshold: 50,
    limitPurchase: true,
    lastModified: '2026-03-16 09:15',
  },
];

export default function PriceManagement() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  return (
    <div className="space-y-6 rounded-[30px] border border-slate-200/80 bg-slate-50/90 p-5 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-semibold text-gray-900">价格维护</h1>
          <p className="mt-1 text-sm text-gray-500">管理服务包价格、活动价和库存</p>
        </div>
        <button className="h-9 rounded bg-[#526FEA] px-4 text-sm font-normal text-white transition-colors hover:bg-[#425ED8]">
          批量调价
        </button>
      </div>

      <div className="rounded-lg bg-white px-5 py-5">
        <div className="flex flex-wrap items-center gap-4 xl:flex-nowrap">
          <select className="h-9 min-w-[220px] flex-1 rounded border border-[#DEE0E3] bg-white px-3 text-sm font-normal leading-6 text-[#172C50] focus:outline-none">
            <option>全部类型</option>
            <option>周包</option>
            <option>月包</option>
            <option>定制包</option>
          </select>
          <select className="h-9 min-w-[220px] flex-1 rounded border border-[#DEE0E3] bg-white px-3 text-sm font-normal leading-6 text-[#172C50] focus:outline-none">
            <option>全部状态</option>
            <option>有活动价</option>
            <option>无活动价</option>
          </select>
          <select className="h-9 min-w-[220px] flex-1 rounded border border-[#DEE0E3] bg-white px-3 text-sm font-normal leading-6 text-[#172C50] focus:outline-none">
            <option>库存状态</option>
            <option>正常</option>
            <option>预警</option>
            <option>售罄</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="overflow-x-auto rounded-lg border border-[#F0F0F0]">
          <table className="w-full min-w-[1180px] border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#FAFBFC]">
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">套餐ID</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">套餐名称</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">类型</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-right text-sm font-medium text-[#54585F]">原价</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-right text-sm font-medium text-[#54585F]">当前售价</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-right text-sm font-medium text-[#54585F]">活动价</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">活动有效期</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-right text-sm font-medium text-[#54585F]">库存</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">限购</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">操作</th>
              </tr>
            </thead>
            <tbody>
              {priceData.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FCFDFE]'}>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm text-[#172C50]">{item.id}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm font-medium text-[#172C50]">{item.name}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      {item.type}
                    </span>
                  </td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-right text-sm text-[#7C8798] line-through">¥{item.originalPrice}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-right text-sm font-semibold text-[#172C50]">¥{item.currentPrice}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-right text-sm">
                    {item.activityPrice ? (
                      <span className="font-semibold text-red-600">¥{item.activityPrice}</span>
                    ) : (
                      <span className="text-[#9AA4B2]">-</span>
                    )}
                  </td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm text-[#54585F]">
                    {item.activityPeriod !== '-' ? (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">{item.activityPeriod}</span>
                      </div>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className={`border-b border-[#F5F6F7] px-6 py-4 text-right text-sm font-medium ${
                    item.stock < item.threshold ? 'text-red-600' : 'text-[#172C50]'
                  }`}>
                    {item.stock}
                    {item.stock < item.threshold && <span className="ml-1 text-xs">(预警)</span>}
                  </td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    {item.limitPurchase ? (
                      <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
                        限购
                      </span>
                    ) : (
                      <span className="text-sm text-[#9AA4B2]">-</span>
                    )}
                  </td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowEditModal(true)}
                        className="flex items-center gap-1 rounded px-3 py-1 text-xs font-medium text-[#3F66FC] transition-colors hover:bg-[#F5F7FF]"
                      >
                        <Edit className="h-3 w-3" />
                        编辑价格
                      </button>
                      <button
                        onClick={() => setShowHistoryModal(true)}
                        className="flex items-center gap-1 rounded px-3 py-1 text-xs font-medium text-[#54585F] transition-colors hover:bg-[#F5F7FF]"
                      >
                        <TrendingUp className="h-3 w-3" />
                        变更记录
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="mx-4 w-full max-w-lg rounded-xl bg-white p-6">
            <h2 className="mb-4 font-semibold text-gray-900">编辑价格</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">原价（元）</label>
                  <input
                    type="number"
                    defaultValue={299}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">当前售价（元）</label>
                  <input
                    type="number"
                    defaultValue={259}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">活动价（元）</label>
                <input
                  type="number"
                  defaultValue={199}
                  placeholder="不设置留空"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">活动开始时间</label>
                  <input
                    type="datetime-local"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">活动结束时间</label>
                  <input
                    type="datetime-local"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">库存数量</label>
                  <input
                    type="number"
                    defaultValue={850}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">库存预警阈值</label>
                  <input
                    type="number"
                    defaultValue={100}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">开启限购（每用户最多购买数量）</span>
                </label>
                <input
                  type="number"
                  defaultValue={3}
                  placeholder="限购数量"
                  className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  修改原因 <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="请填写价格修改原因，将记录至操作日志"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="rounded-lg px-4 py-2 text-gray-600 transition-colors hover:bg-gray-100"
              >
                取消
              </button>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                保存修改
              </button>
            </div>
          </div>
        </div>
      )}

      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="mx-4 max-h-[80vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6">
            <h2 className="mb-4 font-semibold text-gray-900">价格变更记录</h2>
            <div className="space-y-3">
              {[
                { id: 'price-change-1', time: '2026-03-15 14:20', operator: '张三', oldPrice: 259, newPrice: 199, reason: '促销活动调价' },
                { id: 'price-change-2', time: '2026-03-10 10:30', operator: '李四', oldPrice: 299, newPrice: 259, reason: '市场定价调整' },
                { id: 'price-change-3', time: '2026-03-01 09:15', operator: '王五', oldPrice: 329, newPrice: 299, reason: '新品上市优惠' },
              ].map((record) => (
                <div key={record.id} className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-gray-600">{record.time}</span>
                    <span className="text-sm text-gray-600">操作人：{record.operator}</span>
                  </div>
                  <div className="mb-1 text-sm text-gray-900">
                    价格变更：
                    <span className="mx-1 line-through text-red-600">¥{record.oldPrice}</span>
                    →
                    <span className="mx-1 font-semibold text-green-600">¥{record.newPrice}</span>
                  </div>
                  <div className="text-sm text-gray-600">原因：{record.reason}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-end">
              <button
                onClick={() => setShowHistoryModal(false)}
                className="rounded-lg bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700"
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
