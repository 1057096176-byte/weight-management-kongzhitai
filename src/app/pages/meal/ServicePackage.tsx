import { useState } from 'react';
import { Plus, Search, Upload, X } from 'lucide-react';

type PackageItem = {
  id: string;
  name: string;
  type: string;
  targetAudience: string;
  status: string;
  auditStatus: string;
  createdAt: string;
  updatedAt: string;
  sort: number;
  ingredients: string;
  calorie: string;
  protein: string;
  carbs: string;
  fat: string;
  usage: string;
  slogan: string;
  submitNote: string;
  coverImage: string;
  detailImages: string[];
};


const packagesData: PackageItem[] = [
  {
    id: 'PKG001',
    name: '轻盈周包',
    type: '周包',
    targetAudience: '绿灯',
    status: '已上架',
    auditStatus: '已通过',
    createdAt: '2026-03-10 10:30',
    updatedAt: '2026-03-15 14:20',
    sort: 1,
    ingredients: '燕麦粉、分离乳清蛋白、奇亚籽粉、综合维生素',
    calorie: '220',
    protein: '18',
    carbs: '24',
    fat: '8',
    usage: '建议早餐或晚餐替换 1 餐，连续使用 7 天。',
    slogan: '轻负担开启一周体重管理。',
    submitNote: '周包基础内容已完善，提交运营审核。',
    coverImage: 'qingying-week-cover.png',
    detailImages: ['qingying-week-detail-1.png', 'qingying-week-detail-2.png'],
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
    sort: 2,
    ingredients: '大豆分离蛋白、膳食纤维粉、复合维矿、冻干果蔬粉',
    calorie: '280',
    protein: '22',
    carbs: '24',
    fat: '8',
    usage: '建议每日替换 1-2 餐，配合月度控卡计划执行。',
    slogan: '稳定执行，更适合长期体重管理。',
    submitNote: '月包营养参数已复核，无禁限词风险。',
    coverImage: 'huoli-month-cover.png',
    detailImages: ['huoli-month-detail-1.png', 'huoli-month-detail-2.png', 'huoli-month-detail-3.png'],
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
    sort: 3,
    ingredients: '乳清蛋白、MCT 粉、低 GI 碳水、定制维矿组合',
    calorie: '260',
    protein: '18',
    carbs: '20',
    fat: '8',
    usage: '根据评估结果替换指定餐次，按营养师建议使用。',
    slogan: '结合风险分层提供更匹配的代餐方案。',
    submitNote: '定制包已完成下架，保留资料供后续迭代。',
    coverImage: 'custom-pack-cover.png',
    detailImages: ['custom-pack-detail-1.png'],
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
    sort: 4,
    ingredients: '高蛋白谷物粉、复合膳食纤维、综合维生素矿物质',
    calorie: '280',
    protein: '22',
    carbs: '24',
    fat: '8',
    usage: '建议每日 1 餐替换，按月度计划持续使用。',
    slogan: '以更均衡的营养支持健康减重。',
    submitNote: '待补充主图后即可提交审核。',
    coverImage: '',
    detailImages: [],
  },
];

type PackageTab = 'basic' | 'product' | 'media' | 'audit';
type DrawerMode = 'create' | 'edit' | 'view';
type PackageFormState = {
  name: string;
  type: string;
  targetAudience: string[];
  sort: string;
  status: string;
  ingredients: string;
  calorie: string;
  protein: string;
  carbs: string;
  fat: string;
  usage: string;
  slogan: string;
  submitNote: string;
  coverImage: string;
  detailImages: string[];
};

const tabOrder: PackageTab[] = ['basic', 'product', 'media', 'audit'];
const targetAudienceOptions = ['绿灯', '黄灯'] as const;
const timestamp = '2026-03-24 10:00';
const inputClassName = 'w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500';

const createPackageForm = (pkg?: PackageItem): PackageFormState => ({
  name: pkg?.name ?? '',
  type: pkg?.type ?? '周包',
  targetAudience: pkg?.targetAudience
    ? pkg.targetAudience
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    : [],
  sort: String(pkg?.sort ?? 1),
  status: pkg?.status ?? '草稿',
  ingredients: pkg?.ingredients ?? '',
  calorie: pkg?.calorie ?? '220',
  protein: pkg?.protein ?? '18',
  carbs: pkg?.carbs ?? '24',
  fat: pkg?.fat ?? '8',
  usage: pkg?.usage ?? '',
  slogan: pkg?.slogan ?? '',
  submitNote: pkg?.submitNote ?? '',
  coverImage: pkg?.coverImage ?? '',
  detailImages: pkg?.detailImages ?? [],
});


export default function ServicePackage() {
  const [packages, setPackages] = useState(packagesData);
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerMode, setDrawerMode] = useState<DrawerMode>('create');
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PackageItem | null>(null);
  const [currentTab, setCurrentTab] = useState<PackageTab>('basic');
  const [packageForm, setPackageForm] = useState<PackageFormState>(createPackageForm());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('全部');
  const [filterStatus, setFilterStatus] = useState('全部');
  const [auditError, setAuditError] = useState('');

  const filteredPackages = packages.filter((pkg) => {
    const matchSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === '全部' || pkg.type === filterType;
    const matchStatus = filterStatus === '全部' || pkg.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  const isViewMode = drawerMode === 'view';
  const drawerTitle =
    drawerMode === 'create' ? '新增服务包' : drawerMode === 'edit' ? '编辑服务包' : '服务包详情';

  const openCreateDrawer = () => {
    setDrawerMode('create');
    setSelectedPackage(null);
    setPackageForm(createPackageForm());
    setAuditError('');
    setCurrentTab('basic');
    setShowDrawer(true);
  };

  const openEditDrawer = (pkg: PackageItem) => {
    setDrawerMode('edit');
    setSelectedPackage(pkg);
    setPackageForm(createPackageForm(pkg));
    setAuditError('');
    setCurrentTab('basic');
    setShowDrawer(true);
  };

  const openViewDrawer = (pkg: PackageItem) => {
    setDrawerMode('view');
    setSelectedPackage(pkg);
    setPackageForm(createPackageForm(pkg));
    setAuditError('');
    setCurrentTab('basic');
    setShowDrawer(true);
  };

  const closeDrawer = () => {
    setShowDrawer(false);
    setSelectedPackage(null);
    setAuditError('');
    setCurrentTab('basic');
  };

  const updatePackageForm = (field: keyof PackageFormState, value: string) => {
    setPackageForm((prev) => ({ ...prev, [field]: value }));
  };

  const basicInfoComplete = Boolean(packageForm.name.trim()) && packageForm.targetAudience.length > 0;
  const productInfoComplete = Boolean(
    packageForm.ingredients.trim() &&
      packageForm.calorie.trim() &&
      packageForm.protein.trim() &&
      packageForm.carbs.trim() &&
      packageForm.fat.trim() &&
      packageForm.usage.trim() &&
      packageForm.slogan.trim(),
  );
  const mediaInfoComplete = Boolean(packageForm.coverImage.trim());

  const addDetailImage = () => {
    setAuditError('');
    setPackageForm((prev) => ({
      ...prev,
      detailImages:
        prev.detailImages.length >= 9
          ? prev.detailImages
          : [...prev.detailImages, `detail-image-${prev.detailImages.length + 1}.png`],
    }));
  };

  const removeDetailImage = (index: number) => {
    setPackageForm((prev) => ({
      ...prev,
      detailImages: prev.detailImages.filter((_, currentIndex) => currentIndex !== index),
    }));
  };

  const toggleAudience = (value: (typeof targetAudienceOptions)[number]) => {
    setPackageForm((prev) => ({
      ...prev,
      targetAudience: prev.targetAudience.includes(value)
        ? prev.targetAudience.filter((item) => item !== value)
        : [...prev.targetAudience, value],
    }));
  };

  const handlePrimaryAction = () => {
    if (isViewMode) {
      closeDrawer();
      return;
    }

    setAuditError('');

    if (currentTab !== 'audit') {
      const currentIndex = tabOrder.indexOf(currentTab);
      setCurrentTab(tabOrder[currentIndex + 1]);
      return;
    }

    if (!packageForm.coverImage.trim()) {
      setAuditError('提交审核前请先补充产品主图。');
      return;
    }

    const payload = {
      name: packageForm.name || '未命名服务包',
      type: packageForm.type,
      targetAudience: packageForm.targetAudience.join(',') || '绿灯',
      status: packageForm.status,
      sort: Number(packageForm.sort) || 1,
      ingredients: packageForm.ingredients,
      calorie: packageForm.calorie,
      protein: packageForm.protein,
      carbs: packageForm.carbs,
      fat: packageForm.fat,
      usage: packageForm.usage,
      slogan: packageForm.slogan,
      submitNote: packageForm.submitNote,
      coverImage: packageForm.coverImage.trim(),
      detailImages: packageForm.detailImages,
      auditStatus: '待审核',
      updatedAt: timestamp,
    };

    if (drawerMode === 'create') {
      const nextId = `PKG${String(Math.max(...packages.map((pkg) => Number(pkg.id.replace('PKG', '')))) + 1).padStart(3, '0')}`;

      setPackages((prev) => [
        {
          id: nextId,
          createdAt: timestamp,
          ...payload,
        },
        ...prev,
      ]);
    }

    if (drawerMode === 'edit' && selectedPackage) {
      setPackages((prev) =>
        prev.map((pkg) =>
          pkg.id === selectedPackage.id
            ? {
                ...pkg,
                ...payload,
              }
            : pkg,
        ),
      );
    }

    closeDrawer();
  };

  const handleDeletePackage = () => {
    if (!deleteTarget) {
      return;
    }

    setPackages((prev) => prev.filter((pkg) => pkg.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6 rounded-[30px] border border-slate-200/80 bg-slate-50/90 p-5 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-semibold text-gray-900">服务包维护</h1>
          <p className="mt-1 text-sm text-gray-500">管理代餐服务包的内容、审核和上下架</p>
        </div>
        <button
          onClick={openCreateDrawer}
          className="flex h-9 items-center gap-2 rounded bg-[#526FEA] px-4 text-sm font-normal text-white transition-colors hover:bg-[#425ED8]"
        >
          <Plus className="h-4 w-4" />
          新增服务包
        </button>
      </div>

      <div className="rounded-lg bg-white px-5 py-5">
        <div className="flex flex-wrap items-center gap-4 xl:flex-nowrap">
          <label className="flex h-9 min-w-[280px] flex-1 items-center rounded border border-[#DEE0E3] bg-white px-3">
            <Search className="mr-3 h-4 w-4 shrink-0 text-[#9AA4B2]" />
            <input
              type="text"
              placeholder="搜索套餐名称"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-sm font-normal leading-6 text-[#172C50] placeholder:text-[#9AA4B2] focus:outline-none"
            />
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="h-9 min-w-[220px] flex-1 rounded border border-[#DEE0E3] bg-white px-3 text-sm font-normal leading-6 text-[#172C50] focus:outline-none"
          >
            <option>全部</option>
            <option>周包</option>
            <option>月包</option>
            <option>定制包</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-9 min-w-[220px] flex-1 rounded border border-[#DEE0E3] bg-white px-3 text-sm font-normal leading-6 text-[#172C50] focus:outline-none"
          >
            <option>全部</option>
            <option>已上架</option>
            <option>已下架</option>
            <option>草稿</option>
          </select>
          <select className="h-9 min-w-[220px] flex-1 rounded border border-[#DEE0E3] bg-white px-3 text-sm font-normal leading-6 text-[#172C50] focus:outline-none">
            <option>全部人群</option>
            <option>绿灯</option>
            <option>黄灯</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-lg bg-white px-5 py-4">
        <button className="h-9 rounded border border-[#526FEA] bg-white px-4 text-sm font-normal text-[#526FEA] transition-colors hover:bg-[#F5F7FF]">
          批量上架
        </button>
        <button className="h-9 rounded border border-[#526FEA] bg-white px-4 text-sm font-normal text-[#526FEA] transition-colors hover:bg-[#F5F7FF]">
          批量下架
        </button>
        <button className="h-9 rounded border border-[#526FEA] bg-white px-4 text-sm font-normal text-[#526FEA] transition-colors hover:bg-[#F5F7FF]">
          批量导出
        </button>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="overflow-x-auto rounded-lg border border-[#F0F0F0]">
          <table className="w-full min-w-[1180px] border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#FAFBFC]">
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">套餐ID</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">套餐名称</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">套餐类型</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">适配人群</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">状态</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">审核状态</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">创建时间</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredPackages.map((pkg, index) => (
                <tr key={pkg.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FCFDFE]'}>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm text-[#172C50]">{pkg.id}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm font-medium text-[#172C50]">{pkg.name}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      {pkg.type}
                    </span>
                  </td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm text-[#54585F]">{pkg.targetAudience}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        pkg.status === '已上架'
                          ? 'bg-green-100 text-green-800'
                          : pkg.status === '已下架'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {pkg.status}
                    </span>
                  </td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        pkg.auditStatus === '已通过' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {pkg.auditStatus}
                    </span>
                  </td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm text-[#54585F]">{pkg.createdAt}</td>
                  <td className="border-b border-[#F5F6F7] px-6 py-4">
                    <div className="flex items-center gap-2 text-sm">
                      <button
                        onClick={() => openEditDrawer(pkg)}
                        className="rounded px-3 py-1 text-xs font-medium text-[#3F66FC] transition-colors hover:bg-[#F5F7FF]"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => openViewDrawer(pkg)}
                        className="rounded px-3 py-1 text-xs font-medium text-[#3F66FC] transition-colors hover:bg-[#F5F7FF]"
                      >
                        查看
                      </button>
                      {pkg.status === '草稿' && (
                        <button
                          onClick={() => setDeleteTarget(pkg)}
                          className="rounded px-3 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                        >
                          删除
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

      {showDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/30" onClick={closeDrawer}></div>
          <div className="absolute right-0 top-0 bottom-0 flex w-full max-w-2xl flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="font-semibold text-gray-900">{drawerTitle}</h2>
                {selectedPackage && <p className="mt-1 text-xs text-gray-500">{selectedPackage.id}</p>}
              </div>
              <button onClick={closeDrawer} className="rounded-lg p-2 transition-colors hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-2 border-b border-gray-200 px-6 py-3">
              <button
                onClick={() => setCurrentTab('basic')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  currentTab === 'basic' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                基础信息
              </button>
              <button
                onClick={() => setCurrentTab('product')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  currentTab === 'product' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                产品信息
              </button>
              <button
                onClick={() => setCurrentTab('media')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  currentTab === 'media' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                素材管理
              </button>
              <button
                onClick={() => setCurrentTab('audit')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  currentTab === 'audit' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                审核提交
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {currentTab === 'basic' && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      套餐名称 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={packageForm.name}
                      onChange={(e) => updatePackageForm('name', e.target.value)}
                      placeholder="最多20字"
                      disabled={isViewMode}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      套餐类型 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={packageForm.type}
                      onChange={(e) => updatePackageForm('type', e.target.value)}
                      disabled={isViewMode}
                      className={inputClassName}
                    >
                      <option>周包</option>
                      <option>月包</option>
                      <option>定制包</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      适配风险等级 <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2 rounded-lg border border-gray-200 p-4">
                      {targetAudienceOptions.map((item) => (
                        <label key={item} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={packageForm.targetAudience.includes(item)}
                            onChange={() => toggleAudience(item)}
                            disabled={isViewMode}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700">{item === '绿灯' ? '绿灯（低风险）' : '黄灯（中等风险）'}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">展示排序序号</label>
                    <input
                      type="number"
                      value={packageForm.sort}
                      onChange={(e) => updatePackageForm('sort', e.target.value)}
                      placeholder="数字越小排序越靠前"
                      disabled={isViewMode}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">上架状态</label>
                    <select
                      value={packageForm.status}
                      onChange={(e) => updatePackageForm('status', e.target.value)}
                      disabled={isViewMode}
                      className={inputClassName}
                    >
                      <option>草稿</option>
                      <option>已下架</option>
                      <option>已上架</option>
                    </select>
                  </div>
                </div>
              )}

              {currentTab === 'product' && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">产品成分</label>
                    <textarea
                      rows={3}
                      value={packageForm.ingredients}
                      onChange={(e) => updatePackageForm('ingredients', e.target.value)}
                      placeholder="输入产品成分信息"
                      disabled={isViewMode}
                      className={inputClassName}
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">热量（千卡）</label>
                      <input
                        type="number"
                        value={packageForm.calorie}
                        onChange={(e) => updatePackageForm('calorie', e.target.value)}
                        disabled={isViewMode}
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">蛋白质（克）</label>
                      <input
                        type="number"
                        value={packageForm.protein}
                        onChange={(e) => updatePackageForm('protein', e.target.value)}
                        disabled={isViewMode}
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">碳水（克）</label>
                      <input
                        type="number"
                        value={packageForm.carbs}
                        onChange={(e) => updatePackageForm('carbs', e.target.value)}
                        disabled={isViewMode}
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">脂肪（克）</label>
                      <input
                        type="number"
                        value={packageForm.fat}
                        onChange={(e) => updatePackageForm('fat', e.target.value)}
                        disabled={isViewMode}
                        className={inputClassName}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">食用方法</label>
                    <textarea
                      rows={3}
                      value={packageForm.usage}
                      onChange={(e) => updatePackageForm('usage', e.target.value)}
                      placeholder="输入食用方法"
                      disabled={isViewMode}
                      className={inputClassName}
                    ></textarea>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">合规宣传语</label>
                    <textarea
                      rows={3}
                      value={packageForm.slogan}
                      onChange={(e) => updatePackageForm('slogan', e.target.value)}
                      placeholder="输入宣传语，系统将自动检测违禁词"
                      disabled={isViewMode}
                      className={inputClassName}
                    ></textarea>
                    <p className="mt-1 text-xs text-gray-500">系统将自动校验医疗相关词汇</p>
                  </div>
                </div>
              )}

              {currentTab === 'media' && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      产品主图 <span className="text-red-500">*</span>
                    </label>
                    <div className="rounded-lg border-2 border-dashed border-gray-300 p-6">
                      {packageForm.coverImage ? (
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                          <div className="text-sm font-medium text-[#172C50]">当前主图</div>
                          <div className="mt-2 flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 text-sm text-[#54585F]">
                            <span className="truncate">{packageForm.coverImage}</span>
                            {!isViewMode && (
                              <button
                                type="button"
                                onClick={() => {
                                  setAuditError('');
                                  setPackageForm((prev) => ({ ...prev, coverImage: '' }));
                                }}
                                className="shrink-0 rounded px-2 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                              >
                                移除
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                          <p className="text-sm text-gray-600">{isViewMode ? '未上传主图' : '点击下方按钮模拟上传主图'}</p>
                          <p className="mt-1 text-xs text-gray-400">支持 JPG、PNG，建议尺寸 800x800</p>
                        </div>
                      )}
                      {!isViewMode && !packageForm.coverImage && (
                        <div className="mt-4 flex justify-center">
                          <button
                            type="button"
                            onClick={() => {
                              setAuditError('');
                              setPackageForm((prev) => ({ ...prev, coverImage: `${prev.name || 'service-package'}-cover.png` }));
                            }}
                            className="rounded-lg border border-[#526FEA] px-4 py-2 text-sm font-medium text-[#526FEA] transition-colors hover:bg-[#F5F7FF]"
                          >
                            上传主图
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">详情图（最多9张）</label>
                    <div className="rounded-lg border-2 border-dashed border-gray-300 p-6">
                      {packageForm.detailImages.length > 0 ? (
                        <div className="space-y-3">
                          {packageForm.detailImages.map((image, index) => (
                            <div key={`${image}-${index}`} className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#54585F]">
                              <span className="truncate">{image}</span>
                              {!isViewMode && (
                                <button
                                  type="button"
                                  onClick={() => removeDetailImage(index)}
                                  className="shrink-0 rounded px-2 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                                >
                                  删除
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                          <p className="text-sm text-gray-600">{isViewMode ? '未上传详情图' : '点击下方按钮模拟上传详情图'}</p>
                          <p className="mt-1 text-xs text-gray-400">可拖拽排序</p>
                        </div>
                      )}
                      {!isViewMode && packageForm.detailImages.length < 9 && (
                        <div className="mt-4 flex justify-center">
                          <button
                            type="button"
                            onClick={addDetailImage}
                            className="rounded-lg border border-[#526FEA] px-4 py-2 text-sm font-medium text-[#526FEA] transition-colors hover:bg-[#F5F7FF]"
                          >
                            新增详情图
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentTab === 'audit' && (
                <div className="space-y-4">
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <h3 className="mb-2 font-medium text-blue-900">填写完整度检测</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`h-4 w-4 rounded-full ${basicInfoComplete ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                        <span className="text-gray-700">
                          基础信息：{basicInfoComplete ? '已完成' : '请补充套餐名称和适配风险等级'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`h-4 w-4 rounded-full ${productInfoComplete ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                        <span className="text-gray-700">
                          产品信息：{productInfoComplete ? '已填写营养参数' : '请补充成分、营养参数、食用方法和宣传语'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`h-4 w-4 rounded-full ${mediaInfoComplete ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                        <span className="text-gray-700">
                          素材管理：{mediaInfoComplete ? `主图已上传，详情图 ${packageForm.detailImages.length} 张` : '请至少上传产品主图'}
                        </span>
                      </div>
                    </div>
                  </div>
                  {auditError && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{auditError}</div>}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">提交说明</label>
                    <textarea
                      rows={4}
                      value={packageForm.submitNote}
                      onChange={(e) => updatePackageForm('submitNote', e.target.value)}
                      placeholder="填写提交审核说明（选填）"
                      disabled={isViewMode}
                      className={inputClassName}
                    ></textarea>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button onClick={closeDrawer} className="rounded-lg px-4 py-2 text-gray-600 transition-colors hover:bg-gray-200">
                {isViewMode ? '关闭' : '取消'}
              </button>
              <button
                onClick={handlePrimaryAction}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                {isViewMode
                  ? '完成'
                  : currentTab === 'audit'
                    ? drawerMode === 'create'
                      ? '提交审核'
                      : '保存并提交'
                    : '保存并继续'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="font-semibold text-gray-900">删除服务包</h2>
              <p className="mt-1 text-xs text-gray-500">删除后将从当前列表移除，请确认操作。</p>
            </div>
            <div className="px-6 py-5 text-sm text-[#54585F]">
              确认删除服务包 “{deleteTarget.name}” 吗？
            </div>
            <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg px-4 py-2 text-gray-600 transition-colors hover:bg-gray-200"
              >
                取消
              </button>
              <button
                onClick={handleDeletePackage}
                className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
