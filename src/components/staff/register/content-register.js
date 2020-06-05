import React from 'react';
import { Redirect } from 'react-router-dom';
import "./content-register.css";

import {
    Form, Input, Button, Spin, Col, Row, DatePicker, Radio, message, Select, Card
} from 'antd';
import "antd/dist/antd.css";
import { URL_SERVER } from '../../../configs/server';
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../../configs/client';
const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
message.config({
    left: 100,
});

class FormRegister extends React.Component {
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
        //         localStorage.setItem(EMAIL_KEY, res.data.email)
        //         localStorage.setItem('role', res.data.role)
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
            if (!err) {
                var data = {
                    fullName: values.fullname,
                    birthday: values.date.format('YYYY-MM-DD'),
                    phone: values.phone,
                    personalNumber: values.personalIdNumber,
                    password: values.password,
                    email: values.email,
                    prefix: values.prefix,
                    address: ""
                };
                var accessToken = window.localStorage.getItem('accesstoken')
                console.log(accessToken);
                this.props.onRegister(data, accessToken);
            }
        });
    }

    showAlert = () => {
        var { isSuccess, isFailed, isLoading, massageError } = this.props.registerState;
        if (isSuccess) {
            message.success('Register Success!', 3)
            this.props.resetStatus();
        } else if (isFailed) {
            message.error(`${massageError}`)
            this.props.resetStatus();
        } else if (isLoading) {
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
                md: { span: 8 },
                lg: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
                md: { span: 16 },
                lg: { span: 16 },
            },
        };


        return (
            <React.Fragment>
                <Form onSubmit={this.handleSubmit} className="cardRegister">
                    <Card
                        title="Personal Infomation"
                        style={{ width: "90%" }}
                    >

                        <FormItem
                            className="itemForm"
                            {...formItemLayout}
                            label="Full Name"
                            name="fullname"
                            rules={[
                                {
                                    type: 'string', message: 'The input is not valid ',
                                }, {
                                    required: true, message: 'Please input your Full Name!',
                                }]}
                        >

                            <Input name="fullname" type="text" style={{ width: "50%" }}
                            />

                        </FormItem>
                        <FormItem
                            className="itemForm"
                            label="Birth Date"
                            {...formItemLayout}
                            name="date"
                            rules={[
                                {
                                    required: true, message: 'Please input your Birthday',
                                }]}

                        >

                            <DatePicker
                                className="aaa"
                            />

                        </FormItem>
                        <FormItem
                            className="inputP"
                            {...formItemLayout}
                            label="Phone Number"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >

                            <Input addonBefore="+84" />

                        </FormItem>

                        <FormItem
                            className="itemForm"
                            label="Indentity Number"
                            {...formItemLayout}
                            name="personalIdNumber"
                            rules={[{
                                required: true, message: 'Please input your Identity Number',
                            }]}
                        >
                            <Input  name="indentityNumber"/>


                        </FormItem>

                    </Card>
                    <Card
                        title="Login Infomation"
                        style={{ width: "90%" }}
                    >
                        <FormItem
                            {...formItemLayout}
                            label="E-mail"
                            name="email"
                            rules={[{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Please input your E-mail!',
                            }]}

                        >

                            <Input name="email" />

                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Password"
                            name="password"
                            rules={[{
                                required: true, message: 'Please input your password!',
                            }, {
                                validator: this.validateToNextPassword,
                            }]}
                        >

                            <Input type="password"
                                // onChange={handleChange} onChange={handleChange} 
                                name="password" />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Confirm Password"
                            name="confirm"
                            rules={[{
                                required: true, message: 'Please confirm your password!',
                            }, {
                                validator: this.compareToFirstPassword,
                            }]}
                        >

                            <Input type="password" onBlur={this.handleConfirmBlur} />
                        </FormItem>
                    </Card>
                    {this.showAlert()}
                    <Row className="cssCenter">
                        <FormItem>
                            <Button className="buttonRegister"
                                type="primary" htmlType="submit"
                            >
                                Register
                        </Button>
                        </FormItem>
                    </Row>
                </Form>

            </React.Fragment>
        );
    }
}

export default FormRegister
