import * as Types from '../../constants/ActionTypes';

var initialState = {
    isSearchIdSuccess: false,
    isSearchIdFail: false,
    isUpdateFail: false,
    isUpdateSuccess: false,
    isUpdateLoading: false,
    name: '',
    identityNumber: '',
    balance: '',
    walletNumber:'',
}

const rechargeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SEARCH_ACCOUNT_PAYMENT:
            return {
                ...state,
                isSearchIdSuccess: true,
                isSearchIdFail: false,
                name: action.account.name,
                identityNumber: action.account.identityNumber,
                balance: action.account.balance,
                walletNumber: action.account.walletNumber,
                    
            };
        case Types.RESET_ACCOUNT_PAYMENT_STATUS:
            return {
                isSearchIdSuccess: false,
                isSearchIdFail: false
            }
        case Types.SEARCH_ACCOUNT_PAYMENT_FAIL:
            return {
                isSearchIdSuccess: false,
                isSearchIdFail: true
            };
        case Types.SEARCH_USERNAME_RECHARGE_RESET:
            return {
                isSearchIdSuccess: false,
                isSearchIdFail: false
            };
        case Types.UPDATE_BALANCE:
            return {
                ...state,
                isUpdateSuccess: false,
                isUpdateLoading: true,
                isUpdateFail: false
            };
        case Types.UPDATE_BALANCE_SUCCESS:
            return {
                ...state,
                isUpdateSuccess: true,
                isUpdateFail: false,
                isUpdateLoading: false
            };
        case Types.UPDATE_BALANCE_FAIL:
            return {
                ...state,
                isUpdateSuccess: false,
                isUpdateFail: true,
                isUpdateLoading: false
            }
        case Types.UPDATE_BALANCE_RESET_STATUS:
            return {
                ...state,
                isUpdateSuccess: false,
                isUpdateFail: false,
                isUpdateLoading: false
            }
        default:
            return { ...state };
    }
}

export default rechargeReducer;
