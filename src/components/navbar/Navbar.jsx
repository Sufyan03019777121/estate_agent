import React from "react";
import { Layout, Typography, Avatar, Dropdown, Menu } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import "./navbar.css"

const { Header } = Layout;
const { Title } = Typography;

export default function Navbar() {
    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<UserOutlined />}>Profile</Menu.Item>
            <Menu.Item key="2" icon={<LogoutOutlined />}>Logout</Menu.Item>
        </Menu>
    );

    return (
        <Header className="navbar_header" >
            <Title level={3} className="title">Agent Portal</Title>
            <Dropdown overlay={menu} trigger={['click']}>
                <Avatar className="avatar" icon={<UserOutlined />} />
            </Dropdown>
        </Header>
    );
}
