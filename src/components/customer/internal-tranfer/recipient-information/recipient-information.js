import React, { Component } from 'react';
import { Input, Card, Select, Form, Button, Tabs } from 'antd';
import { UsergroupAddOutlined,RetweetOutlined, InteractionFilled, BankOutlined } from '@ant-design/icons';
import './recipient-information.css'
const Option = Select.Option;
const { TabPane } = Tabs;
class Recipient extends Component {
    tabsRef = React.createRef();
    constructor(props) {
        super(props);

        this.state = {
            value: '',
        }
    }

    handleChange = (value) => {
        this.setState({ value });
    }

    handleSelectLocal = (value) => {
        const { accessToken } = this.props;
        this.props.trackRecipientLocal(value, accessToken);
    }
    handleSelectForeign = (value) => {
        const { accessToken } = this.props;
        this.props.trackRecipientForeign(value, accessToken);
    }

    handleAdd = () => {
        const { value } = this.state;
        const { accessToken, email } = this.props;
        this.props.addRecipient(email, value, '', accessToken);
    }

    recipientLocalWalletsLayout = () => {
        const { recipientsLocal } = this.props;
        let options = [];

        if (recipientsLocal.length === 0)
            return (
                <Option value=''>Not RecipientsLocal</Option>
            );
        console.log('recipientsLocal:', recipientsLocal)
        recipientsLocal.forEach(recipient => {
            options.push(
                <Option value={recipient.walletId}>
                    {recipient.walletId}
                    <small style={{ float: "right" }}>{recipient.walletId}</small>
                </Option>
            )
        });
        const { b } = this.props


        return options;
    }
    recipientForeignWalletsLayout = () => {
        const { recipientsForeign } = this.props;
        let options = [];

        if (recipientsForeign.length === 0)
            return (
                <Option value=''>Not RecipientsForeign</Option>
            );
        console.log('recipientsForeign:', recipientsForeign)
        recipientsForeign.forEach(recipient => {
            options.push(
                <Option value={recipient.walletId}>
                    {recipient.walletId}
                    <small style={{ float: "right" }}>{recipient.walletId}</small>
                </Option>
            )
        });
        const { b } = this.props


        return options;
    }
    render() {

        const { emailRecipient, bankRecipient, fullNameRecipient } = this.props;

        return (
            <Card
                title="Information Of Recipient"
                style={{ width: "90%" }}
            >
                <Tabs onChange={()=>{
                    this.props.resetStore();
                }}
                 ref={this.tabsRef} defaultActiveKey="1">
                    <TabPane
                        tab={
                            <span>
                                <RetweetOutlined />Internal Tranfer
                                 </span>
                        }
                        key="1"
                    >
                        <div>
                            <Form.Item {...this.props.formItemLayout} hasFeedback label="Recipient's Wallet Number:" name="destinationWalletNumber" rules={[
                                { required: true, message: 'Please select a recipient wallet!' },
                            ]}>

                                <Select
                                    mode='combobox'
                                    placeholder="Select a recipient wallet"
                                    onChange={this.handleChange}
                                    onSelect={this.handleSelectLocal}
                                >
                                    {this.recipientLocalWalletsLayout()}
                                </Select>

                            </Form.Item>

                            <Form.Item {...this.props.formItemLayout} label='Add contact'>
                                <Button
                                    type="info"
                                    icon={<UsergroupAddOutlined />}
                                    onClick={this.handleAdd}>
                                    Add
                    </Button>
                            </Form.Item>
                            <Form.Item {...this.props.formItemLayout} label="Recipient's Bank:">
                                <Input type='text' disabled="true" value={bankRecipient} />
                            </Form.Item>
                            <Form.Item {...this.props.formItemLayout} label="Recipient's Email:">
                                <Input type='text' disabled="true" value={emailRecipient} />
                            </Form.Item>

                            <Form.Item {...this.props.formItemLayout} label="Recipient's Full Name:">
                                <Input type='text' disabled="true" value={fullNameRecipient} />
                            </Form.Item></div>                       </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <BankOutlined />Outernal Tranfer
                            </span>
                        }
                        key="2"
                    >
                        <div>
                            <Form.Item {...this.props.formItemLayout} hasFeedback label="Recipient's Wallet Number:" name="destinationWalletNumber" rules={[
                                { required: true, message: 'Please select a recipient wallet!' },
                            ]}>

                                <Select
                                    mode='combobox'
                                    placeholder="Select a recipient wallet"
                                    onChange={this.handleChange}
                                    onSelect={this.handleSelectForeign}
                                >
                                    {this.recipientForeignWalletsLayout()}
                                </Select>

                            </Form.Item>

                            <Form.Item {...this.props.formItemLayout} label='Add contact'>
                                <Button
                                    type="info"
                                    icon={<UsergroupAddOutlined />}
                                    onClick={this.handleAdd}>
                                    Add
                    </Button>
                            </Form.Item>
                            <Form.Item {...this.props.formItemLayout} label="Recipient's Bank:">
                                <Input type='text' disabled="true" value={bankRecipient} />
                            </Form.Item>


                            <Form.Item {...this.props.formItemLayout} label="Recipient's Full Name:">
                                <Input type='text' disabled="true" value={fullNameRecipient} />
                            </Form.Item></div>                       </TabPane>
                </Tabs>,




            </Card >
        )
    }
}

export default Recipient;
