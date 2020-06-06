import * as Types from '../../constants/ActionTypes';

var initialState = {
    isSearchFailed: false,
    isSearchLoading: false,
    isSearchSuccess:false,
    isSuccess: false,
    isFailed: false,
    isLoading: false,
    username:'',
    name:'',
    email:'',
    phone:'',
    indenityNumber:'',
    dob:'',
    walletNumber:'',
    balance:'',
    messageError: ''
}

const paymentAccount = (state = initialState, action) => {
    switch (action.type) {
        case Types.SEARCH_USERNAME:
            console.log('action:', action)
            return {
                ...state,
                isSearchLoading: false,
                isSearchFailed: false,
                isSearchSuccess:true,
                walletNumber: action.user.walletNumber,
                email: action.user.email,
                username: action.user.username,
                name: action.user.name,
                email: action.user.email,
                phone: action.user.phone,
                indenityNumber: action.user.indenityNumber,
                dob: action.user.dob,
                walletNumber: action.user.walletNumber,
                balance: action.user.balance,



            };
        case Types.SEARCH_USERNAME_FAIL:
            return {
                ...state,
                isSearchLoading: false,
                isSearchFailed: true
            };
        case Types.SEARCH_USERNAME_LOADING:
            return {
                ...state,
                isSearchLoading: true,
                isSearchFailed: false
            };
        case Types.SEARCH_USERNAME_RESET:
            return{
                isLoading: false,
                isSuccess: false,
                isFailed: false
            };
        case Types.CREATE_PAYMENT_ACCOUNT:
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
                isFailed: false
            };
        case Types.CREATE_PAYMENT_ACCOUNT_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                isLoading: false,
                walletNumber: action.walletNumber
            }
        case Types.CREATE_PAYMENT_ACCOUNT_FAIL:
            return {
                ...state,
                isFailed: true,
                isLoading: false,
                messageError: action.messageError
            }
        default: return { ...state };
    }
}

export default paymentAccount;
