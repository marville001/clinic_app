
import {CREATE_DIAGNOSIS, GET_DIAGNOSIS, DELETE_DIAGNOSIS} from "../types/diagnosis.types"

const initialState = {
    diagnosis: [],
    loading: false,
    creating: false,
    deleting: false,
    error: "",
};

const diagnosisReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DIAGNOSIS.REQUEST:
            return { ...state, loading: true, error: "" };
        case GET_DIAGNOSIS.SUCCESS:
            return {
                ...state,
                diagnosis: action.payload,
                loading: false,
                error: "",
            };
        case GET_DIAGNOSIS.FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CREATE_DIAGNOSIS.REQUEST:
            return { ...state, creating: true };
        case CREATE_DIAGNOSIS.SUCCESS:
            return {
                ...state,
                diagnosis: [action.payload, ...state.diagnosis],
                creating: false,
            };
        case CREATE_DIAGNOSIS.FAIL:
            return { ...state, creating: false };

        case DELETE_DIAGNOSIS.REQUEST:
            return { ...state, deleting: true };
        case DELETE_DIAGNOSIS.SUCCESS:
            return { ...state, deleting: false };
        case DELETE_DIAGNOSIS.FAIL:
            return { ...state, deleting: false };

        default:
            return { ...state };
    }
};

export default diagnosisReducer;
