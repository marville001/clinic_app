import { ADD_PATIENT_FILE, CREATE_CONTACT, CREATE_CONTACT_TYPE, CREATE_PATIENT, DELETE_CONTACT_TYPE, DELETE_PATIENT, GET_CONTACT_TYPE, GET_PATIENT, GET_PATIENTS, UPDATE_PATIENT } from "../types/patients.types";

const initialState = {
    patients: [],
    patient: {},
    contactType:[],
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
        
        case CREATE_CONTACT.REQUEST:
            return { ...state, creatingContact: true };
        case CREATE_CONTACT.SUCCESS:
            return {
                ...state,
                patient: {...state.patient, contact: [action.payload, ...state.patient.contact]},
                creatingContact: false,
            };
        case CREATE_CONTACT.FAIL:
            return { ...state, creatingContact: false };
        
        case ADD_PATIENT_FILE.REQUEST:
            return { ...state, creatingFile: true };
        case ADD_PATIENT_FILE.SUCCESS:
            return {
                ...state,
                patient: {...state.patient, files: [action.payload, ...state.patient.files]},
                creatingFile: false,
            };
        case ADD_PATIENT_FILE.FAIL:
            return { ...state, creatingFile: false };
        
        case CREATE_CONTACT_TYPE.REQUEST:
            return { ...state, creatingCType: true };
        case CREATE_CONTACT_TYPE.SUCCESS:
            return {
                ...state,
                contactType: [action.payload, ...state.contactType],
                creatingCType: false,
            };
        case CREATE_CONTACT_TYPE.FAIL:
            return { ...state, creatingCType: false };
        
        case GET_CONTACT_TYPE.REQUEST:
            return { ...state, loadingCType: true, error: "" };
        case GET_CONTACT_TYPE.SUCCESS:
            return { ...state, contactType: action.payload, loadingCType: false };
        case GET_CONTACT_TYPE.FAIL:
            return { ...state, loadingCType: false, error: action.payload };
        
         case DELETE_CONTACT_TYPE.REQUEST:
            return { ...state, deletingCType: true };
        case DELETE_CONTACT_TYPE.SUCCESS:
            return { ...state, deletingCType: false };
        case DELETE_CONTACT_TYPE.FAIL:
            return { ...state, deletingCType: false };

        default:
            return { ...state };
    }
};

export default patientsReducer;
