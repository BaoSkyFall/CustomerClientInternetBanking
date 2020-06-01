import { combineReducers } from "redux";

// import authReducer from './auth';
import paymentAccountsReducer from "./customer/payment-accounts";
import LoginReducer from "./customer/AccountReducers/Login.reducer";

export default combineReducers({
  // authReducer,
  LoginReducer,

  paymentAccountsReducer,
});
