import {
    CREATE_DEPARTMENT,
    DELETE_DEPARTMENT,
    GET_DEPARTMENTS,
} from "../types/departments.types";

const initialState = {
    departments: [],
    loading: false,
    creating: false,
    deleting: false,
    error: "",
};

const departmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DEPARTMENTS.REQUEST:
            return { ...state, loading: true, error: "" };
        case GET_DEPARTMENTS.SUCCESS:
            return {
                ...state,
                departments: action.payload,
                loading: false,
                error: "",
            };
        case GET_DEPARTMENTS.FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CREATE_DEPARTMENT.REQUEST:
            return { ...state, creating: true };
        case CREATE_DEPARTMENT.SUCCESS:
            return {
                ...state,
                departments: [action.payload, ...state.departments],
                creating: false,
            };
        case CREATE_DEPARTMENT.FAIL:
            return { ...state, creating: false };

        case DELETE_DEPARTMENT.REQUEST:
            return { ...state, deleting: true };
        case DELETE_DEPARTMENT.SUCCESS:
            return { ...state, deleting: false };
        case DELETE_DEPARTMENT.FAIL:
            return { ...state, deleting: false };

        default:
            return { ...state };
    }
};

export default departmentsReducer;
