import { combineReducers } from "redux";

/**
 * import reducer class
 */
import AuthReducer from './auth/authReducer';

const rootReducer = combineReducers({
  AuthReducer
});

export default rootReducer;
