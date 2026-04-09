import { createHashRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import DataOverview from "./pages/data/DataOverview";
import DataAnalysis from "./pages/data/DataAnalysis";
// 代餐服务 - 暂时隐藏，代码保留
// import ServicePackage from "./pages/meal/ServicePackage";
// import PriceManagement from "./pages/meal/PriceManagement";
// 订单管理 - 暂时隐藏，代码保留
// import OrderRecords from "./pages/order/OrderRecords";
// import ShippingRecords from "./pages/order/ShippingRecords";
import UserList from "./pages/user/UserList";
import RoleManagement from "./pages/user/RoleManagement";
import MenuManagement from "./pages/user/MenuManagement";
import OperationLog from "./pages/system/OperationLog";
import MessageTemplate from "./pages/system/MessageTemplate";

export const router = createHashRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "data/overview", Component: DataOverview },
      { path: "data/analysis", Component: DataAnalysis },
      // 代餐服务 - 暂时隐藏，代码保留
      // { path: "meal/service-package", Component: ServicePackage },
      // { path: "meal/price", Component: PriceManagement },
      // 订单管理 - 暂时隐藏，代码保留
      // { path: "order/records", Component: OrderRecords },
      // { path: "order/shipping", Component: ShippingRecords },
      { path: "user/list", Component: UserList },
      { path: "user/roles", Component: RoleManagement },
      { path: "user/menu", Component: MenuManagement },
      { path: "system/logs", Component: OperationLog },
      { path: "system/messages", Component: MessageTemplate },
    ],
  },
]);

