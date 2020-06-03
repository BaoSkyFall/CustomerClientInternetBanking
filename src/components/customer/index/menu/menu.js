import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
import { MENUITEM } from '../../../../configs/client';
import './menu.css';

class MenuLeft extends React.Component {
    state = {
        collapsed: false,
    }

    toggleCollapsed = () => {
        this.props.updateCollapse(!this.state.collapsed);
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
            >
                <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>
                <Menu.Item key="1" icon={<PieChartOutlined />} >
                    <Link to={MENUITEM.PAYMENT_ACCOUNTS} >
                        <span>Dashboard</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    <Link to={MENUITEM.INTERNAL_TRANSFER} >
                        <span>Internal Tranfer</span>
                    </Link>          </Menu.Item>
                <Menu.Item key="3" icon={<ContainerOutlined />}>
                    <Link to={MENUITEM.SETUP_RECIPIENT} >
                        <span>Setup Recipient</span>
                    </Link>          </Menu.Item>
                <Menu.Item key="4" icon={<ContainerOutlined />}>
                    <Link to={MENUITEM.TRANSACTION_HISTORY} >
                        <span>Transaction History</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<ContainerOutlined />}>
                    <Link to={MENUITEM.CLOSE_WALLET} >
                        <span>Close Wallet</span>
                    </Link>
                </Menu.Item>
            </Menu>
        );
    }
}

export default MenuLeft;