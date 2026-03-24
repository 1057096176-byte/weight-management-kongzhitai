import { useState } from 'react';
import { Edit, Eye, Bell } from 'lucide-react';

const templatesData = [
  {
    id: 1,
    scene: '代餐发货通知',
    trigger: '订单状态变为"已发货"时自动触发',
    content: '您的订单{{订单号}}已发货，快递公司：{{快递公司}}，快递单号：{{快递单号}}，请注意查收。',
    variables: ['订单号', '快递公司', '快递单号'],
    type: '用户通知',
    status: '启用',
    lastModified: '2026-03-10 10:30',
  },
  {
    id: 2,
    scene: '售后处理结果通知',
    trigger: '售后审核通过/拒绝时触发',
    content: '您的售后申请已处理，订单号：{{订单号}}，处理结果：{{处理结果}}，{{处理说明}}',
    variables: ['订单号', '处理结果', '处理说明'],
    type: '用户通知',
    status: '启用',
    lastModified: '2026-03-08 14:20',
  },
  {
    id: 3,
    scene: '订单支付成功通知',
    trigger: '订单支付完成时触发',
    content: '支付成功！订单号：{{订单号}}，支付金额：{{支付金额}}元，我们将尽快为您发货。',
    variables: ['订单号', '支付金额'],
    type: '用户通知',
    status: '启用',
    lastModified: '2026-03-05 09:15',
  },
  {
    id: 4,
    scene: '设备绑定成功通知',
    trigger: '设备绑定状态变为"已绑定"时触发',
    content: '设备绑定成功！设备型号：{{设备型号}}，绑定时间：{{绑定时间}}，现在可以同步健康数据了。',
    variables: ['设备型号', '绑定时间'],
    type: '用户通知',
    status: '启用',
    lastModified: '2026-03-03 11:45',
  },
  {
    id: 5,
    scene: '打卡提醒',
    trigger: '按设定时间定时触发',
    content: '早安！今天记得打卡哦~ 坚持健康管理，遇见更好的自己。',
    variables: [],
    type: '用户通知',
    status: '启用',
    lastModified: '2026-03-01 08:00',
  },
  {
    id: 6,
    scene: '库存预警通知（内部）',
    trigger: '库存低于预警阈值时推送',
    content: '【库存预警】套餐"{{套餐名称}}"当前库存：{{当前库存}}，已低于预警阈值{{预警阈值}}，请及时补货。',
    variables: ['套餐名称', '当前库存', '预警阈值'],
    type: '内部通知',
    status: '启用',
    lastModified: '2026-02-28 16:30',
  },
];

export default function MessageTemplate() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const handleEdit = (template: any) => {
    setSelectedTemplate(template);
    setShowEditModal(true);
  };

  const handlePreview = (template: any) => {
    setSelectedTemplate(template);
    setShowPreviewModal(true);
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="font-semibold text-gray-900">消息模板</h1>
        <p className="text-sm text-gray-500 mt-1">管理小程序端订阅消息和内部通知模板</p>
      </div>

      {/* 筛选区 */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>全部类型</option>
            <option>用户通知</option>
            <option>内部通知</option>
          </select>
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>全部状态</option>
            <option>启用</option>
            <option>禁用</option>
          </select>
          <input
            type="text"
            placeholder="搜索场景名称"
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 模板列表 */}
      <div className="space-y-4">
        {templatesData.map((template) => (
          <div key={template.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{template.scene}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    template.type === '用户通知' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {template.type}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    template.status === '启用' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {template.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">触发条件：{template.trigger}</p>
                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                  <p className="text-sm text-gray-900">{template.content}</p>
                </div>
                {template.variables.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-gray-600">可用变量：</span>
                    {template.variables.map((variable) => (
                      <span
                        key={variable}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-blue-50 text-blue-700 border border-blue-200"
                      >
                        {`{{${variable}}}`}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => handlePreview(template)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  预览
                </button>
                <button
                  onClick={() => handleEdit(template)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  编辑
                </button>
              </div>
            </div>
            <div className="text-xs text-gray-500">最近修改：{template.lastModified}</div>
          </div>
        ))}
      </div>

      {/* 编辑模板弹窗 */}
      {showEditModal && selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="font-semibold text-gray-900 mb-4">编辑消息模板</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">场景名称</label>
                <input
                  type="text"
                  defaultValue={selectedTemplate.scene}
                  disabled
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">触发条件</label>
                <input
                  type="text"
                  defaultValue={selectedTemplate.trigger}
                  disabled
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  消息内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  defaultValue={selectedTemplate.content}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">严格遵循微信小程序订阅消息规范</p>
              </div>
              {selectedTemplate.variables.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">可用变量</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.variables.map((variable: string, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-mono bg-blue-50 text-blue-700 border border-blue-200"
                      >
                        {`{{${variable}}}`}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">模板状态</label>
                <select
                  defaultValue={selectedTemplate.status}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>启用</option>
                  <option>禁用</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => handlePreview(selectedTemplate)}
                className="px-4 py-2 text-blue-600 border border-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                预览效果
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                保存修改
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 预览弹窗 */}
      {showPreviewModal && selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="font-semibold text-gray-900 mb-4">消息预览</h2>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Bell className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">{selectedTemplate.scene}</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-900 whitespace-pre-wrap">
                  {selectedTemplate.content
                    .replace(/\{\{订单号\}\}/g, 'ORD20260317001')
                    .replace(/\{\{快递公司\}\}/g, '顺丰速运')
                    .replace(/\{\{快递单号\}\}/g, 'SF1234567890')
                    .replace(/\{\{支付金额\}\}/g, '199')
                    .replace(/\{\{处理结果\}\}/g, '同意退款')
                    .replace(/\{\{处理说明\}\}/g, '已为您退款至原支付账户')
                    .replace(/\{\{设备型号\}\}/g, '小米手环6')
                    .replace(/\{\{绑定时间\}\}/g, '2026-03-17 10:30')
                    .replace(/\{\{套餐名称\}\}/g, '轻盈周包')
                    .replace(/\{\{当前库存\}\}/g, '45')
                    .replace(/\{\{预警阈值\}\}/g, '50')
                  }
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-4">以上为模拟效果，实际显示以微信小程序为准</p>
            <div className="flex items-center justify-end">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 说明 */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h3 className="font-medium text-orange-900 mb-2">模板规范说明</h3>
        <ul className="text-sm text-orange-800 space-y-1">
          <li>• 严格遵循微信小程序订阅消息规范</li>
          <li>• 支持变量替换语法（如 {'{订单号}'}、{'{快递公司}'}）</li>
          <li>• 编辑完成后可预览，以气泡形式模拟展示用户收到的消息效果</li>
          <li>• 预览无误后保存生效，立即应用于对应业务场景</li>
        </ul>
      </div>
    </div>
  );
}