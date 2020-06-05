import React from 'react';
import { Table, notification, Spin, Card, Row, Col,Button } from 'antd';
import {PlusSquareOutlined} from '@ant-design/icons';
import { Redirect } from 'react-router-dom';

import './debt-reminder.css';
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../../configs/client';
import { formatTransaction } from '../../../ultis/transaction';
import { URL_SERVER } from '../../../configs/server';
import { WarningOutlined } from '@ant-design/icons';

class DebtReminder extends React.Component {
    constructor(props) {
        super(props);

        this.columnsDebtReminders = [{
            title: 'Creditor',
            dataIndex: 'creditor',
            defaultSortOrder: 'descend',
            width: '18%',
            sorter: (a, b) => a.creditor.localeCompare(b.creditor),
        }, {
            title: 'Wallet ID',
            dataIndex: 'walletID',
            width: '18%',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.walletID.localeCompare(b.walletID),
        }, {
            title: 'Date Create',
            dataIndex: 'dateCreate',
            defaultSortOrder: 'descend',
            width: '20%',
            sorter: (a, b) => a.dateCreate.localeCompare(b.dateCreate),
        }, {
            title: 'Amount (VND)',
            className: 'column-money',
            dataIndex: 'amount',
            defaultSortOrder: 'descend',
            width: '15%',
            sorter: (a, b) => a.amount.localeCompare(b.amount),
        }, {
            title: "Description",
            dataIndex: 'message',
            defaultSortOrder: 'descend',
        }];
        this.columnsDebtOwners = [{
            title: 'Debtor',
            dataIndex: 'debtor',
            defaultSortOrder: 'descend',
            width: '18%',
            sorter: (a, b) => a.debtor.localeCompare(b.debtor),
        }, {
            title: 'Wallet ID',
            dataIndex: 'walletID',
            width: '18%',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.walletID.localeCompare(b.walletID),
        }, {
            title: 'Date Create',
            dataIndex: 'dateCreate',
            defaultSortOrder: 'descend',
            width: '20%',
            sorter: (a, b) => a.dateCreate.localeCompare(b.dateCreate),
        }, {
            title: 'Amount (VND)',
            className: 'column-money',
            dataIndex: 'amount',
            defaultSortOrder: 'descend',
            width: '15%',
            sorter: (a, b) => a.amount.localeCompare(b.amount),
        }, {
            title: "Description",
            dataIndex: 'message',
            defaultSortOrder: 'descend',
        }];
        this.state = {
            accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
            email: localStorage.getItem(EMAIL_KEY) || ''
        }
    }

    componentDidMount() {
        const { accessToken, email } = this.state;
        // this.props.fetchTransactionHistory(email, accessToken);

        // fetch(`${URL_SERVER}/user/me`, {
        //     headers: {
        //         x_accesstoken: accessToken
        //     }
        // })
        // .then(res => res.json())
        // .then(res => {
        //     if (res.status === 200) {
        //         localStorage.setItem(EMAIL_KEY, res.data.email)
        //         localStorage.setItem('role', res.data.role)
        //         if (res.data.role !== 'customer') 
        //             window.location.href = '/signin';
        //     }
        //     else {
        //         localStorage.removeItem(ACCESS_TOKEN_KEY);
        //         localStorage.removeItem(EMAIL_KEY);
        //         localStorage.removeItem('role');
        //         window.location.href = '/signin';
        //     }
        // })
    }

    render() {
        const { isLoading, debtReminders, messageError } = this.props;
        console.log("debt reminder: ", this.props)
        if (messageError === 'AccessToken is not valid') {
            // this.props.resetStore();
            return (<Redirect to={{
                pathname: '/signin',
            }} />);
        }

        const contentLayout = (
            <React.Fragment>
                {messageError ?
                    notification.open({
                        message: messageError,
                        icon: <WarningOutlined style={{ color: 'red' }} />,
                    }) : null}
                <Card title="Debt Reminder List" bordered={false} style={{ width: '90%' }}>
                    <Row>
                        <Col span={2}>
                            <Button
                                type="primary"
                                icon={<PlusSquareOutlined />}
                                onClick={()=>{}}>Add Debt Reminder</Button>
                        </Col>
                    </Row>
                    <Table
                        columns={this.columnsDebtReminders}
                        dataSource={formatTransaction(debtReminders)}
                        onChange={this.handleChange}
                        pagination={{ pageSize: 10 }}
                        scroll={{ y: '60vh' }}
                        bordered />
                </Card>
                <hr />
                <Card title="Debt Owner List" bordered={false} style={{ width: '90%' }}>
                    <Table
                        columns={this.columnsDebtOwners}
                        dataSource={formatTransaction(debtReminders)}
                        onChange={this.handleChange}
                        pagination={{ pageSize: 10 }}
                        scroll={{ y: '60vh' }}
                        bordered />
                </Card>

            </React.Fragment>
        )

        return (
            <div className='main-content transaction-history'>

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
export default DebtReminder; 