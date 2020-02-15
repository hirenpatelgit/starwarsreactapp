import { TYPE_IS_LOGIN, TYPE_LOGIN_INFO, TYPE_LOGOUT } from "../../typeRedux"

// action to store login status
const ACTION_IS_LOGIN = (is_login) => {
    return {
        type: TYPE_IS_LOGIN,
        payload: is_login
    }
}

// action to store login information
const ACTION_LOGIN_USER_INFO = (info) => {
    return {
        type: TYPE_LOGIN_INFO,
        payload: info
    }
}
// action to remove login info 
const ACTION_LOGOUT = () => {
    return {
        type: TYPE_LOGOUT,
    }
}

export {
    ACTION_IS_LOGIN,
    ACTION_LOGIN_USER_INFO,
    ACTION_LOGOUT
}