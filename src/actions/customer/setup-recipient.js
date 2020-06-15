import axios from 'axios';
import {
    FETCH_RECIPIENTS,
    FETCH_RECIPIENTS_SUCCESS,
    FETCH_RECIPIENTS_FAIL,
    UPDATE_RECIPIENT,
    UPDATE_RECIPIENT_SUCCESS,
    UPDATE_RECIPIENT_FAIL,
    DELETE_RECIPIENT,
    DELETE_RECIPIENT_SUCCESS,
    DELETE_RECIPIENT_FAIL,
    RESET_STORE,
    CHANGE_TAB_PANEL,
    ADD_RECIPIENT,
    ADD_RECIPIENT_SUCCESS,
    ADD_RECIPIENT_FAIL,
    TOGGLE_MODAL_ADD_RECIPIENT
} from '../../constants/customer/setup-recipient';
import { URL_SERVER_DEPLOY } from '../../configs/server';
import callApi from '../../ultis/callApi';
import * as _ from 'lodash'
const fetchRecipients = (id, accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_RECIPIENTS });

        return callApi(`api/recipient/getAllRecipient/${id}`, 'GET', {}, { x_accessToken: accessToken })
            .then(res => {
                console.log('res All recipient:', res)

                if (!res.data.errors) {
                    dispatch({
                        type: FETCH_RECIPIENTS_SUCCESS,
                        recipients: res.data.data
                    });
                }
                else {
                    dispatch({
                        type: FETCH_RECIPIENTS_FAIL,
                        messageError: res.data.message
                    });
                }
            })
            .catch(error => {
                console.log('error:', error)
                dispatch({
                    type: FETCH_RECIPIENTS_FAIL,
                    messageError: "Can't connect to server"
                });
            })
    }
}

const updateRecipient = (email, walletNumber, remindName, accessToken) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_RECIPIENT });

        axios.post(URL_SERVER_DEPLOY, {})
            .then(res => {
                if (!res.data.errors) {
                    dispatch({
                        type: UPDATE_RECIPIENT_SUCCESS,
                        recipients: res.data.data.updated_receivers,
                        messageSuccess: `Update remind name successfully!`
                    });
                }
                else {
                    dispatch({
                        type: UPDATE_RECIPIENT_FAIL,
                        messageError: res.data.errors[0].message
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
}


const deleteRecipient = (data, recipients, accessToken) => {
    return (dispatch) => {
        dispatch({ type: DELETE_RECIPIENT });
        console.log('data123465:', data)
        return callApi(`api/recipient/deleteRecipient`, 'DELETE', data, { x_accessToken: accessToken })
            .then(res => {
                if (!res.data.errors) {
            
                    let result = _.remove(recipients, function (n) {
                        return n.walletId == data.walletId && n.username_recipient==data.username_recipient && n.isLocal == data.isLocal && n.username == data.username
                    });
                    console.log('result:', result)
                    dispatch({
                        type: DELETE_RECIPIENT_SUCCESS,
                        messageSuccess: `Delete receiver record successfully!`,
                        recipients
                    });
                }
                else {
                    dispatch({
                        type: DELETE_RECIPIENT_FAIL,
                        messageError: res.data.message
                    });
                }
            })
            .catch(error => {
                console.log('error:', error)
                dispatch({
                    type: DELETE_RECIPIENT_FAIL,
                    messageError: "Can't connect to server"
                });
            })
    }
}

const addRecipient = (email, receiverWalletNumber, remindName, accessToken) => {
    return (dispatch) => {
        dispatch({
            type: ADD_RECIPIENT
        });

        axios.post(URL_SERVER_DEPLOY, {})
            .then(res => {
                if (!res.data.errors) {
                    dispatch({
                        type: ADD_RECIPIENT_SUCCESS,
                        recipients: res.data.data.created_receivers,
                        messageSuccess: `Create receiver record successfully!`
                    });
                }
                else {
                    dispatch({
                        type: ADD_RECIPIENT_FAIL,
                        messageError: res.data.errors[0].message
                    });
                }
            })
    }
}

const toggleModalAddRecipient = (isShowModalAddRecipient) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_MODAL_ADD_RECIPIENT,
            isShowModalAddRecipient
        });
    }
}
const changeTabPanel = () => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_TAB_PANEL,
        });
    }
}

const resetStore = () => {
    return (dispatch) => {
        dispatch({
            type: RESET_STORE,
        });
    }
}

export {
    fetchRecipients,
    updateRecipient,
    deleteRecipient,
    addRecipient,
    changeTabPanel,
    toggleModalAddRecipient,
    resetStore
}