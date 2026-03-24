import { useState } from 'react';
import { Plus, Search, Edit, Eye, Power, Trash2, Upload, X } from 'lucide-react';

const packagesData = [
  {
    id: 'PKG001',
    name: '轻盈周包',
    type: '周包',
    targetAudience: '绿灯',
    status: '已上架',
    auditStatus: '已通过',
    createdAt: '2026-03-10 10:30',
    updatedAt: '2026-03-15 14:20',
  },
  {
    id: 'PKG002',
    name: '活力月包',
    type: '月包',
    targetAudience: '绿灯,黄灯',
    status: '已上架',
    auditStatus: '已通过',
    createdAt: '2026-03-08 09:15',
    updatedAt: '2026-03-16 16:45',
  },
  {
    id: 'PKG003',
    name: '定制营养包',
    type: '定制包',
    targetAudience: '黄灯',
    status: '已下架',
    auditStatus: '已通过',
    createdAt: '2026-03-05 11:20',
    updatedAt: '2026-03-12 10:00',
  },
  {
    id: 'PKG004',
    name: '健康体重管理套餐',
    type: '月包',
    targetAudience: '绿灯',
    status: '草稿',
    auditStatus: '待审核',
    createdAt: '2026-03-17 08:30',
    updatedAt: '2026-03-17 08:30',
  },
];

export default function ServicePackage() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [currentTab, setCurrentTab] = useState<'basic' | 'product' | 'media' | 'audit'>('basic');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('全部');
  const [filterStatus, setFilterStatus] = useState('全部');

  const filteredPackages = packagesData.filter(pkg => {
    const matchSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === '全部' || pkg.type === filterType;
    const matchStatus = filterStatus === '全部' || pkg.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-gray-900">服务包维护</h1>
          <p className="text-sm text-gray-500 mt-1">管理代餐服务包的内容、审核和上下架</p>
        </div>
        <button
          onClick={() => setShowDrawer(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          新增服务包
        </button>
      </div>

      {/* 筛选区 */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索套餐名称"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>全部</option>
            <option>周包</option>
            <option>月包</option>
            <option>定制包</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>全部</option>
            <option>已上架</option>
            <option>已下架</option>
            <option>草稿</option>
          </select>
          <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>全部人群</option>
            <option>绿灯</option>
            <option>黄灯</option>
          </select>
        </div>
      </div>

      {/* 批量操作 */}
      <div className="flex items-center gap-2">
        <button className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
          批量上架
        </button>
        <button className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
          批量下架
        </button>
        <button className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
          批量导出
        </button>
      </div>

      {/* 服务包列表 */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">套餐ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">套餐名称</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">套餐类型</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">适配人群</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">状态</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">审核状态</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">创建时间</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPackages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{pkg.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{pkg.name}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {pkg.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{pkg.targetAudience}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      pkg.status === '已上架' ? 'bg-green-100 text-green-800' :
                      pkg.status === '已下架' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {pkg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      pkg.auditStatus === '已通过' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {pkg.auditStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{pkg.createdAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-600 hover:text-blue-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-600 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-600 hover:text-green-600 transition-colors">
                        <Power className="w-4 h-4" />
                      </button>
                      {pkg.status === '草稿' && (
                        <button className="p-1 text-gray-600 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 右侧抽屉 - 新增/编辑服务包 */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowDrawer(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-2xl bg-white shadow-xl flex flex-col">
            {/* 抽屉头部 */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">新增服务包</h2>
              <button
                onClick={() => setShowDrawer(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab 导航 */}
            <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-200">
              <button
                onClick={() => setCurrentTab('basic')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentTab === 'basic' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                基础信息
              </button>
              <button
                onClick={() => setCurrentTab('product')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentTab === 'product' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                产品信息
              </button>
              <button
                onClick={() => setCurrentTab('media')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentTab === 'media' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                素材管理
              </button>
              <button
                onClick={() => setCurrentTab('audit')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentTab === 'audit' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                审核提交
              </button>
            </div>

            {/* 抽屉内容 */}
            <div className="flex-1 overflow-y-auto p-6">
              {currentTab === 'basic' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      套餐名称 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="最多20字"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      套餐类型 <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>选择套餐类型</option>
                      <option>周包</option>
                      <option>月包</option>
                      <option>定制包</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      适配风险等级 <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">绿灯（低风险）</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">黄灯（中等风险）</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">展示排序序号</label>
                    <input
                      type="number"
                      placeholder="数字越小排序越靠前"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">上架状态</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>草稿</option>
                      <option>待上架</option>
                      <option>已上架</option>
                    </select>
                  </div>
                </div>
              )}

              {currentTab === 'product' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">产品成分</label>
                    <textarea
                      rows={3}
                      placeholder="输入产品成分信息"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">热量（千卡）</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">蛋白质（克）</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">碳水（克）</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">脂肪（克）</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">食用方法</label>
                    <textarea
                      rows={3}
                      placeholder="输入食用方法"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">合规宣传语</label>
                    <textarea
                      rows={3}
                      placeholder="输入宣传语，系统将自动检测违禁词"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-1">系统将自动校验医疗相关词汇</p>
                  </div>
                </div>
              )}

              {currentTab === 'media' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      产品主图 <span className="text-red-500">*</span>
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">点击上传或拖拽图片</p>
                      <p className="text-xs text-gray-400 mt-1">支持 JPG、PNG，建议尺寸 800x800</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      详情图（最多9张）
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">点击上传或拖拽图片</p>
                      <p className="text-xs text-gray-400 mt-1">可拖拽排序</p>
                    </div>
                  </div>
                </div>
              )}

              {currentTab === 'audit' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-900 mb-2">填写完整度检测</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                        <span className="text-gray-700">基础信息：已完成</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                        <span className="text-gray-700">产品信息：缺少营养参数</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-red-500"></div>
                        <span className="text-gray-700">素材管理：缺少产品主图</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">提交说明</label>
                    <textarea
                      rows={4}
                      placeholder="填写提交审核说明（选填）"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                </div>
              )}
            </div>

            {/* 抽屉底部 */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowDrawer(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
              >
                取消
              </button>
              {currentTab === 'audit' ? (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  提交审核
                </button>
              ) : (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  保存并继续
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
