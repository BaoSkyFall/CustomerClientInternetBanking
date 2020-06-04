import React from 'react';
import { Modal, Spin, Form, Input } from 'antd';
import './style.css';

class ModalAddRecipient extends React.Component {
    handleOk = (e) => {
        const { email, accessToken } = this.props;
        this.props.form.validateFieldsAndScroll((err, values) => {
            let { walletNumber, remindName } = values;
            remindName = remindName ? remindName : '';
            if (!err) {
                this.props.addRecipient(email, walletNumber, remindName, accessToken);
            }
        });
    }

    handleCancel = (e) => {
        this.props.toggleModalAddRecipient(false);
    }

    render() {
        const { isLoading } = this.props;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6, offset: 1 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12, offset: 4 },
            },
        };

        const contentLayout = (
            <Form>
                <Form.Item {...formItemLayout} label="Wallet number:" name="walletNumber" rules={[
                    { required: true, message: 'Please enter the wallet number!' },
                ]}>

                    <Input type='text' />
                </Form.Item>

                <Form.Item {...formItemLayout} label="Remind Name:" name="remindName">
                    <Input type='text' />
                </Form.Item>
            </Form>
        )

        return (
            <Modal
                title="Add new recipient"
                visible={this.props.isShowModalAddRecipient}
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
        );
    }
}

export default ModalAddRecipient;