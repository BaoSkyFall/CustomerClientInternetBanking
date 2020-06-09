import React, { Component } from 'react'
import { connect } from 'react-redux';
import InternalTransferPage from '../../components/customer/internal-tranfer/internal-tranfer';
import { 
  fetchUserWallets,
  fetchRecipientsLocal,
  fetchRecipientsForeign,
  sendTransferInformation,
  verifyTransaction,
  toggleModalTransfer,
  trackRecipientLocal,
  trackRecipientForeign,
  resetStore
} from '../../actions/customer/internal-tranfer';
import { toggleModalAddRecipient, addRecipient } from '../../actions/customer/setup-recipient';

class InternalTransfer extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <React.Fragment>
        <InternalTransferPage {...this.props}/>
      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => {
    return {
      isLoading: state.internalTransferReducer.isLoading,
      isShowModalTransfer: state.internalTransferReducer.isShowModalTransfer,
      isShowModalAddRecipient: state.setupRecipientReducer.isShowModalAddRecipient,
      userWallets: state.internalTransferReducer.userWallets,
      isLocal: state.internalTransferReducer.isLocal,
      recipientsLocal: state.internalTransferReducer.recipientsLocal,
      recipientsForeign: state.internalTransferReducer.recipientsForeign,
      idTransaction: state.internalTransferReducer.idTransaction,
      emailRecipient: state.internalTransferReducer.emailRecipient,
      fullNameRecipient: state.internalTransferReducer.fullNameRecipient,
      bankRecipient: state.internalTransferReducer.bankRecipient,
      messageSuccess: state.internalTransferReducer.messageSuccess || state.setupRecipientReducer.messageSuccess,
      messageError: state.internalTransferReducer.messageError || state.setupRecipientReducer.messageError,
    }
  };

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserWallets: (email, accessToken) => dispatch(fetchUserWallets(email, accessToken)),
    fetchRecipientsLocal: (email, accessToken) => dispatch(fetchRecipientsLocal(email, accessToken)),
    fetchRecipientsForeign: (email, accessToken) => dispatch(fetchRecipientsForeign(email, accessToken)),
    sendTransferInformation: (email, originWalletNumber, destinationWalletNumber, payBy, amount, message, accessToken) => {
      return dispatch(sendTransferInformation(email, originWalletNumber, destinationWalletNumber, payBy, amount, message, accessToken));
    },
    toggleModalTransfer: (isShowModalTransfer) => dispatch(toggleModalTransfer(isShowModalTransfer)),
    toggleModalAddRecipient: (isShowModalAddRecipient) => dispatch(toggleModalAddRecipient(isShowModalAddRecipient)),
    addRecipient: (email, receiverWalletNumber, remindName, accessToken) => dispatch(addRecipient(email, receiverWalletNumber, remindName, accessToken)),
    trackRecipientLocal: (walletNumber, accessToken) => dispatch(trackRecipientLocal(walletNumber, accessToken)),
    trackRecipientForeign: (walletNumber, accessToken) => dispatch(trackRecipientForeign(walletNumber, accessToken)),
    resetStore: () => dispatch(resetStore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InternalTransfer);
