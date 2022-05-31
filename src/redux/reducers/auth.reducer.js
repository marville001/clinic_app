import {
  LOGOUT_USER,
  USER_LOGIN,
  UPDATE_USER,
  CHANGE_PASSWORD,
} from "../types/auth.types";

const initialState = {
  authDetails: {},
  loading: false,
  error: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN.REQUEST:
      return { ...state, loading: true, authDetails: {}, error: "" };
    case USER_LOGIN.SUCCESS:
      return {
        ...state,
        authDetails: action.payload,
        loading: false,
        error: "",
      };
    case USER_LOGIN.FAIL:
      return {
        ...state,
        authDetails: {},
        loading: false,
        error: action.payload,
      };
    case LOGOUT_USER:
      return { ...state, authDetails: {}, loading: false, error: "" };
    case UPDATE_USER.REQUEST:
      return { ...state, updatingProfile: true };
    case UPDATE_USER.SUCCESS:
      return {
        ...state,
        authDetails: action.payload,
        updatingProfile: false,
      };
    case UPDATE_USER.FAIL:
      return { ...state, updatingProfile: false };
    
    case CHANGE_PASSWORD.REQUEST:
      return { ...state, updatingPassword: true };
    case CHANGE_PASSWORD.SUCCESS:
      return {
        ...state,
        updatingPassword: false,
      };
    case CHANGE_PASSWORD.FAIL:
      return { ...state, updatingPassword: false };

    default:
      return { ...state };
  }
};

export default authReducer;
