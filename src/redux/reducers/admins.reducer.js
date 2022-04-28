import { CREATE_ADMIN, DELETE_ADMIN, GET_ADMIN, GET_ADMINS, UPDATE_ADMIN } from "../types/admins.types";

const initialState = {
    admins: [],
    admin: {},
    loading: false,
    creating: false,
    updating: false,
    deleting: false,
    error: "",
};

const adminsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ADMINS.REQUEST:
            return { ...state, loading: true, error: "" };
        case GET_ADMINS.SUCCESS:
            return {
                ...state,
                admins: action.payload,
                loading: false,
                error: "",
            };
        case GET_ADMINS.FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CREATE_ADMIN.REQUEST:
            return { ...state, creating: true };
        case CREATE_ADMIN.SUCCESS:
            return {
                ...state,
                admins: [action.payload, ...state.admins],
                creating: false,
            };
        case CREATE_ADMIN.FAIL:
            return { ...state, creating: false };

        case GET_ADMIN.REQUEST:
            return { ...state, loading: true, admin: {}, error: "" };
        case GET_ADMIN.SUCCESS:
            return { ...state, admin: action.payload, loading: false };
        case GET_ADMIN.FAIL:
            return { ...state, loading: false, error: action.payload };

        case UPDATE_ADMIN.REQUEST:
            return { ...state, updating: true };
        case UPDATE_ADMIN.SUCCESS:
            return { ...state, updating: false };
        case UPDATE_ADMIN.FAIL:
            return { ...state, updating: false };

        case DELETE_ADMIN.REQUEST:
            return { ...state, deleting: true };
        case DELETE_ADMIN.SUCCESS:
            return { ...state, deleting: false };
        case DELETE_ADMIN.FAIL:
            return { ...state, deleting: false };

        default:
            return { ...state };
    }
};

export default adminsReducer;
