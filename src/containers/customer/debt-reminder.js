import React, { Component } from 'react'
import { connect } from 'react-redux';
import DebtReminder from '../../components/customer/debt-reminder/debt-reminder';
import {
    fetchGetDebtReminder,
    fetchTranferMoneyDebt,
    fetchGetDebtOwner,
    addDebtReminder,
    showAddModal,
    handleCancelModal,
    fetchGetNameByWalletId,
    deleteDebtOwner
} from '../../actions/customer/debt-reminder';




const mapStateToProps = (state) => {
    return {
        debtReminders:state.debtReminderReducer.debtReminders,
        debtOwner:state.debtReminderReducer.debtOwner, 
        userWallet:state.debtReminderReducer.userWallet, 
        messageSuccess:state.debtReminderReducer.messageSuccess, 
        messageError:state.debtReminderReducer.messageError, 
        isLoading:state.debtReminderReducer.isLoading, 
        visible:state.debtReminderReducer.visible,
        confirmLoading:state.debtReminderReducer.confirmLoading,
        debtorModal:state.debtReminderReducer.debtorModal,
        name:state.debtReminderReducer.name,
        idDebtor:state.debtReminderReducer.idDebtor,
        walletId:state.debtReminderReducer.walletId,
        isAction: state.debtReminderReducer.isAction
        
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGetDebtReminder: (email, accessToken) => dispatch(fetchGetDebtReminder(email, accessToken)),
        fetchTranferMoneyDebt: (email, accessToken, id_owner, money) => dispatch(fetchTranferMoneyDebt(email, accessToken, id_owner, money)),
        fetchGetDebtOwner: (email, accessToken) => dispatch(fetchGetDebtOwner(email, accessToken)),
        fetchGetNameByWalletId: (wallet_id,accessToken)=>dispatch(fetchGetNameByWalletId(wallet_id,accessToken)),
        addDebtReminder: (data, accessToken) => dispatch(addDebtReminder(data, accessToken)),
        showAddModal: () => dispatch(showAddModal()),
        handleCancelModal:()=> dispatch(handleCancelModal()),
        deleteDebtOwner:(id_debt,accessToken)=> dispatch(deleteDebtOwner(id_debt,accessToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DebtReminder);
