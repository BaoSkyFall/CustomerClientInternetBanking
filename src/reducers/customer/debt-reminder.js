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
    SHOW_ADD_MODAL,
    HANDLE_CANCEL_MODAL

} from '../../constants/customer/debt-reminder';
const initialState = {
    debtReminders: [],
    debtOwner: [],
    userWallet: [],
    messageSuccess: '',
    messageError: '',
    isLoading: false,
    visible: false,
    confirmLoading: false,
    debtorModal: null,

};
export default function debtReminderReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_GET_DEBT_REMINDER: {
            return {
                ...state,
                // isLoading:true
            }
        }
        case FETCH_GET_DEBT_REMINDER_SUCCESS: {
            return {
                ...state,
                debtReminders: action.debtReminders,
                isLoading: false,

            }
        }
        case FETCH_GET_DEBT_REMINDER_FAIL: {
            return {
                ...state,
                messageError: action.messageError,
                isLoading: false,

            }
        }
        case FETCH_TRANFER_MONEY_DEBT: {
            return {
                ...state,
                // isLoading:true
            }
        }
        case FETCH_TRANFER_MONEY_DEBT_SUCCESS: {
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                isLoading: false,

            }
        }
        case FETCH_TRANFER_MONEY_DEBT_FAIL: {
            return {
                ...state,
                messageError: action.messageError,
                isLoading: false,

            }
        }
        case FETCH_GET_DEBT_OWNER: {
            return {
                ...state,
                // isLoading:true
            }
        }
        case FETCH_GET_DEBT_OWNER_SUCCESS: {
            return {
                ...state,
                debtOwner: action.debtOwner,
                isLoading: false,

            }
        }
        case FETCH_GET_DEBT_OWNER_FAIL: {
            return {
                ...state,
                messageError: action.messageError,
                isLoading: false,

            }
        }
        case ADD_DEBT_REMINDER: {
            return {
                ...state,
                // isLoading:true
            }
        }
        case ADD_DEBT_REMINDER_SUCCESS: {
            return {
                ...state,
                messageSuccess: action.messageSuccess,
                isLoading: false,

            }
        }
        case ADD_DEBT_REMINDER_FAIL: {
            return {
                ...state,
                messageError: action.messageError,
                isLoading: false,

            }
        }
        case SHOW_ADD_MODAL: {
            return {
                ...state,
                visible:true

            }
        }
        case HANDLE_CANCEL_MODAL:{
            return {
                ...state,
                visible:false
            }
        }
        default:
            return state;
    }
}