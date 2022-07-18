import {
    ADD_PATIENT_FILE,
    ASSIGN_PATIENT_DOCTOR,
    CREATE_CONTACT,
    CREATE_COMMENT,
    CREATE_CONTACT_TYPE,
    CREATE_PATIENT,
    DELETE_CONTACT_TYPE,
    DELETE_CONTACT,
    DELETE_COMMENT,
    DELETE_PATIENT,
    GET_COMMENT,
    GET_CONTACT_TYPE,
    GET_PATIENT,
    GET_PATIENTS,
    UN_ASSIGN_PATIENT_DOCTOR,
    UPDATE_PATIENT,
    GET_COMMENT_TYPE,
    CREATE_COMMENT_TYPE,
    DELETE_COMMENT_TYPE,
    UPDATE_CONTACT,
    DELETE_PATIENT_FILE,
} from "../types/patients.types";

const initialState = {
    patients: [],
    patient: {},
    comments: [],
    contactType: [],
    commentType: [],
    loading: false,
    loadingPatient: false,
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
            return { ...state, loadingPatient: true, patient: {}, error: "" };
        case GET_PATIENT.SUCCESS:
            return { ...state, patient: action.payload, loadingPatient: false };
        case GET_PATIENT.FAIL:
            return { ...state, loadingPatient: false, error: action.payload };

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
                patient: {
                    ...state.patient,
                    contact: [action.payload, ...state.patient.contact],
                },
                creatingContact: false,
            };
        case CREATE_CONTACT.FAIL:
            return { ...state, creatingContact: false };

        case UPDATE_CONTACT.REQUEST:
            return { ...state, updatingContact: true };
        case UPDATE_CONTACT.SUCCESS:
            return { ...state, updatingContact: false, patient: action.payload };
        case UPDATE_CONTACT.FAIL:
            return { ...state, updatingContact: false };

        case ADD_PATIENT_FILE.REQUEST:
            return { ...state, creatingFile: true };
        case ADD_PATIENT_FILE.SUCCESS:
            return {
                ...state,
                patient: {
                    ...state.patient,
                    files: [action.payload, ...state.patient.files],
                },
                creatingFile: false,
            };
        case ADD_PATIENT_FILE.FAIL:
            return { ...state, creatingFile: false };
        
        case DELETE_PATIENT_FILE.REQUEST:
            return { ...state, deletingPatientFile: true };
        case DELETE_PATIENT_FILE.SUCCESS:
            return { ...state, deletingPatientFile: false, patient: action.payload };
        case DELETE_PATIENT_FILE.FAIL:
            return { ...state, deletingPatientFile: false };

        case ASSIGN_PATIENT_DOCTOR.REQUEST:
            return { ...state, assigning: true };
        case ASSIGN_PATIENT_DOCTOR.SUCCESS:
            return {
                ...state,
                patient: {
                    ...state.patient,
                    doctors: [action.payload, ...state.patient.doctors],
                },
                assigning: false,
            };
        case ASSIGN_PATIENT_DOCTOR.FAIL:
            return { ...state, assigning: false };

        case UN_ASSIGN_PATIENT_DOCTOR.REQUEST:
            return { ...state, unassigning: true };
        case UN_ASSIGN_PATIENT_DOCTOR.SUCCESS:
            return {
                ...state,
                patient: {
                    ...state.patient,
                    doctors: [
                        ...state.patient.doctors.filter(
                            (doc) => doc._id !== action.payload
                        ),
                    ],
                },
                unassigning: false,
            };
        case UN_ASSIGN_PATIENT_DOCTOR.FAIL:
            return { ...state, unassigning: false };

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
            return {
                ...state,
                contactType: action.payload,
                loadingCType: false,
            };
        case GET_CONTACT_TYPE.FAIL:
            return { ...state, loadingCType: false, error: action.payload };

        case DELETE_CONTACT_TYPE.REQUEST:
            return { ...state, deletingCType: true };
        case DELETE_CONTACT_TYPE.SUCCESS:
            return { ...state, deletingCType: false };
        case DELETE_CONTACT_TYPE.FAIL:
            return { ...state, deletingCType: false };

        case GET_COMMENT_TYPE.REQUEST:
            return { ...state, loadingCommentType: true, error: "" };
        case GET_COMMENT_TYPE.SUCCESS:
            return {
                ...state,
                commentType: action.payload,
                loadingCommentType: false,
            };
        case GET_COMMENT_TYPE.FAIL:
            return {
                ...state,
                loadingCommentType: false,
                error: action.payload,
            };

        case CREATE_COMMENT_TYPE.REQUEST:
            return { ...state, creatingCommentType: true };
        case CREATE_COMMENT_TYPE.SUCCESS:
            return {
                ...state,
                commentType: [action.payload, ...state.contactType],
                creatingCommentType: false,
            };
        case CREATE_COMMENT_TYPE.FAIL:
            return { ...state, creatingCommentType: false };

        case DELETE_COMMENT_TYPE.REQUEST:
            return { ...state, deletingCommentType: true };
        case DELETE_COMMENT_TYPE.SUCCESS:
            return { ...state, deletingCommentType: false };
        case DELETE_COMMENT_TYPE.FAIL:
            return { ...state, deletingCommentType: false };

        case CREATE_COMMENT.REQUEST:
            return { ...state, creatingComment: true };
        case CREATE_COMMENT.SUCCESS:
            return {
                ...state,
                comments: [...state.comments, action.payload],
                creatingComment: false,
            };
        case CREATE_COMMENT.FAIL:
            return { ...state, creatingComment: false };
        case GET_COMMENT.REQUEST:
            return { ...state, loading: true, error: "" };
        case GET_COMMENT.SUCCESS:
            return { ...state, loading: false, comments: action.payload };
        case GET_COMMENT.FAIL:
            return { ...state, loading: false, error: action.payload };

        case DELETE_COMMENT.REQUEST:
            return { ...state, deleting: true };
        case DELETE_COMMENT.SUCCESS:
            return {
                ...state,
                deleting: false,
                comments: [
                    ...state.comments.filter(
                        (comment) => comment._id !== action.payload
                    ),
                ],
            };
        case DELETE_COMMENT.FAIL:
            return { ...state, deleting: false };
        case DELETE_CONTACT.REQUEST:
            return { ...state, deletingContact: true };
        case DELETE_CONTACT.SUCCESS:
            return {
                ...state,
                deletingContact: false,
                patient: {
                    ...state.patient,
                    contact: [
                        ...state.patient.contact.filter(
                            (contact) => contact._id !== action.payload
                        ),
                    ],
                },
            };
        case DELETE_CONTACT.FAIL:
            return { ...state, deletingContact: false };
        default:
            return { ...state };
    }
};

export default patientsReducer;
