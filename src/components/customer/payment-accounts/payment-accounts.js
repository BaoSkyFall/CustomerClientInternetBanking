import React, { Component } from 'react';
import { Table,Spin, notification, Popconfirm } from 'antd';
import {WarningOutlined} from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
import { formatWallet } from '../../../ultis/wallet';
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../../configs/client'
class PaymentAccounts extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            accessToken : localStorage.getItem(ACCESS_TOKEN_KEY),
            email : localStorage.getItem(EMAIL_KEY)


        }
    }

    render() {
        const { messageError, isLoading } = this.props;

        const columns = [{
            title: 'User\'s Wallet Number',
            dataIndex: 'walletNumber',
            width: '30%',
            sorter: (a, b) => a.walletNumber.localeCompare(b.walletNumber),
        }, {
            title: 'Current Balance (VND)',
            dataIndex: 'balance',
            width: '40%',
            className: 'column-money',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.balance - b.balance,
        }];

        if (messageError === 'AccessToken is not valid') {
            // this.props.resetStore();
            return (<Redirect to={{
                // pathname: '/signin',
            }} />);
        }

        if (messageError === 'AccessToken is not valid') {
            // this.props.resetStore();
            return (<Redirect to={{
                // pathname: '/signin',
            }} />);
        }
        const contentLayout = (
            <React.Fragment>
                {messageError ?
                    notification.open({
                        message: messageError,
                        icon: <WarningOutlined style={'color:red'}/>,
                    }) : null}

                <Table
                    columns={columns}
                    dataSource={formatWallet(this.props.paymentAccounts)}
                    pagination={{ pageSize: 10 }}
                    scroll={{ y: '60vh' }}
                    bordered />
            </React.Fragment>
        )

        return (
            <div className='main-content payment-account'>
                {isLoading && (
                    <Spin tip="Loading ..." size='large'>
                        {contentLayout}
                    </Spin>
                )}

                {!isLoading && contentLayout}
            </div>
        );
    }
}

export default PaymentAccounts;