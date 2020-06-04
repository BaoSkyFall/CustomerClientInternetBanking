import axios from 'axios';
import {
    FETCH_USER_WALLETS,
    FETCH_USER_WALLETS_SUCCESS,
    FETCH_USER_WALLETS_FAIL,
    FETCH_RECIPIENTS,
    FETCH_RECIPIENTS_SUCCESS,
    FETCH_RECIPIENTS_FAIL,
    RESET_STORE,
    SEND_TRANSFER_INFORMATION,
    SEND_TRANSFER_INFORMATION_SUCCESS,
    SEND_TRANSFER_INFORMATION_FAIL,
    VERIFY_TRANSACTION,
    VERIFY_TRANSACTION_SUCCESS,
    VERIFY_TRANSACTION_FAIL,
    TOGGLE_MODAL_TRANSFER,
    TRACK_RECIPIENT,
    TRACK_RECIPIENT_SUCCESS,
    TRACK_RECIPIENT_FAIL,
} from '../../constants/customer/internal-tranfer';
import { URL_SERVER, URL_SERVER_DEPLOY } from '../../configs/server';

const fetchUserWallets = (email, accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_USER_WALLETS });

        return axios.post(URL_SERVER_DEPLOY,{})
        .then(res => {
            if (!res.data.errors) {
                dispatch({
                    type: FETCH_USER_WALLETS_SUCCESS,
                    userWallets: res.data.data.wallets
                });
            }
            else {
                dispatch({
                    type: FETCH_USER_WALLETS_FAIL,
                    messageError: res.data.errors[0].message
                });
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
}


const fetchRecipients = (email, accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_RECIPIENTS });

        axios.post(URL_SERVER_DEPLOY, {})
        .then(res => {
            if (!res.data.errors) {
                dispatch({
                    type: FETCH_RECIPIENTS_SUCCESS,
                    recipients: res.data.data.receivers
                });
            }
            else {
                dispatch({
                    type: FETCH_RECIPIENTS_FAIL,
                    messageError: res.data.errors[0].message
                });
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
}

const trackRecipient = (walletNumber, accessToken) => {
    return (dispatch) => {
        dispatch({
            type: TRACK_RECIPIENT
        });

        axios.post(URL_SERVER_DEPLOY,{})
        .then(res => {
            if (!res.data.errors) {
                dispatch({
                    type: TRACK_RECIPIENT_SUCCESS,
                    emailRecipient: res.data.data.userInfo.email,
                    fullNameRecipient: res.data.data.userInfo.fullName
                })
            }
            else {
                dispatch({
                    type: TRACK_RECIPIENT_FAIL,
                    messageError: res.data.errors[0].message
                });
            }
        })
        .catch (error => {
            console.log(error);
        })
    }
}

const sendTransferInformation = (email, originWalletNumber, destinationWalletNumber, payBy, amount, message, accessToken) => {
    return (dispatch) => {
        dispatch({
            type: SEND_TRANSFER_INFORMATION
        });

        axios.post(URL_SERVER_DEPLOY, {})
        .then(res => {
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
        .catch (error => {
            console.log(error);
        })
    }
}

const verifyTransaction = (email, id, OTP, accessToken) => {
    return (dispatch) => {
        dispatch({
            type: VERIFY_TRANSACTION
        });

        axios.post(URL_SERVER_DEPLOY, {})
        .then(res => {
            if (!res.data.errors) {
                dispatch({
                    type: VERIFY_TRANSACTION_SUCCESS,
                    messageSuccess: res.data.data.verified_transaction.message
                });
            }
            else {
                dispatch({
                    type: VERIFY_TRANSACTION_FAIL,
                    messageError: res.data.errors[0].message
                });
            }
        })
        .catch (error => {
            console.log(error);
        })
    }
}

const toggleModalTransfer = (isShowModalTransfer) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_MODAL_TRANSFER,
            isShowModalTransfer
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
    fetchRecipients,
    sendTransferInformation,
    verifyTransaction,
    toggleModalTransfer,
    trackRecipient,
    resetStore
}