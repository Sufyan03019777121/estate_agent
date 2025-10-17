import React, { useState } from "react";
import { Button, Layout, Menu } from "antd";
import {
  DashboardOutlined,
  FormOutlined,
  UnorderedListOutlined,
  MailOutlined,
  CrownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import "./Sidebar.css";

const { Sider } = Layout;

export default function Sidebar({ setPage }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      trigger={null}
      className="sidebar-modern"
    >
      {/* ✅ Header Section */}
      <div className="sidebar-header-modern">
        {!collapsed && <h3 className="sidebar-title-modern">IssttaGroup</h3>}
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="sidebar-toggle-btn"
        />
      </div>

      {/* ✅ Menu */}
      <Menu
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        className="sidebar-menu-modern"
      >
        <Menu.Item
          key="dashboard"
          icon={<DashboardOutlined />}
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="newListing"
          icon={<FormOutlined />}
          onClick={() => setPage("newListing")}
        >
          New Listing
        </Menu.Item>
        <Menu.Item
          key="myListings"
          icon={<UnorderedListOutlined />}
          onClick={() => setPage("myListings")}
        >
          My Listings
        </Menu.Item>
        <Menu.Item
          key="inquiries"
          icon={<MailOutlined />}
          onClick={() => setPage("inquiries")}
        >
          Inquiries
        </Menu.Item>
        <Menu.Item
          key="upgrade"
          icon={<CrownOutlined />}
          onClick={() => setPage("upgrade")}
        >
          Upgrade / Promotion
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
