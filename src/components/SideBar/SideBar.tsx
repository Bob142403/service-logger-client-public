import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Outlet, useLoaderData, useNavigate } from "react-router";
import "./SideBar.css";
import Cookies from "universal-cookie";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/auth/auth-reducer";

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Profile", "", <UserOutlined />, [
    getItem("Edit Profile", "edit"),
    getItem("Log out", "logout", <ExportOutlined />),
  ]),
  getItem("Service", "/service", <PieChartOutlined />),
  getItem("Log", "/log", <DesktopOutlined />),
];

interface SideBarContextInterface {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}
export const ModalOpen = createContext<SideBarContextInterface>({
  isModalOpen: false,
  setIsModalOpen: () => false,
});

function SideBar() {
  const cookies = new Cookies();
  const loader = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    dispatch(setAuth(loader));
  }, [dispatch, loader]);

  return (
    <ModalOpen.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
      }}
    >
      <Layout className="layout">
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ background: colorBgContainer }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            onClick={(event) => {
              const key = event.key;
              if (key === "edit") {
                setIsModalOpen(true);
              } else {
                if (key === "logout") {
                  cookies.set("token", "");
                  navigate("/login");
                } else navigate(key);
              }
            }}
            defaultSelectedKeys={["1"]}
            mode="vertical"
            style={{ borderRight: 0 }}
            items={items}
          />
        </Sider>
        <Layout>
          <Content className="content">
            <div
              style={{ background: colorBgContainer }}
              className="content_div"
            >
              <Outlet />
            </div>
          </Content>
          <EditProfileModal />
          <Footer className="footer">
            Service logger ©2023 Created by Bob
          </Footer>
        </Layout>
      </Layout>
    </ModalOpen.Provider>
  );
}

export default SideBar;
