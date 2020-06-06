import React, { Component } from 'react'
import "antd/dist/antd.css";
import './header.css';
import {
    Layout, Row, Col, Menu, Badge, Dropdown
} from 'antd';
import { BellOutlined,BuildOutlined } from '@ant-design/icons';

const { Header } = Layout;

class HeaderPage extends Component {

    render() {
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a href="http://www.alipay.com/">1st menu item</a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="http://www.taobao.com/">2nd menu item</a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3">3rd menu item</Menu.Item>
            </Menu>
        );
        return (
            <Header className="header">
                <div className="logo" />
                <Row>
                    <Col className="nameBank" span={3} offset={1}><h3><BuildOutlined style={{fontSize:'25px',marginRight:'5px',fontWeight:'bold'}}/>Bảo Bình Đạt Bank</h3></Col>
                    <Col clasName="" span={3} offset={17} style={{ color: 'white' }}>
                        <Dropdown overlay={menu} trigger={['click']}>

                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <Badge dot>
                                    <BellOutlined style={{ fontSize: '20px' }} />
                                </Badge>
                            </a>
                        </Dropdown>
                        <span style={{marginLeft:'7px',fontSize:'18px'}}> Hello Bảo</span>
                    </Col>
                </Row>

            </Header>
        )
    }
}

export default HeaderPage;
