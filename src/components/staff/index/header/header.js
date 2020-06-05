import React, { Component } from 'react'
import "antd/dist/antd.css";
import './header.css';
import {
    Layout, Row, Col, Menu, Badge, Dropdown
} from 'antd';


const { Header } = Layout;

class HeaderPage extends Component {
    render() {
        return (
            <Header className="header">
                <div className="logo" />
                <Row>
                    <Col className="nameBank" span={3} offset={1}><h3>Bảo Bình Đạt Bank</h3></Col>
                    <Col clasName="" span={3} offset={17} style={{ color: 'white' }}>
                        <span style={{ marginLeft: '7px', fontSize: '18px' }}> Hello Bảo</span>
                    </Col>
                </Row>

            </Header>
        )
    }
}

export default HeaderPage;
