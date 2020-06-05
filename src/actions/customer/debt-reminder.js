import axios from 'axios';
import {
    FETCH_GET_DEBT_REMINDER,
    FETCH_GET_DEBT_REMINDER_SUCCESS,
    FETCH_GET_DEBT_REMINDER_FAIL,
    FETCH_TRANFER_MONEY_DEBT,
    FETCH_TRANFER_MONEY_DEBT_SUCCESS,
    FETCH_TRANFER_MONEY_DEBT_FAIL,
    FETCH_GET_DEBT_OWNER,
    FETCH_GET_DEBT_OWNER_SUCCESS,
    FETCH_GET_DEBT_OWNER_FAIL,
   ADD_DEBT_REMINDER,
   ADD_DEBT_REMINDER_SUCCESS,
   ADD_DEBT_REMINDER_FAIL,
   
} from '../../constants/customer/debt-reminder.js';
import { URL_SERVER, URL_SERVER_DEPLOY } from '../../configs/server';


const fetchGetDebtReminder = (email, accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_GET_DEBT_REMINDER });

        axios.post(URL_SERVER_DEPLOY, {})
        .then(res => {
            if (!res.data.errors) {
                dispatch({
                    type: FETCH_GET_DEBT_REMINDER_SUCCESS,
                    debtReminders: res.data.data.receivers
                });
            }
            else {
                dispatch({
                    type: FETCH_GET_DEBT_REMINDER_FAIL,
                    messageError: res.data.errors[0].message
                });
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
}
const fetchTranferMoneyDebt = (email, accessToken,id_owner,money) => {
    return (dispatch) => {
        dispatch({ type: FETCH_TRANFER_MONEY_DEBT });

        return axios.post(URL_SERVER_DEPLOY,{})
        .then(res => {
            if (!res.data.errors) {
                dispatch({
                    type: FETCH_TRANFER_MONEY_DEBT_SUCCESS,
                    messageSuccess: res.data.data
                });
            }
            else {
                dispatch({
                    type: FETCH_TRANFER_MONEY_DEBT_FAIL,
                    messageError: res.data.errors[0].message
                });
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
}
const fetchGetDebtOwner = (email, accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_GET_DEBT_OWNER });

        axios.post(URL_SERVER_DEPLOY, {})
        .then(res => {
            if (!res.data.errors) {
                dispatch({
                    type: FETCH_GET_DEBT_OWNER_SUCCESS,
                    debtOwner: res.data.data
                });
            }
            else {
                dispatch({
                    type: FETCH_GET_DEBT_OWNER_FAIL,
                    messageError: res.data.errors[0].message
                });
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
}

const addDebtReminder = (email, accessToken,id_debt,money) => {
    return (dispatch) => {
        dispatch({
            type: ADD_DEBT_REMINDER
        });

        axios.post(URL_SERVER_DEPLOY,{})
        .then(res => {
            if (!res.data.errors) {
                dispatch({
                    type: ADD_DEBT_REMINDER_SUCCESS,
                    messageSuccess:res.data
                })
            }
            else {
                dispatch({
                    type: ADD_DEBT_REMINDER_FAIL,
                    messageError: res.data.errors[0].message
                });
            }
        })
        .catch (error => {
            console.log(error);
        })
    }
}



export {
    fetchGetDebtReminder,
    fetchTranferMoneyDebt,
    fetchGetDebtOwner,
    addDebtReminder
}