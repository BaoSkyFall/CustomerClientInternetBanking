import React, { Component } from 'react'
import "antd/dist/antd.css";
import './recharge.css'
import { Card, Col, Row, Button, Form, Input, InputNumber, message, Spin } from 'antd';
import { URL_SERVER } from '../../../configs/server';
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../../configs/client';
const FormItem = Form.Item;
const Search = Input.Search;

class Recharge extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props)

    }

    componentDidMount() {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY) || '';
        // fetch(`${URL_SERVER}/user/me`, {
        //     headers: {
        //         x_accesstoken: accessToken
        //     }
        // })
        // .then(res => res.json())
        // .then(res => {
        //     if (res.status === 200) {
        //         if (res.data.role !== 'staff') 
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            var dt = {
                walletNumber: values.accountNumber,
                amount: values.Amount
            }
            var accessToken = window.localStorage.getItem('accesstoken')
            this.props.updateBalance(dt, accessToken)
        });
    }
    componentDidUpdate() {
        var data = this.props.recharge
        this.formRef.current.setFieldsValue(data)

    }
    showAlert = () => {
        console.log("recharge props: ", this.props)
        var { isUpdateFail, isUpdateSuccess, isUpdateLoading } = this.props.recharge;
        if (isUpdateSuccess) {
            message.success('Recharge Success!', 3)
            this.props.resetUpdate();
        } else if (isUpdateFail) {
            message.error(`${'Error: Recharge Failed'}`)
            this.props.resetUpdate();
        } else if (isUpdateLoading) {
            return (
                <Row className="progress">
                    <Spin className="spn" tip="Loading..." />
                </Row>
            );
        }
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        var accessToken = window.localStorage.getItem('accesstoken');
        var data = this.props.recharge;
        return (
            <div>
                <Card title="Recharge" bordered={false} style={{ width: "100%" }}>

                    <Row className="Search">
                        <Col offset={8} span={8}>

                            <Search
                                placeholder="Input Wallet ID"
                                enterButton="Search"
                                size="large"
                                // value="phanhaibinh"
                                onSearch={(defaultValue) => { this.props.searchAccount(defaultValue, accessToken) }}
                            />
                        </Col>
                    </Row>

                    <Form
                        ref={this.formRef}

                        onSubmit={this.handleSubmit} className="submitRecharge">
                        <div style={{ background: '#ECECEC', padding: '30px' }}>


                            <FormItem
                                {...formItemLayout}
                                label="ID Wallet: "
                                name="walletNumber"
                                type="walletNumber"


                            >
                                <Input type="text" defaultValue={""} disabled={true} />



                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="Full Name"
                                name="name"
                            >

                                <Input type="text" defaultValue={""} disabled={true} />

                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="Identity Number"
                                name="identityNumber"

                            >


                                <Input type="text" defaultValue={""} disabled={true} />

                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="Balance"
                                name="balance"

                            >


                                <InputNumber className="inputAmount"
                                    disabled={true}
                                    onChange={(e) => { }}
                                    formatter={value => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\đ\s?|(,*)/g, '')}
                                />
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="Amount"
                                name="Amount"
                            >


                                <InputNumber className="inputAmount"
                                    onChange={(e) => { }}
                                    formatter={value => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\đ\s?|(,*)/g, '')}
                                />

                            </FormItem>
                            {this.showAlert()}
                            <Row >
                                <FormItem>
                                    <Button className="buttonRegister"
                                        type="primary" htmlType="submit"
                                    >
                                        ADD MONEY
                                </Button>
                                </FormItem>
                            </Row>

                        </div>
                    </Form >
                </Card>

            </div>
        )
    }
}

const recharge = Recharge;
export default recharge;
