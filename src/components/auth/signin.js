import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
    Form, Input, Button, Checkbox, Spin, Alert
} from 'antd';
import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from '../../configs/client';
import './styles/signin.css';
import GoogleRecaptcha from './captcha';

const FormItem = Form.Item;
class SignInForm extends React.Component {

    state = {
        isCheckGoogleCaptcha: false
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSignIn(values);
            }
        });
    }

    render() {
        const email = localStorage.getItem(EMAIL_KEY) || '';
        const role = localStorage.getItem('role') || '';

        if (email) {
            this.props.resetStatus();
            if (role === 'customer')
                return (<Redirect to={{
                    pathname: '/dashboard/payment-accounts',
                }} />);
            else if (role === 'staff') {
                return (<Redirect to={{
                    pathname: '/staff/register',
                }} />);
            }
            else {
                return (<Redirect to={{
                    pathname: '/signin',
                }} />);
            }
        }
        else {
            if (this.props.signinSuccess) {
                const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY) || '';
                this.props.verifyAccessToken(accessToken)
            }
        }

        const formLayout = (
            <React.Fragment>
                {this.props.messageError && (
                    <Alert
                        message="Error"
                        description={this.props.messageError}
                        type="error"
                        showIcon />
                )}

                <br />
                <FormItem name="email" rules={[{
                    type: 'email', message: 'The input is not valid E-mail!',
                }, {
                    required: true, message: 'Please input your E-mail!',
                }]}>


                    <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                </FormItem>
                <FormItem name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>

                    <Input prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                </FormItem>

                <FormItem name="captcha" rules={[{ required: true, message: 'Please select google recaptcha!' }]}>

                    <GoogleRecaptcha />

                </FormItem>
                <FormItem name="remember">

                    <Checkbox>Remember me</Checkbox>

                    <a className="form-signin-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="form-signin-button">
                        Sign In
                    </Button>
                </FormItem>
            </React.Fragment>
        );

        // if(this.props.role === 'customer'){
        //     return (<Redirect to={{
        //         pathname: '/dashboard',
        //     }}/>);
        // }else if(this.props.role === 'staff'){
        //     return (<Redirect to={{
        //         pathname: '/staff',
        //     }}/>);
        // }

        return (
            <Form onSubmit={this.handleSubmit} className="form-signin">
                <legend className="title-signin">
                    <h2>Sign In</h2>
                </legend>

                {this.props.isLoading && (
                    <Spin tip="Loading ..." size='large' >
                        {formLayout}
                    </Spin>
                )}
                {!this.props.isLoading && formLayout}
            </Form>
        );
    }
}

const SignIn = SignInForm;
export default SignIn;
