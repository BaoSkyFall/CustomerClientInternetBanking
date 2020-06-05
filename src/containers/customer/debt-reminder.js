import React, { Component } from 'react'
import { connect } from 'react-redux';
import DebtReminder from '../../components/customer/debt-reminder/debt-reminder';
import {
    fetchGetDebtReminder,
    fetchTranferMoneyDebt,
    fetchGetDebtOwner,
    addDebtReminder
} from '../../actions/customer/debt-reminder';




const mapStateToProps = (state) => {
    return {
        debtReminders:state.debtReminderReducer.debtReminders,
        debtOwner:state.debtReminderReducer.debtOwner, 
        userWallet:state.debtReminderReducer.userWallet, 
        messageSuccess:state.debtReminderReducer.messageSuccess, 
        messageError:state.debtReminderReducer.messageError, 
        isLoading:state.debtReminderReducer.isLoading, 
       
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGetDebtReminder: (email, accessToken) => dispatch(fetchGetDebtReminder(email, accessToken)),
        fetchTranferMoneyDebt: (email, accessToken, id_owner, money) => dispatch(fetchTranferMoneyDebt(email, accessToken, id_owner, money)),
        fetchGetDebtOwner: (email, accessToken) => dispatch(fetchGetDebtOwner(email, accessToken)),
        addDebtReminder: (email, accessToken, id_debt, money) => dispatch(addDebtReminder(email, accessToken, id_debt, money)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DebtReminder);
