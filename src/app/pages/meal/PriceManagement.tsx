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
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-gray-900">价格维护</h1>
          <p className="text-sm text-gray-500 mt-1">管理服务包价格、活动价和库存</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          批量调价
        </button>
      </div>

      {/* 筛选区 */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>全部类型</option>
            <option>周包</option>
            <option>月包</option>
            <option>定制包</option>
          </select>
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>全部状态</option>
            <option>有活动价</option>
            <option>无活动价</option>
          </select>
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>库存状态</option>
            <option>正常</option>
            <option>预警</option>
            <option>售罄</option>
          </select>
        </div>
      </div>

      {/* 价格列表 */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">套餐ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">套餐名称</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">类型</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">原价</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">当前售价</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">活动价</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">活动有效期</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">库存</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">限购</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {priceData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.name}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-right line-through">¥{item.originalPrice}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-right font-semibold">¥{item.currentPrice}</td>
                  <td className="px-6 py-4 text-sm text-right">
                    {item.activityPrice ? (
                      <span className="text-red-600 font-semibold">¥{item.activityPrice}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.activityPeriod !== '-' ? (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">{item.activityPeriod}</span>
                      </div>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className={`px-6 py-4 text-sm text-right font-medium ${
                    item.stock < item.threshold ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {item.stock}
                    {item.stock < item.threshold && (
                      <span className="ml-1 text-xs">(预警)</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {item.limitPurchase ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        限购
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowEditModal(true)}
                        className="flex items-center gap-1 px-3 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit className="w-3 h-3" />
                        编辑价格
                      </button>
                      <button
                        onClick={() => setShowHistoryModal(true)}
                        className="flex items-center gap-1 px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded transition-colors"
                      >
                        <TrendingUp className="w-3 h-3" />
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

      {/* 编辑价格弹窗 */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
            <h2 className="font-semibold text-gray-900 mb-4">编辑价格</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">原价（元）</label>
                  <input
                    type="number"
                    defaultValue={299}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">当前售价（元）</label>
                  <input
                    type="number"
                    defaultValue={259}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">活动价（元）</label>
                <input
                  type="number"
                  defaultValue={199}
                  placeholder="不设置留空"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">活动开始时间</label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">活动结束时间</label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">库存数量</label>
                  <input
                    type="number"
                    defaultValue={850}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">库存预警阈值</label>
                  <input
                    type="number"
                    defaultValue={100}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full mt-2 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  修改原因 <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="请填写价格修改原因，将记录至操作日志"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                取消
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                保存修改
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 变更记录弹窗 */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl mx-4 max-h-[80vh] overflow-y-auto">
            <h2 className="font-semibold text-gray-900 mb-4">价格变更记录</h2>
            <div className="space-y-3">
              {[
                { id: 'price-change-1', time: '2026-03-15 14:20', operator: '张三', oldPrice: 259, newPrice: 199, reason: '促销活动调价' },
                { id: 'price-change-2', time: '2026-03-10 10:30', operator: '李四', oldPrice: 299, newPrice: 259, reason: '市场定价调整' },
                { id: 'price-change-3', time: '2026-03-01 09:15', operator: '王五', oldPrice: 329, newPrice: 299, reason: '新品上市优惠' },
              ].map((record) => (
                <div key={record.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{record.time}</span>
                    <span className="text-sm text-gray-600">操作人：{record.operator}</span>
                  </div>
                  <div className="text-sm text-gray-900 mb-1">
                    价格变更：
                    <span className="text-red-600 line-through mx-1">¥{record.oldPrice}</span>
                    →
                    <span className="text-green-600 font-semibold mx-1">¥{record.newPrice}</span>
                  </div>
                  <div className="text-sm text-gray-600">原因：{record.reason}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end mt-6">
              <button
                onClick={() => setShowHistoryModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
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