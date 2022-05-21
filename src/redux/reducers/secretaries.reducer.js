import {
    CREATE_SECRETARY,
    DELETE_SECRETARY,
    GET_SECRETARIES,
    GET_SECRETARY,
    UPDATE_SECRETARY,
} from "../types/secretaries.types";

const initialState = {
    secretaries: [],
    secretary: {},
    loading: false,
    loadingSec: false,
    creating: false,
    updating: false,
    deleting: false,
    error: "",
};

const secretariesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SECRETARIES.REQUEST:
            return { ...state, loading: true, error: "" };
        case GET_SECRETARIES.SUCCESS:
            return {
                ...state,
                secretaries: action.payload,
                loading: false,
                error: "",
            };
        case GET_SECRETARIES.FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CREATE_SECRETARY.REQUEST:
            return { ...state, creating: true };
        case CREATE_SECRETARY.SUCCESS:
            return {
                ...state,
                secretaries: [action.payload, ...state.secretaries],
                creating: false,
            };
        case CREATE_SECRETARY.FAIL:
            return { ...state, creating: false };

        case GET_SECRETARY.REQUEST:
            return { ...state, loadingSec: true, secretary: {}, error: "" };
        case GET_SECRETARY.SUCCESS:
            return { ...state, secretary: action.payload, loadingSec: false };
        case GET_SECRETARY.FAIL:
            return { ...state, loadingSec: false, error: action.payload };

        case UPDATE_SECRETARY.REQUEST:
            return { ...state, updating: true };
        case UPDATE_SECRETARY.SUCCESS:
            return { ...state, updating: false };
        case UPDATE_SECRETARY.FAIL:
            return { ...state, updating: false };

        case DELETE_SECRETARY.REQUEST:
            return { ...state, deleting: true };
        case DELETE_SECRETARY.SUCCESS:
            return { ...state, deleting: false };
        case DELETE_SECRETARY.FAIL:
            return { ...state, deleting: false };

        default:
            return { ...state };
    }
};

export default secretariesReducer;
