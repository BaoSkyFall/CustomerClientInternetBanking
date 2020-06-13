import React from 'react';
import { Modal, Button, Spin, Input, Row, Col } from 'antd';
import { OTP_EMAIL, ACCESS_TOKEN_KEY } from '../../../../configs/client';
import TextArea from 'antd/lib/input/TextArea';
import OtpInput from 'react-otp-input';
import Countdown from "react-countdown";
import OTPEmail from '../otp-email/otp-email';
import jwt from 'jwt-decode';

import './modal-transfer.css'
class ModalTransfer extends React.Component {
    countdownRef = React.createRef();
    inputRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = { visible: false, rendered: null }

    }
    renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            return <Button onClick={this.onClickSendOTP} type="primary">
                Send OTP
            </Button>;
        } else {
            // Render a countdown
            return (
                <span>
                    {minutes}:{seconds}
                </span>
            );
        }
    };

    handleOk = (e) => {
        const { originWalletNumber, destinationWalletNumber, payBy, amount, message } = this.props.data;
        let otp = this.inputRef.current.state.value;

        const { accessToken, email } = this.props;
        console.log('payBy:', payBy)
        console.log('amount:', amount)
        let decode = jwt(accessToken);
        if (otp) {
            let data = {
                otp,
                email: decode.email,
                from: originWalletNumber,
                to: destinationWalletNumber,
                money: amount,
                isSaving: originWalletNumber/ 1600000> 1?true: false,
                description: message,
                paidBy: payBy == 'sender' ? 1 : 2
            }
            console.log('data:', data);
            this.props.sendTransferInformation(data, accessToken);

        }
    }

    handleCancel = (e) => {
        this.props.toggleModalTransfer();
        this.props.resetStore();
    }
    onClickSendOTP = (e) => {
        let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
        let decode = jwt(accessToken);
        const { getOTP } = this.props;
        getOTP(decode.email, accessToken);
    }
    render() {
        const { originWalletNumber, destinationWalletNumber, payBy, amount, message } = this.props.data;
        const { isLoading } = this.props;
        console.log('this.props: ', this.props);


        const contentLayout = (
            <React.Fragment>
                <Row>
                    <Col span={12}>Origin Wallet Number:</Col>
                    <Col span={12}><Input disabled value={originWalletNumber}></Input></Col>
                </Row>
                <Row>
                    <Col span={12}>Destination Wallet Number:</Col>
                    <Col span={12}><Input disabled value={destinationWalletNumber}></Input></Col>
                </Row>
                <Row>
                    <Col span={12}>Amount Transfer:</Col>
                    <Col span={12}><Input disabled value={amount}></Input></Col>
                </Row>
                <Row>
                    <Col span={12}>Charge Bear:</Col>
                    <Col span={12}><Input disabled value={payBy}></Input></Col>
                </Row>
                <Row>
                    <Col span={12}>Message:</Col>
                    <Col span={12}><TextArea disabled value={message}>{message}</TextArea></Col>
                </Row>
                <Row>
                    <Col span={12}>OTP:</Col>

                    <Col span={6}><Input ref={this.inputRef}  ></Input></Col>
                    <Col span={6}>
                        {/* <Countdown ref={this.countdownRef} date={Date.now() + 3000} renderer={this.renderer} />, */}
                        <Button onClick={this.onClickSendOTP} type="primary">
                            Send OTP
            </Button>
                    </Col>
                </Row>
            </React.Fragment >
        )
        console.log('isLoading:123', this.props.isShowModalTransfer)

        return (
            <div>
                <Modal
                    title="Transfer Information"
                    visible={this.props.isShowModalTransfer}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {isLoading && (
                        <Spin tip="Loading ..." size='large'>
                            {contentLayout}
                        </Spin>
                    )}

                    {!isLoading && contentLayout}

                </Modal>
            </div>
        );
    }
}

export default ModalTransfer;