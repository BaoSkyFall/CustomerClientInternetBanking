import React, { Component } from 'react';
import { Table, Spin, notification, Icon, Popconfirm } from 'antd';
import { Redirect } from 'react-router-dom';
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../configs/client'
class PaymentAccounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accessToken = localStorage.getItem(ACCESS_TOKEN_KEY),
            email = localStorage.getItem(EMAIL_KEY)


        }
    }

    render() {
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

      

        return (
            <div>

            </ div>
        );
    }
}

export default PaymentAccounts;