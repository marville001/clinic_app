import { CREATE_PATIENT, DELETE_PATIENT, GET_PATIENT, GET_PATIENTS, UPDATE_PATIENT } from "../types/patients.types";

const initialState = {
    patients: [],
    patient: {},
    loading: false,
    creating: false,
    updating: false,
    deleting: false,
    error: "",
};

const patientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PATIENTS.REQUEST:
            return { ...state, loading: true, error: "" };
        case GET_PATIENTS.SUCCESS:
            return {
                ...state,
                patients: action.payload,
                loading: false,
                error: "",
            };
        case GET_PATIENTS.FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CREATE_PATIENT.REQUEST:
            return { ...state, creating: true };
        case CREATE_PATIENT.SUCCESS:
            return {
                ...state,
                patients: [action.payload, ...state.patients],
                creating: false,
            };
        case CREATE_PATIENT.FAIL:
            return { ...state, creating: false };

        case GET_PATIENT.REQUEST:
            return { ...state, loading: true, patient: {}, error: "" };
        case GET_PATIENT.SUCCESS:
            return { ...state, patient: action.payload, loading: false };
        case GET_PATIENT.FAIL:
            return { ...state, loading: false, error: action.payload };

        case UPDATE_PATIENT.REQUEST:
            return { ...state, updating: true };
        case UPDATE_PATIENT.SUCCESS:
            return { ...state, updating: false };
        case UPDATE_PATIENT.FAIL:
            return { ...state, updating: false };

        case DELETE_PATIENT.REQUEST:
            return { ...state, deleting: true };
        case DELETE_PATIENT.SUCCESS:
            return { ...state, deleting: false };
        case DELETE_PATIENT.FAIL:
            return { ...state, deleting: false };

        default:
            return { ...state };
    }
};

export default patientsReducer;