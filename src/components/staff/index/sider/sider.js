import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import "antd/dist/antd.css";
import {
    Layout, Menu
} from 'antd';
import {UserOutlined,UsergroupAddOutlined,BookOutlined,TransactionOutlined } from '@ant-design/icons'

const { SubMenu } = Menu;
const {  Sider } = Layout;


class SiderPage extends Component {
    render() {
        return (
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[this.props.hover]}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <SubMenu key="sub1" title={<span><UserOutlined />Staff</span>}>
                        <Menu.Item key="1" icon={<UsergroupAddOutlined />}><Link to="register">New Account</Link></Menu.Item>
                        <Menu.Item key="2" icon={<BookOutlined />}><Link to="payment">Get User Info</Link></Menu.Item>
                        <Menu.Item key="3" icon={<TransactionOutlined />}><Link to="recharge">Recharge</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

export default SiderPage;
