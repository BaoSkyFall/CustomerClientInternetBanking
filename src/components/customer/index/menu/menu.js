import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button } from 'antd';
import {
    WalletOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SwapOutlined,
    UserSwitchOutlined,
    LogoutOutlined,
    FormOutlined,
    CreditCardOutlined,
    DollarCircleOutlined
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
                <Menu.Item key="1" icon={<WalletOutlined />} >
                    <Link to={MENUITEM.PAYMENT_ACCOUNTS} >
                        <span>Dashboard</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<SwapOutlined />}>
                    <Link to={MENUITEM.INTERNAL_TRANSFER} >
                        <span>Tranfer Monney</span>
                    </Link>          </Menu.Item>
                <Menu.Item key="3" icon={<CreditCardOutlined />
                }>
                    <Link to={MENUITEM.DEBT_REMINDER} >
                        <span>Debt Reminder</span>
                    </Link>          </Menu.Item>
                <Menu.Item key="4" icon={<DollarCircleOutlined />}>
                    <Link to={MENUITEM.TRANSACTION_HISTORY} >
                        <span>Saving</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<UserSwitchOutlined />}>
                    <Link to={MENUITEM.SETUP_RECIPIENT} >
                        <span>Setup Recipient</span>
                    </Link>          </Menu.Item>
                <Menu.Item key="6" icon={<FormOutlined />}>
                    <Link to={MENUITEM.TRANSACTION_HISTORY} >
                        <span>Transaction History</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="7" icon={<LogoutOutlined />}>
                    <Link to="/" >
                        <span>Logout</span>
                    </Link>
                </Menu.Item>
            </Menu>
        );
    }
}

export default MenuLeft;