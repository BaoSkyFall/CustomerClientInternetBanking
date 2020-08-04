import React, { Component } from "react";
import { connect } from "react-redux";
import ForgetPassword from "../../components/auth/forgetPassword";
import { doSendOTP } from "../../actions/auth";

class ForgetPasswordContainer extends Component {
  render() {
    return (
      <div>
        <ForgetPassword {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    step: state.forgetPasswordReducer.step,
    errorMessage: state.forgetPasswordReducer.errorMessage,
    isLoading: state.forgetPasswordReducer.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    sendOTP: (email) => dispatch(doSendOTP(email)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgetPasswordContainer);
