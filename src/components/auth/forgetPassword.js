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
    this.onFinish = this.onFinish.bind(this);
    this.onFinishFail = this.onFinishFail.bind(this);
  }
  componentDidUpdate() {}

  handleSubmit = (e) => {
    e.preventDefault();
  };
  onFinish = (values) => {
    console.log("values:", values);

    const { sendOTP } = this.props;
    sendOTP(values);
  };
  onFinishFail = (err) => {
    console.log("err:", err);
  };
  render() {
    const formLayout = (
      <React.Fragment>
        <Form onFinish={this.onFinish} onFinishFail={this.onFinishFail}>
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
          <Form onSubmit={this.handleSubmit} className="form-signin">
            <legend className="title-signin">
              <h2>Forget password</h2>
            </legend>
            <p>Enter your email to get OTP</p>

            {this.props.isLoading && (
              <Spin tip="LoaSding ..." size="large">
                {formLayout}
              </Spin>
            )}
            {!this.props.isLoading && formLayout}
          </Form>
        </Card>
      </React.Fragment>
    );
  }
}

const SignIn = SignInForm;
export default SignIn;
