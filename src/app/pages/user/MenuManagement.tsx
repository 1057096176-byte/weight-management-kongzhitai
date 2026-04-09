import { useState, Fragment } from 'react';
import { Plus, X } from 'lucide-react';

type ParentMenuSeed = {
  id: number;
  name: string;
  icon: string;
  path: string;
  type: string;
  sort: number;
  enabled: boolean;
  children: ChildMenuSeed[];
};

type ChildMenuSeed = {
  id: number;
  name: string;
  path: string;
  type: string;
  sort: number;
  enabled: boolean;
};

const menuData: ParentMenuSeed[] = [
  {
    id: 1,
    name: '首页',
    icon: '📊',
    path: '/',
    type: '页面',
    sort: 1,
    enabled: true,
    children: [],
  },
  {
    id: 2,
    name: '数据埋点',
    icon: '📈',
    path: '/data',
    type: '目录',
    sort: 2,
    enabled: true,
    children: [
      { id: 21, name: '数据概览', path: '/data/overview', type: '页面', sort: 1, enabled: true },
      { id: 22, name: '数据分析', path: '/data/analysis', type: '页面', sort: 2, enabled: true },
    ],
  },
  {
    id: 3,
    name: '代餐服务',
    icon: '🍱',
    path: '/meal',
    type: '目录',
    sort: 3,
    enabled: true,
    children: [
      { id: 31, name: '服务包维护', path: '/meal/service-package', type: '页面', sort: 1, enabled: true },
      { id: 32, name: '价格维护', path: '/meal/price', type: '页面', sort: 2, enabled: true },
    ],
  },
  {
    id: 4,
    name: '订单管理',
    icon: '🛒',
    path: '/order',
    type: '目录',
    sort: 4,
    enabled: true,
    children: [
      { id: 41, name: '订单记录', path: '/order/records', type: '页面', sort: 1, enabled: true },
      { id: 42, name: '发货记录', path: '/order/shipping', type: '页面', sort: 2, enabled: true },
    ],
  },
];

type ParentMenu = {
  id: number;
  name: string;
  icon: string;
  path: string;
  type: string;
  sort: number;
  enabled: boolean;
  level: 'parent';
};

type ChildMenu = {
  id: number;
  name: string;
  icon: string;
  path: string;
  type: string;
  sort: number;
  enabled: boolean;
  level: 'child';
  parentId: number;
};

type MenuItem = ParentMenu | ChildMenu;
type MenuFormState = {
  name: string;
  icon: string;
  path: string;
  type: string;
  sort: string;
  enabled: boolean;
  parentId: string;
};
type DialogMode = 'create' | 'edit';

const inputClassName = 'w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500';

const flattenMenuData = (): MenuItem[] =>
  menuData.flatMap((menu) => [
    {
      id: menu.id,
      name: menu.name,
      icon: menu.icon,
      path: menu.path,
      type: menu.type,
      sort: menu.sort,
      enabled: menu.enabled,
      level: 'parent' as const,
    },
    ...menu.children.map((child) => ({
      id: child.id,
      name: child.name,
      icon: '-',
      path: child.path,
      type: child.type,
      sort: child.sort,
      enabled: child.enabled,
      level: 'child' as const,
      parentId: menu.id,
    })),
  ]);

const createMenuForm = (menu?: MenuItem): MenuFormState => ({
  name: menu?.name ?? '',
  icon: menu?.level === 'parent' ? menu.icon : '📁',
  path: menu?.path ?? '',
  type: menu?.type ?? '页面',
  sort: String(menu?.sort ?? 1),
  enabled: menu?.enabled ?? true,
  parentId: menu?.level === 'child' ? String(menu.parentId) : '',
});

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(flattenMenuData());
  const [dialogMode, setDialogMode] = useState<DialogMode>('create');
  const [showEditor, setShowEditor] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [toggleTarget, setToggleTarget] = useState<MenuItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MenuItem | null>(null);
  const [menuForm, setMenuForm] = useState<MenuFormState>(createMenuForm());

  const parentMenus = menuItems.filter((item): item is ParentMenu => item.level === 'parent');
  const selectedMenuHasChildren =
    selectedMenu?.level === 'parent' && menuItems.some((item) => item.level === 'child' && item.parentId === selectedMenu.id);

  const updateMenu = (id: number, updater: (item: MenuItem) => MenuItem) => {
    setMenuItems((prev) => prev.map((item) => (item.id === id ? updater(item) : item)));
  };

  const openCreateEditor = () => {
    setDialogMode('create');
    setSelectedMenu(null);
    setMenuForm(createMenuForm());
    setShowEditor(true);
  };

  const openEditEditor = (menu: MenuItem) => {
    setDialogMode('edit');
    setSelectedMenu(menu);
    setMenuForm(createMenuForm(menu));
    setShowEditor(true);
  };

  const closeEditor = () => {
    setShowEditor(false);
    setSelectedMenu(null);
  };

  const handleSaveMenu = () => {
    const nextId = Math.max(...menuItems.map((item) => item.id)) + 1;
    const resolvedType = menuForm.parentId ? '页面' : menuForm.type;

    if (dialogMode === 'create') {
      const newItem: MenuItem = menuForm.parentId
        ? {
            id: nextId,
            name: menuForm.name || '新菜单',
            icon: '-',
            path: menuForm.path || '/new-path',
            type: resolvedType,
            sort: Number(menuForm.sort) || 1,
            enabled: menuForm.enabled,
            level: 'child',
            parentId: Number(menuForm.parentId),
          }
        : {
            id: nextId,
            name: menuForm.name || '新菜单',
            icon: menuForm.type === '目录' ? menuForm.icon || '📁' : '-',
            path: menuForm.path || '/new-path',
            type: menuForm.type,
            sort: Number(menuForm.sort) || 1,
            enabled: menuForm.enabled,
            level: 'parent',
          };

      setMenuItems((prev) => [...prev, newItem]);
    }

    if (dialogMode === 'edit' && selectedMenu) {
      const nextItem: MenuItem = menuForm.parentId
        ? {
            id: selectedMenu.id,
            name: menuForm.name || selectedMenu.name,
            icon: '-',
            path: menuForm.path || selectedMenu.path,
            type: resolvedType,
            sort: Number(menuForm.sort) || selectedMenu.sort,
            enabled: menuForm.enabled,
            level: 'child',
            parentId: Number(menuForm.parentId),
          }
        : {
            id: selectedMenu.id,
            name: menuForm.name || selectedMenu.name,
            icon: menuForm.type === '目录' ? menuForm.icon || (selectedMenu.level === 'parent' ? selectedMenu.icon : '📁') : '-',
            path: menuForm.path || selectedMenu.path,
            type: menuForm.type,
            sort: Number(menuForm.sort) || selectedMenu.sort,
            enabled: menuForm.enabled,
            level: 'parent',
          };

      setMenuItems((prev) => prev.map((item) => (item.id === selectedMenu.id ? nextItem : item)));
    }

    closeEditor();
  };

  const handleConfirmToggle = () => {
    if (!toggleTarget) {
      return;
    }

    updateMenu(toggleTarget.id, (item) => ({ ...item, enabled: !item.enabled }));
    setToggleTarget(null);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) {
      return;
    }

    setMenuItems((prev) =>
      prev.filter((item) => {
        if (item.id === deleteTarget.id) {
          return false;
        }
        if (deleteTarget.level === 'parent' && item.level === 'child' && item.parentId === deleteTarget.id) {
          return false;
        }
        return true;
      }),
    );
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6 rounded-[30px] border border-slate-200/80 bg-slate-50/90 p-5 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-semibold text-gray-900">菜单管理</h1>
          <p className="mt-1 text-sm text-gray-500">配置控制台菜单结构和显示顺序</p>
        </div>
        <button
          onClick={openCreateEditor}
          className="flex h-9 items-center gap-2 rounded bg-[#526FEA] px-4 text-sm font-normal text-white transition-colors hover:bg-[#425ED8]"
        >
          <Plus className="h-4 w-4" />
          新增菜单
        </button>
      </div>

      <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
        <p className="text-sm text-orange-800">
          ⚠️ 仅超级管理员可访问此页面。删除菜单前系统将检查是否有角色绑定，如有将提示确认并说明影响范围。
        </p>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="overflow-x-auto rounded-lg border border-[#F0F0F0]">
          <table className="w-full min-w-[980px] border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#FAFBFC]">
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">菜单名称</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">菜单图标</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">路由路径</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">菜单类型</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-right text-sm font-medium text-[#54585F]">排序</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">状态</th>
                <th className="border-b border-[#F0F0F0] px-6 py-3 text-left text-sm font-medium text-[#54585F]">操作</th>
              </tr>
            </thead>
            <tbody>
              {parentMenus.map((menu, index) => (
                <Fragment key={menu.id}>
                  <tr className={index % 2 === 0 ? 'bg-white' : 'bg-[#FCFDFE]'}>
                    <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm font-medium text-[#172C50]">{menu.name}</td>
                    <td className="border-b border-[#F5F6F7] px-6 py-4 text-lg">{menu.icon}</td>
                    <td className="border-b border-[#F5F6F7] px-6 py-4 font-mono text-sm text-[#54585F]">{menu.path}</td>
                    <td className="border-b border-[#F5F6F7] px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          menu.type === '目录' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {menu.type}
                      </span>
                    </td>
                    <td className="border-b border-[#F5F6F7] px-6 py-4 text-right text-sm text-[#172C50]">{menu.sort}</td>
                    <td className="border-b border-[#F5F6F7] px-6 py-4">
                      {menu.enabled ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          启用
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                          禁用
                        </span>
                      )}
                    </td>
                    <td className="border-b border-[#F5F6F7] px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditEditor(menu)}
                          className="rounded px-3 py-1 text-xs font-medium text-[#3F66FC] transition-colors hover:bg-[#F5F7FF]"
                        >
                          编辑
                        </button>
                        <button
                          onClick={() => setToggleTarget(menu)}
                          className="rounded px-3 py-1 text-xs font-medium text-[#2E8B57] transition-colors hover:bg-[#F2FBF6]"
                        >
                          {menu.enabled ? '禁用' : '启用'}
                        </button>
                        <button
                          onClick={() => setDeleteTarget(menu)}
                          className="rounded px-3 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                  {menuItems
                    .filter((item): item is ChildMenu => item.level === 'child' && item.parentId === menu.id)
                    .map((child) => (
                      <tr key={child.id} className="bg-[#F8FAFC]">
                        <td className="border-b border-[#F5F6F7] px-6 py-4 pl-12 text-sm text-[#172C50]">└─ {child.name}</td>
                        <td className="border-b border-[#F5F6F7] px-6 py-4 text-sm text-[#9AA4B2]">-</td>
                        <td className="border-b border-[#F5F6F7] px-6 py-4 font-mono text-sm text-[#54585F]">{child.path}</td>
                        <td className="border-b border-[#F5F6F7] px-6 py-4">
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                            {child.type}
                          </span>
                        </td>
                        <td className="border-b border-[#F5F6F7] px-6 py-4 text-right text-sm text-[#172C50]">{child.sort}</td>
                        <td className="border-b border-[#F5F6F7] px-6 py-4">
                          {child.enabled ? (
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              启用
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                              禁用
                            </span>
                          )}
                        </td>
                        <td className="border-b border-[#F5F6F7] px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditEditor(child)}
                              className="rounded px-3 py-1 text-xs font-medium text-[#3F66FC] transition-colors hover:bg-[#F5F7FF]"
                            >
                              编辑
                            </button>
                            <button
                              onClick={() => setToggleTarget(child)}
                              className="rounded px-3 py-1 text-xs font-medium text-[#2E8B57] transition-colors hover:bg-[#F2FBF6]"
                            >
                              {child.enabled ? '禁用' : '启用'}
                            </button>
                            <button
                              onClick={() => setDeleteTarget(child)}
                              className="rounded px-3 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                            >
                              删除
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-3 font-medium text-gray-900">菜单类型说明</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <span className="font-medium text-purple-600">目录：</span>
            <span>无路由，仅作分组，不可直接访问</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium text-blue-600">页面：</span>
            <span>有实际路由，点击跳转对应页面</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium text-green-600">按钮：</span>
            <span>操作级权限节点，用于角色管理中细粒度权限控制（不在菜单栏显示）</span>
          </div>
        </div>
      </div>

      {showEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-xl rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="font-semibold text-gray-900">{dialogMode === 'create' ? '新增菜单' : '编辑菜单'}</h2>
                <p className="mt-1 text-xs text-gray-500">配置菜单名称、路径、类型和排序</p>
              </div>
              <button onClick={closeEditor} className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4 p-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">菜单名称</label>
                <input
                  type="text"
                  value={menuForm.name}
                  onChange={(e) => setMenuForm((prev) => ({ ...prev, name: e.target.value }))}
                  className={inputClassName}
                />
              </div>
              {!menuForm.parentId && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">菜单图标</label>
                  <input
                    type="text"
                    value={menuForm.icon}
                    onChange={(e) => setMenuForm((prev) => ({ ...prev, icon: e.target.value }))}
                    className={inputClassName}
                  />
                </div>
              )}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">路由路径</label>
                <input
                  type="text"
                  value={menuForm.path}
                  onChange={(e) => setMenuForm((prev) => ({ ...prev, path: e.target.value }))}
                  className={inputClassName}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">菜单类型</label>
                  <select
                    value={menuForm.parentId ? '页面' : menuForm.type}
                    onChange={(e) => setMenuForm((prev) => ({ ...prev, type: e.target.value }))}
                    disabled={Boolean(menuForm.parentId)}
                    className={inputClassName}
                  >
                    <option>页面</option>
                    <option>目录</option>
                    <option>按钮</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">排序</label>
                  <input
                    type="number"
                    value={menuForm.sort}
                    onChange={(e) => setMenuForm((prev) => ({ ...prev, sort: e.target.value }))}
                    className={inputClassName}
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">所属目录</label>
                <select
                  value={menuForm.parentId}
                  onChange={(e) =>
                    setMenuForm((prev) => ({
                      ...prev,
                      parentId: e.target.value,
                      type: e.target.value ? '页面' : prev.type,
                      icon: e.target.value ? '📁' : prev.icon,
                    }))
                  }
                  disabled={Boolean(selectedMenuHasChildren)}
                  className={inputClassName}
                >
                  <option value="">作为一级菜单</option>
                  {parentMenus
                    .filter((parent) => parent.type === '目录' && parent.id !== selectedMenu?.id)
                    .map((parent) => (
                      <option key={parent.id} value={String(parent.id)}>
                        {parent.name}
                      </option>
                    ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  {selectedMenuHasChildren ? '当前菜单下存在子菜单，请先处理子菜单后再调整层级。' : '选择目录后将作为该目录下的子页面展示。'}
                </p>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={menuForm.enabled}
                  onChange={(e) => setMenuForm((prev) => ({ ...prev, enabled: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                启用菜单
              </label>
            </div>
            <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button onClick={closeEditor} className="rounded-lg px-4 py-2 text-gray-600 transition-colors hover:bg-gray-200">
                取消
              </button>
              <button
                onClick={handleSaveMenu}
                className="rounded-lg bg-[#526FEA] px-4 py-2 text-white transition-colors hover:bg-[#425ED8]"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {toggleTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="font-semibold text-gray-900">{toggleTarget.enabled ? '禁用菜单' : '启用菜单'}</h2>
              <p className="mt-1 text-xs text-gray-500">状态变更后将立即影响后台菜单展示。</p>
            </div>
            <div className="px-6 py-5 text-sm text-[#54585F]">
              确认{toggleTarget.enabled ? '禁用' : '启用'}“{toggleTarget.name}”吗？
            </div>
            <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                onClick={() => setToggleTarget(null)}
                className="rounded-lg px-4 py-2 text-gray-600 transition-colors hover:bg-gray-200"
              >
                取消
              </button>
              <button
                onClick={handleConfirmToggle}
                className="rounded-lg bg-[#526FEA] px-4 py-2 text-white transition-colors hover:bg-[#425ED8]"
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="font-semibold text-gray-900">删除菜单</h2>
              <p className="mt-1 text-xs text-gray-500">请确认该菜单不再被角色权限引用。</p>
            </div>
            <div className="px-6 py-5 text-sm text-[#54585F]">
              {deleteTarget.level === 'parent'
                ? `确认删除目录“${deleteTarget.name}”及其下属子菜单吗？`
                : `确认删除菜单“${deleteTarget.name}”吗？`}
            </div>
            <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg px-4 py-2 text-gray-600 transition-colors hover:bg-gray-200"
              >
                取消
              </button>
              <button
                onClick={handleConfirmDelete}
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
