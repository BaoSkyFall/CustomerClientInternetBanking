import React from 'react';
import HeaderPage from './header/header'
import MenuLeft from './menu/menu';
import Content from './content/content';
import './index.css'
import { Row, Col, notification } from 'antd';

import { ACCESS_TOKEN_KEY } from '../../../configs/client';
const firebase = require("firebase");

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            notifications: null,
            isRead:true
        }
    }

    updateCollapse = (collapse) => {
        this.setState({ collapse });
    }

    componentDidMount = () => {
        console.log("componentDidMount work!")
        firebase.auth().onAuthStateChanged(async _usr => {
            if (!_usr)
                this.props.history.push('/login');
            else {
                await firebase
                    .firestore()
                    .collection('users')
                    .where('email', '==', _usr.email)
                    .onSnapshot(async res => {
                        const data = res.docs.map(_doc => _doc.data());
                        console.log('data:', data)
                        await this.setState({
                            notifications: data[0].notifications,
                            isRead: data[0].isRead
                        });
                    })
            }
        });
    }
    render() {
        let GirdLayout;
        const {notifications,isRead}= this.state;
 
        if (this.state.collapse) {
            GirdLayout = (<Row>
                <Col span={2}>
                    <MenuLeft updateCollapse={this.updateCollapse} />
                </Col>
                <Col span={22}>
                    <Content content_type={this.props.match.params.type} />
                </Col>
            </Row>);
        }
        else {
            GirdLayout = (<Row>
                <Col span={5} className="col-left">
                    <MenuLeft updateCollapse={this.updateCollapse} />
                </Col>
                <Col span={18} offset={1} className="col-right">
                    <Content content_type={this.props.match.params.type} />
                </Col>
            </Row>);
        }

        return (
            <React.Fragment>
                <HeaderPage isRead={isRead}notifications={notifications} />
                {GirdLayout}
            </React.Fragment>
        )
    }
}

export default Dashboard;