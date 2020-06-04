import React from 'react';
import HeaderPage from './header/header'
import MenuLeft from './menu/menu';
import Content from './content/content';
import './index.css'
import { Row, Col } from 'antd';

import { ACCESS_TOKEN_KEY } from '../../../configs/client';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false
        }
    }

    updateCollapse = (collapse) => {
        this.setState({ collapse });
    }

    render() {
        let GirdLayout;
        console.log('this.props.match: ',this.props.match)
        if (this.state.collapse) {
            GirdLayout = (<Row>
                <Col span={2}>
                    <MenuLeft updateCollapse={this.updateCollapse}/>                    
                </Col>
                <Col span={22}>
                    <Content content_type = {this.props.match.params.type}/>              
                </Col>
            </Row>);
        }
        else {
            GirdLayout = (<Row>
                <Col span={5} className="col-left">
                    <MenuLeft updateCollapse={this.updateCollapse}/>                    
                </Col>
                <Col span={18} offset={1} className="col-right">
                    <Content content_type = {this.props.match.params.type}/>              
                </Col>
            </Row>);
        }

        return (
            <React.Fragment>
                <HeaderPage />
                {GirdLayout}
            </React.Fragment>
        )
    }
}

export default Dashboard;