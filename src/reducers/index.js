import { combineReducers } from "redux";

// import authReducer from './auth';
import paymentAccountsReducer from './customer/payment-accounts';
import setupRecipientReducer from './customer/setup-recipient';
import internalTransferReducer from './customer/internal-tranfer'


export default combineReducers({
  // authReducer,
  // LoginReducer,
  setupRecipientReducer,
  paymentAccountsReducer,
  internalTransferReducer
});
