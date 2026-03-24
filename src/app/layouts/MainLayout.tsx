import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  BarChart3, 
  ShoppingBag, 
  ShoppingCart, 
  Users, 
  Settings,
  Menu,
  X,
  Bell,
  FileText,
  LogOut,
  ChevronDown,
  TrendingUp,
  Package,
  DollarSign,
  ClipboardList,
  Truck,
  UserCircle,
  Shield,
  List,
  ScrollText,
  MessageSquare
} from 'lucide-react';

interface MenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    key: 'dashboard',
    label: '首页',
    icon: <LayoutDashboard className="w-5 h-5" />,
    path: '/',
  },
  {
    key: 'data',
    label: '数据埋点',
    icon: <BarChart3 className="w-5 h-5" />,
    children: [
      {
        key: 'data-overview',
        label: '数据概览',
        icon: <TrendingUp className="w-4 h-4" />,
        path: '/data/overview',
      },
      {
        key: 'data-analysis',
        label: '数据分析',
        icon: <BarChart3 className="w-4 h-4" />,
        path: '/data/analysis',
      },
    ],
  },
  {
    key: 'meal',
    label: '代餐服务',
    icon: <ShoppingBag className="w-5 h-5" />,
    children: [
      {
        key: 'service-package',
        label: '服务包维护',
        icon: <Package className="w-4 h-4" />,
        path: '/meal/service-package',
      },
      {
        key: 'price',
        label: '价格维护',
        icon: <DollarSign className="w-4 h-4" />,
        path: '/meal/price',
      },
    ],
  },
  {
    key: 'order',
    label: '订单管理',
    icon: <ShoppingCart className="w-5 h-5" />,
    children: [
      {
        key: 'order-records',
        label: '订单记录',
        icon: <ClipboardList className="w-4 h-4" />,
        path: '/order/records',
      },
      {
        key: 'shipping-records',
        label: '发货记录',
        icon: <Truck className="w-4 h-4" />,
        path: '/order/shipping',
      },
    ],
  },
  {
    key: 'user',
    label: '用户管理',
    icon: <Users className="w-5 h-5" />,
    children: [
      {
        key: 'user-list',
        label: '用户列表',
        icon: <UserCircle className="w-4 h-4" />,
        path: '/user/list',
      },
      {
        key: 'roles',
        label: '角色管理',
        icon: <Shield className="w-4 h-4" />,
        path: '/user/roles',
      },
      {
        key: 'menu',
        label: '菜单管理',
        icon: <List className="w-4 h-4" />,
        path: '/user/menu',
      },
    ],
  },
  {
    key: 'system',
    label: '系统设置',
    icon: <Settings className="w-5 h-5" />,
    children: [
      {
        key: 'logs',
        label: '操作日志',
        icon: <ScrollText className="w-4 h-4" />,
        path: '/system/logs',
      },
      {
        key: 'messages',
        label: '消息模板',
        icon: <MessageSquare className="w-4 h-4" />,
        path: '/system/messages',
      },
    ],
  },
];

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['data', 'meal', 'order', 'user', 'system']);
  const location = useLocation();

  const toggleExpand = (key: string) => {
    setExpandedKeys(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const isParentActive = (children?: MenuItem[]) => {
    if (!children) return false;
    return children.some(child => child.path && location.pathname === child.path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
        <div className="h-full flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white">控</span>
              </div>
              <span className="font-semibold text-lg">体重管理控制台</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <FileText className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg cursor-pointer">
              <UserCircle className="w-5 h-5" />
              <span className="text-sm font-medium">张三</span>
              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded">超级管理员</span>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-red-600">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="pt-16 flex">
        {/* 侧边栏 */}
        <aside
          className={`fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200 transition-all duration-300 overflow-y-auto ${
            collapsed ? 'w-0' : 'w-64'
          }`}
        >
          <nav className="p-4">
            {menuItems.map((item) => (
              <div key={item.key} className="mb-2">
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleExpand(item.key)}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all ${
                        isParentActive(item.children)
                          ? 'bg-blue-50 text-blue-600'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          expandedKeys.includes(item.key) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedKeys.includes(item.key) && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.key}
                            to={child.path || '#'}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                              isActive(child.path)
                                ? 'bg-blue-600 text-white'
                                : 'hover:bg-gray-50 text-gray-600'
                            }`}
                          >
                            {child.icon}
                            <span className="text-sm">{child.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path || '#'}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive(item.path)
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* 主内容区 */}
        <main
          className={`flex-1 transition-all duration-300 ${
            collapsed ? 'ml-0' : 'ml-64'
          }`}
        >
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
