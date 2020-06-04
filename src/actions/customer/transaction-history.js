import axios from 'axios';
import {
    FETCH_TRANSACTION_HISTORY,
    FETCH_TRANSACTION_HISTORY_SUCCESS,
    FETCH_TRANSACTION_HISTORY_FAIL,
    RESET_STORE
} from '../../constants/customer/transaction-history';
import { URL_SERVER_DEPLOY } from '../../configs/server';

const fetchTransactionHistory = (email, accessToken) => {
    return (dispatch) => {
        dispatch({ type: FETCH_TRANSACTION_HISTORY });
        return axios.post(URL_SERVER_DEPLOY, {})
        .then(res => {
            if (res.status === 200) {
                dispatch({
                    type: FETCH_TRANSACTION_HISTORY_SUCCESS,
                    transactionHistory: res.data.data.histories
                });
            }
        })
        .catch(error => {
            dispatch({
                type: FETCH_TRANSACTION_HISTORY_FAIL,
                messageError: "Server's error"
            });
        })
    }
}

const resetStore = () => {
    return dispatch => {
        dispatch({
            type: RESET_STORE
        })
    }
}

export {
    fetchTransactionHistory,
    resetStore
}