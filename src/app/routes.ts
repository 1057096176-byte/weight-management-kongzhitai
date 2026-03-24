import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import DataOverview from "./pages/data/DataOverview";
import DataAnalysis from "./pages/data/DataAnalysis";
import ServicePackage from "./pages/meal/ServicePackage";
import PriceManagement from "./pages/meal/PriceManagement";
import OrderRecords from "./pages/order/OrderRecords";
import ShippingRecords from "./pages/order/ShippingRecords";
import UserList from "./pages/user/UserList";
import RoleManagement from "./pages/user/RoleManagement";
import MenuManagement from "./pages/user/MenuManagement";
import OperationLog from "./pages/system/OperationLog";
import MessageTemplate from "./pages/system/MessageTemplate";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "data/overview", Component: DataOverview },
      { path: "data/analysis", Component: DataAnalysis },
      { path: "meal/service-package", Component: ServicePackage },
      { path: "meal/price", Component: PriceManagement },
      { path: "order/records", Component: OrderRecords },
      { path: "order/shipping", Component: ShippingRecords },
      { path: "user/list", Component: UserList },
      { path: "user/roles", Component: RoleManagement },
      { path: "user/menu", Component: MenuManagement },
      { path: "system/logs", Component: OperationLog },
      { path: "system/messages", Component: MessageTemplate },
    ],
  },
]);
