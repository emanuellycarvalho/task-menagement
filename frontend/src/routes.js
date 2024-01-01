import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/TableList.js";
import Maps from "views/Maps.js";
import UserPage from "views/UserPage.js";
import UserForm from "components/User/UserForm.js";
import OrganizationList from "components/Organization/OrganizationList.js";
import TaskList from "components/Task/TaskList.js";
import UserList from "components/User/UserList.js";
import LoginForm from "views/LoginForm";

const dashRoutes = [
  {
    path: "/user/add",
    name: "New User",
    icon: "users_single-02",
    component: <UserForm create={true}/>,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/user/:userId/edit",
    name: "Edit User",
    icon: "users_single-02",
    component: <UserForm create={false}/>,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/login",
    name: "Login",
    icon: "users_single-02",
    component: <LoginForm/>,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "business_chart-bar-32",
    component: <Dashboard />,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/organizations",
    name: "Organizations",
    icon: "business_badge",
    component: <OrganizationList />,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/users",
    name: "Users",
    icon: "users_single-02",
    component: <UserList />,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/tasks",
    name: "Tasks",
    icon: "design_bullet-list-67",
    component: <TaskList />,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "design_image",
    component: <Icons />,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "location_map-big",
    component: <Maps />,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "ui-1_bell-53",
    component: <Notifications />,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "users_single-02",
    component: <UserPage />,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/extended-tables",
    name: "Table List",
    icon: "files_paper",
    component: <TableList />,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "design-2_ruler-pencil",
    component: <Typography />,
    layout: "/admin",
    sidebar: false,
  },
];
export default dashRoutes;
