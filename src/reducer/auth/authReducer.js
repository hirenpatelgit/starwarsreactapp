import {
    TYPE_IS_LOGIN, TYPE_LOGIN_INFO, TYPE_LOGOUT
} from '../../typeRedux';

const INIT_STATE = {
    is_login: false,
    user_login_info: {}
}

export default function eventAuthUser(state = INIT_STATE, action) {
    switch (action.type) {

        case TYPE_IS_LOGIN:
            return {
                ...state,
                is_login: action.payload
            }

        case TYPE_LOGIN_INFO:
            return {
                ...state,
                user_login_info: action.payload
            }

        case TYPE_LOGOUT:
            return {
                ...state,
                is_login: false,
                user_login_info: {}
            }

        default:
            return state
    }
}