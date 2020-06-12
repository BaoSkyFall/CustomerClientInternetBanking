import {
    DO_SIGNUP,
    DO_SIGNUP_SUCCESS,
    DO_SIGNUP_FAIL,
    DO_SIGNIN,
    DO_SIGNIN_SUCCESS,
    DO_SIGNIN_FAIL,
    RESET_STATUS,
    VERIFY_ACCESSTOKEN_SUCCESS,
    VERIFY_ACCESSTOKEN_FAIL
} from '../constants/auth';
import { URL_SERVER } from '../configs/server';
import {
    ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY,
    EMAIL_KEY,
} from '../configs/client';
const firebase = require("firebase");

const doSignUp = (infoUser) => {
    return (dispatch) => {
        dispatch({
            type: DO_SIGNUP
        });

        fetch(`${URL_SERVER}/register`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(infoUser)
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    dispatch({
                        type: DO_SIGNUP_SUCCESS,
                    });
                }
                else {
                    dispatch({
                        type: DO_SIGNUP_FAIL,
                        messageError: res.messageError
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
}


const doSignIn = (infoUser) => {
    return (dispatch) => {
        dispatch({
            type: DO_SIGNIN
        })

        console.log('infoUser:', infoUser)

        fetch(`${URL_SERVER}/api/auth/login`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(infoUser)
        })
            .then(res => res.json())
            .then(res => {
                if (res.returnCode === 1) {
                    firebase
                        .auth()
                        .signInWithEmailAndPassword(infoUser.username + "@gmail.com", infoUser.password).then((rs) => {
                            console.log('rs:', rs);
                            localStorage.setItem(ACCESS_TOKEN_KEY, res.data.accessToken);
                            localStorage.setItem(REFRESH_TOKEN_KEY, res.data.refreshToken);

                            dispatch({
                                type: DO_SIGNIN_SUCCESS,
                                signinSuccess: true
                            });
                        }, err => {

                            console.log('Error logging in: ', err);
                        });

                }
                else {
                    dispatch({
                        type: DO_SIGNIN_FAIL,
                        messageError: res.messageError
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
}

const verifyAccessToken = (accessToken) => {
    return (dispatch) => {
        fetch(`${URL_SERVER}/user/me`, {
            headers: new Headers({
                'Content-Type': 'application/json',
                x_accesstoken: accessToken
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem(EMAIL_KEY, res.data.email);
                    localStorage.setItem('role', res.data.role);

                    dispatch({
                        type: VERIFY_ACCESSTOKEN_SUCCESS,
                        email: res.data.email,
                        role: res.data.role
                    });
                }
                else {
                    dispatch({
                        type: VERIFY_ACCESSTOKEN_FAIL,
                        messageError: res.messageError
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
}

const resetStatus = () => {
    return (dispatch) => {
        dispatch({
            type: RESET_STATUS
        });
    }
}

export {
    doSignUp,
    doSignIn,
    verifyAccessToken,
    resetStatus
}
