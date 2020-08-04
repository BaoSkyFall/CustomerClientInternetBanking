import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Input, Button, Row, Col, Spin, Alert, Card } from "antd";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from "../../configs/client";
import "./styles/signin.css";
import GoogleRecaptcha from "./captcha";
import jwt from "jwt-decode";
const FormItem = Form.Item;
class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSendEmail = this.onSendEmail.bind(this);
    this.onFinishFail = this.onFinishFail.bind(this);
    this.onSendNewPassword = this.onSendNewPassword.bind(this);
  }
  componentDidUpdate() {}

  handleSubmit = (e) => {
    e.preventDefault();
  };
  onSendEmail = (values) => {
    console.log("values:", values);

    const { sendOTP } = this.props;
    sendOTP(values);
  };
  onSendNewPassword = (values) => {
    console.log("values:", values);

    // const { sendOTP } = this.props;
    // sendOTP(values);
  };
  onFinishFail = (err) => {
    console.log("err:", err);
  };
  render() {
    let { step } = this.props;
    const formOneLayout = (
      <React.Fragment>
        <Form onFinish={this.onSendEmail} onFinishFail={this.onFinishFail}>
          <FormItem
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid Email!",
              },
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          </FormItem>
          <FormItem>
            <a className="form-signin-forgot" href="/">
              Back to login
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="form-signin-button"
            >
              Send OTP
            </Button>
          </FormItem>
        </Form>
      </React.Fragment>
    );

    const formTwoLayout = (
      <React.Fragment>
        <Form
          onFinish={this.onSendNewPassword}
          onFinishFail={this.onFinishFail}
        >
          <FormItem
            name="otp"
            rules={[
              {
                required: true,
                message: "Please input OTP code!",
              },
            ]}
          >
            <Input type="number" placeholder="OTP code" />
          </FormItem>
          <FormItem
            name="NewPassword"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                validator: this.validateToNextPassword,
              },
            ]}
          >
            <Input type="password" name="password" placeholder="Password" />
          </FormItem>
          <FormItem
            name="confirm"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input type="password" placeholder="Confirm password" />
          </FormItem>
          <FormItem>
            <a className="form-signin-forgot" href="/">
              Back to login
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="form-signin-button"
            >
              Send OTP
            </Button>
          </FormItem>
        </Form>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <Card className="signIn-left"></Card>
        <Card>
          {step === 2 ? (
            <Form onSubmit={this.handleSubmit} className="form-signin">
              <legend className="title-signin">
                <h2>Forget password</h2>
              </legend>
              <p>Enter your email to get OTP</p>

              {this.props.isLoading && (
                <Spin tip="LoaSding ..." size="large">
                  {formOneLayout}
                </Spin>
              )}
              {!this.props.isLoading && formOneLayout}
            </Form>
          ) : (
            <Form onSubmit={this.handleSubmit} className="form-signin">
              <legend className="title-signin">
                <h2>Forget password</h2>
              </legend>
              <p>Please check your email then enter OTP</p>

              {this.props.isLoading && (
                <Spin tip="LoaSding ..." size="large">
                  {formTwoLayout}
                </Spin>
              )}
              {!this.props.isLoading && formTwoLayout}
            </Form>
          )}
        </Card>
      </React.Fragment>
    );
  }
}

const SignIn = SignInForm;
export default SignIn;
