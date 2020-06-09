import React, { Component } from 'react';
import { Input, Card, Row, Col, Select, Form } from 'antd';

import './internal-remitter.css'
import { formatBalanceToString } from '../../../../ultis/balance';
import * as _ from 'lodash';

const Option = Select.Option;
class InternalRemitter extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
    }

    handleChange = (value) => {
        const { userWallets } = this.props;

        if (userWallets.length === 0) {
            this.props.form.setFieldsValue({
                'balance': '0.00'
            })
        } else {
            const selectedWallet = _.filter(userWallets, function (object) {
                return object.name_saving == value;
            });
            if (selectedWallet) {
                console.log('selectedWallet:', selectedWallet)
                if (selectedWallet[0].name_saving == "Main Account") {
                    this.formRef.current.setFieldsValue({ balance: selectedWallet[0].Money })

                }
                else
                    this.formRef.current.setFieldsValue({ balance: selectedWallet[0].spending })

            }

        }
    }

    handleBlur = () => {
        console.log('blur');
    }

    handleFocus = () => {
        console.log('focus');
    }

    userWalletsLayout = () => {
        const { userWallets } = this.props;
        let options = [];

        if (userWallets.length === 0)
            return (
                <Option value=''>Not Wallet</Option>
            );
        else {


            userWallets.forEach((element, index) => {
                if (index == 0) {
                    options.push(
                        <Option value={element.name_saving}>{element.name_saving}</Option>
                    )
                }

                else {
                    options.push(
                        <Option value={element.name_saving}>{element.name_saving}</Option>
                    )
                }
            });
        }

        return options;
    }

    render() {

        return (
            <Card
                title="Information Of Remitter"
                style={{ width: "90%" }}
            >
                <Form ref={this.formRef}
                >

                    <Form.Item
                        {...this.props.formItemLayout}
                        hasFeedback
                        label="Your Wallet Type:"
                        name="username"
                        rules={[
                            { required: true, message: 'Please select a your wallet!' },
                        ]}>

                        <Select
                            showSearch
                            placeholder="Select a your wallet"
                            optionFilterProp="children"
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {this.userWalletsLayout()}
                        </Select>

                    </Form.Item>

                    <Form.Item {...this.props.formItemLayout} name="balance" label="Balance:">

                        <Input addonAfter='VND' disabled="true" />

                    </Form.Item>
                </Form>

            </Card >

        )
    }
}

export default InternalRemitter;
