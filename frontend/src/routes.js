import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/TableList.js";
import Maps from "views/Maps.js";
import Upgrade from "views/Upgrade.js";
import UserPage from "views/UserPage.js";
import UserForm from "components/User/UserForm.js";
import OrganizationForm from "components/Organization/OrganizationForm.js";
import OrganizationList from "components/Organization/OrganizationList.js";
import UserList from "components/User/UsersList.js";

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
    sidebar: true,
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "ui-1_bell-53",
    component: <Notifications />,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "users_single-02",
    component: <UserPage />,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/extended-tables",
    name: "Table List",
    icon: "files_paper",
    component: <TableList />,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "design-2_ruler-pencil",
    component: <Typography />,
    layout: "/admin",
    sidebar: true,
  },
  {
    pro: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "objects_spaceship",
    component: <Upgrade />,
    layout: "/admin",
    sidebar: true,
  },
];
export default dashRoutes;
