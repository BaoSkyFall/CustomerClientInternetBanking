import axios from 'axios';
import {
    FETCH_USER_WALLETS,
    FETCH_USER_WALLETS_SUCCESS,
    FETCH_USER_WALLETS_FAIL,
    FETCH_RECIPIENTS_LOCAL,
    FETCH_RECIPIENTS_LOCAL_SUCCESS,
    FETCH_RECIPIENTS_LOCAL_FAIL,
    FETCH_RECIPIENTS_FOREIGN,
    FETCH_RECIPIENTS_FOREIGN_SUCCESS,
    FETCH_RECIPIENTS_FOREIGN_FAIL,
    RESET_STORE,
    SET_BALANCE,
    SET_VALUES_TRANFER,
    SEND_TRANSFER_INFORMATION,
    SEND_TRANSFER_INFORMATION_SUCCESS,
    SEND_TRANSFER_INFORMATION_FAIL,
    GET_OTP,
    GET_OTP_SUCCESS,
    GET_OTP_FAIL,
    TOGGLE_MODAL_TRANSFER,
    TOGGLE_MODAL_ADD_RECIPIENT,
    TRACK_RECIPIENT_LOCAL,
    TRACK_RECIPIENT_LOCAL_SUCCESS,
    TRACK_RECIPIENT_LOCAL_FAIL,
    TRACK_RECIPIENT_FOREIGN,
    TRACK_RECIPIENT_FOREIGN_SUCCESS,
    TRACK_RECIPIENT_FOREIGN_FAIL,
} from '../../constants/customer/internal-tranfer';
import { ACCESS_TOKEN_KEY } from '../../configs/client';
import { URL_SERVER, URL_SERVER_DEPLOY } from '../../configs/server';
import callApi from '../../ultis/callApi';

const fetchUserWallets = (id, accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_USER_WALLETS });
        let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
        return callApi(`api/moneyAccount/${id}`, 'GET', {}, { x_accessToken: accessToken })
            .then(res => {
                console.log('res moneyAccount:', res)
                if (!res.data.errors) {
                    dispatch({
                        type: FETCH_USER_WALLETS_SUCCESS,
                        userWallets: res.data.data.data
                    });
                }
                else {
                    dispatch({
                        type: FETCH_USER_WALLETS_FAIL,
                        messageError: res.data.message
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: FETCH_USER_WALLETS_FAIL,
                    messageError: error
                });
            })
    }
}


const fetchRecipientsLocal = (id, accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_RECIPIENTS_LOCAL });

        return callApi(`api/recipient/getRecipientLocal/${id}`, 'GET', {}, { x_accessToken: accessToken })
            .then(res => {
                if (!res.data.errors) {
                    dispatch({
                        type: FETCH_RECIPIENTS_LOCAL_SUCCESS,
                        recipientsLocal: res.data.data
                    });
                }
                else {
                    dispatch({
                        type: FETCH_RECIPIENTS_LOCAL_FAIL,
                        messageError: res.data.message
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: FETCH_RECIPIENTS_LOCAL_FAIL,
                    messageError: error
                });
            })
    }
}

const trackRecipientLocal = (walletNumber, accessToken) => {
    return (dispatch) => {
        dispatch({
            type: TRACK_RECIPIENT_LOCAL
        });

        return callApi(`api/recipient/trackRecipientLocal/${walletNumber}`, 'GET', {}, { x_accessToken: accessToken })
            .then(res => {
                console.log('res:', res.data.data[0])
                if (!res.data.errors) {
                    dispatch({
                        type: TRACK_RECIPIENT_LOCAL_SUCCESS,
                        emailRecipient: res.data.data[0].email,
                        fullNameRecipient: res.data.data[0].fullname,
                        bankRecipient: res.data.data[0].name,
                    })
                }
                else {
                    dispatch({
                        type: TRACK_RECIPIENT_LOCAL_FAIL,
                        messageError: res.data.message
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: TRACK_RECIPIENT_LOCAL_FAIL,
                    messageError: 'Fail track Recipient'
                });
            })
    }
}
const fetchRecipientsForeign = (id, accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_RECIPIENTS_FOREIGN });

        return callApi(`api/recipient/getRecipientForeign/${id}`, 'GET', {}, { x_accessToken: accessToken })
            .then(res => {
                if (!res.data.errors) {
                    dispatch({
                        type: FETCH_RECIPIENTS_FOREIGN_SUCCESS,
                        recipientsForeign: res.data.data
                    });
                }
                else {
                    dispatch({
                        type: FETCH_RECIPIENTS_FOREIGN_FAIL,
                        messageError: res.data.message
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: FETCH_RECIPIENTS_FOREIGN_FAIL,
                    messageError: error
                });
            })
    }
}

const trackRecipientForeign = (walletNumber, accessToken) => {
    return (dispatch) => {
        dispatch({
            type: TRACK_RECIPIENT_FOREIGN
        });

        return callApi(`api/recipient/trackRecipientForeign/${walletNumber}`, 'GET', {}, { x_accessToken: accessToken })
            .then(res => {
                console.log('res:', res.data.data[0])
                if (!res.data.errors) {
                    dispatch({
                        type: TRACK_RECIPIENT_FOREIGN_SUCCESS,
                        fullNameRecipient: res.data.data[0].fullname,
                        bankRecipient: res.data.data[0].name,
                    })
                }
                else {
                    dispatch({
                        type: TRACK_RECIPIENT_FOREIGN_FAIL,
                        messageError: res.data.message
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: TRACK_RECIPIENT_FOREIGN_FAIL,
                    messageError: 'Fail track Recipient'
                });
            })
    }
}
const sendTransferInformation = (data, accessToken) => {
    return (dispatch) => {
        dispatch({
            type: SEND_TRANSFER_INFORMATION
        });
        return callApi(`api/money/transferLocal`, 'POST', data, { x_accessToken: accessToken })
            .then(res => {
                console.log('res Tranfer Money:', res)
                if (!res.data.errors) {
                    dispatch({
                        type: SEND_TRANSFER_INFORMATION_SUCCESS,
                        idTransaction: res.data.data.created_verification._id,
                        messageSuccess: `Verification email is sent!`
                    });
                }
                else {
                    dispatch({
                        type: SEND_TRANSFER_INFORMATION_FAIL,
                        messageError: res.data.errors[0].message
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
}

const getOTP = (email, accessToken) => {
    return (dispatch) => {
        dispatch({
            type: GET_OTP
        });

        return callApi(`api/users/getOTP`, 'POST', { email, accessToken }, { x_accessToken: accessToken })
            .then(res => {
                console.log('resOTP:', res)
                if (!res.data.errors) {
                    dispatch({
                        type: GET_OTP_SUCCESS,
                        messageSuccess: res.data.data.message
                    });
                }
                else {
                    dispatch({
                        type: GET_OTP_FAIL,
                        messageError: res.data.data.message
                    });
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: GET_OTP_FAIL,
                    messageError: "Can't send OTP it may cause from server"
                });
            })
    }
}

const toggleModalTransfer = () => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_MODAL_TRANSFER,
        });
    }
}
const toggleModalAddRecipient = () => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_MODAL_ADD_RECIPIENT,
        });
    }
}
const setBalance = (balance) => {
    return (dispatch) => {
        dispatch({
            type: SET_BALANCE,
            balance
        });
    }
}
const setValuesTranfer = (values) => {
    return (dispatch) => {
        dispatch({
            type: SET_VALUES_TRANFER,
            values
        });
    }
}

const resetStore = () => {
    return (dispatch) => {
        dispatch({
            type: RESET_STORE
        })
    }
}

export {
    fetchUserWallets,
    fetchRecipientsLocal,
    fetchRecipientsForeign,
    sendTransferInformation,
    getOTP,
    toggleModalTransfer,
    trackRecipientLocal,
    trackRecipientForeign,
    toggleModalAddRecipient,
    setBalance,
    setValuesTranfer,
    resetStore
}