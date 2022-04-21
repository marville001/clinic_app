import { LOGOUT_USER, USER_LOGIN } from "../types/auth.types";

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

        default:
            return { ...state };
    }
};

export default authReducer;
