import { combineReducers } from "redux";

import paymentAccountsReducer from './customer/payment-accounts';
import setupRecipientReducer from './customer/setup-recipient';
import internalTransferReducer from './customer/internal-tranfer';
import transactionHistoryReducer from './customer/transaction-history';
import authReducer from './auth';


import accountUser from './staff/account-user';
import paymentAccount from './staff/account-payment';

export default combineReducers({
  authReducer,
  // LoginReducer,
  setupRecipientReducer,
  paymentAccountsReducer,
  internalTransferReducer,
  transactionHistoryReducer,
  paymentAccount,
  authReducer,
  accountUser
});
