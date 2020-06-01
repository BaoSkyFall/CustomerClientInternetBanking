import { login } from "../../../services/account.services";

export const sendLogin = (email, password) => {
  return (dispatch) => {
    dispatch(request());

    login(email, password)
      .then((res) => {
        console.log(res);

        if (res.data.code === "-101") {
          // thất bại
          dispatch(failure(res.data.message));
        } else {
          // thành công
          dispatch(success(res.data.message));
          dispatch(updateUser(res.data.data.user));
          // Lưu token vào localstorage
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
          localStorage.setItem("token", JSON.stringify(res.data.data.token));
          window.history.back();
          // history.push('/home');
        }
      })
      .catch((err) => {
        console.log(err);
        //dispatch(failure("There was error with server connection. Error log on console"));
      });
  };

  function request() {
    return {
      type: "LOG_IN_REQUEST",
    };
  }
  function success(message) {
    return {
      type: "LOG_IN_SUCCESS",
      message,
    };
  }
  function failure(message) {
    return {
      type: "LOG_IN_FAILURE",
      message,
    };
  }
  function updateUser(user) {
    return {
      type: "UPDATE_USER",
      user,
    };
  }
};

export const reset = () => {
  return (dispatch) => {
    console.log("reset in action");
    dispatch(callAction());
  };

  function callAction() {
    return {
      type: "LOG_IN_RESET",
    };
  }
};
