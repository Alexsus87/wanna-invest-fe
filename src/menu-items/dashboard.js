// assets
import { DashboardOutlined, GlobalOutlined } from "@ant-design/icons";

// icons
const icons = {
  DashboardOutlined,
  GlobalOutlined,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: "group-dashboard",
  title: "Navigation",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: "Dashboard",
      type: "item",
      url: "/dashboard/default",
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
    {
      id: "globe",
      title: "Globe",
      type: "item",
      url: "/globe",
      icon: icons.GlobalOutlined,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
